Short post. I just wanted to talk through and share how I integrated Twitter and this blog.

Never mind that I've currently got I think 5 followers, or that I still don't really get why most people (myself included) tweet in the first place. While I'm doing this whole web presence thing, I thought it would be fun to make my site automatically [send a(?)] tweet whenever I posted anything.

Just as a side note, this is one of those problems that really doesn't need to be automated, and there's a reasonable chance that I spent more time coding it than I will recover from its automation. But hey. It was fun and interesting.

There are a couple steps to doing this, most of which are pretty simple.

First, predictably, install <a href="https://github.com/sferik/twitter">the Twitter gem</a>. Their API is great, and well documented, but it's not without its complications, including OAuth registration to use the app, and far less documentation explaining how to tweet from an app than how to show tweets in your view.

After installing the gem, you have to <a href="https://dev.twitter.com/apps/new">register your app</a> with Twitter, which involves creating OAuth keys, which for security reasons (particularly if your code is in a public github repo), should be saved into environment variables.

Then, create a config file to house this information:

**config/initializers/twitter.rb**

```ruby

Twitter.configure do |config|
  config.consumer_key = ENV["TWITTER_CONSUMER_KEY"]
  config.consumer_secret = ENV["TWITTER_CONSUMER_SECRET"]
  config.oauth_token = ENV["TWITTER_OAUTH_TOKEN"]
  config.oauth_token_secret = ENV["TWITTER_OAUTH_TOKEN_SECRET"]
end

```

By the way, apparently, future gem versions will soon automatically look for config vars with these names, so that you won't need to include this config file.

Another step here that new users might miss is to add these variables to the production environment as well, in my case by adding them to Heroku, eg:

```
heroku config:add TWITTER_CONSUMER_KEY=somefancylookingkey
```

Once you've got that up and running, you should be able to open the Heroku console and test that the gem and your configuration by entering this very simple line (or a variant of it):

```
Twitter.update("My first tweet from my app!")
```

If that's working (mine wasn't, cause I mistyped a variable name), you're close to having this up, and the only remaining step is to integrate the call into your program. In my posts controller:

**posts_controller.rb**

```ruby

  def create
    @post = Post.new(params[:post])
    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { redirect_to @post }
      else
        format.html { render action: "new" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
    Twitter.update("New post on '#{@post.name}' -- #{@post.tinyfy}") if Rails.env.production?
  end

```


(Incidentally, the above is not ideal, because it tweets even if the post is not saved correctly. I did this because putting it in the respond_to block was causing errors. Luckily, this isn't a problem, as the post mechanics are simple and not at all error prone -- and I'll figure out the best way to deal with it shortly.)

Note, in the above, the test for production environment (so that the gem doesn't try to tweet whenever I test out posts in development/test). Also note the tinyfy method, which creates a tinyurl address for the post, to make the Twitter presentation clean and short. The code (which piggybacks on my slugged-url methods, and uses Ruby's <a href="http://ruby-doc.org/stdlib-2.0/libdoc/net/http/rdoc/Net/HTTP.html">Net::HTTP</a> client) is below and is closely adapted from <a href="http://www.mikeheijmans.com/2008/09/getting-tinyurls-in-rails/">this post</a>:

**post.rb**

```ruby

def tinyfy
   url = URI.parse('http://tinyurl.com/')
   # Collecting in the "res" variable the result of
   # submitting my desired address into tinyurl.com
   res = Net::HTTP.start(url.host, url.port) {|http|
   http.get('/api-create.php?url=' + "http://sashafklein.com/posts/#{self.id}-#{self.slug}")
   }
   if res.body.empty?
      #If tinyurl is not responding properly. Return the original url
      return "http://sashafklein.com/posts/#{self.id}-#{self.slug}"
   else
      return res.body
   end
end

```

'Teaching is the best way to learn', goes one of the many cliches I've found to be entirely accurate -- accurate, in fact, in direct proportion to the complexity of the subject at hand.

Without much doubt, the only person I'm teaching here is myself, so for those of you reading -- disclaimer -- this walkthrough of my process of implementing AJAX-enabled instant search may be a bit elemetary or messy, but it's new to me, and explaining it helps me understand it.

Assuming that at some point the number of posts I'd written would outgrow the limits of the devlog sidebar, I decided I wanted a post archive. Again assuming, for the sake of self-education, that these posts might grow so numerous as to require sorting or searching -- user friendly, self-expanatory, and aesthetically nice, of course -- I decided on an in-page AJAX search that would narrow the "Archive" list to relevant posts.

The first step was the Archive page. To remain restful, I wanted it associated with the Index action in my posts controller, but I also wanted it at sashafklein.com/archive, rather than sashafklein.com/posts. This required renaming the "index" action in my controller to be "archive" and putting the following in my routes file.

**routes.rb**

```ruby
  resources :posts
  match '/archive', to: 'posts#archive'
```

Once I had Archive behaving like Index, I could initiate my search there, and I turned to [Railscasts](http://railscasts.com/episodes/240-search-sort-paginate-with-ajax), as always (best $9/month of all time, by the way), for guidance.

The cast was almost 100% what I wanted, but it both contained a bug that took quite some time to ferret out, and, as usual, a good deal of it went over my head at first. The basic idea, for searching, goes like so.

First, you create a search form in your view, like so:

**index.html.erb**

```erb
<%= form_tag '/archive', method: 'get', id: "posts_search", class: "search_form squeeze form-inline" do %>
      <p style="text-align: center">
        Search:
        <%= text_field_tag :search, params[:search], class: "search", autocomplete: "off" %>
      </p>
<% end %>
```

There are a couple things to note about this form. Per [Rails Guides' suggestions](http://guides.rubyonrails.org/form_helpers.html#a-generic-search-form), it submits a GET, rather than a POST request. Additionally, it is that it's associated with the '/archive' action, so it knows where to look for submission. Then, the form tag has an id, specifically for finding with Javascript. Finally, you'll note that there is no input button; since my search is instant, I decided doing a keypress search and getting rid of the submit button would streamline the experience.

This, of course, would do nothing, because my app has no idea what to do with the search. So the second step is to create a search method, like the below (taken from the Railscast):

**post.rb**

```ruby
def self.search(search)
  if search
    where('name LIKE ?', "%#{search}%")
  else
    scoped
  end
end
```

This simple method returns all the posts with titles "like" the criteria supplied or else the empty ["scope"](http://stackoverflow.com/questions/11900062/scoped-and-scope-in-rails). The shortcomings of this simple method for search are numerous. For one, it only searches in titles, not content, so users may fail to find relevant posts. For another, it requires correct order. A search for "pretty simple" will return my Pretty(,) Simple Blogging post, but "simple pretty" will not. For now, however, the simplicity and speed of this solution seemed sufficient to recommend it.

Now that I had a search method, however, I still had neither a place to post the results nor an action to do it. In a non-ajax search, I could have submission re-render the page with the new searched list (paramified in the URL), and an if statement in the view showing the search's contents should it exist. Instant, however, required javascript.

The first step is to read and respond to user action. So I threw the following into my Posts coffeescript file, which called the search function (top) to respond to user action (keypress or submission, below) by returning a stripped form of the searched list:

**posts.js.coffee**

```coffeescript
@search = ->
  $.get $('#posts_search').attr("action"), $('#posts_search').serialize(), null, "script"

$ ->
  $('#posts_search input').keypress -> search()

  $('#posts_search').submit (e) ->
    e.preventDefault()
    search()
```

This information would be run through the search method and stored in variables in my Posts Controller:

**posts_controller.rb**

```ruby
def index
    @posts = Post.search(params[:search]).reverse

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts }
    end
  end
```

Only two things remained, and the first, creating a space in the view for search display, was easy. I just shuffled my posts list into a partial,

**index.html.erb**

```erb
<div id="list"><%= render "search" %></div>
```

and had that rendered directly under the search form:


**_search.html.erb**

```erb
<ul class="blog_links">
    <% @posts.each do |post| %>
      <h2>
        <%= link_to post.name, post %>
        <small>(<%= post.created_at.strftime("%b %d, %Y") %>)</small>
      </h2>
  <% end %>
</ul>
```

Finally, to tie this all together, I just created a Javascript template, with the same name as the page in which it was called (index), to render in the above div with the "list" id, the search partial with the Javascripted results:


**index.js.erb**

```javascript
$('#list').html('<%= escape_javascript(render("search")) %>');
```

Done -- almost. The one thing that left me confused for hours was that the Javascript was reading user input, as was clear from the server logs, but seemingly not acting upon it, a problem that resolved itself with a single short line of code added to the "respond to" block of the index action in my Posts Controller:

**posts_controller.rb**

```ruby
format.js
```

With that line, the Rails search method I wrote was made available to the JavaScript, to be called upon with the search criteria so that the Javascript could return the search list and render the search partial into my Archive page.

Ta da. [Instant search](http://sashafklein.com/archive)).
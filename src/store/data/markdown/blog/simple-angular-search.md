One thing that Angular made considerably easier was instant search. In [previous blog posts](http://www.sashafklein.com/posts#/instant-ajax-search), I discussed my method for instant "AJAX" searching of posts. I wanted users to be able to search through all my posts (ideally, both their titles and their contents), using a simple search box on the Archive page -- and I wanted that search to alter the appearance of the full archive list on the page.

I was unable, using basic jQuery and my knowledge at the time (without paying for a higher-powered search tool like Thinking Sphinx), to create full-body search that was at all performant. But I managed to get title search working OK.

In basic, high-level terms, that search went like so:

* A user types a search term. Without any keypress or button click, that search term is considered complete when the user releases his/her hands from the keyboard for a period of time.

* When a complete search term is entered, it is posted, via jQuery, to an endpoint that takes that term and does a basic SQL search through post titles. More or less: `Post.where("title LIKE ?", search_term)`.

* Once that SQL search was complete, it would return the new, shortened list, which would replace the original one (through jQuery and a js.erb partial) on the archive page.

There were a number of major problems with this method of search:

* *It was laggy and jumpy.* Every time a search went out (which happened every second or so of typing), a request was sent out, the DB was queried, the response went back, and it was formatted and inserted into the HTML. It only registered as a flicker, but it was noticeable.

* *It was inaccurate.* The lag caused actual search failure. Because there was a noticeable pause between typing a query and seeing its result, a user might type "Pretty" and miss out on any title including "Prettily", because the search wasn't conducted before the "y" was entered. Also, if I remember correctly, search was case sensitive, so even "prettily" wouldn't work.

* *It had edge cases* (which I didn't handle perfectly). When a user typed a term and then erased it, they'd have to press enter to re-empty the search (an ability that I had to code explicitly into the endpoint controller -- because searching for posts with titles `LIKE` an empty string doesn't turn up all posts). In a number of ways I don't remember (and which are not worth remembering) this version of instant search was slightly buggy and unintuitive.

* *It was complicated* for me, the developer. And, for reasons I never dug into, it performed differently locally and on production.

By contrast, I just rewrote the search in Angular, and it's **stunningly simple**, performant, and intuitive.

Step one, grab the data in Angular, instead of Ruby. So this view:

**posts/_search.html.erb**
```erb
<% @posts.each do |post| %>
    <h2>
      <%= link_to post.name, post %>
      <small>(<%= post.created_at.strftime("%b %d, %Y") %>)</small>
    </h2>
<% end %>
```

becomes this view (postList fetched via Angular's `$http` module):

**posts/_search.html.haml**
```haml
%input{ type: 'text', ng_model: 'query' }
%h2{ ng_repeat: 'post in postList | filter:query' }
  %a{ ng_href: '{{postShowPath(post)}}' } {{ post.name }}
  %small {{ post.created_at | date:'mediumDate' }}
```

> Note that the search bar has been included in the above template for illustration.

Even for someone completely new to Angular, the above code is relatively clear. A user inputs a 'query', and the posts in the "postList" are "filtered" using that query -- in real time, in their entirety (content and title), without any HTTP requests, SQL searching, DOM manipulation, or term-orderin concerns. It all happens in an instant, without a flicker or any hesitation, by simply filtering which items in the list Angular decides to display. (It's easy to narrow the filtering to partciular attributes, like title, on the post.)

This functionality isn't unique to Angular, but it makes immediately clear the framework's power and expressiveness. With hardly any effort, what was complex, buggy, and specific in JQuery and Ruby is simple and beautiful in Angular.
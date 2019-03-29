`Angular` can be a hell of a learning experience. Its terminology -- "directives", "services", "factories", "providers", "injectors" -- seems designed to cause confusion and disagreement with other frameworks and languages, and its use of a `$scope` object (and a $root_scope object, and scope in general) seems unintuitive and, at first, completely arbitrary.

All of a sudden, you're forced to think about attaching everything (data and functions) to this scope object, which is, somewhat inexplicably, pinned to a subset of your `HTML` page, and which, as inexplicably, is referenced in the backend (ie `$scope.performAnAction()`) but blithely assumed on the front(`ng_click: 'performAnAction()'`).

Then there's the simple inversion of thought process, when coming from a straight-up `JS` or `JQuery` background. `Angular`'s object orientation is a *huge* improvement over behaviorally-driven `JQuery`, but it takes some getting used to. With `JQuery`, everything is obscured on the back-end, and very tightly bound to specifics (particular ids or classes) on the front.

And here's where `Angular` first begins to show its tremendous expressive and functional power.

```haml
# fancy-page.html.haml
%a#name-show-button{ href: '#' }
%input#name-box.hidden{ type: 'text' }
%p#thanks.hidden "Thanks for submitting your name!"
```

It's an excessive example, but it should be clear that the above `JQuery`-dependent interactive `HTML` is not very easy to understand. You could figure out what might be going on (and the author could have been clearer in his ID names -- sorry), but the behavior (and the location of the code that drives it, and what data it's tied to) is all very much obscured from someone looking at the `HTML`.

Here might be an example of backend `JQuery` behavior (written in `Coffeescript`). Did you correctly guess what was going on?

```coffeescript
# some-random-cs-file.coffee
$ ->
  $('#name-show-button').on 'click' ->
    $('name-box').removeClass('hidden')

  $('#name-box').on 'enter' ->
    $('#name-box').addClass('hidden')
    $('#thanks').removeClass('hidden')
```

In `Angular`, everything looks a good deal more messy at first:

```haml
# fancy-page.html.haml
%a{ href: '#', ng_click: 'showNameBox()' }
%input{ type: 'text', ng_model: 'name', ng_enter: 'submitName()', ng_show: 'showName' }
%p{ ng_show: 'nameSubmitted' } "Thanks for submitting your name!"
```

But it's also, if you wade through the long lines, significantly more expressive. What does that button do? Oh yeah. It shows the name box.

> Note: That `ng_enter` isn't built into `Angular`, but it's easy to add, through the awesomeness of `Angular` unique `directives`, which I'll cover in a later post.

The real benefits become clear:

* When you need to tie this into actual data. What if you needed to read the name, and store it in a database -- if it isn't already in there? Try doing that easily (and "binding" any relevant information with visuals on the screen) with `JQuery`.

* When you deal with scoping and repeating behavior. What if you suddenly want the same click-then-type-then-enter behavior as in the above, but in a number of pages (or places on the same page) using different classes or ids? The process of reusing `JQuery` becomes quickly more difficult.

* When you want your code to speak for itself. With regular `JQuery`, the `HTML` doesn't give any clues about its behavior, and the `JQuery` doesn't give any clues about its associated `DOM` elements. `Angular` is super clear, because the `Javascript` is tightly bound to the `HTML`.

For the aforementioned and other reasons, we've recently made a huge transfer to `Angular` at Bloc, and in the coming posts, I'll dig into more detailed explanations of why, and less trivial examples of how to use `Angular` to do some very cool things.
At Bloc, we've been thinking through how best to create an "office hours" platform for our students to chat with mentors and each other about the curriculum materials.

We started with a basic single chat room, using HipChat, and hosted externally to the site. This solution was successful enough to make it clear that a chat-based office-hours solution is something both students and mentors are excited about, but was definitely going to be trouble scaling.

Already, with relatively small numbers of students, things were becoming a mess.

* The best and worst times were tough to track. We could track when students were following the office hours link, and enter the chat room periodically to see how many users were in there (or even use the HipChat API to get limited data on activity), but we didn't have anywhere near the sort of data we'd need in order to know, and automatically update, exactly which times were our most active/necessary.

* Mentors during the busiest times were completely overwhelmed. They'd be in a single chat room, leading three conversations at once, and losing track of each thread.

* There was no concept of role, so that a new user wouldn't know who was the mentor in the room, and might feel uncomfortable asking questions.

* All questions were public, and in one room, leading some newer students to feel embarassed about asking relatively simple questions.

* There was no sense of queuing, so in an imperfect world, some less pushy students would end up waiting prohibitively long for an answer.

* There was no implicit sense of who was talking to whom.

* Code snippets were poorly supported. They could be pasted in, but the whitespace would be strangely formatted, and, if copied and pasted, would often cause whitespace errors, even in whitespace-agnostic Ruby files.

* It was not authenticated, a legitimate issue as the company grew and we tackled questions of how to handle alumni, pre-enrollees, students in other courses, and, well, randos.

## What we needed

So we started looking for an alternative. Our basic criteria for a successul MVP were largely based off of the failures of our previous approach. We wanted:

* The possibility of complete tracking. Timestamped messages, by user, course, and user type, that we could sort through easily in our own database.

* Multiple Rooms, and, ideally, private rooms, so mentors could initiate 1-on-1 conversations, and students could feel at ease to ask questions without pressure.

* Built-in roles, so only mentors could open/close rooms, and students would know immediately who was a mentor.

* Better @mentions, so users could leave rooms and get pinged if they were mentioned.

* Code snippets that could be cut and pasted with impunity.

* Authentication that allowed us to specify who was welcome in which chat rooms, and then automatically sign them in if they followed the link from Bloc.

In addition, we wanted some new features that pointed us specifically towards an open-source option:

* An ability to 'skin' the chat app to approximate Bloc's styles, so it had the same look and feel.

* Chat in a separate, subdomained application that had a variety of different course-specific rooms: `officehours.bloc.io/web_development`, for example.

* Internal message hooks, so that we could add Bloc-specific behavior to new message creation, sending out data to a bloc.io endpoint whenever a message was sent.

These requirements pushed us towards something extensible, with an API for creating users, support for code snippets, user roles, and multiple rooms, and a way to automatically authenticate users sent the app's way.

Unfortunately, nothing like that appeared to exist. We took a look at [Kandan](https://github.com/cloudfuji/kandan), a Rails-based open-source chat option, and it had no API support, which was a game-ender.

[Candy](http://candy-chat.github.io/candy/) didn't support code snippets at all, and seemed not to answer many of our other questions, so that was that as well.

After cycling through a variety of other options, I ended up picking [MogoChat](http://getmogochat.com/) to see if I could run with it. It's a very basic chat tool, written in [Elixir](http://elixir-lang.org/) and [Ember.js](http://emberjs.com/), that was easy to spin up on Heroku and play with. It was also trivial to create an API wrapper that could take a Bloc user and create a Mogo account for them like so:

```ruby
  Mogo.new(User.find('user-slug')).create_user!
```

## The road ahead

Once that basic structure was in place, its ease and applicability began falling apart.

It appears that Mogo's dependencies are newer than its (and Homebrew's) version of Elixir supports, so when I tried to install Elixir on local so I could run a local chat server and mess with the styling, things fell apart, and I couldn't get a local server running. This does not bode well for our future maintenance of this chat server, unless I can get a stable and internally consistent version running.

Then it turns out that its authentication memory window is extremely short (if you're inactive for a few minutes, it signs you out), and I had trouble sorting through all the `.ex` files to figure out how to change this. It looks like automatic authentication might be a similar slog, or even impossible.

But the tool is, slowly, coming together, and if I can get authentication to work and figure out how to hook a post to a Bloc endpoint into Message creation, we'll be 90% of the way there. This new option solves most of our immediate issues, and could offer us a chat tool with roles, private rooms, auto-authentication, code snippets, mentions, internal styling, and built-in metrics.

Then all we'd need is to successfully convert the single-page app into a handful of single-page apps, hosted as pages under one subdomain, and Bloc Office Hours 2.0 would be good to go.

As I keep exploring this problem, I'll try to chart my progress here.
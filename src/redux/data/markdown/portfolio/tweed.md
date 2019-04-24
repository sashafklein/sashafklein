[Christian Schlensker](https://www.github.com/wordofchristian) and I built the Bloc Office Hours chat application (nicknamed "Tweed") over several days to address a wide variety of concerns elucidated at length in [this post](/blog/blocchat-part-1).

We'd been using a private HipChat app, but found that no option -- paid or free -- allowed us all of the funcationality we needed to offer functional and trackable office hours. So we decided to build our own.

Tweed was built on the foundation of a basic Meteor chat app like that described in [Tom Coleman and Sacha Greif's wonderful tutorial](https://www.discovermeteor.com/). But then we layered on considerable additional functionality:

- We had each chat message and entrance/exit of rooms send out individualized event notifications to a Bloc-built event tracker, to enable us to identify peak and trough hours and effectively triage mentor hours.

- We integrated with a meteor Markdown plugin to render code snippets.

- We added audible and visual notifications for messages.

- We built a variety of rooms -- one for each course -- and a permissions system that varied room visibility/entrance by student/mentor type and role (student/mentor/admin)

- We set up secure cross-site authentication, so that each Bloc user had unique Tweed login information, which would automatically sign them in and out, and which passively expired at the end of the course, but could be extended on command.

- We added private chat, exclusively at the command of mentors, so that mentors could keep track of the "queue" of questions while addressing them with minimal confusion one (or multiple) at a time.

![tweed-gif2](https://s3-us-west-1.amazonaws.com/sasha-public-assets/sashafklein/tweed-gif2.gif)

The app was my first foray into Meteor, as well as Christian's first major Meteor app. It immediately saved considerable amounts of time and money, as well as improving student experience and admin insight. And it taught me a good deal about Meteor and server-side JavaScript frameworks.

Unfortunately, Tweed is no longer up to demo or record live (which would, at any rate, invade student privacy). I pushed to replace the Tweed Office Hours with a Stack-Overflow-integrated QA system (for a variety of reasons, mostly focused on learning quality) shortly before I left Bloc. So all I can share is this GIF I made locally.

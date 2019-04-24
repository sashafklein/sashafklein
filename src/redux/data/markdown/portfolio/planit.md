My brother and I worked on PlanIt for roughly 9 months, during which the concept evolved considerably. Originally conceived of as a tool for ordering and displaying travel itineraries, it morphed into a tool for bookmarking and sharing wishlists of places at home or abroad. Shortly before we let go of the idea, we began working towards another version: An app for browsing friends' and other trusted sources' recommendations, bookmarking the exciting ones, and then taking the final location-based list offline for use abroad.

I wrote [a post](/blog/planit-post-mortem) about what I think we did wrong, and why we dropped the idea, but a considerable amount also went right. The two of us (one of whom had no coding experience at the start of the project) planned, designed, and built a substantial amount of pretty nifty software.

Our final application included a **bookmarklet** which could be used to scrape relevant travel data from nearly any website (including ordered multi-location narrative data like the [New York Times' 36-Hours series](http://www.nytimes.com/column/36-hours)), and then send that data back to our site, where it would be parsed for its locational components, "completed" by running selective portions of it through a **series of APIs**, and then added to the user's relevant lists.

We streamlined the list concept by **auto-clustering locational data** by Geonames units, which we further abstracted into more sensible **colloquial location units**, and then displayed this data for browsing in an **interactive world map** (powered by Angular/Leaflet) that allowed for **differential interactive behavior** at a high-level (country-wide browsing), and a low-level (location-centered browsing/addition of individual restaurants, museums, etc).

We layered on top of all of this a robust and completely **hand-rolled Angular SPA** architecture, which allowed users to move from world-level browsing to city-level note-addition or bookmarking, without ever reloading the page. Users could toggle between map and list views, take a large variety of actions, and manipulate a large and growing body of frontend data, all of which was **lazily cached** and shared between the "horizontal" and "vertical" layers of our SPA.

![planit-gif](https://s3-us-west-1.amazonaws.com/sasha-public-assets/sashafklein/planit-gif.gif)

To spare our server and keep the user experience fast, we backgrounded a large number of application tasks -- place addition, bookmarklet functions, note-taking, bulk actions -- while maintaining the interactiveness of the platform by opening a line of communication between backgrounded and current tasks using **Pusher** and an **internal API**.

Throughout, we maintained Rails/Angular **best practices**. Our largest model file (by a mile) was less than 200 lines long (and our largest controller roughly 100). Instead, we consistently moved our logic into serializers, decorators, and a large number of interrelated, namespaced, and extensively unit-tested POROs, which isolated data completion, scraping, information interpretation/display, internationalization, and more.

Our **extensive test suite** was just short of 100 feature, request, controller, and unit tests, and was optimized to run in roughly 1 minute. It included automatically changing tests (for the scraper, which would periodically re-scrape data to test whether our expectations were current with external changes), and several meta-coded site-wide tests, including one which automatically made requests under a variety of user roles to every page and API endpoint in our website and set expectations for the response.

Although we eventually dropped our idea rather than pour additional time and capital into it ([more about that decision](/blog/planit-post-mortem)), I am extremely proud of the quality of the work we did on PlanIt, and I know we both learned a huge amount in the process of testing and building it out.

Unfortunately, we stopped working on PlanIt in buggy mid-stream, and I've since stopped paying for hosting the non-functional site. If you're interested in walking through a demo, [let me know](mailto:sashafklein@gmail.com).

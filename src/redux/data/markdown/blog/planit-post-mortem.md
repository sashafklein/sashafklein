> This is a cross-post from my brother and my other (currently silent) [blog](https://brosklein.wordpress.com/2015/07/22/hello-world-goodbye-planit/)

A few weeks back, my brother Niko and I gave up on PlanIt, a startup idea we'd been working away at for a bit under a year.

It was a strange experience, protracted and confusing and then suddenly definite, and we've been spending some of the time since trying to autopsy our too-many months of effort, and get to the bottom of what we could have done better.

We intend to use this blog as an opportunity to systematically dissect our missteps, while remaining realistic about the difficulty of avoiding many of them in the moment, and exploring the often conflicting frameworks and advice that could help us and other entrepreneurs dodge similar bullets in the future.

Before jumping into specifics, however, I think it makes sense to roll back the tapes and explain how PlanIt started, and how it got to the point where we decided to drop it.


## The Origin Story

The central concept for PlanIt was born of brainstorming about our own issues and frustrations, a process that startup luminary Paul Graham suggests is central to finding good startup ideas:

> [The verb you want to be using with respect to startup ideas is not "think up" but "notice."](http://paulgraham.com/startupideas.html)

Specifically, we'd just wrapped up a (lovely) family vacation to Japan, an experience that had made clear to me just what a hassle it was to plan a complex trip for multiple people with different tastes who needed to be kept in the loop around decisions and logistics -- particularly for someone as obsessive and food-centric as me.

I trolled forums and checked out several tour books to compare high-level itineraries for crammed 2-week trips. I made a day-by-day spreadsheet, listing hotels (with links to reservations), restaurants (with links to reviews), and suggested day activities. To explain my thinking, I created a companion word-doc, with descriptions of non-self-explanatory items. I made two complex multi-leg Google Maps, one laying out the directional itinerary of our trip, and another mapping out all the good parks, lunch spots, ramen joints, hipster cafes, and fancy bars in Tokyo.

Then, people asked for photos and recs from the trip, and I had no simple way to turn the intersection of my planning and experience into something that felt fun and meaningful to share.

It was a schlep. And when we started scraping our mental barrels for startup ideas, an itinerary creation and sharing tool rose right to the top.

Having skimmed some [Lean Startup](http://theleanstartup.com/principles) methodology and watched one compelling [Eric Ries](https://www.youtube.com/watch?v=fEvKo90qBns) interview, we decided to jump right into creating our MVP. The idea (in our minds) was to skip right over itinerary creation (a first step that we thought exceeded what we needed to validate the concept) and tackle itinerary *representation*. We would create an itinerary visualizer that would compel people to use and share the tool. Then we could reverse engineer the process by which a user would put together a visually compelling, useful itinerary.


## Validating a Thesis

We ran into issues almost immediately.

- "That sounds like a really cool idea."

- "Yeah, I'd love my itineraries to be beautiful and easy to put together."

- "Cool idea! You know what else you guys could do with that?"

The primary issue, and one we've struggled with throughout building PlanIt, was a lack of clarity about whether we were solving a problem people felt was "urgent". We interviewed people (mostly friends), but had trouble turning a subjective read of enthusiasm into any clear, binary statement about whether to continue in the chosen direction or, if not, how best to "pivot".

> We also moved, very quickly, onto "solution" interviews, which involved building out pretty HTML views that required design time, a relatively complex backend data model, a data entry system, and an API integration to demo meaningfully. In other words, we were now well beyond "minimum", and testing at what [Ash Maurya](https://www.youtube.com/watch?v=Nhl5nzUNQCA) and the Lean Startup camp would consider an unearned stage of the process.

At this point, the issue with our interview process was the difficulty of translating tone. We received a lot of apparently positive feedback that in retrospect was simply insufficient. And we had set up interviews in a way that didn't drive towards a binary answer.

In other words, we had real difficulty making a distinction between excitement and apathy in a context where essentially all enthusiasm could be explained away by friendship or basic human kindness.


## Charting our Course

About the same time that we were putting our MVP together and interviewing potential users, Niko put together a monstrous spreadsheet of our competitive landscape. It had literally hundreds of rows representing separate companies/startups that seemed to be in our "space", a significant number of which were working at very similar ideas.

There was relatively established *TripIt*, for gathering together booking info. There was *Jauntful*, which allowed people to create, bring, and share pretty maps with up to 15 spots in a given city. There was *Mygola*, for suggesting and putting together ordered itineraries from travel suggestions. There was *GoGoBot*, a medium-large player in the field, who created a mobile and web interface for grouping and ordering places rated on their own platform. There was *Tripcipe* (and a large handful of similar companies), a small group of coders doing basically exactly what we wanted to do.

### Ignore the Competition

Again, the startup advice pushed us towards action that disagreed with our instincts: Ignore the competition. Just do your thing.

> "A crowded market is actually a good sign, because it means both that there's demand and that none of the existing solutions are good enough." -- Paul Graham

More specifically, in the words of PG, "You don't need to worry about entering a 'crowded market' so long as you have a thesis about what everyone else in it is overlooking."

Our thesis? We had one or two. They weren't very strong.

- *The user design for most of these apps is poor.* TripIt was a hellish user experience, and many of the others weren't much better. The most common crime in our eyes was over-complication.
- *Tripcipe et al were exclusively travel-focused.* This meant that it was likely to be used rarely and fall into the background compared with a product that had application outside of travel periods.

> Additionally, I'd prematurely scared myself with competition building an app called *MeatUp* a few years back. This led Niko and me into a bit of a screw-the-competition mindset, defined by a vague belief that we'd just do it "better".

These coalesced into a generalized and squishy "subjective optimization" hypothesis: We had problems that we thought could, in Paul Graham's terms, "suck less" -- and we thought we could fix them "better" than anybody else.

> Critically, this conversation, which led to me quitting my job, happened remotely, and in retrospect, we think we gave it short shrift (temporally and intellectually). We wanted to just "leap", ignore the uncertainty, and trust in ourselves. There is definite wisdom to this manufactured confidence, but I think it needs to be well justified and thought through.

### On (Over)Confidence

This decision also drew from [the startup lore around outsized confidence](http://lowercasecapital.com/2015/02/04/why-i-would-never-want-to-compete-with-travis-kalanick/), which I think in retrospect often mistakes correlation for causation. In other words, a startup founder is confident not just because they think they're smarter and harder working, but also (and maybe primarily) *because* they've found a concept they think is inevitable, with a *unique and powerful solution*.

> This conflict between the dictates of startup lore and our recurrent uncertainty about wasting time or solving an insufficient problem dogged us until we dropped the idea.

Perhaps mistaking correlation for causation (or just buying into debatable lore), we decided to [throw our knapsack over the wall](http://travishellstrom.com/knapsack) and just commit. Niko bought a domain for a cute name as a form of emotional investment -- but in so doing wedded us to a particular conception of a *solution* for our problem, before we had really "validated" the *problem* at all.


## "Pivot" Number One

Despite our blindness to user apathy and commitment to commitment, we did eventually decide to pivot our idea, for reasons we discussed almost exclusively between the two of us.

We pivoted on one main hunch:

> *Travel planning is extremely intermittent.* We didn't think we'd be able to build or maintain a consistent user-base with a product that, even for our heavy-traveling niche market, would use the tool once or twice a year. We planned to keep the product top-of-mind by making it useful for sharing as well, but we saw people using it once and then forgetting about it, or not sharing it enough to build a community and real growth.

This hunch was strengthened by the aforementioned glut of competition. In a noisy space, we needed to stand out by remaining top-of-mind. And we could remain top-of-mind, we surmised, if we became not just a travel tool, but the go-to place for bookmarking *anywhere* you wanted to go to, at home or abroad, and sharing those bookmarks or being reminded about them as you moved around.

This conceptually solved the intermittence problem, but plunged us into a whole new space of competitive uncertainty.


### Ignore the Competition, Part Two

Specifically, we were now competing with the big dogs -- Yelp, Google Stars, and Foursquare. (Particularly Foursquare, which, as we became increasingly aware, was really solving very many of the problems we were interested in at this point and later.)

We dismissed this competition repeatedly in one of 3 main ways:

1. Repeating Paul Graham and others' dictums that competition isn't particularly relevant, and may, in fact, be beneficial.
2. Pointing to slight UI/branding issues that to us accounted for the lack of customer knowledge (from interviews) that these solutions existed, or interest in and use of the existing solutions.
3. Rationalized that Google et al could crush *anybody* by extending their pinky, and that you had to assume that if you built a product/market quickly, they'd be more likely to acquire you than try to outcompete you.

These defenses [weren't *wrong* per se](https://www.youtube.com/watch?v=uQl5aYhkF3E).  But they were based on an unearned assumption that what made us different (UI, travel-centricity, branding) was (A) achievable, and (B) sufficient. We never really validated either of those [risky](http://leanstack.com/on-identifying-riskiest-assumptions/) hypotheses.

> Our dismissal of bookmarking competition like Foursquare and Yelp represented another major misstep: A failure to take the hint that perhaps customers' vocalized desire for a bookmarking tool was legitimately undercut by their failure to use the available options -- it just wasn't bubbling up to a sufficient problem, and we had no real reason to believe that our tweaks would bring it there. Email/text really seemed to be just fine for most people.

We may have tried to ignore the competition, but it *did* phase us, and led us to a series of (untested) hyphotheses that moved us in a dangerous direction:

- __These tools failed because they didn't *integrate* bookmarking/location data with travel__. To beat them we had to integrate (ie, both nail bookmarking, and nail travel). A tool without both functionalities, built out to a level at or surpassing the (serious) competitors', would fall flat.
- __The bigger tools missed this market because of branding.__ Neither Foursquare nor Yelp branded themselves as bookmarking tools. This, we said to ourselves, largely accounted for their underuse as such (rather than the other way around).
- __The smaller tools suffered from overcomplicated user flows, which negated their value add.__ So we needed to focus on constant simplification and UI smoothness.

Together, these three hypotheses pushed us towards a future where had to build out complex integrations but make them dead simple -- as two coders with hardly any relevant UI experience. This is more or less the path we took until we dropped the app.


### "Minimum" Viable Product

We failed to test the central, riskiest hypotheses of our problem concept. But we *did* test our specific solution -- at significant cost and with limited success.

Specifically, following the first pivot, we put aside our original MVP and built a largely separate MVP around our thesis that people would love a bookmarking application tied into travel.

We had to tackle one first -- bookmarking or travel -- and because the latter required the former (for data to present/take with you), we built out an MVP around bookmarking that took way, *way* too long.

Then we released it when it felt "incomplete" and didn't address a particular question, because we had been moving slower than we'd hoped, and felt that we needed to put *something* out.

> I think, at a high level, our MVP took so much time because we really thought of it as a "product". It needed polish, integration, and completeness to stand up at all to something like Foursquare. Otherwise, we reasoned (I think correctly), that an interview would simply result in a vocalized or implied "Umm... I think I'd rather use my Notes app."

As much as we'd tried to pair it down, our MVP wasn't particularly minimal:

- It involved a "bucket" of bookmarked places, visible on an interactive world map.
- It included a separate, conflicting place-organizing system of named "plans" (aka lists), and a preliminary system for ordering them and attaching plan-specific booking details.
- It was integrated into the Foursquare API, so that users could immediately search for and bookmark places.
- It included a bookmarklet scraping tool designed to grab an unlimited number of place recommendations from almost any web source.

 > This was in response to a number of conversations we'd had suggesting that "ease-of-import" might a significant barrier to use. This may have been right, but it was, at any rate, extremely premature.

- It involved a "completion" backend that would take unreliable information (mostly from our scraper), and turn it into rich data by triangulating between a series of APIs.
- It was integrated into a Geolocation API, so that places could be grouped/searched for by canonical locations.
- It was built off of a homemade Angular ORM that interfaced predictably through an internal API with the Rails backend.
- It involved flashy JavaScript galore.

 > This tied into our desire for something "magical" that would draw/keep users in a fiercely competitive landscape where we didn't, fundamentally, have much of a conceptual distinction from some of our peers. In this, we looked towards apps like Instagram, that seemed to separate themselves from peers by dint of UI magic.

- It was built around edge-cases, because our seed data (largely in Japan and other foreign countries) required us to consider transliteration, places with multiple names, address rabbit-holes, and more.

It also got a lot of confused feedback, and not the kind that was helpful for sussing out whether or not it solved the problem (or whether the problem was a problem at all). We got a lot of "What am I looking at" type questions, which led to explanations, which led to (premature) concerns about UI and, shortly, to another pivot.


## "Pivot" Number Two

What most users found confusing was the "blank slate" nature of the app. They showed up, and didn't know what to do with the search/addition box. What did we want from them?

> Incidentally, this, itself, speaks to the (lack of) urgency for the problem. Most of our users weren't ready for (or excited about) the concept of a straight-up bookmarking tool, even if we'd talked to them about it before.

After one or two interviews specifically about this confusion, we decided that the solution was to get rid of the blank slate by providing content. Of course, this pulled us dangerously close to Yelp or Foursquare, so we decided to provide differential content. We would double down on the fundamental value of bookmarking -- the storage and sharing of social recommendations -- by trying to build high-quality, mostly social content into the platform.

Gone was the bookmarking, except as a step towards or result of on-platform sharing. Gone was the detailed itinerary ordering. Instead, we conceived of an intuitive platform for following recommenders (friends or expert sources), bookmarking their suggestions in various locations, and then, eventually, downloading (non-ordered) location-packs of customized recommendations to access when traveling offline.

> Again, we conceived of this as the logical next step, but we didn't validate it with sufficient user feedback before launching into coding it.

This next step involved more technical hurdles:

- Building and maintaining a social graph, from Facebook and Gmail, to allow people to find friends to follow.
- Solving the "cold start" problem by seeding our database with quality recommendations -- and building scrapers/data "completers" to grab and round out that data.
- Revamping our maps (the most technically gnarly portion of the app) to support a plan-centric application.
- (Unnecessarily) turning our app into an SPA (single-page application) built on Angular to make the user-flow smoother (because of our aforementioned UI "magic" hypotheses).

> In retrospect, building an SPA was both a premature time sink and a distraction. It made us feel better about the app -- which looked smoother -- in a way that potentially hid from us its structural flaws.

- Testing and building out user flows for adding recommendations easily (and in bulk), to increase the likelihood of getting recommendations.

We dutifully launched into these technical hurdles, putting together a feature list, project timeline, and management system focused around turning out *pieces* of a broader whole (to be unveiled later). Instead, we should have focused on testable hypotheses and questions that would have helped us first determine whether our conceptualized solution solved the/a problem, and how it fell short.

> The "problem" (if it ever existed), became replaced with a cluster of features flowing around a "full cycle" of usage, which started to assume a sort of self-justifying, hermetic end unto itself -- independent of a clear problem, a real life usage moment, or an identifiable user who would find us or ask for our app.


## Existential crisis

Around this point -- buried in features and technologies, without an app that we felt good about or that any of our users was really excited by -- Niko and I became (more) aware (than before) that our startup was in a significant existential crisis.

We found ourselves in a position of betting -- with little evidence -- that our app would be valuable if it reached a certain far-away point. That point lay at the other end of much money and time. And looking back, we saw a large amount of time (and monetary opportunity) spent in a potential waste based on insufficiently validated hypotheses.


### Searching for late validation

Niko and I felt fundamentally unvalidated, and seriously concerned that we'd wasted months of our lives and potential income on something without making sure that anyone wanted it. We were close to dropping the idea.

But at the same time, I felt we were really close to an idea that would be, well, cool.

The idea was a simple mobile platform for subscribing to friends' recommendations, browsing through the recs of those you're following, bookmarking the places you want to go to, and then carrying location-based packs of these bookmarks offline.

This version would require a mobile app (which could tie into our Rails data backend, saving *some* of our work). And a mobile app would require hiring someone for in the realm of $50,000 and a number of months.

> We'd avoided mobile precisely because we didn't know the tech ourselves. This went against a fair amount of user feedback, and, in the end, I think represents an undervaluation of our time relative to our money (particularly considering previous job wages).

We were willing to spend the money and time -- *if we validated that the solution was something people were really excited about.*

We acknowledged that our fundamental question -- do people crave a tool to help them organize friends' recommendations and take them traveling -- remained unanswered. But I harbored a belief (well, a hope) that we could methodically interview around a specific solution to that problem, and if that solution generated sufficient excitement and commitment, we'd transitively validate our whole concept.

So out we went, to find our potential users and get their feedback on a specific solution to a problem they may or may not have.


### Defining and finding our users

We'd hardly stopped to define our prototypical user, more or less just assuming the market existed and that the friends we interviewed were representative and, for now, sufficient. Insofar as we did define a user, we did so in a way that skirted the question of how we could reproduce-ably identify or reach them.

> For a long time, Niko and I assumed that because we were building a social app, if we made it awesome and simplified sharing as much as possible, we wouldn't have to find or sell to a market.

We'd felt that our friend feedback was potentially unreliable, and so we went looking for strangers in our demographic. But we shortly realized that the demographic -- travel-planners-who-regularly-engage-in-leisure-travel-abroad-lasting-more-than-5-days -- was not one we could easily locate. This was a problem not just for marketing down the road (unless our virality dreams were perfectly realized), but also for interviewing, right now.

> We resisted even this realization for some time -- arguing to ourselves that apps like Instagram didn't have clear customer channels, and could rightly rely on app quality and virality for growth.

We were searching for validation, but didn't know whose validation to trust -- and whose dismissal it was safe to dismiss.

>As we started sinking into existential mode, this lack of a "channel" to customers became one of the central shortcomings of our idea.

We hadn't taken the time to research and define an "early adopter" demographic early on. Now we found ourselves unable to reach a clear "binary" on our hypotheses for lack of people to talk to who we knew were within our market.

Instead, we conducted a series of interviews with complete strangers in a touristy area. We briefly discussed our concept of the problem, got varying levels of agreement, and then rolled onto a visually-aided discussion of our mobile solution, using a series of mockups.

And we got just the same sort of feedback that had set us off coding in the first place:

- "That's a really cool idea."

- "I think I might use that!"

- "Cool! I'd really like it if it did this."

It was friendly feedback, and it was maybe 70% positive. But it never arrived anywhere near a clear statement that the value we considered adding was something people really *would* use, that was solving problems they *really* had. Again, we couldn't tell if the positive feedback we got was just some combination of human friendliness and how much people enjoyed being asked for their opinions on apps.

To top it all off, Niko and I realized that the question we were asking -- in effect, "Would you use this?" -- wasn't addressing the riskiest part of the model: "Was it feasible?" In particular, the app vision relied on an expectation that users would enter their recommendations into our app and would use our app to request recommendations from friends.

Given the extraordinary noise of the space, and people's comfort with email as a solution, these were huge assumptions. Unless we tested them out, a "that's cool" response from a handful of strangers was far short of a green light.

So we had a faint, blinking, partly visible greenish half-light to go by, but a bunch of show-stopping logistical questions that we needed answering to move on. Moreover, we hadn't solved the "user channel" problem at all, and our costs going forward were now both temporal and directly monetary.

> We'd potentially wasted too much time on the app to take those sorts of risks.


## Hail Mary

As a last-ditch effort, Niko and I decided to look for a paying customer base that was more easily identifiable and could, through money, offer us more unequivocal feedback on our ideas and progress.

We landed on hotel concierges, who, we figured, give recommendations all the time, and might appreciate a tool to simplify repeatable recommendations and serve as a starting point for getting users on the app to give and take recs.

This time, we weren't going to make the mistake of showing a solution and receiving equivocal feedback. We wanted to try something different: Show up to interviews with a blank slate, and simply ask the concierges what their job was like, what was frustrating, and how we could help them.

We had a handful of conversations over a single day, and they nailed the coffin shut -- not only because this latest hypothesis seemed largely invalidated, but, more importantly, because these interviews discounted nearly all of our previous positive feedback.

Specifically, we heard a variant of this from several different concierges (all, mind you, strangers):

> "That's a great idea!"

The problem? We'd just asked them about their jobs and said we were thinking about building an app to help concierges. We hadn't shared an idea at all.

So, 9 months down, with far too much time sunk into an app with insufficient and now questioned user validation, and no clear path to move forward (particularly without significant risk), we decided to put PlanIt aside. It was time to look back constructively, and figure out how to avoid all these problems in the next round.

Over the coming weeks, we'll be digging into many of the above issues and questions in more detail and with more of a forward-looking frame. Stay tuned.
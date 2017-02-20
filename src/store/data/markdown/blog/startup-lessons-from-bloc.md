I recently wrapped up two weeks of contract work for <a href="http://sashafklein.com#bloc">Bloc</a>, the company with which I took my first real steps into Ruby on Rails development. The experience was an interesting and highly educational one, and in light of my belief that writing things down is one of the best way to internalize them, I'm going to highlight some of the most important things I learned at Bloc in a short post.

Perhaps the most practical coding lesson I learned at Bloc is that optimization and best practices really matter in coding, and that specific or "hacky" solutions may be impressive or fun, but they usually mean compromised performance and much more work down the line. Choosing and adhering to a mental framework to consistently apply to your coding (such as <a href="http://en.wikipedia.org/wiki/model-view-controller">MVC</a> thinking), means writing code that is automatically internally consistent, and, wherever possible, doesn't reinvent the wheel.

Take for example the "dashboard" we were working on. Without getting into proprietary detail, the dashboard was to be a place where a variety of notification types represented by an even larger number of interrelated models were to be simply displayed in a consolidated table, sort of like an email inbox, where all the items were presented and could be dealt with similarly.

A coder aiming to solve this problem as quickly as possible might be tempted to hack something ugly together and shove most of the code into the controller and view -- something like this (which I'm not even sure would work):

```ruby
# dashboard_controller.rb
@user = User.find(params[:id])

# Only messages RECEIVED by @user, not those sent by him/her
@messages = Message.where(:user_id => @user.id).reject{ |m| m.conversation.users.first == @user }
@appointments = Appointment.where(:mentor_id => @user.id).where(:past => false)
@etc = SomethingElse.where(:selection_attribute => 'different')

@notifications = (@messages + @appointments + @etc).order('created_at DESC')

```

```haml
# dashboard.html.haml
- @notifications.each do |n|
    - if n.notification_type == "Message"
        %tr
            %td
                = link_to n.subject, n.thread
            %td
                %small #{n.content[0,25]}...
    - if n.notification_type == "Etc"

        # You get the picture.

```

This is (maybe) faster at first, but it quickly gets absurd (and it's ugly and prone to error from the get-go): What if you want to display different icons for each notification type? What if you want messages sorted by created-by date and appointments by when they're added to the dashboard, based on how far away they are? What if you simply don't want to have to comb through 50 lines of if statements accomodating variations in nomenclature (messages have "bodies" and their associated conversations have "subjects", let's say, but appointments have "topics" and "times", or chats have "notes")?

The answer is to embrace the framework you're dealing with and push as much of the code as possible into the individual models, then sort through the calls to those models in a singular other place (like, say, a Dashboard model) so that you can call "message.subject" and "appointment.subject", or, simply, in the above, "n.subject", or even "n.subtitle" or "n.icon", without having to hash out all the alternatives in the view. Now, if I decide to add a display reading out whether a notification has been deleted, it involves adding a single line in the view, and a single method in a Dashboard model that deals with the interfaces between all the notification types:

```haml
# good_dashboard.html.haml
- @notifications.each do |n|
        %tr
            %td
                = image_tag url("#{n.icon}")
            %td
                = link_to n.subject, n
            %td
                %small #{n.subtitle}...
            %td
                = n.completion_status

```

That's it. The functional bulk of that view (simpler controller and "fatter" model implied). Easy to understand, easy to change, fast running, and consistent with my expectations, so when I return to it two months later, I don't have to scratch my head to figure out what I was thinking.

Another key lesson learned over the two weeks was to take control of the specificity of your work flow. Never spend time optimizing for a specific situation **a)** before the general case is figured out, and **b)** before you're sure that specific solution is the ideal one. There are always coding problems that can absorb your time and energies, and prioritizing those that maximize creation while minimizing the risk of wasting time on something you'll rework anyway is a key skill.

This is something I know from writing countless papers in college -- that as pleasant as writing is compared to brainstorming, it's imperative for your time and sanity not to launch into a paper only to toss it aside and start anew 8 pages in. In coding, this is even trickier, because coming up with specific solutions is often more fun than thinking through general problems, and because these specific solutions can often obscure the right general approach, particularly once you become attached to them. When you get engrossed enough in the trees, you start to forget that you're not supposed to be in that forest anyway.

The key is just to prioritize -- lay down enough of the essential bricks before worrying about any of the wall paper -- so that when you do address specific solutions, they're fitted to the problems at hand. Never (ever) bother much with CSS until you've created a sturdy skeleton of functionality. And never narrow functionality down prematurely.

Probably the last major lesson I picked up at Bloc was one I continue to learn every day that I code: That there's just a ton to know out there, and however much I think I've improved and learned over the last ~6 months, I've got infinite tons more ahead of me. The world of computers is dense, wide, and constantly expanding, and it's a very full time job to keep up.

Luckily, it's a rewarding job as well.
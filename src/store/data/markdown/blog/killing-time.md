Coding with time (scheduling paychecks, appointments, and course launches for Bloc) has been driving me nuts recently, so I figured I should make it a little easier on myself while killing time on a plane.

Dealing with time is tough for a couple reasons -- even with all the incredible time functionality Ruby has baked in. The first is time's specificity. It may be obvious, but it bears being made explicit: The time taken now is different from time taken a fraction of a second from now. Because computers calculate time so specifically, if two objects are saved to the database 'concurrently' but really within a few milliseconds of one another, they won't be read as concurrent when you compare their created_at times.

**console**

```
irb(main):001:0> a = Time.now
=> 2013-09-18 21:08:07 -0700
irb(main):002:0> b = Time.now
=> 2013-09-18 21:08:07 -0700
irb(main):003:0> a == b
=> false
```

Then there's the time zone business. If a user in China types `Date.today` and I type `Date.today`, odds are pretty much 50-50 that we'll come up with different dates. Yes, that's the way it should work, but it doesn't make it easy to, say, synchronize the presentation and functionality associated with the start date for an online web-dev course.

Ruby throws in some weird wrinkles of its own, including this gem of what feels like a bug but may have a fair explanation out there:

**console**

```
irb(main):032:0> DateTime.now.beginning_of_day
=> Wed, 18 Sep 2013 00:00:00 -0700
irb(main):033:0> Time.now.beginning_of_day
=> 2013-09-18 00:00:00 -0700
irb(main):034:0> Date.today.to_datetime
=> Wed, 18 Sep 2013 00:00:00 +0000
```

Yup. That plus/minus business is time zone. Meaning that when I start with a Date object, and convert it to a DateTime object, it reasonably sets that object at the beginning of the day, but *unreasonably* (in my opinion), automatically sets its time zone to UTC, while both DateTime and Time objects default to the user's time zone (or the program's best guess).

So if I want to see if a given time is on a given date, it's unexpectedly complicated:

**console**

```
irb(main):036:0> DateTime.now.beginning_of_day == Date.today.to_datetime
=> false
irb(main):037:0> DateTime.now.zone
=> "-07:00"
irb(main):038:0> Date.today.to_datetime.zone
=> "+00:00"
irb(main):039:0> see_what_im_talking_about
=> "This gets complicated quickly!"
```

Sure. A lot of this is rooted in the unavoidable relatively of time. But much of it also has to do with some surprising decisions and defaults in Ruby, and with how blunt and unintuitive mathematical operators are as tools for comparing times.

Take, for example, these potential methods:

**time.rb**

```ruby
  class Time
    def happened_on?(date)
      # Auto-converting to UTC doesn't really make sense
      # as a general policy, but given the above Date issue...
      self.utc > date.beginning_of_day && self.utc < date.end_of_day
    end
  end
```

Putting aside the brittleness of a time method that can only take a Date object as input (without behaving *differently*, not breaking), this is additionally problematic because the language of the code is, well, super unintuitive for Ruby. Or take this just barely more complicated example (still a pleasant one-liner):

**student.rb**

```ruby
  class Student
    def studying_during?(datetime)
      course.start_date <= datetime && course.start_date + length_in_weeks.weeks >= datetime
    end
  end
```

I don't know about you, but every time I see "`time_a` >= `time_b`" or whatever, my head goes completely blank for a few seconds before it (only sort-of) clicks.

Ideally, dealing with time should involve as little of this unnecessary head scratching as possible, so, as an exercise for [ToDone](http://www.todone.us), which will shortly be incorporating "time-release" todo items, I created a TimeMethods module that makes my dealings with Time, in all its classes, a little more pleasant.

Please feel free to copy/adapt if you agree that time could use a little help.

**lib/ext/time_methods.rb**

```ruby
module TimeMethods

  module ClassMethods
    def utc_beginning_of_day
      DateTime.now.beginning_of_day.utc.beginning_of_day
    end

    def utc_day(western_date_string = nil) # eg, 12/24/2013
      # The methods on this line are extensions of String, and ensure correct format
      return self.utc_beginning_of_day unless western_date_string.present? && western_date_string.is_three_part_date?
      month, day, year = western_date_string.split('/').map(&:to_i)
      DateTime.new(year, month, day)
    end
  end

  def self.included(base)
    base.extend ClassMethods
  end

  # All class temporarily convert to datetime in UTC for comparison

  def after?(time)
    self.convert > time.convert
  end

  def before?(time)
    self.convert < time.convert
  end

  def on_or_after?(time)
    self.convert >= time.convert
  end

  def on_or_before?(time)
    self.convert <= time.convert
  end

  def strictly_between?(time_a, time_b)
    self.convert > time_a.convert && self.convert < time_b.convert
  end

  def inclusively_between?(time_a, time_b)
    self.convert >= time_a.convert && self.convert <= time_b.convert
  end

  def convert
    to_datetime.utc
  end
end
```

Then just include it like so:

**lib/ext/date.rb**

```ruby
class Date
  require_relative './time_methods'
  include TimeMethods

  # Date-specific methods here.
  def self.today_as_a_string
    today.strftime("%B %d, %Y")
  end
end
```

And, finally, by way of explaining what is already probably pretty transparent behavior, here are the specs that test this all out:

**spec/lib/time_methods_spec.rb**

```ruby
require 'spec_helper'

describe TimeMethods do
  describe "#convert" do
    it "converts a date, time, or datetime object to datetime in UTC" do
      time_array = [Date.today, Time.now.beginning_of_day, DateTime.now.beginning_of_day]
      time_array.each do |time|
        converted = time.convert
        converted.class.should == DateTime
        converted.zone.should == "+00:00" # UTC Time Zone
      end
    end
  end

  describe ".utc_beginning_of_day" do
    it "takes all time objects and returns identical utc datetime" do
      time_array = [Date, Time, DateTime]
      new_array = time_array.map{ |time_class| time_class.utc_beginning_of_day }
      new_array.all?{ |time| time == new_array[0] }.should be_true
    end
  end

  describe '#utc_day' do
    context 'with "western date string" argument, ("12/24/2013")' do
      it "returns the beginning of that day in UTC datetime" do
        by_date     = Date.utc_day('12/24/2013')
        by_time     = Time.utc_day('12/24/2014')

        by_date.class.should == DateTime
        by_time.zone.should == '+00:00'

        (by_time - by_date).to_i == 365 # days
      end
    end

    context "without an arugment" do
      it "just returns the utc_beginning_of_day" do
        Date.utc_beginning_of_day.should == Time.utc_day
      end
    end
  end

  describe "one-to-one comparison methods" do
    context "with different time classes" do
      it "returns a bool giving correct relation" do
        a = Time.now - 1.minute
        b = DateTime.now
        a.before?(b).should be_true
        a.after?(b).should be_false
      end

      it "does not validate identical times unless specififed" do
        a = Time.utc_beginning_of_day
        b = Date.utc_beginning_of_day
        a.before?(b).should be_false
        b.after?(a).should be_false
      end

      it 'does validate identical times when specified' do
        a = Time.utc_beginning_of_day
        b = Date.utc_beginning_of_day
        c = DateTime.utc_beginning_of_day.tomorrow

        a.on_or_before?(b).should be_true
        a.on_or_after?(b).should be_true

        a.on_or_after?(c).should be_false
        a.on_or_before?(c).should be_true
      end
    end
  end

  describe "between methods" do
    it "returns a bool giving the correct relation" do
      yesterday = Time.utc_beginning_of_day - 1.day
      today = Date.utc_beginning_of_day
      tomorrow = DateTime.utc_beginning_of_day.tomorrow

      today.strictly_between?(yesterday, tomorrow).should be_true
      yesterday.strictly_between?(today, tomorrow).should be_false
    end

    it "does not ordinarily accomodate equality" do
      today = Time.utc_beginning_of_day
      also_today = Date.utc_beginning_of_day
      tomorrow = DateTime.utc_beginning_of_day.tomorrow

      today.strictly_between?(also_today, tomorrow).should be_false
      today.inclusively_between?(also_today, tomorrow).should be_true
    end
  end

end
```

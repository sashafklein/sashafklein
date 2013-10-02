require 'spec_helper'

describe "Contact email:" do

	subject { page }

	before { visit new_email_path }

	describe "Valid email - go to root" do
		it "should send a message if filled out correctly" do
			current_path.should eq(new_email_path)
			Email.destroy_all
			assert Email.count == 0, "Real count: #{Email.count}"

			# Sending an email saves a model object
	    fill_in "Your email address:", with: "test@fake.com"
	    fill_in "Your name:", with: "Fake Name"
	    fill_in "Subject:", with: "Fake subject"
	    fill_in "Your message:", with: "Hi!"
	    fill_in "captcha", with: "21261"
	    click_on "Send"
	    assert Email.count == 1, "Real count: #{Email.count}"

	    # Redirects to resume with banner
			current_path.should eq(resume_path)
			page.should have_selector '.alert', text: "Your email has sent! I'll try to get back to you shortly."

			# Correct email actually sends
			sent = ActionMailer::Base.deliveries.last
			assert sent.present?
			assert sent.subject == "**SFK** - Fake subject"
			sent.body.should include("Hi!")
		end	
	end

	describe "Invalid content / valid captcha - refresh with highlight flash" do
		
		before do 
			fill_in "captcha", with: "21261"
			click_on "Send"
		end

		# current_path.should eq(contact_path)
		it { should have_selector 'title', text: full_title('Get in touch') }
		it { should have_selector '.alert', text: "Please correct the highlighted errors and try again." }
	end

	describe "Invalid captcha" do
		it "should refresh with math captcha" do 
			email = FactoryGirl.create(:email)

			fill_in "Your email address:", with: email.address
	    fill_in "Your name:", with: email.name
	    fill_in "Subject:", with: email.subject
	    fill_in "Your message:", with: email.content
			click_on "Send"

			# current_path.should eq(contact_path)
			page.should have_selector 'title', text: full_title('Get in touch')
			page.should have_selector '.alert', text: "Please make sure you answered the math question correctly."
		end
	end

end

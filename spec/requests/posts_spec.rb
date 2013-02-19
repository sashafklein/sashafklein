require 'spec_helper'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'

describe "Posts" do

  subject { page }

  describe "Unauthorized post attempt - " do
    
    it "should redirect to root path" do
      visit new_post_path
      current_path.should eq(root_path)
      page.should have_selector('.alert', text: "Not authorized")
    end

  end

  describe "Valid post submission - " do

    it "should log in a user and redirect to new post" do
      User.destroy_all
      visit '/access'
      user = FactoryGirl.create(:user)
      fill_in "sessions_name", with: "guest"
      fill_in "password", with: "pwordtest"
      screenshot_and_save_page
      click_on "Log In"
      assert User.count == 1
      current_path.should eq(new_post_path) 

      Post.destroy_all
      fill_in :post_name, with: "Post Name Here"
      fill_in :post_content, with: "This is the content of a really short post."

      # Take screenshot for debugging
      screenshot_and_save_page

      click_on "Post It"
      # Test for title of post?
      page.should have_selector('.alert', text: "Post was successfully created.")
      # page.should have_selector('title', text: "Sasha Klein | Post Name Here")

    end
  	
  end
end

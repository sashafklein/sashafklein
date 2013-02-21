require 'spec_helper'

describe "Posts" do

  subject { page }

  describe "Unauthorized post attempt -" do
    
    it "should redirect to root path" do
      visit new_post_path
      current_path.should eq(root_path)
      page.should have_selector('.alert', text: "Not authorized")
    end

  end

  describe "Invalid post -" do
    before do
      # Sign in
      User.destroy_all
      visit '/access'
      user = FactoryGirl.create(:user)
      fill_in "sessions_name", with: "guest"
      fill_in "password", with: "pwordtest"
      click_on "Log In"
      assert User.count == 1
      current_path.should eq(new_post_path) 
    end

    it "should refresh with error if name empty" do
      # Make an incomplete blogpost
      Post.destroy_all
      fill_in :post_name, with: ""
      fill_in :post_content, with: "This is the content of a really short post."
      click_on "Post It"

      page.should have_selector 'h2', text: "prohibited this post from being saved:"
    end

    it "should refresh with error if content empty" do
      # Make an incomplete blogpost
      Post.destroy_all
      fill_in :post_name, with: "Post Name Here"
      fill_in :post_content, with: ""
      click_on "Post It"

      page.should have_selector 'h2', text: "prohibited this post from being saved:"
    end
  end

  describe "Valid post submission --" do

    it "should log in a user and redirect to new post" do

      # Sign in
      User.destroy_all
      visit '/access'
      user = FactoryGirl.create(:user)
      fill_in "sessions_name", with: "guest"
      fill_in "password", with: "pwordtest"
      click_on "Log In"
      assert User.count == 1
      current_path.should eq(new_post_path) 

      # Make a blogpost
      Post.destroy_all
      fill_in :post_name, with: "Post Name Here"
      fill_in :post_content, with: "This is the content of a really short post."
      click_on "Post It"
        # Test for title h1 of post?
      page.should have_selector('.alert', text: "Post was successfully created.")
        # page.should have_selector 'title', text: full_title('Post Name Here')

    end
  	
  end
end

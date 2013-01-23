require 'spec_helper'

describe "Static pages" do

  describe "Home page" do

    it "should have the content 'Greeting'" do
      visit '/statics/about'
      page.should have_content('coding project')
    end
  end
end
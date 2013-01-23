require 'spec_helper'

describe "Static pages" do

	subject { page }

  describe "Home page" do
    before { visit root_path } 

    it { should have_selector('h1', text: 'Well, hi there!') }
    it { should have_selector 'title', text: "Sasha Klein | Welcome" }
  end

  describe "Resume page" do
  	before { visit resume_path }
  	
  	it { should have_selector('h1', text: 'Skills') }
  	it { should have_selector('h2', text: 'Bloc') }
  	it { should have_selector 'title', text: "Sasha Klein | Resume" }
  end 

  describe "Portfolio page" do 
  	before { visit portfolio_path }

  	it { should have_content('MeatUp') }
  	it { should have_content('Chengdu Chicken') }
  	it { should have_selector 'title', text: "Sasha Klein | Web Portfolio" }
  end

end
require 'spec_helper'

describe "Static pages" do

	subject { page }

  describe "Home page (resume)" do
  	before do  
     visit root_path
    end
  	
  	it { should have_selector('h1', text: 'Skills') }
  	it { should have_selector('h2', text: 'Bloc') }
  	it { should have_selector 'title', text: "Sasha Klein | Resume" }
    it { should have_selector 'td', text: 'Ruby-on-Rails'}
  end 

  describe "Portfolio page" do 
  	before { visit portfolio_path }

  	it { should have_content('MeatUp') }
  	it { should have_content('The Shang Low') }
  	it { should have_selector 'title', text: full_title('Web Portfolio') }
  end

end
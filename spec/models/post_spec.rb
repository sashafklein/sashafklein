# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  slug       :string(255)
#

require 'spec_helper'

describe Post do

	it { should respond_to(:name) }
  it { should respond_to(:content) }

	before do
    @post = Post.new(name: "Example Post", content: "Content of example post.")
  end

  describe "Unnamed posts get rejected" do
  	before do 
  		@post.name = ""
  	end

  	it { should_not be_valid }
  end

  describe "Content-less posts get rejected" do
  	before do 
  		@post.content = ""
  	end

  	it { should_not be_valid }
  end
  
end

require 'spec_helper'

describe User do
  it "should authenticate a user" do
  	user = FactoryGirl.create(:user)
  	assert user.authenticate("pwordtest"), "#{user.name}, #{user.password}"
  end
end

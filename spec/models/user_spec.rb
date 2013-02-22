# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  password_digest :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'spec_helper'

describe User do
  it "should authenticate a user" do
  	user = FactoryGirl.create(:user)
  	assert user.authenticate("pwordtest"), "#{user.name}, #{user.password}"
  end
end

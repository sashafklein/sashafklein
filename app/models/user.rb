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

class User < ActiveRecord::Base
  attr_accessible :name, :password, :password_confirmation
  has_secure_password

  validates :name, uniqueness: {case_sensitive: false}

  def parsed
    {
      name: name
    }
  end
end

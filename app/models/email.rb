# == Schema Information
#
# Table name: emails
#
#  id         :integer          not null, primary key
#  subject    :string(255)
#  content    :string(255)
#  name       :string(255)
#  address    :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Email < ActiveRecord::Base
  attr_accessible :address, :content, :name, :subject

  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :address, presence:   true,
                    format:     { with: VALID_EMAIL_REGEX }
  validates :subject, presence: true
  validates :content, presence: true
end

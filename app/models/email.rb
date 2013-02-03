class Email < ActiveRecord::Base
  attr_accessible :address, :content, :name, :subject

  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :address, presence:   true,
                    format:     { with: VALID_EMAIL_REGEX }
  validates :subject, presence: true
  validates :content, presence: true
end

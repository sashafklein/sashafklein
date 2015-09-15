class Wiki < ActiveRecord::Base
  has_many :topics
  accepts_nested_attributes_for :topics, :allow_destroy => true
end

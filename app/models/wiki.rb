class Wiki < ActiveRecord::Base
  attr_accessible :topics_attributes, :notes_attributes
  has_many :topics
  accepts_nested_attributes_for :topics, :allow_destroy => true
end

class Topic < ActiveRecord::Base
  attr_accessible :name, :notes_attributes, :wiki_id
  has_many :notes
  belongs_to :wiki
  accepts_nested_attributes_for :notes, :allow_destroy => true
end

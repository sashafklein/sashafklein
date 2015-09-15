class Topic < ActiveRecord::Base
  has_many :notes
  belongs_to :wiki
  accepts_nested_attributes_for :notes, :allow_destroy => true
end

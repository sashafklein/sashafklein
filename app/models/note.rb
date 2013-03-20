class Note < ActiveRecord::Base
  attr_accessible :name, :info, :topic_id
  belongs_to :topic
end

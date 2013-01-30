class Email < ActiveRecord::Base
  attr_accessible :address, :content, :name, :subject
end

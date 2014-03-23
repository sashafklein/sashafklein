# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  slug       :string(255)
#

class Post < ActiveRecord::Base

require 'net/http'
require 'uri'

  attr_accessible :content, :name, :created_at, :example

  before_validation :generate_slug

  validates :name, presence: true, uniqueness: true
  validates :content, presence: true
  validates :slug, presence: true, uniqueness: true

  after_create :tweet!

  def self.find_by_slug_or_id(slug_or_id)
    is_id = slug_or_id.to_i != 0
    is_id ? find_by_id(slug_or_id.to_i) : find_by_slug(slug_or_id)
  end

  private

  def tweet!
    Tweet.new("New post on '#{name}'", slug).send_if_production!
  end

  def generate_slug
    new_name = self.name.gsub(/['`]/, "").parameterize
    self.slug ||= new_name
  end

  def to_param
    new_name = self.name.gsub(/['`]/, "")
    "#{id}-#{new_name}".parameterize
  end
end

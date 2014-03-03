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

  def to_param
    new_name = self.name.gsub(/['`]/, "")
    "#{id}-#{new_name}".parameterize
  end

  def generate_slug
    new_name = self.name.gsub(/['`]/, "").parameterize
    self.slug ||= new_name
  end

  def next
    all = Post.all
    current = all.index(self)
    if self == all.last
      return nil
    else
      all[current + 1]
    end
  end

  def prev
    all = Post.all
    current = all.index(self)
    if self == all.first
      return nil
    else
      all[current - 1]
    end
  end

  def tinyfy(link)
     url = URI.parse('http://tinyurl.com/')
     res = Net::HTTP.start(url.host, url.port) {|http|
     http.get('/api-create.php?url=' + link)
     }
     if res.body.empty?
        #tinyurl is not responding properly… Return the original url
        return link
     else
        return res.body
     end
  end

  def self.search(query)
    query ||=""
    terms = query.split.map{ |w| w.downcase }
    results = Post.all
    terms.each do |t|
      results.reject!{ |p| !p.name.downcase.include?(t) }
    end
    results
  end

  def self.find_by_slug_or_id(slug_or_id)
    is_id = slug_or_id.to_i != 0
    is_id ? find_by_id(slug_or_id.to_i) : find_by_slug(slug_or_id)
  end
end

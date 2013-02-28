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
  attr_accessible :content, :name

  before_validation :generate_slug

  validates :name, presence: true, uniqueness: true
  validates :content, presence: true
  validates :slug, presence: true, uniqueness: true

  def self.search(search)
    if search
      where('name LIKE ?', "%#{search}%")
    else
      scoped
    end
  end

  def to_param
    "#{id}-#{name}".parameterize
  end

  def generate_slug
    self.slug ||= name.parameterize
  end

  def next
    Post.find_by_id(self.id + 1)
  end

  def prev
    Post.find_by_id(self.id - 1) 
  end

end

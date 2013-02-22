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
  extend FriendlyId
  attr_accessible :content, :name

  validates :name, presence: true, uniqueness: true
  validates :content, presence: true
  validates :slug, presence: true

  friendly_id :name, use: :slugged

  # A function for finding all posts containing the searched-for term in their title
  def including(term)
  	searched = []
  	term.downcase!
  	Post.all.each do |p|
  		if p.name.downcase.include?(term)
  			searched << p
  		end
  	end
  	searched = Post.all unless !searched.empty?
  	searched
  end

  def self.search(search)
    if search
      where('name LIKE ?', "%#{search}%")
    else
      scoped
    end
  end

end

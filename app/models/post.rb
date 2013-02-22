class Post < ActiveRecord::Base
  attr_accessible :content, :name

  validates :name, presence: true, uniqueness: true
  validates :content, presence: true

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

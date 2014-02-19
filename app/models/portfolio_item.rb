class PortfolioItem < ActiveRecord::Base
  attr_accessible :title, :subtitle, :image, :link, :bullet_blob, :text_blob

  def bullets
    bullet_blob.split("\n")
  end

  def paragraphs
    text_blob.split("\n")
  end
end
class PortfolioItem < ActiveRecord::Base
  def bullets
    bullet_blob.split("\n")
  end

  def paragraphs
    text_blob.split("\n")
  end
end
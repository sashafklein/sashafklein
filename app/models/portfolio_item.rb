class PortfolioItem < ActiveRecord::Base

  scope :reversed, -> { order("portfolio_items.order DESC") }
  scope :ordered, -> { order('portfolio_items.order ASC') }

  def paragraphs
    text_blob.split("\n")
  end

  def bullets=(val)
    self[:bullets] = val.is_a?(String) ? val.split("\n") : val
  end

  def portfolio_path
    "/portfolio##{ title.parameterize }"
  end

  def link_path
    link || portfolio_path
  end

  def insert_before!(other_item)
    Reorder.new( PortfolioItem.all ).insert_a_before_b!(self, other_item)
  end
end
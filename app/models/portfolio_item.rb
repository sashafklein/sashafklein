class PortfolioItem < ActiveRecord::Base

  include MeFirst
  attr_orderable :order

  before_create { self.order = PortfolioItem.by_order.pluck(:order).last + 1 }

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

end
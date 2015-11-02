class PortfolioItemsController < RestfulItemController
  
  def index
    @items = PortfolioItem.order(order: :asc)
  end

  def open_attrs
    [:title, :subtitle, :text_blob, :bullets, :link, :image]
  end
end

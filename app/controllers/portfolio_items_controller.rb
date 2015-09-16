class PortfolioItemsController < RestfulItemController
  
  def index
    @items = PortfolioItem.all
  end

  def open_attrs
    [:title, :subtitle, :text_blob, :link, :bullet_blob]
  end
end

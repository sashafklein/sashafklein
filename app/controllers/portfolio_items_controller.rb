class PortfolioItemsController < RestfulItemController
  
  def index
    @items = PortfolioItem.order(order: :asc)
  end

  def open_attrs
    [
      :title, 
      :subtitle, 
      { text_blob: :text }, 
      { bullets: :text }, 
      :link, 
      :image
    ]
  end

end

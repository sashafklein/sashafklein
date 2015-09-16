class ResumeItemsController < RestfulItemController
  
  def index
    @items = ResumeItem.order(kind: :asc, order: :asc)
  end

  def open_attrs
    [:title, :subtitle, :description, :kind, :link, :starts_open]
  end
end

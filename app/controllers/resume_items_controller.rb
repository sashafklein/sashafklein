class ResumeItemsController < RestfulItemController
  
  def index
    @items = ResumeItem.order(kind: :asc)
  end

  def open_attrs
    [:title, :kind, :link, :starts_open]
  end
end

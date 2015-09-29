class RolesController < RestfulItemController
  
  def index
    @items = Role.order(started: :desc)
  end

  def open_attrs
    [:started, :ended, :name, :show_months, :description, :location, :resume_item_id]
  end
end

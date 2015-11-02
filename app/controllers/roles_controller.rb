class RolesController < RestfulItemController
  
  def index
    @items = Role.order(started: :desc)
  end

  def open_attrs
    [
      { started: :datetime }, 
      { ended: :datetime }, 
      :name, 
      { show_months: [true, false] }, 
      { description: :text }, 
      :location, 
      { resume_item_id: :id }
    ]
  end
end

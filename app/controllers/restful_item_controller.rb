class RestfulItemController < ApplicationController

  before_action :authorize
  before_action :load_item, except: [:index, :new, :create]

  def new
    @item = object_class.new
  end

  def create
    @item = object_class.new( item_params )
    @item.save!
    flash[:success]= "#{ name(@item) } saved!"
    redirect_to index_path
  end

  def update
    @item.update_attributes!( item_params )
    flash[:success] = "#{ name(@item) } updated!" 
    redirect_to index_path
  end

  def destroy
    @item.destroy!
    flash[:success] = "#{ name(@item) } destroyed!"
    redirect_to index_path
  end

  def edit
  end

  def object_class
    self.class.to_s.split("sController").first.constantize
  end

  def open_attr_keys
    open_attrs.map{ |a| a.is_a?(Hash) ? a.keys.first : a }
  end

  def open_attr_hash
    open_attrs.map do |a|
      a.is_a?(Hash) ? a : { a => :string }
    end
  end

  private

  def name(object)
    object.try(:title) || object.try(:name)
  end

  def load_item
    @item = object_class.find( params[:id] )
  end

  def singular
    object_class.to_s.underscore
  end

  def plural
    object_class.to_s.underscore.pluralize
  end

  def index_path
    send( "#{plural}_path" )
  end

  def item_params
    params.require(singular).permit( open_attr_keys )
  end

  def open_attrs
    raise StandardError.new("The open_attrs method must be defined in each inheriting controller!")
  end

end

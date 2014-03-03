class AddColumnExampleToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :example, :text
  end
end

class AddForeignKeysToTopicsAndNotes < ActiveRecord::Migration
  def change
  	add_column :topics, :wiki_id, :integer
  	add_column :notes, :topic_id, :integer
  end
end

class RemoveLegacyNotes < ActiveRecord::Migration
  def change
  	drop_table :specifics
  	drop_table :headers
  	drop_table :info
  	drop_table :subs
  end
end

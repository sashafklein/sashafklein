class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :subject
      t.string :content
      t.string :name
      t.string :address

      t.timestamps
    end
  end
end

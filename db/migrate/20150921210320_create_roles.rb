class CreateRoles < ActiveRecord::Migration
  def up
    create_table :roles do |t|
      t.datetime :started
      t.datetime :ended
      t.string :name
      t.boolean :show_months
      t.text :description
      t.string :location
      t.references :resume_item, index: true, foreign_key: true

      t.timestamps null: false
    end

    remove_column :resume_items, :description
    remove_column :resume_items, :subtitle
    remove_column :resume_items, :order

    ResumeItem.destroy_all

    array = YAML.load_file( File.join( 'lib', 'resume_stuff.yml' ) )
    
    array.each do |item|
      r = ResumeItem.create!(
        title: item['title'],
        kind: item['kind'],
        starts_open: item['starts_open'],
        link: item['link']
      )
      
      item['roles'].each do |role|
        r.roles.create!(
          name: role['name'],
          description: role['description'],
          location: role['location'],
          started: role['started'] ? DateTime.parse( role['started'] ) : nil,
          ended: role['ended'] ? DateTime.parse( role['ended'] ) : nil,
          show_months: role['show_months']
        )
      end
      
    end
  end

  def down
    add_column :resume_items, :description, :text
    add_column :resume_items, :subtitle, :string
    add_column :resume_items, :order, :integer

    drop_table :roles
  end
end

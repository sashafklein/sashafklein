class CreateSkills < ActiveRecord::Migration
  def change
    create_table :skills do |t|
      t.string :name
      t.string :tooltip
      t.integer :stars
      t.string :link
    end

    skillz = YAML.load_file( File.join( Rails.root, 'lib', 'skills.yml') )
    skillz.each { |s| Skill.create!(s) }
  end
end

class CreateSkills < ActiveRecord::Migration
  def change
    create_table :skills do |t|
      t.string :name
      t.string :tooltip
      t.integer :stars
      t.string :link
    end

    return unless File.exists?( skillz = File.join( Rails.root, 'lib', 'skills.yml') )
    YAML.load_file( skillz ).each { |s| Skill.create!(s) }
  end
end

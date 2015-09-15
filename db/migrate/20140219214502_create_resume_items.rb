class CreateResumeItems < ActiveRecord::Migration
  def change
    create_table :resume_items do |t|    
      t.string :title
      t.string :kind
      t.string :subtitle
      t.string :link
      t.boolean :starts_open, default: false
      t.text :description
    end

    if File.exists?( edu_file = File.join( Rails.root, 'lib', 'education.yml' ) )
      YAML.load_file( edu_file ).each{ |i| create_item(i, 'education') } 
    end

    if File.exists?( job_file = File.join( Rails.root, 'lib', 'jobs.yml' ) )
      YAML.load_file( job_file ).each{ |i| create_item(i, 'jobs') }
    end
  end

  def create_item(item, kind)
    ResumeItem.create!(
      kind: kind,
      title: item['title'],
      subtitle: item['subtitle'],
      link: item['link'],
      starts_open: item['starts_open'] || false,
      description: Array(item['paragraphs']).join("\n"),
    )
  end
end

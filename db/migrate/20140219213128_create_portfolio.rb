class CreatePortfolio < ActiveRecord::Migration
  def change
    create_table :portfolio_items do |t|
      t.string :title
      t.string :subtitle
      t.string :image
      t.string :link
      t.text :bullet_blob
      t.text :text_blob
    end

    yml_file = YAML.load_file( File.join( Rails.root, 'lib', 'portfolio.yml') )
    
    yml_file.each do |item|
      PortfolioItem.create!(
        title: item['title'],
        subtitle: item['subtitle'],
        image: item['image'],
        link: item['link'],
        bullet_blob: Array(item['bullets']).join("\n"),
        text_blob: Array(item['paragraphs']).join("\n")
      )
    end
  end
end

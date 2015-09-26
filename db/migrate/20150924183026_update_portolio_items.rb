class UpdatePortolioItems < ActiveRecord::Migration
  def up
    bullet_hash = {}
    PortfolioItem.find_each do |item|
      # Convert Anchor tags to markdown
      item.text_blob = item.text_blob.gsub(/\<a\ href\=(.[^\>]*)>(.[^<]*)<\/a>/) { "[#{ $2 }](#{ $1 })" }
      bullet_hash[item.id] = item.bullet_blob.to_s.split("\r\n").flatten.map{ |s| s.split("\n") }.flatten
      item.save!
    end

    remove_column :portfolio_items, :bullet_blob
    add_column :portfolio_items, :bullets, :text, array: true, default: []
    add_column :portfolio_items, :order, :integer

    PortfolioItem.reset_column_information

    # Convert bullets to array
    bullet_hash.each_pair do |id, array|
      item = PortfolioItem.find(id)
      item.order = id == 1 ? 1 : 5 # Meatup is second item; ShangLow is last
      item.bullets = array
      item.bullets_will_change!
      item.save!
    end

    new_items = YAML.load_file( File.join( 'lib', 'new_portfolio_items.yml') )
    new_items.each do |item|
      PortfolioItem.where(title: item[:title]).first_or_create!(item)
    end
  end

  def down
    bullet_hash = {}

    PortfolioItem.find_each do |i| 
      bullet_hash[i] = i.bullets.to_a.join("\r\n")
    end

    remove_column :portfolio_items, :bullets
    remove_column :portfolio_items, :order
    add_column :portfolio_items, :bullet_blob, :text

    bullet_hash.each do |id, blob|
      item = PortfolioItem.find(id)
      item.bullet_blob = blob
      item.save!
    end
  end
end

class AddColumnOrderToResumeItems < ActiveRecord::Migration
  def change
    add_column :resume_items, :order, :integer
    add_column :resume_items, :created_at, :datetime
    add_column :resume_items, :updated_at, :datetime

    ['Bloc', 'MeatUp', 'Dipont Education', 'Think Food Group', 'Coproduction Office', 'UN High Commissioner for Refugees', 'Il Vecchio Forno Restaurant'].each_with_index do |title, index|
      item = ResumeItem.jobs.find_by_title(title)
      item.update_attribute(:order, index + 1) if item
    end

    ['Bloc', 'Harvard University'].each_with_index do |title, index|
      item = ResumeItem.education.find_by_title(title)
      item.update_attribute(:order, index + 1) if item
    end
  end
end

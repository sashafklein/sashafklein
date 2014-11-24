class AddColumnOrderToResumeItems < ActiveRecord::Migration
  def change
    add_column :resume_items, :order, :integer
    add_column :resume_items, :created_at, :datetime
    add_column :resume_items, :updated_at, :datetime

    ['Bloc', 'MeatUp', 'Dipont Education', 'Think Food Group', 'Coproduction Office', 'UN High Commissioner for Refugees', 'Il Vecchio Forno Restaurant'].each_with_index do |title, index|
      ResumeItem.jobs.find_by_title(title).update_attribute(:order, index + 1)
    end

    ['Bloc', 'Harvard University'].each_with_index do |title, index|
      ResumeItem.education.find_by_title(title).update_attribute(:order, index + 1)
    end
  end
end

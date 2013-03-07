ThinkingSphinx::Index.define :post, :with => :active_record do
  indexes :name
  indexes content
end

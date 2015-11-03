class Reorder

  attr_accessor :relation, :origin, :target
  def initialize(relation)
    @relation = relation
  end

  def insert_a_before_b!(origin, target)
    insert_index = origin.order > target.order ? target.order : target.order - 1

    ActiveRecord::Base.transaction do 
      reordered = relation.where("id != ?", origin.id)
      reordered.to_a.insert(insert_index, origin)

      reordered.each_with_index do |item, index|
        item.update_attributes!({ order: index })
      end
    end
  end

end
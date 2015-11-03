class SkillsController < RestfulItemController

  def index
    @items = Skill.all
  end

  def open_attrs
    [
      :name, 
      :tooltip, 
      { stars: (1..7).to_a },
      :link
    ]
  end
end

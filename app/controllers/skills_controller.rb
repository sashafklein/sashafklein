class SkillsController < RestfulItemController

  def index
    @items = Skill.all
  end

  def open_attrs
    [:name, :tooltip, :stars]
  end
end

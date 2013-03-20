class WikisController < ApplicationController

	before_filter :authorize

  def show
    @wiki = Wiki.first
  end

  def edit
    @wiki = Wiki.first
  end

  def update
    @wiki = Wiki.find(params[:id])
    respond_to do |format|
      if @wiki.update_attributes(params[:wiki])
        format.html { redirect_to wikis_path, notice: 'Wiki was successfully updated.' }
        format.json { head :no_content }
      end
    end
  end

end

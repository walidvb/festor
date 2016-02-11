class StaticController < ApplicationController
  def gallery
  	@galleries = Asset.gallery.includes(:assetable).group_by(&:assetable_id)
  end

  def about
    @text = Setting.first.about
    @previous_editions = PreviousEdition.all
    render :about
  end

  def volunteers
    @iframe = Setting.first.volunteers
    render :volunteers
  end

  def tickets
    @tickets = Setting.first.tickets
    render :tickets
  end

end

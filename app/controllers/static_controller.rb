class StaticController < ApplicationController
  skip_before_filter :beta_only, only: [:tmp, :about]
  def gallery
  	@galleries = Asset.gallery.includes(:assetable).group_by(&:assetable_id)
  end

  def about
    @setting = Setting.first
    @text = @setting.try(:about) || "Add a setting in the admin"
    @previous_editions = PreviousEdition.all.order("edition DESC")
    render :about
  end

  def volunteers
    @iframe = Setting.first.volunteers
    render :volunteers
  end

  def tickets
    if id = params[:event_id].presence
      @tickets = Event.friendly.find(id).try(:tickets_link)
    end
    @tickets = @tickets || Setting.first.tickets
    render :tickets
  end

  def tmp
  end
end

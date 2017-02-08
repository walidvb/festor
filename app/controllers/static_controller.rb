class StaticController < ApplicationController
  skip_before_filter :beta_only, only: [:tmp]
  def gallery
  	@galleries = Asset.gallery.includes(:assetable).group_by(&:assetable_id)
  end

  def about
    @text = Setting.first.about
    @previous_editions = PreviousEdition.all.order("edition DESC")
    render :about
  end

  def volunteers
    @iframe = Setting.first.volunteers
    render :volunteers
  end

  def tickets
    if id = params[:event_id].presence || id = params[:workshop_id].presence || id = params[:exhibition_id].presence
      @tickets = Event.friendly.find(id).try(:tickets_link)
    else
      @tickets = params[:ticket_url].presence || Setting.first.tickets
    end
    render :tickets
  end

  def tmp
  end
end

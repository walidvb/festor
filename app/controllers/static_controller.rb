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

  def forum
    @videos = [
      "PYs_IeM1FD0",
      "zGN4dEq3O4c",
      "8JfX2Q51DWw",
      "H_MDSh1XQEM",
      "sIsJN5VtG8A",
      "DUVvXDPoulQ",
      "TQkMvguIrlU",
      "P6dw9Xj3mO0",
      "xLVyxr3O3XI",
      "YBHsqJ8jPdw",
    ]
  end
end

class LocationsController < ApplicationController
  def index
    @locations = Location.order('name ASC').includes(:events).all
    if !user_signed_in?
      @locations.select! do |loc|
        loc.events.map(&:is_workshop?).include?(true)
      end
    end
    @events = @locations.map(&:events).flatten
  end
end

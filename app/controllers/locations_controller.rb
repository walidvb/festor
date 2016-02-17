class LocationsController < ApplicationController
  def index
    @locations = Location.order('name ASC').includes(:events).all
    @events = @locations.map(&:events).flatten
    if !user_signed_in?
      @locations.select! do |loc|
        loc.events.map(&:is_workshop?).include?(true)
      end
      @events.select! do |ev|
        ev.is_workshop?
      end
    end
  end
end

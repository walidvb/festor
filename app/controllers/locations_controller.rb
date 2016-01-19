class LocationsController < ApplicationController
  def index
    @locations = Location.includes(:events).all
    @events = @locations.map(&:events).flatten
  end
end

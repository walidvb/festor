class LocationsController < ApplicationController
  def index
    @events = @locations.map(&:events).flatten
  end
end

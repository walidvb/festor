class LocationsController < ApplicationController
  def index
    @locations = Location.order('name ASC').includes(:events).all
    @events = @locations.map(&:events).flatten
    end
  end
end

class MappingFestivalController < ApplicationController
  def index
    @zone_festival = ZoneFestival.first
  end
end

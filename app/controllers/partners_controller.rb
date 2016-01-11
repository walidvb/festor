class PartnersController < ApplicationController
  def index
    @partners_type = Partner.all.group_by(&:type)
  end
end

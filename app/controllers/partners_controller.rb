class PartnersController < ApplicationController
  def index
    @partners_type = Partner.all.order(:created_at).group_by(&:type).sort_by do |type, values|
      Partner.type_enum.index(type.to_sym)
    end
  end
end

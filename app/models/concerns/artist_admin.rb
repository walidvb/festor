module ArtistAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      configure :translations, :globalize_tabs
      list do
        field :name
        field :profile_picture
      end
      configure :links do
        visible false
      end
      configure :slug do
        visible false
      end
      configure :bookings do
        visible false
      end
      configure :events do
        visible false
      end
      configure :locations do
        visible false
      end
    end
  end
end

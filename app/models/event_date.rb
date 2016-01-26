class EventDate < ActiveRecord::Base
  belongs_to :event, inverse_of: :event_dates

  validates_presence_of :event, :start

  rails_admin do
      field :start do
        # date_format "%d/%m/%Y %H:%M"
      end
      field :end
      field :event
  end
end

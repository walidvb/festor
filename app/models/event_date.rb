class EventDate < ActiveRecord::Base
  belongs_to :event

  validates_presence_of :event, :start
  
  rails_admin do
    field :start
    field :end
  end
end

class EventDate < ActiveRecord::Base
  belongs_to :dateable, inverse_of: :event_dates, class_name: 'Event'#, polymorphic: true
  has_many :artists, through: :dateable
  has_many :locations, through: :dateable
  validates_presence_of :dateable, :start

  default_scope { order('start') }


  def title
    "#{start.strftime("%B %m, %H:%M")}"
  end

  rails_admin do
      field :start do
        # date_format "%d/%m/%Y %H:%M"
      end
      field :end
      field :dateable do
        visible false
      end
  end
end

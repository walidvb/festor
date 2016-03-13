class EventDate < ActiveRecord::Base
  belongs_to :event, inverse_of: :event_dates, class_name: 'Event'
  has_many :artists, through: :event
  has_many :locations, through: :event
  validates_presence_of :event, :start
  before_save :set_event_date_type
	def set_event_date_type
		self.dateable_type = event.sup_category
	end
  default_scope { order('start') }


  def title
    "#{start.strftime("%B %m, %H:%M")}"
  end

  rails_admin do
      field :start do
        # date_format "%d/%m/%Y %H:%M"
      end
      field :end
      field :event do
        visible false
      end
  end
end

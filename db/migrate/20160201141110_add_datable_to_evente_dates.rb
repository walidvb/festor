class AddDatableToEventeDates < ActiveRecord::Migration
  def change
    add_column :event_dates, :dateable_type, :string
    rename_column :event_dates, :event_id, :dateable_id
  end
end

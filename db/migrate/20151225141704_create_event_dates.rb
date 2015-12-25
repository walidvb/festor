class CreateEventDates < ActiveRecord::Migration
  def change
    create_table :event_dates do |t|
      t.references :event, index: true
      t.timestamp	:start
      t.timestamp	:end
      t.timestamps
    end
  end
end

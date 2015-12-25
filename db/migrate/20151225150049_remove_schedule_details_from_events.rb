class RemoveScheduleDetailsFromEvents < ActiveRecord::Migration
  def change
    Event.all.each do |ee|
      EventDate.create!(
        start: ee.schedule_start,
        end: ee.schedule_end,
        event: ee)
    end

    remove_column :events, :schedule_start
    remove_column :events, :schedule_end
  end
end

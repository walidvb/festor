class RenameDateableType < ActiveRecord::Migration
  def change
    rename_column :event_dates, :dateable_id, :event_id
  end
end

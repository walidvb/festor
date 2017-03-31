class AddSyncingToZoneFestival < ActiveRecord::Migration
  def change
    add_column :zone_festivals, :syncing, :boolean
  end
end

class AddLockedToEvents < ActiveRecord::Migration
  def change
    add_column :events, :locked, :boolean
  end
end

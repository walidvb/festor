class RemoveTypeFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :type
  end
end

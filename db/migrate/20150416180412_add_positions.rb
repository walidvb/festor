class AddPositions < ActiveRecord::Migration
  def change
  	add_column :artists, :position, :integer
  	add_column :events, :position, :integer
  end
end

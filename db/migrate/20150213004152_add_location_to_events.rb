class AddLocationToEvents < ActiveRecord::Migration
  def change
    add_reference :events, :location, index: true
  end
end

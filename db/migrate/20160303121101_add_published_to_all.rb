class AddPublishedToAll < ActiveRecord::Migration
  def change
    add_column :events, :published, :boolean, default: false
    add_column :artists, :published, :boolean, default: false
  end
end

class AddLabelToArtist < ActiveRecord::Migration
  def change
    add_column :artists, :label, :string
    add_column :artists, :origin, :string
  end
end

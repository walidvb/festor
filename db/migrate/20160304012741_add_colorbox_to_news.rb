class AddColorboxToNews < ActiveRecord::Migration
  def change
    add_column :news, :colorbox, :boolean, default: false
  end
end

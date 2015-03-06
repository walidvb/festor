class AddPolyLinks < ActiveRecord::Migration
  def change
  	rename_column :links, :event_id, :linkable_id
  	add_column :links, :linkable_type, :string, index: true
  end
end

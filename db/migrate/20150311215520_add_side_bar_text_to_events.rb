class AddSideBarTextToEvents < ActiveRecord::Migration
  def change
  	add_column :event_translations, :sidebar_text, :text
  end
end

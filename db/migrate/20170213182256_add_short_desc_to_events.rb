class AddShortDescToEvents < ActiveRecord::Migration
  def change
    Event.add_translation_fields! short_description: :text
  end
end

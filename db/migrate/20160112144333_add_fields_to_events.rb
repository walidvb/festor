class AddFieldsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :price, :integer
    Event.add_translation_fields! participants: :string
    Event.add_translation_fields! languages: :string
    Event.add_translation_fields! requirements: :text
    Event.add_translation_fields! material: :text
    Event.add_translation_fields! notes: :text
  end
end

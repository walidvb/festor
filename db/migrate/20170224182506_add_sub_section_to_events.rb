class AddSubSectionToEvents < ActiveRecord::Migration
  def change
    Event.add_translation_fields! sub_section: :string
  end
end

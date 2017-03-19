class AddRegistrationToEvents < ActiveRecord::Migration
  def change
  	Event.add_translation_fields! registration: :text
  end
end

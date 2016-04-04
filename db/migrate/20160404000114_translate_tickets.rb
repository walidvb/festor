class TranslateTickets < ActiveRecord::Migration
  def change
    remove_column :settings, :tickets
    Setting.reset_column_information
    Setting.add_translation_fields! tickets: :string
  end
end

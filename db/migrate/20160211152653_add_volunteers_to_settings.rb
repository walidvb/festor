class AddVolunteersToSettings < ActiveRecord::Migration
  def change
    add_column :settings, :tickets, :string
    Setting.add_translation_fields! volunteers: :string
  end
end

class ChangeMessageBodyToText < ActiveRecord::Migration
  def change
    change_column :message_translations, :message, :text
  end
end

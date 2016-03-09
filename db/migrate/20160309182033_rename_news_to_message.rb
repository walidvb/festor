class RenameNewsToMessage < ActiveRecord::Migration
  def up
    rename_table :news, :messages
    rename_column :news_translations, :news_id, :message_id
    rename_table :news_translations, :message_translations
  end
  def down
    rename_table :messages, :news
    rename_column :message_translations, :message_id, :news_id
    rename_table :message_translations, :news_translations
  end
end

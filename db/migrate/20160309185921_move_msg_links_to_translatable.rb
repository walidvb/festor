class MoveMsgLinksToTranslatable < ActiveRecord::Migration
  def change
    Message.add_translation_fields! link: :string
    remove_column :messages, :link
  end
end

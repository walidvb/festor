class AddSlugToEventTranslations < ActiveRecord::Migration
  def change
    add_column :event_translations, :slug, :string
  end
end

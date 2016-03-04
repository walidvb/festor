class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.string :link

      t.timestamps
    end
    News.reset_column_information
    News.create_translation_table! message: :string
  end
end

class RenameOriginToCountryFromArtists < ActiveRecord::Migration
  def change
    rename_column :artists, :origin, :country
    rename_column :artists, :link, :website
    rename_column :events, :category, :section
    add_column :artists, :image_url, :string
    add_column :events, :image_url, :string
    [:artists, :events, :event_dates, :locations].each do |table|
      add_column table, :zf_id, :integer, index: true, uniq: true
    end
  end
end

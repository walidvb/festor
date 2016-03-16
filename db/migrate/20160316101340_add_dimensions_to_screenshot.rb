class AddDimensionsToScreenshot < ActiveRecord::Migration
  def change
    add_column :screenshots, :dimensions, :string
    Screenshot.reset_column_information
    Screenshot.all.map(&:save!)
  end
end

class AddCityToScreenshots < ActiveRecord::Migration
  def change
    add_column :screenshots, :city, :string
    add_column :screenshots, :name, :string
    add_column :screenshots, :user_agent, :string
  end
end

class AddAttachmentMainImageToEvents < ActiveRecord::Migration
  def self.up
    change_table :events do |t|
      t.attachment :main_image
    end
  end

  def self.down
    remove_attachment :events, :main_image
  end
end

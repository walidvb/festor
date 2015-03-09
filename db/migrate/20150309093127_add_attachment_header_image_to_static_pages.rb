class AddAttachmentHeaderImageToStaticPages < ActiveRecord::Migration
  def self.up
    change_table :static_pages do |t|
      t.attachment :header_image
    end
  end

  def self.down
    remove_attachment :static_pages, :header_image
  end
end

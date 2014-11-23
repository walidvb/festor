class AddAttachmentProfilePicToArtists < ActiveRecord::Migration
  def self.up
    change_table :artists do |t|
      t.attachment :profile_picture
    end
  end

  def self.down
    remove_attachment :artists, :profile_picture
  end
end

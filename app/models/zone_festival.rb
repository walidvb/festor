class ZoneFestival < ActiveRecord::Base
  def sync
    self.data = ZoneFestivalSyncer.get_data()
    self.save!
    store_locally!
  end

  def store_locally!
    zf = self.data

  end
end

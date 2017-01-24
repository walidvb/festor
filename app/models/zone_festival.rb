class ZoneFestival < ActiveRecord::Base
  def sync
    self.data = ZoneFestivalSyncer.get_data()
    self.save!
  end
end

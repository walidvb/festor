class Setting < ActiveRecord::Base
  validate :unique_setting
  translates :about

  def unique_setting
    if Setting.count >= 1
      errors.add(:base, 'You can only create one setting!')
    end
  end
end

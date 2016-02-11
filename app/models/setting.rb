class Setting < ActiveRecord::Base
  before_create :unique_setting
  translates :about, :volunteers
  accepts_nested_attributes_for :translations, allow_destroy: true


  rails_admin do
    configure :translations, :globalize_tabs
    # edit do
    #   field :about
    # end
  end

  private
  def unique_setting
    if Setting.count > 1
      errors.add(:base, 'You can only create one setting!')
    end
  end
end

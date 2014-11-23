ActiveAdmin.register Event do

  controller do
    def permitted_params
      # LOL this is too many params... we should split the book admin
      # into different screens (maybe tabs?)
      params.permit(event: [:title, :flyer, :description, :id, :_destroy,
        { 
          artists_attributes: [:name, :id, :_destroy]
        }
        ])
    end
  end

  form do |f|
    f.input :title

    f.input :lfyer, as: :file
    f.has_many :artists, :allow_destroy => true do |a|
      a.inputs "Artists" do 
        a.input :name
      end
    end
  end

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if resource.something?
  #   permitted
  # end


end

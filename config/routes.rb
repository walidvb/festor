Festor::Application.routes.draw do

  resources :workshops

  resources :exhibitions

	root "events#index"    
	devise_for :users
	resources :events, only: [:show, :index]
  # scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
  # end
	mount RailsAdmin::Engine => '/admin', as: 'rails_admin' 
end

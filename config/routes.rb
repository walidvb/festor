Festor::Application.routes.draw do
  devise_for :users
	root "events#index"    
	mount RailsAdmin::Engine => '/admin', as: 'rails_admin' 
  scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
		resources :events, only: [:show, :index]
		get "home", to: "pages#home", as: "home"
  end

end

Festor::Application.routes.draw do


  get "data/events" => 'admin/data#events'
  get "data/artists" => 'admin/data#artists'
  get "data/locations" => 'admin/data#locations'
	get "beta" => "beta#new"

	match "/upload" => "assets#upload", via: :post
	scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
    get '/where' => 'screenshots#index', as: :where
    resources :screenshots, only: [:create, :update]
		post "beta" => "beta#create"
		devise_for :users, skip: :registrations
		get "home" => 'home#index'
		get "program" => 'events#program', as: :program
		#get "events/:id" => "events#show", as: :event
		resources :events, controller: "events", only: [:show, :index], category: :all, as: :events
		resources :workshops, controller: "events", only: [:show, :index], category: :workshop
		resources :exhibitions, controller: "events", only: [:show, :index], category: :exhibition

		resources :venues, controller: 'locations', only: [:index]

		resources :artists, only: [:index, :show]

    resources :partners, only: [:index]
		get "admin/artists/sort" => 'artists#sortable_index'
		post "admin/artists/sort" => 'artists#sort_update'
		post "admin/events/sort" => 'events#sort_update'
		get "admin/events/:type/sort" => 'events#sortable_index', as: :sortable_events, type: :workshop

		resources :static_pages, only: [:show]
		resources :news, controller: 'static_pages', only: [:index, :show]

		root "artists#index"
		get "/gallery" => 'static#gallery', as: :gallery
		get "/about" => 'static#about', as: :about
		get "/volunteers" => 'static#volunteers', as: :volunteers
		get "/tickets" => 'static#tickets', as: :tickets
		mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
	end
end

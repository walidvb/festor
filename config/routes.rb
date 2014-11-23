Festor::Application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :artists
  
  root "events#index"    
  get "home", to: "pages#home", as: "home"
  get "inside", to: "pages#inside", as: "inside"
  
  resources :events, only: [:show, :index]
  devise_for :users
  
end

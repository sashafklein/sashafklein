Sashafklein::Application.routes.draw do

  devise_for :users, skip: [:registrations] 
  
  devise_scope :user do
    get "/login" => "devise/sessions#new"
  end
  
  get 'wikis', to: 'wikis#show', as: 'home'

  resources :users, only: [:show] 
  resources :emails, only: [:new, :create]

  resources :wikis, :posts, :skills, :resume_items, :portfolio_items, :roles

  get '/portfolio', to: 'statics#portfolio'
  get '/devlog', to: 'posts#devlog'
  get '/landing', to: 'statics#landing'
  get '/resume', to: 'statics#resume'
  get '/edit', to: 'sessions#new'
  
  get '/search', to: 'posts#search'

  get '/contact', to: 'emails#new' 
  post '/contact', to: 'emails#create'

  root to: 'statics#landing'

  namespace :api do
    namespace :v1 do 
      resources :posts, only: [:new, :create, :update, :show, :index] do 
        get :test_user, on: :collection
      end
    end
  end
end

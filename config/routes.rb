Eduki::Application.routes.draw do

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
  #   match 'products/:id' => 'catalog#view'

  apipie
  root :to => 'static#index'
  match 'api' => 'api/stub#index'
  namespace :api do
    match "utility/preview" => 'utility#preview', :via => :post

    resources :users, :only => [:show, :index, :create, :update, :destroy] do
      resources :enrollments, :only => [:create, :index]
      resources :courses, :only => [:create]
      match "courses" => 'courses#index_by_user', :via => :get
    end

    match "authenticate" => 'users#authenticate'

    resources :enrollments, :only => [:show, :destroy] do
      resources :quiz_attempts, :only => [:create, :index]
    end

    resources :quiz_attempts, :only => [:show]

    resources :courses, :only => [:show, :index, :update, :destroy] do
      # For now, (legacy from Alpha phase), lessons does not follow the
      # shallow routes convention. This should be updated when all
      # frontends have been changed to use the shallow routes
      resources :lessons, :only => [:show, :index, :create, :update]
      resources :quizzes, :only => [:index, :create]
    end

    resources :lessons, :only => [:show, :update, :destroy]
    resources :quizzes, :only => [:show, :update, :destroy] do
      resources :problems, :only => [:index, :create]
    end

    resources :problems, :only => [:show, :update, :destroy]
  end
  mount JasmineRails::Engine => "/specs" if defined?(JasmineRails)
end

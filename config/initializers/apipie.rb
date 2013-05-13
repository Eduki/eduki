Apipie.configure do |config|
  config.app_name                = "Eduki"
  config.api_base_url            = "/api"
  config.doc_base_url            = "/api/docs"
  # were is your API defined?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/api/*.rb"
end

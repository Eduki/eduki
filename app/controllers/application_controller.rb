class ApplicationController < ActionController::Base
  protect_from_forgery

  def error_object
    {:error => "Error encountered"}
  end
end

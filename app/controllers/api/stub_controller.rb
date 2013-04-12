class Api::StubController < ApplicationController
  def index
    a = User.new
    a.email = "herp"
    a.save
    render :json => {:derp => a.email, :id => a.id}
  end
end

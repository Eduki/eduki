class Api::StubController < ApplicationController
  def index
    render :json => {:derp => 'herp'}
  end
end

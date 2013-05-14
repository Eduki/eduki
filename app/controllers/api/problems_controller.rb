class Api::ProblemsController < Api::ApiController
  def show
    render :json => error_object, :status => 404
  end

  def index
    render :json => error_object, :status => 404
  end

  def create
    render :json => error_object, :status => 404
  end

  def update
    render :json => error_object, :status => 404
  end

  def destroy
    render :json => error_object, :status => 404
  end
end

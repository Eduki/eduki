# End point controller for Users
#
# Edward Samson
# sergal@cs.washington.edu
#
class Api::UsersController < Api::ApiController

  # @user is a bound variable in scope
  before_filter :get_user_or_404, :only => [:show, :update]

  resource_description do
    description <<-EOS
    A user has the following fields
    * id:integer
    * email:string
    EOS
  end

  api :GET, '/users/:id', "Retrieve a user"
  param :id, Fixnum, :required => true
  def show
    render :json => @user
  end

  api :GET, '/users', "Retrieve all users"
  def index
    render :json => User.all
  end

  api :POST, '/users', "Create a new user"
  param :email, String, :required => true
  def create
    if params[:email].nil?
      render :json => error_object, :status => 400
    else
      @user = User.new
      @user.email = params[:email]
      if @user.save
        render :json => @user
      else
        render :json => error_object, :status => 500
      end
    end
  end

  
  api :PUT, '/users/:id', "Update a user's information"
  param :id, Fixnum, :required => true
  param :email, String
  def update
    @user.email = params[:email] if not params[:email].nil?
    if @user.save
      render :json => @user
    else
      render :json => error_object, :status => 500
    end
  end

private
  def get_user_or_404
    super(params[:id])
  end

end

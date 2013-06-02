# End point controller for Users
#
# Edward Samson
# sergal@cs.washington.edu
#
class Api::UsersController < Api::ApiController

  # @user is a bound variable in scope
  before_filter :get_user_or_404, :only => [:show, :update, :destroy]

  # devise :database_authenticatable

  resource_description do
    description <<-EOS
    A user has the following fields
    * id:integer
    * email:string
    * first_name:string
    * last_name:string
    * password:string -- only used in creation, editing, and authentication
    * background:string - a body of text that the user can use to describe themselves with.
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
  param :first_name, String
  param :last_name, String
  param :background, String
  def create
    if params[:email].nil? || params[:password].nil?
      render :json => error_object, :status => 400
    else
      @user = User.new
      @user.email = params[:email]
      @user.first_name = params[:first_name]
      @user.last_name  = params[:last_name]
      @user.background = params[:background]
      @user.password = params[:password]
      if @user.save
        render :json => @user
      else
        render :json => error_object, :status => 409
      end
    end
  end

  api :GET, '/authenticate', 'Authenticate a user'
  param :email, String, :required => true
  param :password, String, :required => true
  def authenticate
    authenticate_or_request_with_http_basic do |email, password|
      fnd_user = User.find_by_email(email)
      if !fnd_user.nil? && fnd_user.valid_password?(password)
        render :json => fnd_user
      else
        render :json => error_object, :status => 401
      end
    end
  end

  api :PUT, '/users/:id', "Update a user's information"
  param :id, Fixnum, :required => true
  param :email, String
  param :first_name, String
  param :last_name, String
  param :background, String
  def update
    @user.email = params[:email] if not params[:email].nil?
    @user.first_name = params[:first_name] if not params[:first_name].nil?
    @user.last_name  = params[:last_name] if not params[:last_name].nil?
    @user.background = params[:background] if not params[:background].nil?
    @user.password = params[:password] if not params[:password].nil?
    if @user.save
      render :json => @user
    else
      render :json => error_object, :status => 409
    end
  end

  api :DELETE, '/users/:id', "Delete a user"
  param :id,    Fixnum, :required => true
  def destroy
    @user.destroy
    render :json => success_object
  end

private
  def get_user_or_404
    super(params[:id])
  end

end

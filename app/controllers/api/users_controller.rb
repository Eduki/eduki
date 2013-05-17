# End point controller for Users
#
# Edward Samson
# sergal@cs.washington.edu
#

class Api::UsersController < ApplicationController
  def create
    if params[:email].nil?
      render :json => error_object, :status => 400
    else
      new_u = User.new
      new_u.email = params[:email]
      if new_u.save
        render :json => new_u
      else
        render :json => error_object, :status => 400
      end
    end
  end

  def update
    if params[:email].nil?
      render :json => error_object, :status => 400
    else
      u = User.find_by_id(params[:id])
      if u.nil?
        render :json => User.missing_user(params[:id]), :status => 404
      else
        u.email = params[:email].nil
        if u.save
          redner :json => u
        else
          render :json => error_object, :status => 400
        end
      end
    end
  end

  def show
    u = User.find_by_id(params[:id])
    if u.nil?
      render :json => User.missing_user(params[:id]), :status => 404
    else
      render :json => u
    end
  end

  def index
    render :json => User.all
  end
end

# Test suite of user API functionality
# White box testing
#
# Edward Samson
# sergal@cs.washington.edu
#

require 'spec_helper'

describe Api::UsersController do

  # Executed before each test
  before(:each) do
    @user = User.new
    @user.email = "fake"
    @user.save

    @user_2 = User.new
    @user_2.email = "notfake"
    @user_2.save

    @user_3 = User.new
    @user_3.email = "wow"
    @user_3.save

    @users = [@user, @user_2, @user_3]
  end

  describe "GET #show" do
    
    it "returns 1 User with http success" do
      get :show, :id => @user.id
      assert_response :success
      body = JSON.parse(response.body)
      @user.id.should == body['id']
      @user.email.should == body['email']
    end

    it "returns 404 if id not found" do
      get :show, :id => 10000
      check_failure(404)
    end
  end

  describe "GET #index" do
    it "shows all users" do
      get :index
      assert_response :success
      body = JSON.parse(response.body)
      body[0]['email'].should == @user.email
      body[1]['email'].should == @user_2.email
      body[2]['email'].should == @user_3.email
    end
  end

  describe "POST #create" do
    it "creates 1 user" do
      size = User.count
      post :create, :email => "valid"
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should == (size+1)
      User.count.should == (size+1)
    end

    it "requires email" do
      post :create
      check_failure(400)
    end

    it "enforces email uniqueness" do
      post :create, :email => "fake"
      check_failure(409)
    end
  end

  describe "PUT #update" do
    it "updates 1 user" do
      put :update, :id => @user_2.id, :email => "supernotfake"
      assert_response :success
      body = JSON.parse(response.body)
      @user_2.id.should == body['id']
      body['email'].should == "supernotfake"

      User.find(@user_2.id).email.should == "supernotfake"
    end

    it "returns 404 if id not found" do
      put :update, :id => 10000, :email => "shouldbefake"
      check_failure(404)
    end

    it "updates nothing if not required" do
      put :update, :id => @user.id

      assert_response :success
      body = JSON.parse(response.body)
      body['email'].should == @user.email

      User.find(@user.id).email.should == @user.email
    end

    it "will not violate uniqueness" do
      put :update, :id => @user.id, :email => "wow"
      check_failure(409)
    end
  end
end

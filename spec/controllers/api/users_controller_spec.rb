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
    @user.first_name = "first name"
    @user.last_name  = "last name"
    @user.background = "background"
    @user.password = "user_one password"
    @user.save

    @user_2 = User.new
    @user_2.email = "notfake"
    @user_2.password = "user_two password"
    @user_2.save

    @user_3 = User.new
    @user_3.email = "wow"
    @user_3.password = "user_three password"
    @user_3.save

    @users = [@user, @user_2, @user_3]
  end

  describe "GET #show" do
    it "returns 1 User with http success" do
      get :show, :id => @user.id
      assert_response :success
      body = JSON.parse(response.body)
      @user.id.should    == body['id']
      @user.email.should == body['email']
      @user.first_name.should == body['first_name']
      @user.last_name.should  == body['last_name']
      @user.background.should == body['background']
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
      post :create, :email => "valid",
           :first_name => "new first name", :last_name => "new last name",
           :background => "I like turtles", :password => "new example password"
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should == (size+1)
      body['email'].should == "valid"
      body['first_name'].should == "new first name"
      body['last_name'].should  == "new last name"
      body['background'].should == "I like turtles"

      User.count.should == (size+1)
      User.last.email.should == "valid"
      User.last.first_name.should == "new first name"
      User.last.last_name.should == "new last name"
      User.last.background.should == "I like turtles"
    end

    it "requires email" do
      post :create
      check_failure(400)
    end

    it "enforces email uniqueness" do
      post :create, :email => "fake", :password => "derp"
      check_failure(409)
    end
  end

  describe "PUT #update" do
    it "updates 1 user" do
      put :update, :id => @user_2.id, :email => "supernotfake",
           :first_name => "new first name", :last_name => "new last name",
           :background => "I like turtles"
      assert_response :success
      body = JSON.parse(response.body)
      @user_2.id.should == body['id']
      body['email'].should == "supernotfake"
      body['first_name'].should == "new first name"
      body['last_name'].should  == "new last name"
      body['background'].should == "I like turtles"

      User.find(@user_2.id).email.should == "supernotfake"
      User.find(@user_2.id).first_name.should == "new first name"
      User.find(@user_2.id).last_name.should == "new last name"
      User.find(@user_2.id).background.should == "I like turtles"
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

  describe "DELETE #destroy" do
    it "deletes 1 user" do
      delete :destroy, :id => @user.id
      assert_response :success
      JSON.parse(response.body)['success'].should be_true
      User.find_by_id(@user.id).should be_nil
    end

    it "returns 404 if user not found" do
      delete :destroy, :id => -1
      check_failure(404)
    end
  end

  describe "#authenticate" do
    it "gives a 200 code if basic auth credentials are correct" do
      encoded_credentials = ActionController::HttpAuthentication::Basic.encode_credentials('fake', 'user_one password')
      request.env['HTTP_AUTHORIZATION'] = encoded_credentials
      get :authenticate
      assert_response :success
    end

    it "gives a 400 code if basic auth credentials are correct" do
      encoded_credentials = ActionController::HttpAuthentication::Basic.encode_credentials('fake', 'incorrect password')
      request.env['HTTP_AUTHORIZATION'] = encoded_credentials
      get :authenticate
      check_failure(401)
    end
  end
end

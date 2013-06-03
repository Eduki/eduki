# A test suite for the Utility controller
# David Mah
require 'spec_helper'

describe Api::UtilityController do
  describe "POST #preview" do
    it "returns some markdown parsed into html" do
      post :preview, :body => "example"
      assert_response :success
      body = JSON.parse(response.body)
      body['body_markdown'].should == "<p>example</p>\n"
    end

    it "returns 400 if body missing" do
      post :preview
      check_failure(400)
    end
  end
end

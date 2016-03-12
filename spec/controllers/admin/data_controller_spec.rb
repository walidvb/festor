require 'rails_helper'

RSpec.describe Admin::DataController, :type => :controller do

  describe "GET events" do
    it "returns http success" do
      get :events
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET artists" do
    it "returns http success" do
      get :artists
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET locations" do
    it "returns http success" do
      get :locations
      expect(response).to have_http_status(:success)
    end
  end

end

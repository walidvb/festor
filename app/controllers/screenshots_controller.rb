class ScreenshotsController < ApplicationController

  # GET /screenshots
  # GET /screenshots.json
  def index
    @screenshots = Screenshot.all
  end

  # GET /screenshots/1/edit
  def edit
  end

  # POST /screenshots
  # POST /screenshots.json
  def create
    @screenshot = Screenshot.new(screenshot_params)
    respond_to do |format|
      if @screenshot.save
        format.html { head :ok }
        format.json { render :show, status: :created, location: @screenshot }
      else
        format.html { head :error }
        format.json { render json: @screenshot.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_screenshot
      @screenshot = Screenshot.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def screenshot_params
      loc = request.location
      params.require(:screenshot).permit(:ip, :screenshot, :user_agent).merge({
        ip: request.ip,
        location: loc.address,
        country_name: loc.data["country_name"],
        latitude: loc.data["latitude"],
        longitude: loc.data["longitude"]
        })
    end
end

class ScreenshotsController < ApplicationController

  # GET /screenshots
  # GET /screenshots.json
  def index
    @screenshots = Screenshot.all.order('created_at DESC')
  end

  def update
    set_screenshot
    respond_to do |format|
      if @screenshot.update(screenshot_params)
        format.html { head :ok }
        format.json {
          render json: {
            status: :created, screenshot: @screenshot
          }
        }
      else
        format.html { head :error }
        format.json { render json: @screenshot.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /screenshots
  # POST /screenshots.json
  def create
    @screenshot = Screenshot.new(screenshot_params)
    respond_to do |format|
      if @screenshot.save
        format.html { head :ok }
        format.json {
          render json: {
            status: :created, screenshot: @screenshot
          }
        }
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
      params.require(:screenshot).permit(:ip, :screenshot, :user_agent, :name).merge({
        ip: request.ip,
        city: loc.data["city"],
        location: loc.address,
        country_name: loc.data["country_name"],
        latitude: loc.data["latitude"],
        longitude: loc.data["longitude"],
        })
    end
end
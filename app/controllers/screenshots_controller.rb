class ScreenshotsController < ApplicationController

  # GET /screenshots
  # GET /screenshots.json
  def index
    @screenshots = Screenshot.all.order('created_at DESC')
  end

  def update

    set_screenshot
    if @screenshot.nil?
      create
      return
    end
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
    p "screenshot: #{@screenshot.inspect}"
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
      @screenshot = Screenshot.find_by_id(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def screenshot_params
      loc = request.location
      puts loc.inspect
      puts loc.country
      puts loc.country_code
      country_name = ActiveRecord::Base.connection.execute("SELECT country FROM maxmind_geolite_country WHERE country_code = '#{loc.country}'")
      params.require(:screenshot).permit(:ip, :screenshot, :user_agent, :name).merge({
        ip: request.ip,
        city: loc.city,
        location: loc.address,
        country_name: country_name,
        latitude: loc.latitude,
        longitude: loc.longitude,
        })
    end
end

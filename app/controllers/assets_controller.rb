class AssetsController < ApplicationController
	skip_before_filter :beta_only
	
	def upload
		begin
			asset = Asset.create!(file: params[:file])
			render json: {
				link: asset.file.url(:large)
			}
		rescue => e
			render json: {
				error: e.inspect
			}
		end
	end
end

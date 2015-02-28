class AssetsController < ApplicationController
	skip_before_filter :beta_only
	
	def upload
		asset = Asset.create!(image: params[:file])
		render json: {
			link: asset.image.url(:large)
		}
	end
end

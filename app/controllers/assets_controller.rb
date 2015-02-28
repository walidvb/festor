class AssetsController < ApplicationController
	def upload
		asset = Asset.create!(image: params[:file])
		render json: {
			link: asset.image.url(:large)
		}
	end
end

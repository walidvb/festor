class Paperclip::Base64Encoder < Paperclip::Thumbnail
  def make
  	dst = super
  	if options[:processors].include?(:base64_encoder) && options[:format] == :base64
	  	base64_version = Base64.encode64 File.read(dst)
	  	self.attachment.instance.send("#{self.attachment.name}_#{options[:style]}_base64=", base64_version)
  	end
  	dst 
  end
end
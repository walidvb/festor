//= require froala/js/froala_editor.min.js
//= require froala/js/plugins/file_upload.min.js
//= require froala/js/plugins/video.min.js
//= require froala/js/plugins/urls.min.js

$(document).on('rails_admin.dom_ready', function(){
	var csrf_token = $('meta[name="csrf-token"]').attr('content');
	$('textarea').editable({
		inlineMode: false,
		plainPaste: true,
		paragraphy: false,
		placeholder: "Edit Me!",
		imageUploadURL: "/upload",
		imageUploadParams: {
			authentication_token: csrf_token
		},
		headers: {
			'X-CSRF-Token': csrf_token
		},
		buttons: ['undo', 'redo' , 'sep', 'bold', 'italic', 'underline', 'sep', 'link', 'sep', 'formatBlock','sep', 'insertImage', 'insertVideo', 'uploadFile', 'sep', 'html']
	})
});
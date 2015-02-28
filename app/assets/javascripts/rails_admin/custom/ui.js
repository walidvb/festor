//require froala/js/froala_editor.min.js
//require froala/js/plugins/file_upload.min.js
//require froala/js/plugins/videos.min.js
//require froala/js/plugins/urls.min.js
$(document).on('rails_admin.dom_ready', function(){
	$('textarea').editable({
		inlineMode: false,
		plainPaste: true,
		paragraphy: false,
		placeholder: "Edit Me!",
		buttons: ['undo', 'redo' , 'sep', 'bold', 'italic', 'underline', 'sep', 'link', 'sep', 'formatBlock', 'sep', 'html']
	})
});
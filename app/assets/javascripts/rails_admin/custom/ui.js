//= require froala/js/froala_editor.min.js
//= require froala/js/plugins/file_upload.min.js
//= require froala/js/plugins/block_styles.min.js
//= require froala/js/plugins/video.min.js
//= require froala/js/plugins/lists.min.js
//= require froala/js/plugins/urls.min.js

$(document).on('rails_admin.dom_ready', function(){
	var csrf_token = $('meta[name="csrf-token"]').attr('content');
	var isSinglePage = $('#edit_static_page').length > 0
	var buttons;
	if(isSinglePage)
	{
		buttons = ['undo', 'redo' , 'sep', 'bold', 'italic', 'underline', 'sep', 'createLink', 'sep', 'formatBlock', 'blockStyle', 'sep',  'insertUnorderedList', 'sep', 'insertImage', 'insertVideo', 'uploadFile', 'sep', 'html']
	}
	else
	{
		buttons = ['undo', 'redo' , 'sep', 'bold', 'italic', 'underline', 'sep', 'createLink', 'sep', 'formatBlock', ,'sep', 'insertImage', 'insertVideo', 'uploadFile', 'sep', 'html'];
	}
	var wysiwygs = $('.biography_field textarea, .description_field textarea, .body_field textarea, .about_field textarea, .infos_field textarea, .notes_field textarea, .message_field textarea, .short_description_field textarea');
	wysiwygs.editable({
		inlineMode: false,
		plainPaste: true,
		blockTags: {
			normal: "p",
			h1: "h1",
			h2: "h2",
			h3: "h3",
			h4: "h4",
		},
		blockStyles: {
		},
		useFrTag: true,
		alwaysBlank: true,
		paragraphy: false,
		placeholder: "Edit Me!",
		imageUploadURL: "/upload",
		fileUploadURL: "/upload",
		spellcheck: true,
		pasteImage:true ,
		imageLink: true,
		imageMove: true,
		paragraphy: true,
		defaultImageTitle: "Mapping Festival 2015",
		headers: {
			'X-CSRF-Token': csrf_token
		},
		buttons: buttons,
		height: 300,
	}).on('editable.fileError editable.imageError', function (e, editor, error) {
		console.log(error);
		alert("Error uploading file... Please send along console log if you request support.");
	});
});

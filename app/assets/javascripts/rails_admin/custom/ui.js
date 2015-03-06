//= require froala/js/froala_editor.min.js
//= require froala/js/plugins/file_upload.min.js
//= require froala/js/plugins/video.min.js
//= require froala/js/plugins/lists.min.js
//= require froala/js/plugins/urls.min.js

$(document).on('rails_admin.dom_ready', function(){
	var csrf_token = $('meta[name="csrf-token"]').attr('content');
	var isSinglePage = $('#edit_static_page').length > 0
	var buttons;
	if(isSinglePage)
	{
		buttons = ['undo', 'redo' , 'sep', 'bold', 'italic', 'underline', 'sep', 'link', 'sep', 'formatBlock','sep', 'insertUnorderedList', 'sep', 'insertImage', 'insertVideo', 'uploadFile', 'sep', 'html']
	}
	else
	{
		buttons = ['undo', 'redo' , 'sep', 'bold', 'italic', 'underline', 'sep', 'link', 'sep', 'formatBlock','sep', 'insertImage', 'insertVideo', 'uploadFile', 'sep', 'html'];
	}
	var wysiwygs = $('.biography_field textarea, .description_field textarea, .body_field textarea');
	wysiwygs.editable({
		inlineMode: false,
		plainPaste: true,
		blockTags: {
			normal: "p",
			h1: "h1",
			h2: "h2", 
			h3: "h3", 
			h4: "h4"
		},
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

	// Remove category for non-single_events
	$('#event_type').on('change', function(){
   var event_type = $(this).val();
   console.log(event_type);
   if(event_type == 'single_event'){
      $('#event_category_field').slideDown();
   }
   else{
     $('#event_category_field').slideUp();
   }
})

});
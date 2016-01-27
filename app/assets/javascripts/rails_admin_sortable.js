//= require html5sortable/jquery.sortable.min.js
$(document).ready(function(){
	var handleSelector = 'i';
	$('.admin .sortable').sortable({
		handler: handleSelector
	}).bind('sortstart', function(e, ui){
		console.log('sortstarted');
	}).bind('sortupdate', function(e, ui) {
		console.log("e, ui:", e, ui);
		var position = $('li', this).index(ui.item);
		var id = $(ui.item).data('id')
		var url = $(this).data('url')
		var csrf = $('meta[name="csrf-token"]').attr('content');
		$(ui.item).hover();
		$(ui.item).css('opacity', 0.3);
		$.ajax({
			url: url,
			type: "POST",
			headers: {
				'X-CSRF-Token': csrf,
			},
			data: {
				position: position,
				id: id
			},
			success: function(){
				$(ui.item).css('opacity', 1);
			}
		});
	});
});

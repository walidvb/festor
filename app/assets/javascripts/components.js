
$(document).ready(function() {
	var options = {
		maxWidth: "95%",
		maxHeight: "95%",
	};

	$('.colorbox.trigger').colorbox(options);
	$('.colorbox.image').colorbox(options);
	$('.colorbox.video').each(function(){
		var href = $(this).attr('href');
		if(/youtube/.test(href)){
			options.width = 1120;
			options.height = 630;
		}
		else
		{
			options.width = 1000;
			options.height = 562;
		}
		options.iframe= true;
		$(this).colorbox(options);
	});

	$('#container').imagesLoaded( function() {
		var $grid = $('.grid').isotope({
			// options
			itemSelector: '.grid-item',
			layoutMode: 'masonry',
			packery: {
				gutter: 0
			}
		});

		$('.cat-filters input').change(function(){
			$grid.isotope({
				filter: getCurrentFilters()
			});
		});

		function getCurrentFilters(){
			var filters;
			var filters = jQuery.map($('.cat-filters input:checked'), function(item){
				return '.'+$(item).val();
			});
			var dateFilter = $('#date-filter').val();
			if(dateFilter != 'empty'){
				filters = jQuery.map(filters, function(item){
					return item+'.'+dateFilter;
				});
			}
			console.log(filters);
			return filters.join(', ')
		}
	});
});

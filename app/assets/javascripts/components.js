
$(document).ready(function() {
	if(window.innerWidth < 767){
		var header = $('header');
		$('.header-left, .header-left a').click(function(e){
			header.toggleClass('open');
		});
	}

	$('.grid').imagesLoaded( function() {
		$('body').scrollReveal();
		var $grid = $('.grid').isotope({
			// options
			itemSelector: '.grid-item',
			layoutMode: 'masonry',
			masonry: {
				columnWidth: '.grid-sizer',
				percentPosition: true
			}
		});

		$('.cat-filters input').change(function(){
			$grid.isotope({
				filter: getCurrentFilters(),
				layoutMode: 'masonry',
				itemSelector: '.grid-item',
				masonry: {
					columnWidth: '.grid-sizer',
					percentPosition: true
				}
			});
		});

		function getCurrentFilters(){
			var filters;
			var filters = jQuery.map($('.cat-filters input:checked'), function(item){
				return '.'+$(item).val();
			});
			var dateFilter = $('#date-filter').val();
			if(dateFilter != 'empty' && dateFilter != undefined){
				filters = jQuery.map(filters, function(item){
					return item+'.'+dateFilter;
				});
			}
			console.log(filters);
			return filters.join(', ')
		}
	});
});

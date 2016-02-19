
$(document).click('.header-left, .header-left a', function(e){
	if($(e.target).hasClass('.header-left') || $(e.target).parents('.header-left').length){
			if(window.innerWidth < 767){
				var header = $('header');
				header.toggleClass('open');
			}
	}
	else{
		header.removeClass('open');
	}
});
$(document).on('ready turbolinks:load', function() {
	var header = $('header');
	$('.grid').imagesLoaded( function() {
		$('.grid').css('opacity', 1);
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

		var filterInputs = $('.cat-filters input');
		filterInputs.change(updateList);
		$(document).on('filter-events', updateList);

		function updateList(){
			$grid.isotope({
				filter: getCurrentFilters(),
				layoutMode: 'masonry',
				itemSelector: '.grid-item',
				masonry: {
					columnWidth: '.grid-sizer',
					percentPosition: true
				}
			});
			function getCurrentFilters(){
				var filters;
				var filters = jQuery.map($('.cat-filters input:checked'), function(item){
					return '.'+$(item).val();
				});

				var locationsFilter = $('.location-link.active').data('title');
				if(locationsFilter && locationsFilter.length){
					locationsFilter = '.' + locationsFilter
				}
				var dateFilter = $('#date-filter').val();
				if(dateFilter != 'empty' && dateFilter != undefined){
					filters = jQuery.map(filters, function(item){
						if(locationsFilter && locationsFilter.length){
							item += locationsFilter;
						}
						return item+'.'+dateFilter;
					});
				}

				var finalString = filters.join(', ');
				if(!finalString.length){
					return locationsFilter;
				}
				return finalString
			}
		}
	});
});

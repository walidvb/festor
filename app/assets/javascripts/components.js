
function hideHeader(e){
	console.log('hiding header');
	$('header').removeClass('open');
}
$(document).on('turbolinks:load', function() {
	$('.header-left').on('click', function(e){
		console.log('toggling menu');
		var header = $('header');
		header = $('header');
		header.toggleClass('open');
	});
	$('main').on('mousedown', 'main', hideHeader);

	$('.grid-item[data-img]').each(function(){
		var $this = $(this);
		if(!$this.data('blurred')){
			var img = new Image();
			img.src = $this.data('img');
			img.className = 'non-blurred';
			img.onload = function(){
				$this.find('img').attr('src', this.src);
			};
			$this.data('blurred', true);
		}
	});
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
		})
		$('.grid').addClass('ready');

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

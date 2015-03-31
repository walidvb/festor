(function($, window){
	$(document).on('ready page:load', function(){

		var events = $('#single-events-list').mixItUp({
			selectors: {
				target: '.event'
			},
			load: {
	      filter: getFilters()
	    },
	    controls: {
	      toggleFilterButtons: true
	    },
			animation: {
		    duration: 400,
				easing: 'ease-out',
				effects: 'stagger fade scale(0.8)',
				staggerSequence: function(i){
					return (2*i) - (5*((i/3) - ((1/3) * (i%3))));
				}
			}
		});

		$('.cat-filter').change(function(){
			updateFilters();
		});

		var currDateSort = 0;
		var sortBy = ['asc', 'desc'];
		$('#date-sort').click(function(){	
			var currSort = sortBy[currDateSort++]
			$('#single-events-list').mixItUp('sort', 'date:'+currSort);
			currDateSort = currDateSort % 2;
			$(this).toggleClass('sort-asc sort-desc');
		});

		$('#date-filter').change(function(){
			updateFilters();
		});

		function updateFilters(filterGroups){
			console.log("getFilters():", getFilters());
			$('#single-events-list').mixItUp('multiMix', {
				filter: getFilters()
			});
		};

		function getFilters(){
			var filters = [];
			var dateFilter = null;
			$('#filters select').each(function(){
				if($(this).val() != 'empty')
				{
					dateFilter = $(this).val();
				}	
			});

			filters = $('#filters .cat-filter:checked').map(function(i,obj){
				var val = $(obj).val();
				if(dateFilter)
				{
					return "."+dateFilter+"."+val;
				}
				return '.'+val;
			}).toArray().concat(filters)

			return filters.join(', ');
		}
	}); 
})(jQuery, window)
$(document).on('ready page:load', function(){
	var initialFilters = [];
	$('.filters .filter').each(function(){
		initialFilters.push($(this).attr('data-filter'));
	});
	$('#single-events-list').mixItUp({
		selectors: {
			target: '.event'
		},
		load: {
      filter: initialFilters.join(',')
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
}); 
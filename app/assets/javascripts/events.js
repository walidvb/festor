
$(document).ready(function(){

	$('#single-events-list').mixItUp({
		selectors: {
			target: '.event'
		},
		load: {
      filter: '.perfos,.clubbing'
    },
    controls: {
      toggleFilterButtons: true
    },
    callbacks: {
		},
		animation: {
			effects: 'stagger fade scale(0.8)',
			staggerSequence: function(i){
				return (2*i) - (5*((i/3) - ((1/3) * (i%3))));
			}
		}
	});
}); 
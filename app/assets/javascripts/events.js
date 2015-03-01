
$(document).ready(function(){
	$('#single-events-list').mixItUp({
		selectors: {
			target: '.event'
		},
		animation: {
			effects: 'stagger fade scale(0.9)',
			staggerSequence: function(i){
				return (2*i) - (5*((i/3) - ((1/3) * (i%3))));
			}
		}
	});
}); 
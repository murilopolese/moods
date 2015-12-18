Meteor.subscribe( 'days' );

var moods = [
	':no_mouth:',
	':disappointed:',
	':slight_frown:',
	':neutral_face:',
	':slight_smile:',
	':smile:'
];

Template.calendar.helpers({
	emoji: function( shortname ) {
		if( !shortname ) {
			shortname = moods[ 0 ];
		}
		return emojione.toImage( shortname );
	},
	days: function() {
		return Days.find( {}, { sort: { index: 1 } } );
	},
	todayClass: function( day ) {
		var now = new Date();
		var start = new Date( now.getFullYear(), 0, 0 );
		var diff = now - start;
		var oneDay = 1000 * 60 * 60 * 24;
		var today = Math.floor( diff / oneDay );
		if( ( day + 1 ) == today ) {
			return 'today';
		}
		return '';
	}
});

Template.calendar.events({
	'click .day': function( e ) {
		console.log( 123 );

		var target = $( e.currentTarget );
		var currentMood = target.data( 'mood' ) || ':no_mouth:';
		var currentMoodIndex = moods.indexOf( currentMood );
		var nextMood = moods[ ( currentMoodIndex + 1 ) % moods.length ];
		var dayId = target.data( 'id' );

		// Update data attribute manually
		target.data( 'mood', nextMood );

		Days.update( dayId, { $set: { 'mood': nextMood } } );
	}
})

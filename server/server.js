Meteor.startup( function() {
	console.log( 'Server started' );
	Meteor.users.remove( {} );
});

Accounts.onCreateUser( function( opt, user ) {
	for( var i = 0; i < 365; i++ ) {
		Days.insert({
			user: user._id,
			index: i,
			mood: ':no_mouth:'
		});
	}
	return user;
});

Meteor.publish( 'days', function() {
	return Days.find( { user: this.userId } );
});

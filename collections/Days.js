Days = new Mongo.Collection( 'days' );

Days.allow({
	update: function( userId, doc ) {
		return userId && doc.user === userId;
	}
});

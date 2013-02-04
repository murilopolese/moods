users = new Meteor.Collection('userdays');

Meteor.startup(function() {
    
})

Meteor.methods({
    changeMood: function(d, m, mood) {
        var search = users.find({
            id: Meteor.userId(), 
            day: d,
            month: m
        }).fetch();
        
        if(search.length == 0) {
            users.insert({
                id: Meteor.userId(), 
                day: d,
                month: m,
                mood: mood
            })
        } else {
            users.update({
                id: Meteor.userId(), 
                day: d,
                month: m
            },
            {
                $set: {
                    mood: mood
                }
            })
        }
    },
    getMyMoods: function() {
        return users.find({id: Meteor.userId()}).fetch();
    }
})
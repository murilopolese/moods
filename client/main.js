Meteor.startup(function() {
    $('body').on('click', '.day', function() {
        var rel = $(this).attr('rel').split('-');
        var month = rel[0];
        var day = rel[1];
        var mood = toggleClass($(this).find('.mood'))
        Meteor.call('changeMood', day, month, mood);
    })
});

Template.calendar.days = function() {
    var user = Meteor.users.findOne();
    if(user != undefined) {
        return buildCalendar();
    }
}
Template.calendar.myMoods = function() {
    Meteor.call('getMyMoods', function(error, result) {
        console.log(result);
        for(var i = 0; i < result.length; i++) {
            $('div[rel='+result[i].month+'-'+result[i].day+']').find('.mood').attr('class', 'mood '+result[i].mood)
        }
    })
}
Template.calendar.isFirstDay = function(day) {
    return day == 1;
}


function buildCalendar() {
    var meses31 = [1, 3, 5, 7, 8, 10, 12];
    var a = [];
    for(var m = 1; m <= 12; m++) {
        var x = 0;
        if(meses31.indexOf(m) != -1) { // 31 days months
            x = 1;
        }
        if(m == 2) { // february
            x = -2;
        }
        for(var d = 1; d <= 30+x; d++) {
            a.push({
                day: d,
                month: m,
                mood: 'empty'
            });
        }
    }
    return a;
}
function toggleClass($this) {
    if($this.hasClass('empty')==true) {
            $this.removeClass('empty');
            $this.addClass('happy');
            return 'happy';
        } else if($this.hasClass('happy')==true) {
            $this.removeClass('happy');
            $this.addClass('serious');
            return 'serious';
        } else if($this.hasClass('serious')==true) {
            $this.removeClass('serious');
            $this.addClass('sad');
            return 'sad';
        } else if($this.hasClass('sad')==true) {
            $this.removeClass('sad');
            $this.addClass('empty');
            return 'empty';
        }
}

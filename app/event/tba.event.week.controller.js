(function(){
	var _tbaEventWeekControllerId = 'tba.event.week';
angular.module('tba')
    .controller(_tbaEventWeekControllerId, ['$scope', 'tba.event.calendar.service', week]);

function week(vm, calendar) {
    calendar.activate('week-calendar', vm);
}

})();
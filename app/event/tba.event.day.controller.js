(function(){
	
var _tbaEventDayControllerId = 'tba.event.day';
angular.module('tba')
    .controller(_tbaEventDayControllerId, ['$scope', 'tba.event.calendar.service', day]);

function day(vm, calendar) {
    calendar.activate('day-calendar', vm);
}

})();
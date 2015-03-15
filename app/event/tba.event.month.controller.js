
var _tbaEventMonthControllerId = 'tba.event.month';
angular.module('tba')
    .controller(_tbaEventMonthControllerId, ['$scope', 'tba.event.calendar.service', month]);

function month(vm, calendar) {
    var _options = {
        editable: true,
        defaultView: 'month',
        allWeekSlot: true,
        timeFormat: 'H:mm',
        header: false,
        minTime: '07:00:00',
        maxTime: '19:00:00',
    };

    calendar.activate('month-calendar', vm, _options);

    window.month = vm;
}

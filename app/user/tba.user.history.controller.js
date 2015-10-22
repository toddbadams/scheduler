(function(){

var _tbaUserControllerId = 'tba.user.history';
angular.module('tba')
    .controller(_tbaUserControllerId, ['tba.core.async', 'tba.core.log', 'tba.user.service', 'tba.event.service', 'settings', userHistory]);

function userHistory(async, log, userService, eventService, settings) {
    var vm = this;

    vm.today = moment();
    vm.fromDate = moment(vm.today).subtract(30, 'days');
    vm.events = [];
    vm.getEventDuration = eventService.getEventDuration;

    activate();

    function activate() {
        vm.users = [];
        vm.user = userService.getSelectedUser();
        vm.title = vm.user.fullName;

        vm.editAbout = false;

        return async.allAsync([getEventsAsync()], settings.events.controllerActivate,
            settings.events.controllerActivateSuccess, { controllerId: _tbaUserControllerId })
            .then(onLoad);
    }

    function onLoad() {
        log.log('Activated ', vm, _tbaUserControllerId, true);
    }

    function getEventsAsync() {
        eventService.getEventsAsync(vm.fromDate, vm.today)
           .then(function (events) {
               vm.events = events;
           });
    }
}
})();

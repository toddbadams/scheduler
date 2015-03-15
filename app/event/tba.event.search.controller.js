
var _tbaEventSearchControllerId = 'tba.event.search';
angular.module('tba')
    .controller(_tbaEventSearchControllerId, ['$scope', 'tba.core.async', 'tba.core.log', 'tba.user.service', 'settings', 'tba.event.service', search]);

function search(vm, async, log, userService, settings, eventService) {
    var vm = this;

    activate();

    function activate() {
        vm.results = [];
        vm.user = userService.getLoggedInUser();
        vm.title = 'Search';
        vm.search = searchEvents;

        async.allAsync([], settings.events.controllerActivate,
            settings.events.controllerActivateSuccess, { controllerId: _tbaEventSearchControllerId })
            .then(onLoad);
    }

    function onLoad() {
        log.log('Activated ', vm, _tbaEventSearchControllerId, true);
    }

    function searchEvents() {
        eventService.searchEventsAsync(vm.searchText)
            .then(updateSearchVm);
    }

    function updateSearchVm(results) {
        vm.results = results;
    }
}

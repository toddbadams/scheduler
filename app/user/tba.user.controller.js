
var _tbaUserControllerId = 'tba.user';
angular.module('tba')
    .controller(_tbaUserControllerId, ['tba.core.async', 'tba.core.log', 'tba.user.service', 'settings', user]);

function user(async, log, userService, settings) {
    var vm = this;

    window.user = vm;

    activate();

    function activate() {
        vm.users = [];
        vm.user = userService.getSelectedUser();
        vm.title = vm.user.fullName;

        vm.editAbout = false;

        return async.allAsync([], settings.events.controllerActivate,
            settings.events.controllerActivateSuccess, { controllerId: _tbaUserControllerId })
            .then(onLoad);
    }

    function onLoad() {
        log.log('Activated ', vm, _tbaUserControllerId, true);
    }

}

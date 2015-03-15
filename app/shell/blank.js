var _tbaBlankControllerId = 'tba.shell.blank';
angular.module('tba')
    .controller(_tbaBlankControllerId, ['tba.core.async', 'tba.core.log', 'settings', blank]);

function blank(async, log, settings) {
    var vm = this;

    activate();

    function activate() {
        vm.title = 'Blank';
        return async.allAsync([], settings.events.controllerActivate,
            settings.events.controllerActivateSuccess, { controllerId: _tbaBlankControllerId })
            .then(onLoad);
    }

    function onLoad() {
        log.log('Activated ', vm, _tbaBlankControllerId, true);
    }

}
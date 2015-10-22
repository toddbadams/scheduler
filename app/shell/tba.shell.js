(function(){
var _tbaShellControllerId = 'tba.shell';
angular.module('tba')
        .controller(_tbaShellControllerId, ['$rootScope', 'tba.core.spin', 'tba.core.async', 'settings', 'tba.user.service', shell]);

function shell($rootScope, spin, async, settings, userService) {
    var log = { log: function () { } };
    var _vm = this;

    activate();

    function activate() {
        _vm.loggedInUser = userService.getLoggedInUser();
        _vm.busyMessage = settings.busyMessage;
        _vm.isBusy = true;
        _vm.spinnerOptions = settings.spinnerOptions;
        _vm.spinnerOptions.id = _tbaShellControllerId;
        _vm.newNavItems = getNav('new');
        _vm.userNavItems = _vm.loggedInUser.users;

        async.allAsync([], settings.events.controllerActivate,
            settings.events.controllerActivateSuccess, { controllerId: _tbaShellControllerId })
            .then(onLoad);
    }

    function onLoad() {
        $rootScope.$on('$routeChangeStart', routeChange);
        $rootScope.$on(settings.events.controllerActivate, controllerActivate);
        $rootScope.$on(settings.events.controllerActivateSuccess, controllerActivateSuccess);
        $rootScope.$on(settings.events.spinnerToggle, spinnerToggle);
        log.log('Shell loaded ', _vm, _tbaShellControllerId, false);
    }

    function routeChange(event, next, current) {
        _vm.isBusy = true;
    }

    function controllerActivate(data) {
        _vm.isBusy = true;
    }

    function controllerActivateSuccess(data) {
        _vm.isBusy = false;
    }

    function spinnerToggle(data) {
        _vm.isBusy = data.show;
    }

    function getNav(name) {
        return settings.routes
            .filter(function (r) {
                return r.config &&
                    r.config.nav &&
                    r.config.nav.nav === name;
            })
            .sort(routesSort);
    }

    function isCurrentNavItem(route, css) {
        if (!route.config.pageTitle || !$route.current || !$route.current.pageTitle) {
            return '';
        }
        var _menuName = route.config.pageTitle;
        return $route.current.title.substr(0, _menuName.length) === _menuName ? css : '';
    }

    function routesSort(r1, r2) {
        return r1.config.nav.order - r2.config.nav.order;
    }
}
})();
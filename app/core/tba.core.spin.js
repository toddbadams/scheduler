(function(){
var _tbaCoreSpinServiceId = 'tba.core.spin';

angular.module('tba')
    .factory(_tbaCoreSpinServiceId, ['$rootScope', spinFactory]);

/********************************************************************/
/*     Spinner                                                      */
/********************************************************************/

function spinFactory($broadcast) {
    var _service = {
        spinnerHide: spinnerHide,
        spinnerShow: spinnerShow,
    };

    return _service;

    function spinnerHide() { spinnerToggle(false); }

    function spinnerShow() { spinnerToggle(true); }

    function spinnerToggle(show) {
        $rootScope.$broadcast(settings.events.spinnerToggleEvent, { show: show });
    }

}

angular.module('tba')
    .directive('tbaSpinner', ['$window', spinDirective]);

function spinDirective($window) {
    // Description:
    //  Creates a new Spinner and sets its options
    // Usage:
    //  <div data-cc-spinner="vm.spinnerOptions"></div>
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
        scope.spinner = null;
        scope.$watch(attrs.ccSpinner, function (options) {
            if (scope.spinner) {
                scope.spinner.stop();
            }
            scope.spinner = new $window.Spinner(options);
            scope.spinner.spin(element[0]);
        }, true);
    }
}

})();
/********************************************************************/
/*     Asynchronouse helpers                                        */
/********************************************************************/
angular.module('tba')
    .factory('tba.core.async', ['$q', '$rootScope', asyncFactory]);

function asyncFactory($q, $rootScope) {
    var
        _service = {
            asPromise: asPromise,
            allAsync: allAsync
        };
    return _service;


    function asPromise(item) {
        var _q = $q.defer();
        _q.resolve(item);
        return _q.promise;
    }

    function allAsync(promises, startEvent, successEvent, data) {
        if (startEvent) {
            $rootScope.$broadcast(startEvent, data);
        }

        return $q.all(promises)
            .then(postPromises);

        function postPromises() {
            if (successEvent) {
                $rootScope.$broadcast(successEvent, data);
            }
        }
    }

}

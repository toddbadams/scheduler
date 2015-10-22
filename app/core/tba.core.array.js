(function(){
/********************************************************************/
/*     Arrays                                                       */
/********************************************************************/
angular.module('tba')
    .factory('tba.core.array', [arraysFactory]);

function arraysFactory() {
    var _service = {
        // array functions
        forEach: forEach,
        filter: filter,
        getById: getById,
        arrayContains: arrayContains
    };
    return _service;

    function forEach(arr, fn, context) {
        return angular.forEach(arr, fn, context);
    }

    function filter(arr, fn) {
        var _context = {
            results: []
        },
            _fn = function (value) {
                if (fn()) {
                    this.results.push(value);
                }
            };

        angular.forEach(arr, _fn, _context);
        return _context.results;
    }

    function getById(arr, id) {
        if (!angular.isArray(arr)) return null;

        var _i,
            _l = arr.length;

        for (_i = 0; _i < _l; _i += 1) {
            if (arr[_i].id === id) {
                return arr[_i];
            }
        }
        return null;
    }

    function arrayContains(arr, value) {
        if (!angular.isArray(arr)) return null;
        var _i,
            _l = arr.length;

        for (_i = 0; _i < _l; _i += 1) {
            if (arr[_i] === value) {
                return true;
            }
        }
        return false;
    }
}
})();
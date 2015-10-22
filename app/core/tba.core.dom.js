(function(){
angular.module('tba')
    .factory('tba.core.dom', ['$document', spinFactory]);

/********************************************************************/
/*     Spinner                                                      */
/********************************************************************/

function spinFactory($document) {
    var _service = {
        getDocumentHeight: getDocumentHeight
    };

    return _service;

    function getDocumentHeight(top, bottom, min) {
        var _h = Math.max(
            $document[0].body.scrollHeight, $document[0].documentElement.scrollHeight,
            $document[0].body.offsetHeight, $document[0].documentElement.offsetHeight,
            $document[0].body.clientHeight, $document[0].documentElement.clientHeight
        ) - top - bottom;
        return _h > min ? _h : min;
    }

}

})();
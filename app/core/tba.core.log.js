(function(){

    angular.module('tba')
    .factory('tba.core.log', ['$log', logFactory]);

/********************************************************************/
/*     Log                                                          */
/********************************************************************/

function logFactory($log) {
    var _service = {
        log: log,
        logWarning: logWarning,
        logSuccess: logSuccess,
        logError: logError
    },
        _settings = {
            timeOut: 4000,
            position: 'toast-bottom-full-width',
            enableToaster: true,
            debug: false
        };

    activate();

    return _service;

    function activate() {
        if (_settings.enableToaster) {
            toastr.options.timeOut = _settings.timeOut;
            toastr.options.positionClass = _settings.position;
        }
    }

    function log(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'info');
    }

    function logWarning(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'warning');
    }

    function logSuccess(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'success');
    }

    function logError(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'error');
    }

    function logIt(message, data, source, showToast, toastType) {
        var write = (toastType === 'error')
                ? $log.error
                : $log.log,
            _toast = {
                'error': toastr.error,
                'warning': toastr.warning,
                'success': toastr.success,
                'info': infoLog
            };

        source = source
        ? '[' + source + '] '
        : '';

        write(source, message, data);

        if (showToast) {
            _toast[toastType](message);
        }

        function infoLog(m) {
            if (_settings.debug) {
                toastr.info(source + ' ' + m);
            }
        }
    }

    /********************************************************************/
    /*     Exception Handling                                           */
    /********************************************************************/
    //// Extend the $exceptionHandler service to also display a toast.
    //function extendExceptionHandler($delegate) {
    //    //var _logError = logger.getLogFn('app', 'error');

    //    return function (exception, cause) {
    //        $delegate(exception, cause);
    //        if (settings.appErrorPrefix && exception.message.indexOf(settings.appErrorPrefix) === 0) { return; }

    //        var _errorData = { exception: exception, cause: cause },
    //            _msg = settings.appErrorPrefix + exception.message;

    //        //_logError(_msg, _errorData, true);
    //        console.log(_msg, _errorData);
    //    };
    //}
}

})();
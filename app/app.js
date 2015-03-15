    angular.module('tba', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',      // sanitizes html bindings (ex: sidebar.js)

        // Angular UI Modules  http://angular-ui.github.io/
        'ui.bootstrap'     // ui-bootstrap 
    ]);

    var _settings = {
        routes: [
            {
                path: '/',
                route: {
                    templateUrl:  'app/event/day.html', //'app/shell/blank.html',
                },
                config: {
                    pageTitle: 'day',
                    nav: {
                        order: 1,
                        nav: 'view',
                        icon: 'calendar',
                        label: 'Day'
                    }
                }
            },
            {
                path: '/month',
                route: {
                    templateUrl: 'app/event/month.html',
                },
                config: {
                    pageTitle: 'calendar',
                    nav: {
                        order: 2,
                        nav: 'view',
                        icon: 'calendar',
                        label: 'Month'
                    }
                }
            },
            {
                path: '/week',
                route: {
                    templateUrl: 'app/event/week.html',
                },
                config: {
                    pageTitle: 'calendar',
                    nav: {
                        order: 3,
                        nav: 'view',
                        icon: 'calendar',
                        label: 'Week'
                    }
                }
            },
            {
                path: '/search',
                route: {
                    templateUrl: 'app/event/search.html',
                },
                config: {
                    pageTitle: 'search',
                    nav: {
                        order: 4,
                        nav: 'view',
                        icon: 'calendar',
                        label: 'Search'
                    }
                }
            },
            {
                path: '/projects',
                route: {
                    templateUrl: 'app/project/projects.html',
                },
                config: {
                    pageTitle: 'Projects',
                    nav: {
                        order: 2,
                        nav: 'topnav',
                        icon: 'leaf',
                        label: 'Projects'
                    }
                }
            }, {
                path: '/user',
                route: {
                    templateUrl: 'app/user/settings.html',
                },
                config: {
                    pageTitle: 'Users',
                    nav: {
                        order: 3,
                        nav: 'topnav',
                        icon: 'male',
                        label: 'Users'
                    }
                }
            }, {
                path: '/settings',
                route: {
                    templateUrl: 'app/user/settings.html',
                },
                config: {
                    pageTitle: 'User Settings',
                    nav: {
                        order: 2,
                        nav: 'user',
                        icon: 'cog',
                        label: 'Settings'
                    }
                }
            }, {
                path: '/history',
                route: {
                    templateUrl: 'app/user/history.html',
                },
                config: {
                    pageTitle: 'User History',
                    nav: {
                        order: 3,
                        nav: 'user',
                        icon: 'cog',
                        label: 'History'
                    }
                }
            }
        ],

        enableToaster: true,
        toastr: {
            timeOut: 4000,
            positionClass: 'toast-bottom-right'
        },
        errorPrefix: 'Error ',
        debugEnabled: true,

        events: {
            controllerActivate: 'controller.activate',
            controllerActivateSuccess: 'controller.activate.success',
            controllerActivateError: 'controller.activate.error',
            spinnerToggle: 'spinner.toggle',
            spinnerOn: 'spinnger.on',
            spinnerOff: 'spinnger.off'
        },

        brand: 'Scheduler',
        version: '1.0.1',
        busyMessage: 'loading ...',

        spinnerOptions: {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#97C03D'
        },

        enableExecptionHandler: false
    };

    // Collect the routes
    angular.module('tba').constant('settings', _settings);

    //angular.module('app')
    //   .config(['$logProvider', 'settings', logProvider]);

    //function logProvider($logProvider, settings) {
    //    // turn debugging off/on (no info or warn)
    //    if ($logProvider.debugEnabled) {
    //        $logProvider.debugEnabled(settings.debugEnabled);
    //    }
    //}

    /********************************************************************/
    /*    Configure the routes and route resolvers                      */
    /********************************************************************/
    angular.module('tba')
        .config(['$routeProvider', routeConfigurator]);

    function routeConfigurator($routeProvider) {
        _settings.routes.forEach(function (r) {
            $routeProvider.when(r.path, r.route);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // start the router
    angular.module('tba').run(['$route', function ($route) { }]);

    //// file upload
    //angular.module('tba')
    //    .config(['flowFactoryProvider', flowFactory]);

    //function flowFactory(flowFactoryProvider) {
    //    flowFactoryProvider.defaults = {
    //        target: 'upload',
    //        permanentErrors: [404, 500, 501],
    //        maxChunkRetries: 1,
    //        chunkRetryInterval: 5000,
    //        simultaneousUploads: 4,
    //        singleFile: true
    //    };
    //    flowFactoryProvider.on('catchAll', function (event) {
    //        console.log('catchAll', arguments);
    //    });
    //    // Can be used with different implementations of Flow.js
    //    // flowFactoryProvider.factory = fustyFlowFactory;
    //}

    //// extend the exception handler
    //if (_settings.enableExecptionHandler) {
    //    $provide.decorator('$exceptionHandler', ['$delegate', extendExceptionHandler]);
    //}


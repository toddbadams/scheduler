module.exports = function (grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            coreModule: {
                src: ['app/app.js',
                    'app/core/tba.core.log.js',
                    'app/core/tba.core.spin.js',
                    'app/core/tba.core.fakes.js',
                    'app/core/tba.core.dom.js',
                    'app/core/tba.core.async.js',
                    'app/core/tba.core.array.js',
                    'app/user/tba.user.controller.js',
                    'app/user/tba.user.service.js',
                    'app/shell/tba.shell.js',
                    'app/project/tba.project.service.js',
                    'app/event/tba.event.calendar.service.js',
                    'app/event/tba.event.day.controller.js',
                    'app/event/tba.event.search.controller.js',
                    'app/event/tba.event.month.controller.js',
                    'app/event/tba.event.service.js',
                    'app/event/tba.event.week.controller.js'],
                dest: 'build/app.js',
            },
            css: {
                src: [
                        'content/bootstrap.min.css',
                        'content/font-awesome.css',
                        'content/toastr.css',
                        'app/css/fullcalendar.css',
                        'app/css/ark.css',
                        'app/css/shell.css',
                        'app/css/login.css',
                        'app/css/splash.css'
                ],
                dest: 'build/app.css'
            },
            dist: {
                src: [
                    'scripts/jquery-2.1.1.min.js',
                    'scripts/angular.min.js',
                    'scripts/angular-animate.min.js',
                    'scripts/angular-route.min.js',
                    'scripts/angular-sanitize.min.js',
                    'scripts/angular-ui/ui-bootstrap.min.js',
                    'scripts/angular-ui/ui-bootstrap-tpls.min.js',
                    'scripts/toastr.min.js',
                    'scripts/moment.min.js',
                    'scripts/spin.min.js',
                    'scripts/fullcalendar.min.js'
                ],
                dest: 'build/libraries.min.js',
            },
            production: {
                src: ['build/libraries.min.js', 'build/app.min.js'],
                dest: 'build/production.min.js'
            }
        },
        ngtemplates: {
            app: {
                src: 'app/**/*.html',
                dest: 'app/template.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        uglify: {
            build: {
                src: 'build/app.js',
                dest: 'build/app.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['app/**/*.*'],
                tasks: ['ngtemplates', 'concat', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'js/',
                src: ['**/*'],
                dest: 'gzip/'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default'); //, ['watch']);

};
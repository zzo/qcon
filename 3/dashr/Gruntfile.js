var path = require('path');
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'public/javascripts/**/*.js', 'spec/**/*.js']
            , options: {
                globals: {
                    jQuery: true
                }
                , 'laxcomma': true
                , 'multistr': true
            }
        },
        jasmine : {
            test: {
                src : 'public/javascripts/**/*.js',
                options : {
                    specs : 'spec/client/**/*.js'
                    , vendor: [ 
                        'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'
                        , 'public/vendor/jasmine-jquery.js' 
                    ]
                    , junit: {
                        path: "./build/reports/jasmine/"
                        , consolidate: true
                    }
                }
            }
        },
        jasmine_node: {
            all: ['spec/server'],
            projectRoot: ".",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: true,
                savePath : "./build/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        },
        express: {
            server: {
                options: {
                /*
                    server: path.resolve('./app.js')
                    , debug: true
                    , bases: 'public'
                    , host : 'http://127.0.0.1:3000/'
                    */
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-express');
    
    // Default task(s).
    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('test', [
        'jshint', 
        'jasmine',
        'express',
        'jasmine_node',
    ]); 
};

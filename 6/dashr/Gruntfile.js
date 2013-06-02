var path = require('path');
var exec = require('child_process').exec;

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
                    , keepRunner: true
                    , vendor: [ 
                        'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'
                        , 'public/vendor/jasmine-jquery.js' 
                        , 'public/vendor/dust-core-1.2.3.min.js' 
                        , '/vendor/bootstrap/js/bootstrap.min.js'
                    ]
                    , junit: {
                        path: "./build/reports/jasmine/"
                        , consolidate: true
                    }
                    , template: require('grunt-template-jasmine-istanbul')
                    , templateOptions: {
                        coverage: 'public/coverage/client/coverage.json'
                        , report:   'public/coverage/client'
                    }

                }
            }
        },
        jasmine_node: {
                projectRoot: "./spec/server",
                requirejs: false,
                forceExit: true,
                jUnit: {
                    report: true,
                    savePath : "./build/reports/jasmine_node/",
                    useDotNotation: true,
                    consolidate: true
                }
        },
        express: {
            server: {
                options: {
                    server: path.resolve('./app.js')
                    , debug: true
                    , bases: 'public'
                    , host : 'http://127.0.0.1:3000/'
                }
            }
        },
        dustjs: {
            compile: {
                files: {
                    "public/javascripts/templates.js": ["views/**/*.dust"]
                }
            }
        }
                /*
        , webdriver: {
            options: {
                browser: 'firefox'    // or firefox or safari
//                browser: 'safari'    // or firefox or safari
//                , reporter: 'html'
//                , output: 'build/reports/webdriver.html'
            }
            , dev: {
                url: 'http://127.0.0.1:3000'
                , tests: ['./spec/webdriver/*.js']
            }
        }
        */
        , env: {
            options : {
                //Shared Options Hash
            }
            , test: {
                NODE_ENV : 'test'
            }
            , coverage: {
                COVERAGE: true
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-dustjs');
//    grunt.loadNpmTasks('grunt-webdriver');
    grunt.loadNpmTasks('grunt-env');
    
    // Default task(s).
    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('test', [
        'jshint', 
        'jasmine',
      /* 'jasmine_node', only necessary if you want junit xml report */
        'jasmine_node_coverage',
        'env:test',
        'env:coverage',
        'express',
        'webd',
        'total_coverage'
    ]); 

    grunt.registerTask('webdriver_coverage', [
        'env:test'  // use test db
        , 'env:coverage' // server sends by coverage'd JS files
        , 'express'
        , 'webd:coverage'
    ]);

    grunt.registerTask('webdriver', [
        'env:test'  // use test db
        , 'express'
        , 'webd'
    ]);

    grunt.registerTask('jasmine_node_coverage', 'Istanbul code coverage for jasmine_node', function() {
        var done = this.async();

        exec('node_modules/istanbul/lib/cli.js cover --dir public/coverage/server -x "**/spec/**" jasmine-node -- spec/server --forceexit --junitreport --output build/reports/jasmine_node/', { }, function(err, stdout, stderr) {
            grunt.log.write(stdout);
            grunt.log.write('Server-side coverage available at: ' + path.join(__dirname, 'public', 'coverage', 'server', 'lcov-report', 'index.html'));
            done();
        });
    });

    grunt.registerTask('webd', 'Webdriver with optional coverage', function(coverage) {
        var done = this.async();

        grunt.task.requires('env:test');
        grunt.task.requires('express');

        if (coverage) {
            grunt.task.requires('env:coverage');
        }

        exec('jasmine-node spec/webdriver --forceexit --junitreport --output build/reports/webdriver/', { }, function(err, stdout, stderr) {
            if (coverage) {
                exec('node_modules/istanbul/lib/cli.js report --root build/reports/webdriver --dir public/coverage/webdriver', { }, function(err, stdout, stderr) {
                    grunt.log.write(stdout);
                    grunt.log.write('Webdriver coverage available at: ' + path.join(__dirname, 'public', 'coverage', 'webdriver', 'lcov-report', 'index.html'));
                    done();
                });
            } else {
                done();
            }
        });
    });

    grunt.registerTask('total_coverage', 'Aggregate coverage from all tests', function() {
        var done = this.async();
        exec('node_modules/istanbul/lib/cli.js report --root build/reports --dir public/coverage/total', { }, function(err, stdout, stderr) {
            grunt.log.write(stdout);
            grunt.log.write('Total coverage available at: ' + path.join(__dirname, 'public', 'coverage', 'total', 'lcov-report', 'index.html'));
            done();
        });
    });
};

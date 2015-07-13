module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        dir: {

            src: 'src/js/',
            build: 'build/<%= pkg.version %>/',
            dist: 'dist/'

        },

        banner: [
            '/*!',
            '    <%= pkg.name %> <%= pkg.version %> - coxcore.com\n',
            '    <%= pkg.description %>\n',
            '    @package  cox.<%= pkg.name %>',
            '    @author   <%= pkg.author.name %> (<%= pkg.author.email %>)',
            '    @since    <%= pkg.since %>',
            '    @update   <%= grunt.template.today("yyyy.mm.dd") %>',
            '    @license  <%= pkg.license %>',
            '*/'
        ].join('\n'),
        
        jshint: {

            all: [
                '<%= dir.src %>*'
            ],

            options:{

                jshintrc: true,
                reporter: require('jshint-stylish')

            }

        },

        concat: {

            basic: {

                options: {

                    banner: [
                        '<%= banner %>',
                        '(function(){',
                        '"use strict";\n',
                        '/*  module  */\n'
                    ].join('\n'),

                    separator: [
                        '\n/*  end of module  */\n',
                        '/*  module  */\n'
                    ].join('\n'),

                    footer: [
                        '\n/*  end of module  */\n',
                        '})();\n'
                    ].join('\n'),

                    stripBanners: {
                        block: true,
                        line: true
                    }
                },

                src: [
                    '<%= dir.src %>cox.js',
                    '<%= dir.src %>cox.ready.js',
                    '<%= dir.src %>cox.core.TagWire.js'
                ],

                dest: '<%= dir.dist %>cox.tagwire.js'

            },

            plugin: {

                options: {

                    banner: '<%= banner %>\n',
                    separator: '\n\n',
                    footer: '\n',

                    stripBanners: {
                        block: true,
                        line: true
                    }

                },

                src: [
                    '<%= dir.dist %>cox.tagwire.js',
                    '<%= dir.src %>jquery.TagWire.js'
                ],

                dest: '<%= dir.dist %>jquery.tagwire.js'

            }
        },

        uglify: {

            options: {

                banner: '<%= banner %>\n',
                mangle: false,
                compress: {
                    drop_console: false
                },
                beautify: false,
                preserveComments : false

            },

            build: {

                src: '<%= dir.dist %>cox.tagwire.js',
                dest: '<%= dir.dist %>cox.tagwire.min.js'

            },

            plugin: {

                src: '<%= dir.dist %>jquery.tagwire.js',
                dest: '<%= dir.dist %>jquery.tagwire.min.js'

            }

        },

        copy: {

            main: {

                expand: true,
                flatten: true,
                src: '<%= dir.dist %>*',
                dest: '<%= dir.build %>',
                filter: 'isFile'

            },

            demo: {

                expand: true,
                flatten: true,
                src: '<%= dir.dist %>demo/*',
                dest: '<%= dir.build %>demo/',
                filter: 'isFile'

            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', [
        'jshint',
        'concat:basic',
        'concat:plugin',
        'uglify:build',
        'uglify:plugin',
        'copy'
    ]);
 
};
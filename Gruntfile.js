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
            '    @author  <%= pkg.author.name %> / <%= pkg.author.codename %>',
            '    @email   <%= pkg.author.email %>',
            '    @update  <%= grunt.template.today("yyyy.mm.dd") %> (since <%= pkg.since %>)',
            '    @license <%= pkg.license %>',
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
            options: {
                banner: [
                    '<%= banner %>',
                    '(function(){',
                    '"use strict";',
                    '// closure >>>\n\n',
                    '//// module\n'
                ].join('\n'),

                separator: [
                    '\n//// end of module\n\n',
                    '//// module\n'
                ].join('\n'),

                footer: [
                    '\n//// end of module\n\n',
                    '// <<< closure',
                    '})();\n'
                ].join('\n'),

                stripBanners: {
                    block: true,
                    line: true
                }
            },

            basic: {
                src: [
                    '<%= dir.src %>cox.js',
                    '<%= dir.src %>cox.ready.js',
                    '<%= dir.src %>cox.TagWire.js',
                    '<%= dir.src %>jquery.TagWire.js'
                ],

                dest: '<%= dir.dist %>cox.tagwire.js'
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
        'concat',
        'uglify',
        'copy'
    ]);
 
};
module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    function getReplaceData(type) {
        var arr = 'name description logo since update version license'.split(' ');
        var o = {};
        var i, l, s;

        for (i = 0, l = arr.length; i < l; i++){
            s = arr[i];
            o[s] = pkg[s];
        }

        o.update = '<%= grunt.template.today("yyyy.mm.dd") %>';
        o.type = type;

        return o;
    }

    grunt.initConfig({

        pkg: pkg,

        dir: {
            src: 'src/js/',
            demo: 'demo/',
            build: 'build/tagwire-<%= pkg.version %>/',
            dist: 'dist/'
        },

        banner: [
            '/*!',
            '    <%= pkg.name %> <%= pkg.version %> - coxcore.com\n',
            '    <%= pkg.description %>\n',
            '    @author  <%= pkg.author %> / <%= pkg.authorInfo.codename %>',
            '    @email   <%= pkg.authorInfo.email %>',
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
                    '<%= banner %>\n',
                    '(function(){',
                    '"use strict";',
                    '// closure >>>>\n\n',
                    '// module\n'
                ].join('\n'),

                separator: [
                    '\n// end of module\n\n',
                    '// module\n'
                ].join('\n'),

                footer: [
                    '\n// end of module\n\n',
                    '// <<<< closure',
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

        includereplace: {
            demo: {
                options: {
                    includesDir: '<%= dir.demo %>inc/',
                    globals: getReplaceData('demo')
                },
                src: '<%= dir.demo %>*.*',
                dest: '<%= dir.dist %>'
            },
            dev: {
                options: {
                    includesDir: '<%= dir.demo %>inc/',
                    globals: getReplaceData('dev')
                },
                src: '<%= dir.demo %>*.*',
                dest: '<%= dir.src %>'
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
                filter: 'isFile',
                src: '<%= dir.dist %>*',
                dest: '<%= dir.build %>'
            },

            demo: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: '<%= dir.dist %><%= dir.demo %>*',
                dest: '<%= dir.build %><%= dir.demo %>'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-include-replace');

    grunt.registerTask('dist', [
        'jshint',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('demo', [
        'includereplace'
    ]);

    grunt.registerTask('build', [
        'dist',
        'demo',
        'copy'
    ]);

};
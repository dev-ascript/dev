module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        dir: {
            src: 'src/js/',
            dist: 'build/<%= pkg.version %>/'
        },

        banner: ['/*!',
            '    <%= pkg.name %> <%= pkg.version %> - coxcore.com\n',
            '    <%= pkg.description %>\n',
            '    @package  cox.<%= pkg.name %>',
            '    @author   <%= pkg.author.name %> (<%= pkg.author.email %>)',
            '    @since    2012.09',
            '    @update   <%= grunt.template.today("yyyy.mm.dd") %>',
            '    @license  <%= pkg.license %>',
            '*/\n'].join('\n'),
        
        jshint: {
            all: ['<%= dir.src %>*'],
            options:{
                reporter: require('jshint-stylish')
            }
        },

        concat: {

            options: {
                banner: '<%= banner %>/*  module  */\n;',
                separator: '\n/*  end of module  */\n\n\n\n/*  module  */\n;',
                footer: '\n/*  end of module  */\n',
                stripBanners: {
                    block: true,
                    line: true
                }
            },

            basic: {
                src: [
                    '<%= dir.src %>cox.ready.js',
                    '<%= dir.src %>cox.TagWire.js',
                    '<%= dir.src %>jquery.TagWire.js'
                ],
                dest: 'dist/cox.tagwire.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                mangle: false,
                compress: {
                    drop_console: false
                },
                beautify: false,
                preserveComments : false
            },
            build: {
                src: 'dist/cox.tagwire.js',
                dest: 'dist/cox.tagwire.min.js'
            }
        },

        copy: {
            main: {
                expand: true,
                flatten: true,
                src: 'dist/*',
                dest: '<%= dir.dist %>',
                filter: 'isFile'
            },
            demo: {
                expand: true,
                flatten: true,
                src: 'dist/demo/*',
                dest: '<%= dir.dist %>/demo/',
                filter: 'isFile'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'copy']);
 
};
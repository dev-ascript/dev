module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        dir: {
            src: 'src/js/',
            dist: 'build/<%= pkg.version %>/'
        },

        banner: '/*!\n' +
            '    <%= pkg.name %> <%= pkg.version %> - coxcore.com\n\n' +
            '<%= pkg.description %>\n\n    ' +
            '@package cox.<%= pkg.name %>\n    ' +
            '@author <%= pkg.author %>\n    ' +
            '@update <%= grunt.template.today("yyyy.mm.dd") %>\n    ' +
            '@license <%= pkg.license %>\n' +
            '*/\n',
        
        jshint:{
            all: ['<%= dir.src %>*'],
            options:{
                reporter: require('jshint-stylish')
            }
        },

        concat:{

            options: {
                banner: '<%= banner %>',
                separator: '\n\n\n',
                stripBanners: {
                    block: true,
                    line: true
                }
            },

            basic: {
                src: ['<%= dir.src %>cox.TagWire.js', '<%= dir.src %>jquery.TagWire.js'],
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
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'copy']);
 
};
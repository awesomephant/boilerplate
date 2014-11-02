module.exports = function (grunt) {

	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        watch: {
            options: {
                livereload: false
            },
            css: {
				files: ['*/*.scss'],
            	tasks: ['css'],
			},
			js: {
				files: ['js/main.js', 'gruntfile.js'],
				tasks: ['js'],
			}
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'sass/main.scss'
                }
            }
        },
	
        autoprefixer: {
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'css/main.css',
                dest: 'css'
            }
        },
	
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },
		

		uglify: {
			dist: {
				files: {
					'js/main.min.js': ['js/main.js']
				}
			}
		},
		
		jshint: {
			all: ['gruntfile.js', 'js/*.js']
		},
		
        browserSync: {
            dev: {
                bsFiles: {
                    src : ['css/*.css', '*.html']
                },
                options: {
                    server: {
                        baseDir: "./"
                    },
                    watchTask: true
                }
            }
        }
	});
	
	grunt.loadNpmTasks(
		'grunt-contrib-watch',
		'grunt-contrib-sass',
		'grunt-contrib-jshint',
		'grunt-contrib-uglify',
		'grunt-contrib-cssmin',
		'grunt-autoprefixer',
		'grunt-browser-sync'
	);


	grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin']);
	grunt.registerTask('js', ['jshint', 'uglify']);
	grunt.registerTask('default', ['browserSync', 'watch']);

};

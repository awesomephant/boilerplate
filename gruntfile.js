module.exports = function (grunt) {

	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        watch: {
            options: {
                livereload: false
            },
            files: ['*/*.scss'],
            tasks: ['css']
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
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	
	grunt.loadNpmTasks('grunt-browser-sync');


	grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin']);
	grunt.registerTask('default', ['browserSync', 'watch']);

};

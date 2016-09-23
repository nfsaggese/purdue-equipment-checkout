module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: ['src/css/*.less'],
        tasks: ['less:dev'],
      },
    },
    less: {
      dev: {
        src: 'src/css/*.less',
        dest: 'src/css/main.css',
        options: {
          compress: false,
        },
      },
    },
    connect: {
      dev: {
        port: 8000,
        base: 'src',
        middleware: function(connect, options, middlewares) {
          middlewares.unshift(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', '*');
              next();
          });

          return middlewares;
        },
      },
    },
    copy: {
      main: {
        files: [
          {
            expand:false,
            src: ['node_modules/handlebars/dist/handlebars.min.js'],
            dest: 'src/js/handlebars.min.js',
            flatten: true,
            filter: 'isFile',
          },
          // // includes files within path
          // {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
          //
          // // includes files within path and its sub-directories
          // {expand: true, src: ['path/**'], dest: 'dest/'},
          //
          // // makes all src relative to cwd
          // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
          //
          // // flattens results to a single level
          // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Default task(s).
  grunt.registerTask('default', ['less', 'copy:main']);
  grunt.registerTask('server', ['less', 'copy:main', 'connect:dev']);

};

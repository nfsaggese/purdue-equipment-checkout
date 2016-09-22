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
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect');
  // Default task(s).
  grunt.registerTask('default', ['less','connect:dev']);

};

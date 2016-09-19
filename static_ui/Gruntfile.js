module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: ['src/css/*.less'],
        tasks: ['less:all'],
      },
    },
    less: {
      all: {
        src: '*.less',
        dest: '*.css',
        options: {
          compress: true,
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['less']);

};

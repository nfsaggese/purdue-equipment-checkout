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
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['less']);

};

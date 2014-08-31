var build = require('./lib/build'),
  C = require('./lib/constants'),
  fs = require('fs'),
  path = require('path');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      options: {
        timeout: 3000,
        ignoreLeaks: false,
        reporter: 'spec'
      },
      src: ['test/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: true
      },
      src: ['lib/*.js', 'test/*.js' ]
    },
    ti_run: {
      app: {
        files: {
          'tmp/app/Resources': ['ti-mocha.js', 'test/app.js']
        }
      }
    },
    clean: {
      src: ['build', 'tmp']
    }
  });

  // Load grunt plugins for modules
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-titanium');

  // run build
  grunt.registerTask('_build', 'finalize ti-mocha.js release file', function() {
    grunt.log.write('Reading build ti-mocha.js...');
    var contents = fs.readFileSync(C.BUILD_FILE, 'utf8');
    grunt.log.ok();

    grunt.log.write('Copying "' + path.relative('.', C.BUILD_FILE) + '" to "' + path.relative('.', C.RELEASE_FILE) + '"...');
    fs.writeFileSync(C.RELEASE_FILE, contents);
    fs.chmodSync(C.RELEASE_FILE, fs.lstatSync(C.BUILD_FILE).mode);
    grunt.log.ok();
  });

  // lint and test node and titanium
  grunt.registerTask('default', ['clean', 'jshint', 'mochaTest', '_build', 'clean', 'ti_run']);

};

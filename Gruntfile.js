var build = require('./lib/build'),
  C = require('./lib/constants'),
  fs = require('fs'),
  path = require('path');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      options: {
        require: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        reporter: 'spec'
      },
      src: ['test/*_test.js']
    },
    jshint: {
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 4,
        latedef: 'nofunc',
        newcap: true,
        noarg: true,
        nonew: true,
        undef: true,
        unused: true,
        trailing: true,
        loopfunc: true,
        proto: true,
        node: true,
        '-W104': true, // 'const' is only available in JavaScript 1.7
        '-W068': true  // Wrapping non-IIFE function literals in parens is unnecessary
      },
      tests: {
        options: {
          expr: true,
          unused: false,
          globals: {
            describe: false,
            it: false,
            before: false,
            beforeEach: false,
            after: false,
            afterEach: false
          }
        },
        src: ['test/*_test.js']
      },
      src: ['lib/*.js']
    },
    clean: {
      src: ['build']
    },
    uglify: {
      'ti-mocha': {
        files: {
          'ti-mocha.min.js': ['ti-mocha.js']
        }
      }
    }
  });

  // Load grunt plugins for modules
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

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

  // run tests
  grunt.registerTask('test', ['mochaTest', 'clean']);

  // release
  grunt.registerTask('build', ['jshint', 'mochaTest', '_build', 'uglify:ti-mocha', 'clean']);

  // Register tasks
  grunt.registerTask('default', ['jshint', 'test']);

};

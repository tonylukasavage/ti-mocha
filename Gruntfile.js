var build = require('./lib/build'),
  C = require('./lib/constants'),
  fs = require('fs'),
  install = require('./lib/install'),
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
    titanium: {
      create: {
        options: {
          command: 'create',
          name: 'tmp',
          workspaceDir: '.'
        }
      },
      build: {
        options: {
          command: 'build',
          projectDir: path.resolve('tmp')
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

  // install in a Titanium project, if present
  grunt.registerTask('install', function(dir) {
    var location = install(dir);
    if (location) {
      grunt.log.ok('ti-mocha.js installed to ' + location);
    } else {
      grunt.log.debug(dir + ' is not a Titanium project, skipping...');
    }
  });

  // run a test app with ti-mocha
  grunt.registerTask('setup-run', function() {
    grunt.file.copy(C.RELEASE_FILE, path.resolve('tmp', 'Resources', 'ti-mocha.js'));
    grunt.file.copy(path.resolve('test', 'app.js'), path.resolve('tmp', 'Resources', 'app.js'));
  });

  // run tests
  grunt.registerTask('test', ['mochaTest', 'clean']);

  // release
  grunt.registerTask('build', ['jshint', 'mochaTest', '_build', 'clean']);

  // release and run
  grunt.registerTask('run', ['build', 'titanium:create', 'setup-run', 'titanium:build']);

  // Register tasks
  grunt.registerTask('default', ['build']);

};

var fs = require('fs'),
	install = require('../lib/install'),
	path = require('path'),
	should = require('should'),
	wrench = require('wrench');

var tmpDir = path.join(__dirname, '..', 'tmp');

describe('install.js', function() {

	describe('#install', function() {

		before(function() {
			wrench.mkdirSyncRecursive(tmpDir, 0755);
		});

		it('adds ti-mocha.js to Resources folder', function() {
			var resourcesDir = path.join(tmpDir, 'Resources');
			wrench.mkdirSyncRecursive(resourcesDir, 0755);
			var location = install(tmpDir);
			should.exist(location);
			location.should.equal(resourcesDir);
			fs.existsSync(path.join(resourcesDir, 'ti-mocha.js')).should.be.true;
		});

		it('adds ti-mocha.js to app/lib folder (no lib folder)', function() {
			var libDir = path.join(tmpDir, 'app');
			wrench.mkdirSyncRecursive(libDir, 0755);
			var location = install(tmpDir);
			should.exist(location);
			location.should.equal(path.join(libDir, 'lib'));
			fs.existsSync(path.join(libDir, 'lib', 'ti-mocha.js')).should.be.true;
			wrench.rmdirSyncRecursive(libDir, true);
		});

		it('adds ti-mocha.js to app/lib folder', function() {
			var libDir = path.join(tmpDir, 'app', 'lib');
			wrench.mkdirSyncRecursive(libDir, 0755);
			var location = install(tmpDir);
			should.exist(location);
			location.should.equal(libDir);
			fs.existsSync(path.join(libDir, 'ti-mocha.js')).should.be.true;
		});

		it('quietly exits when there\'s nothing to install', function() {
			var location = install();
			should.not.exist(location);
			fs.existsSync(path.join('.', 'Resources', 'ti-mocha.js')).should.be.false;
			fs.existsSync(path.join('.', 'app', 'lib', 'ti-mocha.js')).should.be.false;
		});

		after(function() {
			wrench.rmdirSyncRecursive(tmpDir, true);
		});

	});

});

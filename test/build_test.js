var build = require('../lib/build'),
	C = require('../lib/constants'),
	fs = require('fs'),
	path = require('path');

describe('build.js', function() {

	describe('#build', function() {

		it('has mocha.js.template', function() {
			fs.existsSync(C.TEMPLATE_FILE).should.be.true;
		});

		it('parses template and creates ' + C.NAME + ' successfully', function() {
			(function() {
				build();
			}).should.not.throw();
			fs.existsSync(C.BUILD_FILE).should.be.true;
		});

	});

});
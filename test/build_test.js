var acorn = require('acorn'),
	build = require('../lib/build'),
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

		it('generates valid Javascript for ' + C.NAME, function() {
			var ast = acorn.parse(fs.readFileSync(C.BUILD_FILE), 'utf8');
			ast.start.should.be.a.Number;
			ast.end.should.be.a.Number;
			ast.body.should.be.an.Array;
		});

	});

});

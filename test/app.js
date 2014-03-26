require('ti-mocha');

var runner;

describe('ti-mocha', function() {

	describe('suite 1', function() {

		it('this is a passing test', function(){});

		it('this is a pending test');

		it('this should fail', function() { throw new Error('I was supposed to fail'); });

	});

	describe('another suite', function() {

		it('passing test 1', function(){});

		it('passing test 2', function(){});

		it('passing test 3', function(){});

		it('passing test 4', function(){});

		it('one more pending test');

	});

});

Ti.API.info('');
Ti.API.info('**** FIRST TESTS ****');
Ti.API.info('');

runner = mocha.run(function() {
	Ti.API.info('This runtime test passed if the test suite ran and generated the following report: ');
	Ti.API.info(JSON.stringify({
		passed: 5,
		pending: 2,
		failed: 1
	}, null, '  '));
});

runner.on('end', function() {
	require('ti-mocha');

	var outputFile;

	describe('ti-mocha with file', function() {

		describe('suite 1', function() {

			it('this is a passing test', function(){});

			it('this is a pending test');

			it('this should fail', function() { throw new Error('I was supposed to fail'); });

		});

		describe('another suite', function() {

			it('passing test 1', function(){});

			it('passing test 2', function(){});

			it('passing test 3', function(){});

			it('passing test 4', function(){});

			it('one more pending test');

		});

	});

	outputFile = Titanium.Filesystem.getFile(Titanium.Filesystem.tempDirectory, 'test-reports.xml');
	// if it already exists, clear it out and recreate it
	if (outputFile.exists()) {
		outputFile.deleteFile();
	}
	outputFile.createFile();

	mocha.setup({
		reporter: 'xunit',
		outputFile: outputFile
	});

	Ti.API.info('');
	Ti.API.info('**** SECOND TESTS ****');
	Ti.API.info('');

	mocha.run(function() {
		Ti.API.info('');
		Ti.API.info('This runtime test passed if the test suite ran and generated the following report: ');
		Ti.API.info('tests="8" failures="1" errors="1" skipped="2"');
		Ti.API.info('And the report shown above was contained in the file: ' + Titanium.Filesystem.tempDirectory + 'test-reports.xml');
	});
});

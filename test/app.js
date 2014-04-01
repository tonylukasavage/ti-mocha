require('ti-mocha');

var outputFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'results.json');
if (outputFile.exists()) {
	outputFile.deleteFile();
}
outputFile.createFile();

mocha.setup({
	reporter: 'ti-json',
	outputFile: outputFile
});

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

var runner = mocha.run(function() {
	verify(runner.results.stats, 'runner.results');
	verify(JSON.parse(outputFile.read().text).stats, 'outputFile');
});

function verify(o, prefix) {
	if (o.passes === 5 && o.failures === 1 && o.pending === 2) {
		Ti.API.info('[' + prefix + '] ti-mocha tests ran successfully.');
	} else {
		Ti.API.error('[' + prefix + '] ti-mocha tests failed.');
		Ti.API.error('expected: ' + JSON.stringify({passes:5,pending:2,failures:1}));
		Ti.API.error('actual:   ' + JSON.stringify(o));
	}
}

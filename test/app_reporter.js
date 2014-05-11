require('ti-mocha');

mocha.setup({
	reporter: 'landing'
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
	console.log('***** TEST RESULTS *****');
	// verify(runner.results.stats, 'runner.results');
	// verify(JSON.parse(outputFile.read().text).stats, 'outputFile');
});


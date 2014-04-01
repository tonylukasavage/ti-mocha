require('ti-mocha');

mocha.setup({ reporter: 'ti-json' });

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

mocha.run(function(results) {
	if (results.stats.passes === 5 && results.stats.failures === 1 && results.stats.pending === 2) {
		Ti.API.info('ti-mocha tests ran successfully.');
	} else {
		Ti.API.error('ti-mocha tests failed.');
		Ti.API.error('expected: ' + JSON.stringify({passes:5,pending:2,failures:1}));
		Ti.API.error('actual:   ' + JSON.stringify(results.stats));
	}
});

require('ti-mocha');

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

mocha.run(function() {
	Ti.API.info('This runtime test passed if the test suite ran and generated the following report: ');
	Ti.API.info(JSON.stringify({
		passed: 5,
		pending: 2,
		failed: 1
	}, null, '  '));
});

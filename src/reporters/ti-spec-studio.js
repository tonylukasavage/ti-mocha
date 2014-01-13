// Create a titanium compatible reporter based on spec
require.register("reporters/ti-spec-studio.js", function(module, exports, require){

	/**
	 * Module dependencies.
	 */

	var Base = require('./base'),
		cursor = require('titanium/util').cursor;

	/**
	 * Expose `Spec`.
	 */

	exports = module.exports = TiSpecStudio;

	/**
	 * Initialize a new `TiSpecStudio` test reporter.
	 *
	 * @param {Runner} runner
	 * @api public
	 */

	function TiSpecStudio(runner) {
		Base.call(this, runner);

		var self = this,
			stats = this.stats,
			indents = 0,
			n = 0;

		function NL() {
			Ti.API.info(cursor.reset + ' ' + cursor.reset);
		}

		function indent() {
			return cursor.reset + new Array(indents).join('  ') + cursor.reset;
		}

		runner.on('start', function(){
			NL();
		});

		runner.on('suite', function(suite){
			++indents;
			Ti.API.info(indent() + suite.title);
		});

		runner.on('suite end', function(suite){
			--indents;
			if (1 === indents) { NL(); }
		});

		runner.on('pending', function(test){
			Ti.API.warn(indent() + '  - ' + test.title + ' (pending)');
		});

		runner.on('pass', function(test){
			if ('fast' === test.speed) {
				Ti.API.info(indent() + '  + ' + test.title);
			} else {
				Ti.API.info(indent() + '  + ' + test.title + ' (' + test.duration + 'ms)');
			}
		});

		runner.on('fail', function(test, err){
			Ti.API.error(indent() + '  ' + (++n) + ') ' + test.title);
		});

		runner.on('end', function() {
			self.epilogue();
		});
	}

	/**
	 * Inherit from `Base.prototype`.
	 */

	function F(){}
	F.prototype = Base.prototype;
	TiSpecStudio.prototype = new F();
	TiSpecStudio.prototype.constructor = TiSpecStudio;

}); // module: reporters/ti-spec-studio.js

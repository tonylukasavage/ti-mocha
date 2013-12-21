
require.register("reporters/ti-spec.js", function(module, exports, require){

/**
 * Module dependencies.
 */

var Base = require('./base'),
	cursor = Base.cursor,
	color = Base.color;

/**
 * Expose `Spec`.
 */

exports = module.exports = TiSpec;

/**
 * Initialize a new `TiSpec` test reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function TiSpec(runner) {
	Base.call(this, runner);

	var self = this,
		stats = this.stats,
		indents = 0,
		n = 0;

	function indent() {
		return new Array(indents).join('  ');
	}

	runner.on('start', function(){
		console.log();
	});

	runner.on('suite', function(suite){
		++indents;
		//console.log(color('suite', '%s%s'), indent(), suite.title);
		console.log(color('suite', indent() + suite.title));
	});

	runner.on('suite end', function(suite){
		--indents;
		if (1 === indents) { console.log(); }
	});

	runner.on('test', function(test){
		//process.stdout.write(indent() + color('pass', '  ◦ ' + test.title + ': '));
	});

	runner.on('pending', function(test){
		//var fmt = indent() + color('pending', '  - %s');
		//console.log(fmt, test.title);
		console.log(indent() + color('pending', '  - ' + test.title));
	});

	runner.on('pass', function(test){
		if ('fast' === test.speed) {
			console.log(indent() + color('checkmark', '  ' + Base.symbols.ok) + color('pass', ' ' + test.title + ' '));
		} else {
			console.log(indent() + color('checkmark', '  ' + Base.symbols.ok) + color('pass', ' ' + test.title + ' ') +
				color(test.speed, '(' + test.duration + 'ms)'));
		}
		// if ('fast' == test.speed) {
		// 	var fmt = indent()
		// 		+ color('checkmark', '  ' + Base.symbols.ok)
		// 		+ color('pass', ' %s ');
		// 	cursor.CR();
		// 	console.log(fmt, test.title);
		// } else {
		// 	var fmt = indent()
		// 		+ color('checkmark', '  ' + Base.symbols.ok)
		// 		+ color('pass', ' %s ')
		// 		+ color(test.speed, '(%dms)');
		// 	cursor.CR();
		// 	console.log(fmt, test.title, test.duration);
		// }
	});

	runner.on('fail', function(test, err){
		// cursor.CR();
		// console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);
		console.log(indent() + color('fail', '  ' + (++n) + ') ' + test.title));
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
TiSpec.prototype = new F();
TiSpec.prototype.constructor = TiSpec;

}); // module: reporters/ti-spec.js

if (typeof Titanium !== 'undefined') {

	// stub location
	global.location = {};

}

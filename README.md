# ti-mocha

Simple and reliable support for [mocha](https://github.com/visionmedia/mocha) testing with Appcelerator's [Titanium](http://www.appcelerator.com/titanium/) SDK.

Essentially, it takes mocha's existing browser-compatible build, makes a few Titanium-specific modifications, adds a Titanium compatible reporter, and it's good to go. The goal is to make the modifications to mocha as sminimal as possible in order to make maintaining ti-mocha's stability and version parity very easy.

## Installation

1. Download [ti-mocha.js](downloads).
2. Copy `ti-mocha.js` into your project's `Resources` folder.

## Usage

```javascript
require('ti-mocha');

describe('ti-mocha', function() {
	it('works!');
});
```

## Development

1. Install [node.js]().
2. Install [grunt](): `sudo npm install -g grunt-cli`
3. `cd ti-mocha && npm install`

#### Build

```
grunt build
```

This process will generate a new `ti-mocha.js` file based on the `mocha.js` file in the `ti-mocha` folder. It will also create a minified `ti-mocha.min.js` file.

#### Testing

```
grunt test
```

## Contributing

If something breaks, particularly if you encounter issues on specific mobile platforms, or if you have a way to make this better, please log an [issue](https://github.com/tonylukasavage/ti-mocha/issues). Bear in mind that this is a straight-up, minimal porting effort to make mocha work with Titanium. If you want additional features or functionality in mocha itself, please report them in the [mocha](https://github.com/visionmedia/mocha) repository.

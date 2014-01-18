# ti-mocha [![NPM version](https://badge.fury.io/js/ti-mocha.png)](http://badge.fury.io/js/ti-mocha) [![Build Status](https://travis-ci.org/tonylukasavage/ti-mocha.png?branch=master)](https://travis-ci.org/tonylukasavage/ti-mocha) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Simple and reliable support for [mocha](https://github.com/visionmedia/mocha) testing with Appcelerator's [Titanium](http://www.appcelerator.com/titanium/) SDK.

## Full Documentation and Samples

[http://tonylukasavage.com/ti-mocha/](http://tonylukasavage.com/ti-mocha/)

## Quick Start

```
cd /path/to/Titanium/project && npm install ti-mocha
```

## Contributing

1. Install [node.js](http://nodejs.org/).
2. Install [grunt](http://gruntjs.com/): `[sudo] npm install -g grunt-cli`
3. `git clone https://github.com/tonylukasavage/ti-mocha.git && cd ti-mocha && npm install`

#### Basic Build

```
grunt build
```

This process will generate a new `./ti-mocha.js` file based on the files in `src`, as well as the source mocha.js file found at `./node_modules/mocha/mocha.js` after you execute `npm install`. See [lib/build.js](lib/build.js) for details of the build process. Please note that _no_ modifications are made directly to the source mocha.js file.

#### Build for Different Version of Mocha

1. Change version of mocha in the package.json `devDependencies`
2. `npm install`
3. `grunt build`

## Issues

Please report issues, new features/reporters, or requests in this repo's [issue tracker](https://github.com/tonylukasavage/ti-mocha/issues). Bear in mind that this is a straight-up, minimal porting effort to make mocha work with Titanium. If you want additional features or functionality in mocha itself, please report them in the [mocha](https://github.com/visionmedia/mocha) repository.

## License

Distributed under [MIT License](LICENSE).

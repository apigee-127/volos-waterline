volos-waterline is a Volos connector for using [Waterline](https://github.com/balderdashy/waterline).

## Project Badges

* Build status: [![Build Status](https://travis-ci.org/apigee-127/volos-waterline.svg)](https://travis-ci.org/apigee-127/volos-waterline)
* Dependencies: [![Dependencies](https://david-dm.org/apigee-127/volos-waterline.svg)](https://david-dm.org/apigee-127/volos-waterline)
* Developer dependencies: [![Dev Dependencies](https://david-dm.org/apigee-127/volos-waterline/dev-status.svg)](https://david-dm.org/apigee-127/volos-waterline#info=devDependencies&view=table)
* Downloads: [![NPM Downloads Per Month](http://img.shields.io/npm/dm/volos-waterline.svg?style=flat)](https://www.npmjs.org/package/volos-waterline)
* License: [![License](http://img.shields.io/npm/l/volos-waterline.svg?style=flat)](https://github.com/apigee-127/volos-waterline/blob/master/LICENSE)
* NPM Version: [![NPM Version](http://img.shields.io/npm/v/volos-waterline.svg?style=flat)](https://www.npmjs.org/package/volos-waterline)

## Installation

volos-waterline is distributed via [NPM][npm] so installation is the usual: `npm install volos-waterline --save`.

## Usage

Right now volos-waterline is a very lightweight wrapper around Waterline so the only method available is
`initialize(config, callback)`.  Here is ane example usage:

```js
var vw = require('volos-waterline');
var Waterline = require('waterline');

var config = {
  adapters: {
    localDisk: require('sails-disk')
  },
  collections: {
    Users: Waterline.Collection.extend({
      connection: 'localDisk',
      identity: 'users',

      attributes: {
        email: {
          type: 'email',
          required: true,
          maxLength: 128
        },
        firstName: {
          columnName: 'first_name',
          defaultsTo: 'Anonymous',
          type: 'string',
          maxLength: 64,
          minLength: 2
        },
        lastName: {
          columnName: 'last_name',
          defaultsTo: 'User',
          type: 'string',
          maxLength: 64,
          minLength: 2
        },
        username: {
          type: 'string',
          regex: /^[a-z0-9_-]{4,24}$/,
          required: true,
          unique: true
        }
      }
    })
  },
  connections: {
    localDisk: {
      adapter: 'localDisk'
    }
  }
};

vw.initialize(config, function (err, details) {
  if (err) throw err;

  // Use your adapters, collections, connections and waterline
});
```

## Contributing

This project uses [Gulp][gulp] for building so `npm install -g gulp` once you clone this project.  Running `gulp` in the
project root will lint check the source code and run the unit tests.

[gulp]: http://gulpjs.com/
[npm]: https://www.npmjs.org/

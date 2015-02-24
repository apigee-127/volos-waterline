/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Apigee Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A thin wrapper on top of Waterline.
 *
 * @module volos-waterline
 */

'use strict';

var Waterline = require('waterline');

/**
 * This is an error-first callback used for {@link #initialize}.
 *
 * @callback initCallback
 *
 * @param {error} [err] - The error, if any
 * @param {object} details - The Waterline details
 * @param {object} details.adapters - The Waterline adapters
 * @param {object} details.collections - The Waterline collections
 * @param {object} details.connections - The Waterline connections
 * @param {object} details.waterline - The Waterline instance
 */

/**
 * Function used to initialize Waterline.  (Basically a wrapper for Waterline#initialize)
 *
 * @param {object} config - The configuration (This is a mix between Waterline and Volos configuration)
 * @param {object} config.adapters - The Waterline adapter configuration
 * @param {object} [config.collections] - The Waterline collections configuration
 * @param {object} config.connections - The Waterline connections configuration
 * @param {initCallback} cb - The callback to invoke when done initializing
 *
 */
module.exports.initialize = function (config, cb) {
  var orm = new Waterline();

  orm.initialize(config, function (err, details) {
    // This is just to be safe as I've been unable to trigger an error at this level
    if (typeof details !== 'undefined') {
      details.adapters = config.adapters; // Since Waterline doesn't provide them back to you
      details.waterline = orm; // Since you might want to use Waterline APIs, like `teardown` to shut down
    }

    cb(err, details);
  });
};

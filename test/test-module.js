/* global afterEach, beforeEach, describe, it */

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

var del = require('del');
var path = require('path');
var should = require('should');
var volosWaterline = require('..');
var Waterline = require('waterline');

describe('volos-waterline', function () {
  var config;
  var waterline;

  it('should expose proper module.exports', function () {
    volosWaterline.should.be.an.instanceOf(Object);
    volosWaterline.initialize.should.be.an.instanceOf(Function);
    Object.keys(volosWaterline).should.have.length(1);
  });

  beforeEach(function () {
    config = {
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
  });

  afterEach(function (done) {
    del.sync([path.join(__dirname, '..', '.tmp')]);

    if (typeof waterline !== 'undefined') {
      waterline.teardown(done);
    } else {
      done();
    }
  });

  describe('#initialize', function () {
    it('should provide initialize and provide details', function (done) {
      volosWaterline.initialize(config, function (err, details) {
        should.not.exist(err);

        details.adapters.should.be.an.instanceOf(Object);
        details.adapters.should.have.keys(['localDisk']);

        details.collections.should.be.an.instanceOf(Object);
        details.collections.should.have.keys(['users']);

        details.connections.should.be.an.instanceOf(Object);
        details.connections.should.have.keys(['localDisk']);

        details.waterline.should.be.an.instanceOf(Waterline);

        waterline = details.waterline;

        done();
      });
    });
  });
});

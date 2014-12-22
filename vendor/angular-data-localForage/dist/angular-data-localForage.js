!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.DSLocalForageAdapter=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    var isArray = Array.isArray || function (val) {
        return isKind(val, 'Array');
    };
    module.exports = isArray;


},{"./isKind":2}],2:[function(require,module,exports){
var kindOf = require('./kindOf');
    /**
     * Check if value is from a specific "kind".
     */
    function isKind(val, kind){
        return kindOf(val) === kind;
    }
    module.exports = isKind;


},{"./kindOf":3}],3:[function(require,module,exports){


    var _rKind = /^\[object (.*)\]$/,
        _toString = Object.prototype.toString,
        UNDEF;

    /**
     * Gets the "kind" of value. (e.g. "String", "Number", etc)
     */
    function kindOf(val) {
        if (val === null) {
            return 'Null';
        } else if (val === UNDEF) {
            return 'Undefined';
        } else {
            return _rKind.exec( _toString.call(val) )[1];
        }
    }
    module.exports = kindOf;


},{}],4:[function(require,module,exports){
/**
 * @constant Maximum 32-bit signed integer value. (2^31 - 1)
 */

    module.exports = 2147483647;


},{}],5:[function(require,module,exports){
/**
 * @constant Minimum 32-bit signed integer value (-2^31).
 */

    module.exports = -2147483648;


},{}],6:[function(require,module,exports){
var randInt = require('./randInt');
var isArray = require('../lang/isArray');

    /**
     * Returns a random element from the supplied arguments
     * or from the array (if single argument is an array).
     */
    function choice(items) {
        var target = (arguments.length === 1 && isArray(items))? items : arguments;
        return target[ randInt(0, target.length - 1) ];
    }

    module.exports = choice;



},{"../lang/isArray":1,"./randInt":10}],7:[function(require,module,exports){
var randHex = require('./randHex');
var choice = require('./choice');

  /**
   * Returns pseudo-random guid (UUID v4)
   * IMPORTANT: it's not totally "safe" since randHex/choice uses Math.random
   * by default and sequences can be predicted in some cases. See the
   * "random/random" documentation for more info about it and how to replace
   * the default PRNG.
   */
  function guid() {
    return (
        randHex(8)+'-'+
        randHex(4)+'-'+
        // v4 UUID always contain "4" at this position to specify it was
        // randomly generated
        '4' + randHex(3) +'-'+
        // v4 UUID always contain chars [a,b,8,9] at this position
        choice(8, 9, 'a', 'b') + randHex(3)+'-'+
        randHex(12)
    );
  }
  module.exports = guid;


},{"./choice":6,"./randHex":9}],8:[function(require,module,exports){
var random = require('./random');
var MIN_INT = require('../number/MIN_INT');
var MAX_INT = require('../number/MAX_INT');

    /**
     * Returns random number inside range
     */
    function rand(min, max){
        min = min == null? MIN_INT : min;
        max = max == null? MAX_INT : max;
        return min + (max - min) * random();
    }

    module.exports = rand;


},{"../number/MAX_INT":4,"../number/MIN_INT":5,"./random":11}],9:[function(require,module,exports){
var choice = require('./choice');

    var _chars = '0123456789abcdef'.split('');

    /**
     * Returns a random hexadecimal string
     */
    function randHex(size){
        size = size && size > 0? size : 6;
        var str = '';
        while (size--) {
            str += choice(_chars);
        }
        return str;
    }

    module.exports = randHex;



},{"./choice":6}],10:[function(require,module,exports){
var MIN_INT = require('../number/MIN_INT');
var MAX_INT = require('../number/MAX_INT');
var rand = require('./rand');

    /**
     * Gets random integer inside range or snap to min/max values.
     */
    function randInt(min, max){
        min = min == null? MIN_INT : ~~min;
        max = max == null? MAX_INT : ~~max;
        // can't be max + 0.5 otherwise it will round up if `rand`
        // returns `max` causing it to overflow range.
        // -0.5 and + 0.49 are required to avoid bias caused by rounding
        return Math.round( rand(min - 0.5, max + 0.499999999999) );
    }

    module.exports = randInt;


},{"../number/MAX_INT":4,"../number/MIN_INT":5,"./rand":8}],11:[function(require,module,exports){


    /**
     * Just a wrapper to Math.random. No methods inside mout/random should call
     * Math.random() directly so we can inject the pseudo-random number
     * generator if needed (ie. in case we need a seeded random or a better
     * algorithm than the native one)
     */
    function random(){
        return random.get();
    }

    // we expose the method so it can be swapped if needed
    random.get = Math.random;

    module.exports = random;



},{}],12:[function(require,module,exports){
var guid = require('mout/random/guid');

/**
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @file angular-data-localforage.js
 * @version 1.0.0 - Homepage <https://github.com/jmdobry/angular-data-localForage/>
 * @copyright (c) 2014 Jason Dobry <https://github.com/jmdobry/>
 * @license MIT <https://github.com/jmdobry/angular-data-localForage/blob/master/LICENSE>
 *
 * @overview localforage adapter for angular-data.
 */
(function (window, angular, localforage, undefined) {
  'use strict';

  localforage.config({
    name: 'DS'
  });

  /**
   * @doc function
   * @id DSLocalForageAdapterProvider
   * @name DSLocalForageAdapterProvider
   */
  function DSLocalForageAdapterProvider() {

    this.$get = ['DSUtils', '$q', 'DS', '$rootScope', function (DSUtils, $q, DS, $rootScope) {

      function resolve(deferred, v) {
        if (!$rootScope.$$phase) {
          return $rootScope.$apply(function () {
            return deferred.resolve(v);
          });
        } else {
          return deferred.resolve(v);
        }
      }

      function reject(deferred, e) {
        if (!$rootScope.$$phase) {
          return $rootScope.$apply(function () {
            return deferred.reject(e);
          });
        } else {
          return deferred.reject(e);
        }
      }

      /**
       * @doc interface
       * @id DSLocalForageAdapter
       * @name DSLocalForageAdapter
       * @description
       * Default adapter used by angular-data. This adapter uses AJAX and JSON to send/retrieve data to/from a server.
       * Developers may provide custom adapters that implement the adapter interface.
       */
      return {
        getPath: function (resourceConfig, options) {
          return DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.name);
        },

        getIdPath: function (resourceConfig, options, id) {
          return DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id);
        },

        getIds: function (resourceConfig, options) {
          var idsPath = this.getPath(resourceConfig, options);
          var deferred = $q.defer();
          localforage.getItem(idsPath, function (err, ids) {
            if (err) {
              return reject(deferred, err);
            } else if (ids) {
              return resolve(deferred, ids);
            } else {
              return localforage.setItem(idsPath, {}, function (err, v) {
                if (err) {
                  reject(deferred, err);
                } else {
                  resolve(deferred, v);
                }
              });
            }
          });
          return deferred.promise;
        },

        saveKeys: function (ids, resourceConfig, options) {
          var keysPath = this.getPath(resourceConfig, options);
          var deferred = $q.defer();
          localforage.setItem(keysPath, ids, function (err, v) {
            if (err) {
              reject(deferred, err);
            } else {
              resolve(deferred, v);
            }
          });
          return deferred.promise;
        },

        ensureId: function (id, resourceConfig, options) {
          var _this = this;
          return _this.getIds(resourceConfig, options).then(function (ids) {
            ids[id] = 1;
            return _this.saveKeys(ids, resourceConfig, options);
          });
        },

        removeId: function (id, resourceConfig, options) {
          var _this = this;
          return _this.getIds(resourceConfig, options).then(function (ids) {
            delete ids[id];
            return _this.saveKeys(ids, resourceConfig, options);
          });
        },

        GET: function (key) {
          var deferred = $q.defer();
          localforage.getItem(key, function (err, v) {
            if (err) {
              reject(deferred, err);
            } else {
              resolve(deferred, v);
            }
          });
          return deferred.promise;
        },

        PUT: function (key, value) {
          var deferred = $q.defer();
          localforage.setItem(key, value, function (err, v) {
            if (err) {
              reject(deferred, err);
            } else {
              resolve(deferred, v);
            }
          });
          return deferred.promise;
        },

        DEL: function (key) {
          var deferred = $q.defer();
          localforage.removeItem(key, function (err, v) {
            if (err) {
              return reject(deferred, err);
            } else {
              return resolve(deferred, v);
            }
          });
          return deferred.promise;
        },

        /**
         * @doc method
         * @id DSLocalForageAdapter.methods:find
         * @name find
         * @description
         * Retrieve a single entity from localforage.
         *
         * @param {object} resourceConfig Properties:
         * - `{string}` - `baseUrl` - Base url.
         * - `{string=}` - `namespace` - Namespace path for the resource.
         * @param {string|number} id The primary key of the entity to retrieve.
         * @returns {Promise} Promise.
         */
        find: function (resourceConfig, id, options) {
          options = options || {};
          return this.GET(this.getIdPath(resourceConfig, options, id)).then(function (item) {
            if (!item) {
              return $q.reject(new Error('Not Found!'));
            } else {
              return item;
            }
          });
        },

        /**
         * @doc method
         * @id DSLocalForageAdapter.methods:findAll
         * @name findAll
         * @description
         * Retrieve a collection of entities from localforage.
         */
        findAll: function (resourceConfig, params, options) {
          var _this = this;
          options = options || {};
          return _this.getIds(resourceConfig, options).then(function (ids) {
            var idsArray = DSUtils.keys(ids);
            if (!('allowSimpleWhere' in options)) {
              options.allowSimpleWhere = true;
            }
            var tasks = [];
            DSUtils.forEach(idsArray, function (id) {
              tasks.push(_this.GET(_this.getIdPath(resourceConfig, options, id)));
            });
            return $q.all(tasks);
          }).then(function (items) {
            return DS.defaults.defaultFilter.call(DS, items, resourceConfig.name, params, options);
          });
        },

        /**
         * @doc method
         * @id DSLocalForageAdapter.methods:create
         * @name create
         * @description
         */
        create: function (resourceConfig, attrs, options) {
          var _this = this;
          var i;
          attrs[resourceConfig.idAttribute] = attrs[resourceConfig.idAttribute] || guid();
          options = options || {};
          return _this.PUT(
            DSUtils.makePath(this.getIdPath(resourceConfig, options, attrs[resourceConfig.idAttribute])),
            attrs
          ).then(function (item) {
              i = item;
              return _this.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
            }).then(function () {
              return i;
            });
        },

        /**
         * @doc method
         * @id DSLocalForageAdapter.methods:update
         * @name update
         * @description
         * Update an entity in localforage.
         *
         * @param {object} resourceConfig Properties:
         * - `{string}` - `baseUrl` - Base url.
         * - `{string=}` - `namespace` - Namespace path for the resource.
         * @param {string|number} id The primary key of the entity to update.
         * @param {object} attrs The attributes with which to update the entity.
         * @returns {Promise} Promise.
         */
        update: function (resourceConfig, id, attrs, options) {
          var _this = this;
          var i, item;
          options = options || {};
          var path = _this.getIdPath(resourceConfig, options, id);
          return _this.GET(path).then(function (it) {
            if (it) {
              item = it;
              DSUtils.deepMixIn(item, attrs);
            }
            return _this.PUT(path, item || attrs);
          }).then(function () {
            i = item;
            return _this.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
          }).then(function () {
            return i;
          });
        },

        /**
         * @doc method
         * @id DSLocalForageAdapter.methods:updateAll
         * @name updateAll
         * @description
         * Update a collection of entities in localforage.
         */
        updateAll: function (resourceConfig, attrs, params, options) {
          var _this = this;
          return _this.findAll(resourceConfig, params, options).then(function (items) {
            var tasks = [];
            DSUtils.forEach(items, function (item) {
              tasks.push(_this.update(resourceConfig, item[resourceConfig.idAttribute], attrs, options));
            });
            return $q.all(tasks);
          });
        },

        /**
         * @doc method
         * @id DSLocalForageAdapter.methods:destroy
         * @name destroy
         * @description
         * Remove an entity in localforage.
         *
         * @param {object} resourceConfig Properties:
         * - `{string}` - `baseUrl` - Base url.
         * - `{string=}` - `namespace` - Namespace path for the resource.
         * @param {string|number} id The primary key of the entity to destroy.
         * @returns {Promise} Promise.
         */
        destroy: function (resourceConfig, id, options) {
          var _this = this;
          options = options || {};
          return _this.DEL(_this.getIdPath(resourceConfig, options, id)).then(function () {
            return _this.removeId(id, resourceConfig, options);
          }).then(function () {
            return null;
          });
        },

        /**
         * @doc method
         * @id DSLocalForageAdapter.methods:destroyAll
         * @name destroyAll
         * @description
         * Not supported.
         */
        destroyAll: function (resourceConfig, params, options) {
          var _this = this;
          return _this.findAll(resourceConfig, params, options).then(function (items) {
            var tasks = [];
            DSUtils.forEach(items, function (item) {
              tasks.push(_this.destroy(resourceConfig, item[resourceConfig.idAttribute], options));
            });
            return $q.all(tasks);
          });
        }
      };
    }];
  }

  angular.module('angular-data.DS').provider('DSLocalForageAdapter', DSLocalForageAdapterProvider);

})(window, window.angular, window.localforage);

},{"mout/random/guid":7}]},{},[12])(12)
});
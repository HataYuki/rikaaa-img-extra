(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /**
   * @license
   * rikaaa-IntersectionWatcher.js
   *
   * Generated : 2019-07-19
   * Version : 0.5.0
   * Author : rikaaa.org | Yuki Hata
   * Url : http://rikaaa.org
   *
   *
   * The MIT License (MIT)
   *
   * Copyright 2019 rikaaa.org | Yuki Hata
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var isIntersecting_1 = createCommonjsModule(function (module, exports) {
    // import map from './map';
    // import constrain from './constrain';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var isIntersecting =
    /** @class */
    function () {
      function isIntersecting() {}

      isIntersecting.is = function (target, root, rootMargin) {
        if (rootMargin === void 0) {
          rootMargin = '0px';
        }

        var parentTree = isIntersecting.computeParentNode(root, target);
        if (parentTree === false) return false;
        var rectList = isIntersecting.computeCheckTargetRectList(root, parentTree, rootMargin);
        var targetRect = isIntersecting.getBoundingClientRect(target);
        var counter = 0;

        while (counter !== rectList.length) {
          var contanerRect = rectList[counter];

          if (contanerRect.width <= 0 || contanerRect.height <= 0) {
            return false;
          }

          if (contanerRect.bottom <= targetRect.top || contanerRect.top >= targetRect.bottom) {
            return false;
          }

          counter++;
        }

        return true;
      };

      isIntersecting.computeParentNode = function (root, target) {
        var rootNode = root ? root : document.documentElement;
        var tree = [];
        var html = document.documentElement;
        var parent = target;

        while (parent !== html) {
          parent = isIntersecting.getParentNode(parent);
          tree.push(parent);
        }

        if (!tree.includes(rootNode)) return false;
        return tree.splice(0, tree.indexOf(rootNode) + 1);
      };

      isIntersecting.computeCheckTargetRectList = function (root, parentTree, rootMargin) {
        var rootNode = root ? root : document.documentElement;
        var resultList = parentTree.map(function (parentNode) {
          if (parentNode !== rootNode) {
            return isIntersecting.getBoundingClientRect(parentNode);
          } else {
            return isIntersecting.getRootRect(parentNode, rootMargin);
          }
        });
        return resultList;
      };

      isIntersecting.getRootRect = function (rootNode, rootMargin) {
        var rect = null;
        var html = document.documentElement;

        if (rootNode !== html) {
          rect = isIntersecting.getBoundingClientRect(rootNode);
        } else {
          rect = {
            top: 0,
            bottom: html.clientHeight,
            right: html.clientWidth,
            left: 0,
            width: html.clientWidth,
            height: html.clientHeight
          };
        }

        return isIntersecting.applyRootMargin(rect, rootMargin);
      };

      isIntersecting.applyRootMargin = function (rect, rootMargin) {
        var margin = isIntersecting.parseRootMargin(rootMargin);
        var rectWidth = rect.width;
        var rectHeight = rect.height;
        var marginTop = margin.top[1] === 'px' ? margin.top[0] : rectHeight * margin.top[0] / 100;
        var marginBottom = margin.bottom[1] === 'px' ? margin.bottom[0] : rectHeight * margin.bottom[0] / 100;
        var marginRight = margin.right[1] === 'px' ? margin.right[0] : rectWidth * margin.right[0] / 100;
        var marginLeft = margin.left[1] === 'px' ? margin.left[0] : rectWidth * margin.left[0] / 100;
        var applyedRect = {
          top: rect.top - marginTop,
          bottom: rect.bottom + marginBottom,
          right: rect.right + marginRight,
          left: rect.left - marginLeft,
          width: 0,
          height: 0
        };
        applyedRect.width = applyedRect.right - applyedRect.left;
        applyedRect.height = applyedRect.bottom - applyedRect.top;
        return applyedRect;
      };

      isIntersecting.parseRootMargin = function (rootMargin) {
        var rootMarginArray = rootMargin.split(' ');

        var parser = function parser(rootMarginString) {
          return [parseFloat(rootMarginString), rootMarginString.match(/(px|%)/)[0]];
        };

        var result = {
          top: null,
          bottom: null,
          right: null,
          left: null
        };

        switch (rootMarginArray.length) {
          case 1:
            result.top = parser(rootMarginArray[0]);
            result.bottom = parser(rootMarginArray[0]);
            result.right = parser(rootMarginArray[0]);
            result.left = parser(rootMarginArray[0]);
            break;

          case 2:
            result.top = parser(rootMarginArray[0]);
            result.bottom = parser(rootMarginArray[0]);
            result.right = parser(rootMarginArray[1]);
            result.left = parser(rootMarginArray[1]);
            break;

          case 4:
            result.top = parser(rootMarginArray[0]);
            result.bottom = parser(rootMarginArray[2]);
            result.right = parser(rootMarginArray[1]);
            result.left = parser(rootMarginArray[3]);
            break;
        }

        return result;
      };

      isIntersecting.getParentNode = function (target) {
        var parent = target.parentNode;
        if (parent && parent.nodeType == 11 && parent.host) return parent.host;
        if (parent && parent.assignedSlot) return parent.assignedSlot.parentNode;
        return parent;
      };

      isIntersecting.getBoundingClientRect = function (target) {
        var empty = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        };
        var rect = null;

        try {
          return rect = target.getBoundingClientRect();
        } catch (error) {}

        if (rect === null) return empty;
      };

      return isIntersecting;
    }();

    exports.default = isIntersecting;
  });
  unwrapExports(isIntersecting_1);
  var IsDisplay = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (target) {
      var result = false;
      var style = target.currentStyle || getComputedStyle(target, '');
      result = style.display === 'none' ? false : true;
      return result;
    };
  });
  unwrapExports(IsDisplay);
  var onbang = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func) {
      var _func,
          allow = true;

      return function () {
        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        if (!allow) {
          func = null;
          return false;
        }

        _func = func.apply(this, arg);
        allow = false;
        return _func;
      };
    };
  });
  unwrapExports(onbang);
  var debounce = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func, interval) {
      var timer = null;
      return function () {
        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        clearTimeout(timer);
        timer = setTimeout(function () {
          return func.apply(this, arg);
        }, interval);
      };
    };
  });
  unwrapExports(debounce);
  var throttle = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func, interval) {
      var req = null;
      var startTime = null;
      var firstFunc = onbang.default(func);
      var lastFunc = debounce.default(func, interval);
      var clearFirstFunc = debounce.default(function () {
        firstFunc = onbang.default(func);
        startTime = null;
        cancelAnimationFrame(req);
      }, interval);
      return function () {
        var _this = this;

        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        firstFunc.apply(this, arg);
        req = requestAnimationFrame(function (timestamp) {
          if (startTime === null) startTime = timestamp;
          var elapsedTime = timestamp - startTime;

          if (elapsedTime >= interval) {
            startTime = null;
            cancelAnimationFrame(req);
            return func.apply(_this, arg);
          }
        });
        clearFirstFunc();
        return lastFunc.apply(this, arg);
      };
    };
  });
  unwrapExports(throttle);
  var valueObserver = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (firstVal, func, option) {
      if (option === void 0) {
        option = {
          observValKeyName: 'watch'
        };
      }

      var _func,
          _firstval = firstVal,
          _watchKeyName = option.observValKeyName;

      return function (_a) {
        _a = {};
        var originalArgument = [],
            watchVal = null;

        for (var i = 0; i < arguments.length; i++) {
          if (!arguments[i] || !(arguments[i].constructor == Object)) {
            originalArgument.push(arguments[i]);
          } else {
            watchVal = arguments[i][_watchKeyName];
            delete arguments[i][_watchKeyName];

            if (Object.keys(arguments[i]).length > 0) {
              originalArgument.push(arguments[i]);
            }
          }
        }

        if (_firstval === watchVal) {
          return false;
        }

        _firstval = watchVal;
        _func = func.apply(this, originalArgument);
        return _func;
      };
    };
  });
  unwrapExports(valueObserver);

  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function value(searchElement, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        } // 1. Let O be ? ToObject(this value).


        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If len is 0, return false.

        if (len === 0) {
          return false;
        } // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)


        var n = fromIndex | 0; // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.

        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        } // 7. Repeat, while k < len


        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          } // c. Increase k by 1. 


          k++;
        } // 8. Return false


        return false;
      }
    });
  }

  var Controller_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Controller =
    /** @class */
    function () {
      // public scrollbarbarThickness: Number | number = 0;
      function Controller() {
        this.instancesOfintersectionWatcher = [];
        this.targetsAll = [];
        this.scrollAreasOftargets = [];
        this.mutationObserverConfig = {
          childList: true,
          attributes: true,
          characterData: true,
          subtree: true
        };
        this.watcher_binded = throttle.default(Controller.watcher.bind(null, this), Controller.THROTTLE_INTERVAL);
        this.mo = new MutationObserver(this.watcher_binded); // this.scrollbarbarThickness = isIntersecting.getScrollbarThickness()

        this.firstCallback = debounce.default(onbang.default(function (entriesContaner) {
          entriesContaner.forEach(function (entries) {
            var callbackArg = entries.entries.map(function (entry) {
              var isDisplay = Controller.isDisplay(entry.target);
              if (isDisplay) return Object.freeze({
                target: entry.target,
                isIntersecting: entry.isIntersecting
              });
            }).filter(function (entry) {
              return typeof entry !== 'undefined';
            });
            if (callbackArg.length !== 0) entries.callback(callbackArg);
          });
        }), Controller.THROTTLE_INTERVAL);
      }

      Controller.prototype.init = function (instance) {
        this.instancesOfintersectionWatcher.push(instance);
      };

      Controller.prototype.observe = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.scrollAreasOftargets = Controller.updateScrollAreasOftargets(this.targetsAll);
        if (this.targetsAll.length !== 0) Controller.onWather(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
        this.firstCallback(this.entriesContaner);
      };

      Controller.prototype.unobserve = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
      };

      Controller.prototype.disconnect = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);

        if (this.targetsAll.length === 0) {
          Controller.offWather(this);
          this.scrollAreasOftargets = [];
        }
      };

      Controller.watcher = function (instanse) {
        instanse.entriesContaner.forEach(function (entries) {
          var callbackArg = entries.entries.map(function (entry) {
            var option = entries.option;
            var isDisplay = Controller.isDisplay(entry.target);
            var currentIntersecting = Controller.isIntersecting(entry.target, option.root, option.rootMargin);
            var isIntersectionChenge = entry.valueObserver({
              watch: currentIntersecting
            });
            if (isIntersectionChenge) entry.isIntersecting = currentIntersecting;
            if (isDisplay && isIntersectionChenge) return Object.freeze({
              target: entry.target,
              isIntersecting: entry.isIntersecting
            });
          }).filter(function (entry) {
            return typeof entry !== 'undefined';
          });
          if (callbackArg.length !== 0) entries.callback(callbackArg);
        });
      };

      Controller.calculateEntriesContaner = function (instances) {
        return instances.map(function (instance) {
          var option = instance.option;
          var entries = instance.targets.map(function (target) {
            var isIntersecting = Controller.isIntersecting(target, option.root, option.rootMargin);
            return {
              target: target,
              isIntersecting: isIntersecting,
              valueObserver: valueObserver.default(isIntersecting, function () {
                return true;
              })
            };
          });
          instance.entries = entries;
          return instance;
        });
      };

      Controller.updateTargetsAll = function (instance) {
        return instance.instancesOfintersectionWatcher.map(function (instance) {
          return instance.targets;
        }).reduce(function (a, c) {
          return a.concat(c);
        }, []);
      };

      Controller.updateScrollAreasOftargets = function (targetsAll) {
        var computeParentNode = function computeParentNode(target) {
          var tree = [];
          var html = document.documentElement;
          var parent = target;

          while (parent !== html) {
            parent = isIntersecting_1.default.getParentNode(parent);
            tree.push(parent);
          }

          return tree;
        };

        var scrollAreas = targetsAll.map(function (target) {
          var parents = computeParentNode(target);
          return parents.filter(function (parent) {
            var style = getComputedStyle(parent, '');
            var isScroll = style.overflow === 'scroll' || style.overflow === 'auto' || style.overflowY === 'scroll' || style.overflowY === 'auto';
            if (isScroll) return true;
          });
        });
        return scrollAreas.reduce(function (a, c) {
          return a.concat(c);
        }, []);
      };

      Controller.onWather = function (instance) {
        var scrollPassive = {
          passive: true
        };
        window.addEventListener('resize', instance.watcher_binded, false);
        window.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.documentElement.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.body.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        instance.mo.observe(document.querySelector('html'), instance.mutationObserverConfig);
        instance.scrollAreasOftargets.forEach(function (target) {
          target.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        });
      };

      Controller.offWather = function (instance) {
        window.removeEventListener('resize', instance.watcher_binded);
        window.removeEventListener('scroll', instance.watcher_binded);
        document.documentElement.removeEventListener('scroll', instance.watcher_binded);
        document.body.removeEventListener('scroll', instance.watcher_binded);
        instance.mo.disconnect();
        instance.scrollAreasOftargets.forEach(function (target) {
          target.removeEventListener('scroll', instance.watcher_binded);
        });
      };

      Controller.isIntersecting = function (target, root, rootMargin) {
        return isIntersecting_1.default.is(target, root, rootMargin);
      };

      Controller.isDisplay = function (target) {
        return IsDisplay.default(target);
      };

      Object.defineProperty(Controller, "THROTTLE_INTERVAL", {
        get: function get() {
          return 33;
        },
        enumerable: true,
        configurable: true
      });
      return Controller;
    }();

    exports.default = Controller;
  });
  unwrapExports(Controller_1);
  var rikaaaIntersectionWatcher_1 = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var defaultOption = {
      rootMargin: '0px',
      root: null
    };
    var controller = new Controller_1.default();

    var rikaaaIntersectionWatcher =
    /** @class */
    function () {
      function rikaaaIntersectionWatcher(callback, option) {
        if (option === void 0) {
          option = {};
        }

        this.callback = callback;
        this.targets = [];
        this.entries = [];
        this.option = __assign({}, defaultOption, option);
        controller.init(this);
      }

      rikaaaIntersectionWatcher.prototype.observe = function (target) {
        var exist = this.targets.includes(target);
        if (!exist) this.targets.push(target);
        controller.observe();
      };

      rikaaaIntersectionWatcher.prototype.unobserve = function (target) {
        this.targets = this.targets.filter(function (existTarget) {
          return existTarget !== target;
        });
        controller.unobserve();
      };

      rikaaaIntersectionWatcher.prototype.disconnect = function () {
        this.targets = [];
        controller.disconnect();
      };

      rikaaaIntersectionWatcher.isIntersecting = function (target, root, rootMargin) {
        return Controller_1.default.isIntersecting(target, root, rootMargin);
      };

      rikaaaIntersectionWatcher.isDisplay = function (target) {
        return Controller_1.default.isDisplay(target);
      };

      Object.defineProperty(rikaaaIntersectionWatcher, "THROTTLE_INTERVAL", {
        get: function get() {
          return Controller_1.default.THROTTLE_INTERVAL;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(rikaaaIntersectionWatcher, "CONTROLLER", {
        get: function get() {
          return controller;
        },
        enumerable: true,
        configurable: true
      });
      return rikaaaIntersectionWatcher;
    }();

    exports.default = rikaaaIntersectionWatcher;
  });
  var rikaaaIntersectionWatcher = unwrapExports(rikaaaIntersectionWatcher_1);

  var Onebang = (function (func) {
    var _func,
        allow = true;

    return function () {
      if (!allow) {
        func = null;
        return false;
      }

      _func = func.apply(this, arguments);
      allow = false;
      return _func;
    };
  });

  var constrain = (function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  });

  var map = (function (value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  });

  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function value(searchElement, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        } // 1. Let O be ? ToObject(this value).


        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If len is 0, return false.

        if (len === 0) {
          return false;
        } // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)


        var n = fromIndex | 0; // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.

        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        } // 7. Repeat, while k < len


        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          } // c. Increase k by 1. 


          k++;
        } // 8. Return false


        return false;
      }
    });
  }

  var _css = ':host {  position: relative;  display: block;  width: 100%; }  :host .placeholder_container,  :host .svg_container {    position: relative;    width: 100%; }    :host .placeholder_container .spacer,    :host .placeholder_container .svg_spacer,    :host .svg_container .spacer,    :host .svg_container .svg_spacer {      display: block; }      :host .placeholder_container .spacer .placeholder,      :host .placeholder_container .spacer .svg_wp,      :host .placeholder_container .svg_spacer .placeholder,      :host .placeholder_container .svg_spacer .svg_wp,      :host .svg_container .spacer .placeholder,      :host .svg_container .spacer .svg_wp,      :host .svg_container .svg_spacer .placeholder,      :host .svg_container .svg_spacer .svg_wp {        position: absolute;        display: block;        top: 0;        left: 0;        bottom: 0;        right: 0; }  :host ::slotted(*) {    vertical-align: bottom; }';

  var _style = "<style>".concat(_css, "</style>");

  var _shadowdomHTML = "\n    ".concat(_style, "\n    <div class=\"placeholder_container\">\n        <div class=\"spacer\">\n            <slot class=\"placeholder\" name=\"placeholder\"></slot>\n        </div>\n    </div>\n    <div class=\"svg_container\">\n        <div class=\"svg_spacer\">\n            <div class=\"svg_wp\">\n                <svg width=\"100%\" height=\"100%\"  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                    <filter id=\"rikaaa-ex-filter\">\n                        <!-- blur -->\n                        <feGaussianBlur stdDeviation=\"0\"/>\n                        <!-- other -->\n                        <feColorMatrix type=\"matrix\" id=\"contrast\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\" />\n                        <feColorMatrix type=\"matrix\" id=\"brightness\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\" />\n                        <feColorMatrix type=\"matrix\" id=\"saturate\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\" />\n                        <feColorMatrix type=\"matrix\" id=\"hue-rotate\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\" />\n                        <feColorMatrix type=\"matrix\" id=\"invert\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\" />\n                        <feColorMatrix type=\"matrix\" id=\"grayscale\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\" />\n                        <feColorMatrix type=\"matrix\" id=\"sepia\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\" />\n                    </filter>\n                    <image width=\"100%\" height=\"100%\" x=\"0\" y=\"0\" filter=\"url(#rikaaa-ex-filter)\">  \n                </svg>\n            </div>\n        </div>\n    </div>\n    <div class=\"img_container\">\n        <slot class=\"rikaaa-img-extra-wp\"></slot>\n    </div>\n");

  var _placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  var rikaaaimgextra =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(rikaaaimgextra, _HTMLElement);

    function rikaaaimgextra() {
      var _this;

      _classCallCheck(this, rikaaaimgextra);

      var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      var template = document.createElement('template');
      template.id = 'rikaaaimgextra';
      template.innerHTML = _shadowdomHTML;
      var filter = template.content.querySelector('filter');
      var image = template.content.querySelector('image');
      var newId = "".concat(filter.id, "_").concat(id);
      filter.id = newId;
      image.setAttribute('filter', "url(#".concat(newId, ")"));
      _this = _possibleConstructorReturn(this, _getPrototypeOf(rikaaaimgextra).call(this));
      if (window.ShadyCSS) ShadyCSS.prepareTemplate(template, 'rikaaa-img-extra');
      if (window.ShadyCSS) ShadyCSS.styleElement(_assertThisInitialized(_this));

      _this.attachShadow({
        mode: 'open'
      });

      _this.shadowRoot.appendChild(template.content.cloneNode(true));

      return _this;
    }

    _createClass(rikaaaimgextra, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        this.filters = [];
        this.isSafari = /.*Version.*Safari.*/.test(navigator.userAgent);
        this.src = this.getAttribute('data-src');
        this.alt = this.getAttribute('data-alt');
        this.size = this.getAttribute('size').split('x');
        this.aspect = this.size.reduce(function (a, c, i, array) {
          var result = {};

          var gcd = function gcd(w, h) {
            if (!h) return w;else return gcd(h, w % h);
          };

          if (i === 0) result.w = c / gcd(array[1], array[0]);
          if (i === 1) result.h = c / gcd(array[1], array[0]);
          return Object.assign(a, result);
        }, {});
        this.wp = this.shadowRoot.querySelector('.rikaaa-img-extra-wp');
        this.placeholder_container = this.shadowRoot.querySelector('.placeholder_container');
        this.spacer = this.shadowRoot.querySelector('.spacer');
        this.svg = this.shadowRoot.querySelector('svg');
        this.svgImage = this.shadowRoot.querySelector('image');
        this.svgspacer = this.shadowRoot.querySelector('.svg_spacer');

        if (!window.IntersectionObserver && !window.WcRikaaaIntersectionObserver) {
          Object.defineProperty(window, 'WcRikaaaIntersectionObserver', {
            value: rikaaaIntersectionWatcher
          });
        }

        var intersectionobserver = window.IntersectionObserver || window.WcRikaaaIntersectionObserver;
        if (this.offset === undefined) this.offset = 100;

        var placeHolder = function placeHolder() {
          _this2.placeholder();
        };

        var addPlaceHolder_onece = Onebang(placeHolder);
        addPlaceHolder_onece(); // element entry viewport

        var entry = function entry() {
          _this2.entry();
        };

        var entry_onebang = Onebang(entry);
        this.ovserver = new intersectionobserver(function (e) {
          if (e[0].isIntersecting) entry_onebang();
        }, {
          rootMargin: "0px 0px ".concat(this.offset, "px 0px")
        });
        this.ovserver.observe(this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this3 = this;

        this.ovserver.disconnect(this);
        var child = this.childNodes;
        if (child) Array.from(child).forEach(function (e) {
          return _this3.removeChild(e);
        });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldval, newval) {
        if (this.filters === undefined) this.filters = [];
        this.svg = this.shadowRoot.querySelector('svg');
        this._filter_op = 1;
        this.isSafari = /.*Version.*Safari.*/.test(navigator.userAgent);
        if (attr === 'blur') this.blur = newval;
        if (attr === 'contrast') this.contrast = newval;
        if (attr === 'brightness') this.brightness = newval;
        if (attr === 'saturate') this.saturate = newval;
        if (attr === 'hue-rotate') this.hue_rotate = newval;
        if (attr === 'invert') this.invert = newval;
        if (attr === 'opacity') this.opacity = newval;
        if (attr === 'grayscale') this.grayscale = newval;
        if (attr === 'sepia') this.sepia = newval;
        if (attr === 'offset') this.offset = newval;
        if (this.isSafari) this.shadowRoot.querySelector('.img_container').style.filter = this.filters.toString().replace(/,/g, ' ');
      }
    }, {
      key: "arraytomatrixval",
      value: function arraytomatrixval(matrixarray) {
        return matrixarray.reduce(function (acc, val) {
          return acc.concat(val);
        }, []).toString().replace(/,/g, ' ');
      }
    }, {
      key: "placeholder",
      value: function placeholder() {
        var imgnode = document.createElement('img');
        imgnode.src = _placeholder;
        imgnode.slot = 'placeholder';
        Object.assign(imgnode.style, {
          width: '100%',
          height: '100%'
        });
        Object.assign(this.spacer.style, {
          paddingBottom: "".concat(this.aspect.h / this.aspect.w * 100, "%")
        });
        this.placeholderNode = imgnode;
        this.appendChild(imgnode);
      }
    }, {
      key: "entry",
      value: function entry() {
        var _this4 = this;

        // create img element
        var imgnode = document.createElement('img');
        this.img = imgnode;
        imgnode.src = this.src;
        imgnode.alt = this.alt;
        Object.assign(imgnode.style, {
          width: '100%'
        });

        var render = function render() {
          _this4.placeholder_container.style.display = 'none';

          if (_this4.isSafari) {
            _this4.appendChild(imgnode);
          } else {
            Object.assign(_this4.svg.style, {
              fontSize: '0px'
            });

            _this4.svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', _this4.src);

            Object.assign(_this4.svgspacer.style, {
              paddingBottom: "".concat(_this4.aspect.h / _this4.aspect.w * 100, "%")
            });
          }
        };

        imgnode.addEventListener('load', render);
        this.dispatchEvent(new CustomEvent('load'));
      }
    }, {
      key: "blur",
      set: function set(n) {
        if (!this.isSafari) this.svg.querySelector('feGaussianBlur').setAttribute('stdDeviation', n);else this.filters[0] = "blur(".concat(n, "px)");
      }
    }, {
      key: "contrast",
      set: function set(n) {
        var b = Math.max(1, n);

        if (!this.isSafari) {
          var tg = this.svg.getElementById('contrast');
          var o = (1 - b) / 2;
          var matrix = [[b, 0, 0, 0, o], [0, b, 0, 0, o], [0, 0, b, 0, o], [0, 0, 0, this._filter_op, 0]];
          tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
          this.filters[1] = "contrast(".concat(b, ")");
        }
      }
    }, {
      key: "brightness",
      set: function set(n) {
        if (!this.isSafari) {
          var tg = this.svg.getElementById('brightness');
          var matrix = [[n, 0, 0, 0, 0], [0, n, 0, 0, 0], [0, 0, n, 0, 0], [0, 0, 0, this._filter_op, 0]];
          tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
          this.filters[2] = "brightness(".concat(n, ")");
        }
      }
    }, {
      key: "saturate",
      set: function set(n) {
        var seed = Math.max(0, n);

        if (!this.isSafari) {
          var tg = this.svg.getElementById('saturate');
          var _ref = [map(seed, 0, 1, 0.213, 1), map(seed, 0, 1, 0.715, 0), map(seed, 0, 1, 0.072, 0), map(seed, 0, 1, 0.213, 0), map(seed, 0, 1, 0.715, 1), map(seed, 0, 1, 0.072, 0), map(seed, 0, 1, 0.213, 0), map(seed, 0, 1, 0.715, 0), map(seed, 0, 1, 0.072, 1)],
              a = _ref[0],
              b = _ref[1],
              c = _ref[2],
              d = _ref[3],
              e = _ref[4],
              f = _ref[5],
              g = _ref[6],
              h = _ref[7],
              i = _ref[8];
          var matrix = [[a, b, c, 0, 0], [d, e, f, 0, 0], [g, h, i, 0, 0], [0, 0, 0, this._filter_op, 0]];
          tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
          this.filters[3] = "saturate(".concat(seed, ")");
        }
      }
    }, {
      key: "hue_rotate",
      set: function set(n) {
        if (!this.isSafari) {
          var tg = this.svg.getElementById('hue-rotate');
          var theta = n / 180 * Math.PI;
          var _ref2 = [Math.cos(theta), Math.sin(theta), 1 / 3, Math.sqrt(1 / 3)],
              c = _ref2[0],
              s = _ref2[1],
              w = _ref2[2],
              sw = _ref2[3];
          var rr = c + (1.0 - c) * w,
              rg = w * (1.0 - c) - sw * s,
              rb = w * (1.0 - c) + sw * s,
              gr = w * (1.0 - c) + sw * s,
              gg = c + w * (1.0 - c),
              gb = w * (1.0 - c) - sw * s,
              br = w * (1.0 - c) - sw * s,
              bg = w * (1.0 - c) + sw * s,
              bb = c + w * (1.0 - c);
          var matrix = [[rr, rg, rb, 0, 0], [gr, gg, gb, 0, 0], [br, bg, bb, 0, 0], [0, 0, 0, this._filter_op, 0]];
          tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
          this.filters[4] = "hue-rotate(".concat(n, "deg)");
        }
      }
    }, {
      key: "invert",
      set: function set(n) {
        var seed = constrain(n, 0, 1);

        if (!this.isSafari) {
          var tg = this.svg.getElementById('invert');
          var v = map(seed, 0, 1, 1, -1);
          var a = map(v, 1, -1, 0, 1);
          var matrix = [[v, 0, 0, 0, a], [0, v, 0, 0, a], [0, 0, v, 0, a], [0, 0, 0, this._filter_op, 0]];
          tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
          this.filters[5] = "invert(".concat(seed, ")");
        }
      }
    }, {
      key: "opacity",
      set: function set(n) {
        var _this5 = this;

        this._filter_op = constrain(n, 0, 1);

        if (!this.isSafari) {
          var filter = ['contrast', 'brightness', 'saturate', 'hue-rotate', 'invert', 'grayscale', 'sepia', 'binarize'];
          var activeAttr = filter.map(function (name) {
            var attr = _this5.getAttribute(name);

            if (attr === null) return false;
            if (name === 'contrast') _this5.contrast = attr;
            if (name === 'brightness') _this5.brightness = attr;
            if (name === 'saturate') _this5.saturate = attr;
            if (name === 'hue-rotate') _this5.hue_rotate = attr;
            if (name === 'invert') _this5.invert = attr;
            if (name === 'grayscale') _this5.grayscale = attr;
            if (name === 'sepia') _this5.sepia = attr;
            if (name === 'binarize') _this5.binarize = attr;
          }).includes(undefined);
          if (!activeAttr) this.svg.getElementById('contrast').setAttribute('values', this.arraytomatrixval([[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, this._filter_op, 0]]));
        } else {
          this.filters[6] = "opacity(".concat(this._filter_op, ")");
        }
      }
    }, {
      key: "grayscale",
      set: function set(n) {
        if (!this.isSafari) {
          var seed = 1 - constrain(n, 0, 1);
          var tg = this.svg.getElementById('grayscale');
          var _ref3 = [map(seed, 0, 1, 0.213, 1), map(seed, 0, 1, 0.715, 0), map(seed, 0, 1, 0.072, 0), map(seed, 0, 1, 0.213, 0), map(seed, 0, 1, 0.715, 1), map(seed, 0, 1, 0.072, 0), map(seed, 0, 1, 0.213, 0), map(seed, 0, 1, 0.715, 0), map(seed, 0, 1, 0.072, 1)],
              a = _ref3[0],
              b = _ref3[1],
              c = _ref3[2],
              d = _ref3[3],
              e = _ref3[4],
              f = _ref3[5],
              g = _ref3[6],
              h = _ref3[7],
              i = _ref3[8];
          var matrix = [[a, b, c, 0, 0], [d, e, f, 0, 0], [g, h, i, 0, 0], [0, 0, 0, this._filter_op, 0]];
          tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
          var s_seed = constrain(n, 0, 1);
          this.filters[7] = "grayscale(".concat(s_seed, ")");
        }
      }
    }, {
      key: "sepia",
      set: function set(n) {
        if (!this.isSafari) {
          var tg = this.svg.getElementById('sepia');
          var seed = 1 - constrain(n, 0, 1);
          var _ref4 = [map(seed, 0, 1, 0.393, 1), map(seed, 0, 1, 0.769, 0), map(seed, 0, 1, 0.189, 0), map(seed, 0, 1, 0.349, 0), map(seed, 0, 1, 0.686, 1), map(seed, 0, 1, 0.168, 0), map(seed, 0, 1, 0.272, 0), map(seed, 0, 1, 0.534, 0), map(seed, 0, 1, 0.131, 1)],
              a = _ref4[0],
              b = _ref4[1],
              c = _ref4[2],
              d = _ref4[3],
              e = _ref4[4],
              f = _ref4[5],
              g = _ref4[6],
              h = _ref4[7],
              i = _ref4[8];
          var matrix = [[a, b, c, 0, 0], [d, e, f, 0, 0], [g, h, i, 0, 0], [0, 0, 0, this._filter_op, 0]];
          tg.setAttribute('values', this.arraytomatrixval(matrix));
        } else {
          var s_seed = constrain(n, 0, 1);
          this.filters[8] = "sepia(".concat(s_seed, ")");
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['blur', 'contrast', 'brightness', 'saturate', 'hue-rotate', 'invert', 'opacity', 'grayscale', 'sepia', 'offset'];
      }
    }]);

    return rikaaaimgextra;
  }(_wrapNativeSuper(HTMLElement));

  customElements.define('rikaaa-img-extra', rikaaaimgextra);

}());

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
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
   *
   *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
   *
   */
  (function() {

  // Exit early if we're not running in a browser.
  if (typeof window !== 'object') {
    return;
  }

  // Exit early if all IntersectionObserver and IntersectionObserverEntry
  // features are natively supported.
  if ('IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype,
        'isIntersecting', {
        get: function () {
          return this.intersectionRatio > 0;
        }
      });
    }
    return;
  }


  /**
   * A local reference to the document.
   */
  var document = window.document;


  /**
   * Creates the global IntersectionObserverEntry constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
   * @param {Object} entry A dictionary of instance properties.
   * @constructor
   */
  function IntersectionObserverEntry(entry) {
    this.time = entry.time;
    this.target = entry.target;
    this.rootBounds = entry.rootBounds;
    this.boundingClientRect = entry.boundingClientRect;
    this.intersectionRect = entry.intersectionRect || getEmptyRect();
    this.isIntersecting = !!entry.intersectionRect;

    // Calculates the intersection ratio.
    var targetRect = this.boundingClientRect;
    var targetArea = targetRect.width * targetRect.height;
    var intersectionRect = this.intersectionRect;
    var intersectionArea = intersectionRect.width * intersectionRect.height;

    // Sets intersection ratio.
    if (targetArea) {
      // Round the intersection ratio to avoid floating point math issues:
      // https://github.com/w3c/IntersectionObserver/issues/324
      this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
    } else {
      // If area is zero and is intersecting, sets to 1, otherwise to 0
      this.intersectionRatio = this.isIntersecting ? 1 : 0;
    }
  }


  /**
   * Creates the global IntersectionObserver constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
   * @param {Function} callback The function to be invoked after intersection
   *     changes have queued. The function is not invoked if the queue has
   *     been emptied by calling the `takeRecords` method.
   * @param {Object=} opt_options Optional configuration options.
   * @constructor
   */
  function IntersectionObserver(callback, opt_options) {

    var options = opt_options || {};

    if (typeof callback != 'function') {
      throw new Error('callback must be a function');
    }

    if (options.root && options.root.nodeType != 1) {
      throw new Error('root must be an Element');
    }

    // Binds and throttles `this._checkForIntersections`.
    this._checkForIntersections = throttle(
        this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

    // Private properties.
    this._callback = callback;
    this._observationTargets = [];
    this._queuedEntries = [];
    this._rootMarginValues = this._parseRootMargin(options.rootMargin);

    // Public properties.
    this.thresholds = this._initThresholds(options.threshold);
    this.root = options.root || null;
    this.rootMargin = this._rootMarginValues.map(function(margin) {
      return margin.value + margin.unit;
    }).join(' ');
  }


  /**
   * The minimum interval within which the document will be checked for
   * intersection changes.
   */
  IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


  /**
   * The frequency in which the polyfill polls for intersection changes.
   * this can be updated on a per instance basis and must be set prior to
   * calling `observe` on the first target.
   */
  IntersectionObserver.prototype.POLL_INTERVAL = null;

  /**
   * Use a mutation observer on the root element
   * to detect intersection changes.
   */
  IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


  /**
   * Starts observing a target element for intersection changes based on
   * the thresholds values.
   * @param {Element} target The DOM element to observe.
   */
  IntersectionObserver.prototype.observe = function(target) {
    var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
      return item.element == target;
    });

    if (isTargetAlreadyObserved) {
      return;
    }

    if (!(target && target.nodeType == 1)) {
      throw new Error('target must be an Element');
    }

    this._registerInstance();
    this._observationTargets.push({element: target, entry: null});
    this._monitorIntersections();
    this._checkForIntersections();
  };


  /**
   * Stops observing a target element for intersection changes.
   * @param {Element} target The DOM element to observe.
   */
  IntersectionObserver.prototype.unobserve = function(target) {
    this._observationTargets =
        this._observationTargets.filter(function(item) {

      return item.element != target;
    });
    if (!this._observationTargets.length) {
      this._unmonitorIntersections();
      this._unregisterInstance();
    }
  };


  /**
   * Stops observing all target elements for intersection changes.
   */
  IntersectionObserver.prototype.disconnect = function() {
    this._observationTargets = [];
    this._unmonitorIntersections();
    this._unregisterInstance();
  };


  /**
   * Returns any queue entries that have not yet been reported to the
   * callback and clears the queue. This can be used in conjunction with the
   * callback to obtain the absolute most up-to-date intersection information.
   * @return {Array} The currently queued entries.
   */
  IntersectionObserver.prototype.takeRecords = function() {
    var records = this._queuedEntries.slice();
    this._queuedEntries = [];
    return records;
  };


  /**
   * Accepts the threshold value from the user configuration object and
   * returns a sorted array of unique threshold values. If a value is not
   * between 0 and 1 and error is thrown.
   * @private
   * @param {Array|number=} opt_threshold An optional threshold value or
   *     a list of threshold values, defaulting to [0].
   * @return {Array} A sorted list of unique and valid threshold values.
   */
  IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
    var threshold = opt_threshold || [0];
    if (!Array.isArray(threshold)) threshold = [threshold];

    return threshold.sort().filter(function(t, i, a) {
      if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
        throw new Error('threshold must be a number between 0 and 1 inclusively');
      }
      return t !== a[i - 1];
    });
  };


  /**
   * Accepts the rootMargin value from the user configuration object
   * and returns an array of the four margin values as an object containing
   * the value and unit properties. If any of the values are not properly
   * formatted or use a unit other than px or %, and error is thrown.
   * @private
   * @param {string=} opt_rootMargin An optional rootMargin value,
   *     defaulting to '0px'.
   * @return {Array<Object>} An array of margin objects with the keys
   *     value and unit.
   */
  IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
    var marginString = opt_rootMargin || '0px';
    var margins = marginString.split(/\s+/).map(function(margin) {
      var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
      if (!parts) {
        throw new Error('rootMargin must be specified in pixels or percent');
      }
      return {value: parseFloat(parts[1]), unit: parts[2]};
    });

    // Handles shorthand.
    margins[1] = margins[1] || margins[0];
    margins[2] = margins[2] || margins[0];
    margins[3] = margins[3] || margins[1];

    return margins;
  };


  /**
   * Starts polling for intersection changes if the polling is not already
   * happening, and if the page's visibility state is visible.
   * @private
   */
  IntersectionObserver.prototype._monitorIntersections = function() {
    if (!this._monitoringIntersections) {
      this._monitoringIntersections = true;

      // If a poll interval is set, use polling instead of listening to
      // resize and scroll events or DOM mutations.
      if (this.POLL_INTERVAL) {
        this._monitoringInterval = setInterval(
            this._checkForIntersections, this.POLL_INTERVAL);
      }
      else {
        addEvent(window, 'resize', this._checkForIntersections, true);
        addEvent(document, 'scroll', this._checkForIntersections, true);

        if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
          this._domObserver = new MutationObserver(this._checkForIntersections);
          this._domObserver.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
        }
      }
    }
  };


  /**
   * Stops polling for intersection changes.
   * @private
   */
  IntersectionObserver.prototype._unmonitorIntersections = function() {
    if (this._monitoringIntersections) {
      this._monitoringIntersections = false;

      clearInterval(this._monitoringInterval);
      this._monitoringInterval = null;

      removeEvent(window, 'resize', this._checkForIntersections, true);
      removeEvent(document, 'scroll', this._checkForIntersections, true);

      if (this._domObserver) {
        this._domObserver.disconnect();
        this._domObserver = null;
      }
    }
  };


  /**
   * Scans each observation target for intersection changes and adds them
   * to the internal entries queue. If new entries are found, it
   * schedules the callback to be invoked.
   * @private
   */
  IntersectionObserver.prototype._checkForIntersections = function() {
    var rootIsInDom = this._rootIsInDom();
    var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

    this._observationTargets.forEach(function(item) {
      var target = item.element;
      var targetRect = getBoundingClientRect(target);
      var rootContainsTarget = this._rootContainsTarget(target);
      var oldEntry = item.entry;
      var intersectionRect = rootIsInDom && rootContainsTarget &&
          this._computeTargetAndRootIntersection(target, rootRect);

      var newEntry = item.entry = new IntersectionObserverEntry({
        time: now(),
        target: target,
        boundingClientRect: targetRect,
        rootBounds: rootRect,
        intersectionRect: intersectionRect
      });

      if (!oldEntry) {
        this._queuedEntries.push(newEntry);
      } else if (rootIsInDom && rootContainsTarget) {
        // If the new entry intersection ratio has crossed any of the
        // thresholds, add a new entry.
        if (this._hasCrossedThreshold(oldEntry, newEntry)) {
          this._queuedEntries.push(newEntry);
        }
      } else {
        // If the root is not in the DOM or target is not contained within
        // root but the previous entry for this target had an intersection,
        // add a new record indicating removal.
        if (oldEntry && oldEntry.isIntersecting) {
          this._queuedEntries.push(newEntry);
        }
      }
    }, this);

    if (this._queuedEntries.length) {
      this._callback(this.takeRecords(), this);
    }
  };


  /**
   * Accepts a target and root rect computes the intersection between then
   * following the algorithm in the spec.
   * TODO(philipwalton): at this time clip-path is not considered.
   * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
   * @param {Element} target The target DOM element
   * @param {Object} rootRect The bounding rect of the root after being
   *     expanded by the rootMargin value.
   * @return {?Object} The final intersection rect object or undefined if no
   *     intersection is found.
   * @private
   */
  IntersectionObserver.prototype._computeTargetAndRootIntersection =
      function(target, rootRect) {

    // If the element isn't displayed, an intersection can't happen.
    if (window.getComputedStyle(target).display == 'none') return;

    var targetRect = getBoundingClientRect(target);
    var intersectionRect = targetRect;
    var parent = getParentNode(target);
    var atRoot = false;

    while (!atRoot) {
      var parentRect = null;
      var parentComputedStyle = parent.nodeType == 1 ?
          window.getComputedStyle(parent) : {};

      // If the parent isn't displayed, an intersection can't happen.
      if (parentComputedStyle.display == 'none') return;

      if (parent == this.root || parent == document) {
        atRoot = true;
        parentRect = rootRect;
      } else {
        // If the element has a non-visible overflow, and it's not the <body>
        // or <html> element, update the intersection rect.
        // Note: <body> and <html> cannot be clipped to a rect that's not also
        // the document rect, so no need to compute a new intersection.
        if (parent != document.body &&
            parent != document.documentElement &&
            parentComputedStyle.overflow != 'visible') {
          parentRect = getBoundingClientRect(parent);
        }
      }

      // If either of the above conditionals set a new parentRect,
      // calculate new intersection data.
      if (parentRect) {
        intersectionRect = computeRectIntersection(parentRect, intersectionRect);

        if (!intersectionRect) break;
      }
      parent = getParentNode(parent);
    }
    return intersectionRect;
  };


  /**
   * Returns the root rect after being expanded by the rootMargin value.
   * @return {Object} The expanded root rect.
   * @private
   */
  IntersectionObserver.prototype._getRootRect = function() {
    var rootRect;
    if (this.root) {
      rootRect = getBoundingClientRect(this.root);
    } else {
      // Use <html>/<body> instead of window since scroll bars affect size.
      var html = document.documentElement;
      var body = document.body;
      rootRect = {
        top: 0,
        left: 0,
        right: html.clientWidth || body.clientWidth,
        width: html.clientWidth || body.clientWidth,
        bottom: html.clientHeight || body.clientHeight,
        height: html.clientHeight || body.clientHeight
      };
    }
    return this._expandRectByRootMargin(rootRect);
  };


  /**
   * Accepts a rect and expands it by the rootMargin value.
   * @param {Object} rect The rect object to expand.
   * @return {Object} The expanded rect.
   * @private
   */
  IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
    var margins = this._rootMarginValues.map(function(margin, i) {
      return margin.unit == 'px' ? margin.value :
          margin.value * (i % 2 ? rect.width : rect.height) / 100;
    });
    var newRect = {
      top: rect.top - margins[0],
      right: rect.right + margins[1],
      bottom: rect.bottom + margins[2],
      left: rect.left - margins[3]
    };
    newRect.width = newRect.right - newRect.left;
    newRect.height = newRect.bottom - newRect.top;

    return newRect;
  };


  /**
   * Accepts an old and new entry and returns true if at least one of the
   * threshold values has been crossed.
   * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
   *    particular target element or null if no previous entry exists.
   * @param {IntersectionObserverEntry} newEntry The current entry for a
   *    particular target element.
   * @return {boolean} Returns true if a any threshold has been crossed.
   * @private
   */
  IntersectionObserver.prototype._hasCrossedThreshold =
      function(oldEntry, newEntry) {

    // To make comparing easier, an entry that has a ratio of 0
    // but does not actually intersect is given a value of -1
    var oldRatio = oldEntry && oldEntry.isIntersecting ?
        oldEntry.intersectionRatio || 0 : -1;
    var newRatio = newEntry.isIntersecting ?
        newEntry.intersectionRatio || 0 : -1;

    // Ignore unchanged ratios
    if (oldRatio === newRatio) return;

    for (var i = 0; i < this.thresholds.length; i++) {
      var threshold = this.thresholds[i];

      // Return true if an entry matches a threshold or if the new ratio
      // and the old ratio are on the opposite sides of a threshold.
      if (threshold == oldRatio || threshold == newRatio ||
          threshold < oldRatio !== threshold < newRatio) {
        return true;
      }
    }
  };


  /**
   * Returns whether or not the root element is an element and is in the DOM.
   * @return {boolean} True if the root element is an element and is in the DOM.
   * @private
   */
  IntersectionObserver.prototype._rootIsInDom = function() {
    return !this.root || containsDeep(document, this.root);
  };


  /**
   * Returns whether or not the target element is a child of root.
   * @param {Element} target The target element to check.
   * @return {boolean} True if the target element is a child of root.
   * @private
   */
  IntersectionObserver.prototype._rootContainsTarget = function(target) {
    return containsDeep(this.root || document, target);
  };


  /**
   * Adds the instance to the global IntersectionObserver registry if it isn't
   * already present.
   * @private
   */
  IntersectionObserver.prototype._registerInstance = function() {
  };


  /**
   * Removes the instance from the global IntersectionObserver registry.
   * @private
   */
  IntersectionObserver.prototype._unregisterInstance = function() {
  };


  /**
   * Returns the result of the performance.now() method or null in browsers
   * that don't support the API.
   * @return {number} The elapsed time since the page was requested.
   */
  function now() {
    return window.performance && performance.now && performance.now();
  }


  /**
   * Throttles a function and delays its execution, so it's only called at most
   * once within a given time period.
   * @param {Function} fn The function to throttle.
   * @param {number} timeout The amount of time that must pass before the
   *     function can be called again.
   * @return {Function} The throttled function.
   */
  function throttle(fn, timeout) {
    var timer = null;
    return function () {
      if (!timer) {
        timer = setTimeout(function() {
          fn();
          timer = null;
        }, timeout);
      }
    };
  }


  /**
   * Adds an event handler to a DOM node ensuring cross-browser compatibility.
   * @param {Node} node The DOM node to add the event handler to.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to add.
   * @param {boolean} opt_useCapture Optionally adds the even to the capture
   *     phase. Note: this only works in modern browsers.
   */
  function addEvent(node, event, fn, opt_useCapture) {
    if (typeof node.addEventListener == 'function') {
      node.addEventListener(event, fn, opt_useCapture || false);
    }
    else if (typeof node.attachEvent == 'function') {
      node.attachEvent('on' + event, fn);
    }
  }


  /**
   * Removes a previously added event handler from a DOM node.
   * @param {Node} node The DOM node to remove the event handler from.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to remove.
   * @param {boolean} opt_useCapture If the event handler was added with this
   *     flag set to true, it should be set to true here in order to remove it.
   */
  function removeEvent(node, event, fn, opt_useCapture) {
    if (typeof node.removeEventListener == 'function') {
      node.removeEventListener(event, fn, opt_useCapture || false);
    }
    else if (typeof node.detatchEvent == 'function') {
      node.detatchEvent('on' + event, fn);
    }
  }


  /**
   * Returns the intersection between two rect objects.
   * @param {Object} rect1 The first rect.
   * @param {Object} rect2 The second rect.
   * @return {?Object} The intersection rect or undefined if no intersection
   *     is found.
   */
  function computeRectIntersection(rect1, rect2) {
    var top = Math.max(rect1.top, rect2.top);
    var bottom = Math.min(rect1.bottom, rect2.bottom);
    var left = Math.max(rect1.left, rect2.left);
    var right = Math.min(rect1.right, rect2.right);
    var width = right - left;
    var height = bottom - top;

    return (width >= 0 && height >= 0) && {
      top: top,
      bottom: bottom,
      left: left,
      right: right,
      width: width,
      height: height
    };
  }


  /**
   * Shims the native getBoundingClientRect for compatibility with older IE.
   * @param {Element} el The element whose bounding rect to get.
   * @return {Object} The (possibly shimmed) rect of the element.
   */
  function getBoundingClientRect(el) {
    var rect;

    try {
      rect = el.getBoundingClientRect();
    } catch (err) {
      // Ignore Windows 7 IE11 "Unspecified error"
      // https://github.com/w3c/IntersectionObserver/pull/205
    }

    if (!rect) return getEmptyRect();

    // Older IE
    if (!(rect.width && rect.height)) {
      rect = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
    }
    return rect;
  }


  /**
   * Returns an empty rect object. An empty rect is returned when an element
   * is not in the DOM.
   * @return {Object} The empty rect.
   */
  function getEmptyRect() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }

  /**
   * Checks to see if a parent element contains a child element (including inside
   * shadow DOM).
   * @param {Node} parent The parent element.
   * @param {Node} child The child element.
   * @return {boolean} True if the parent node contains the child node.
   */
  function containsDeep(parent, child) {
    var node = child;
    while (node) {
      if (node == parent) return true;

      node = getParentNode(node);
    }
    return false;
  }


  /**
   * Gets the parent node of an element or its host element if the parent node
   * is a shadow root.
   * @param {Node} node The node whose parent to get.
   * @return {Node|null} The parent node or null if no parent exists.
   */
  function getParentNode(node) {
    var parent = node.parentNode;

    if (parent && parent.nodeType == 11 && parent.host) {
      // If the parent is a shadow root, return the host element.
      return parent.host;
    }

    if (parent && parent.assignedSlot) {
      // If the parent is distributed in a <slot>, return the parent of a slot.
      return parent.assignedSlot.parentNode;
    }

    return parent;
  }


  // Exposes the constructors globally.
  window.IntersectionObserver = IntersectionObserver;
  window.IntersectionObserverEntry = IntersectionObserverEntry;

  }());

  Array.prototype.includes||(Array.prototype.includes=function(r){if(null==this)throw new TypeError("Array.prototype.includes called on null or undefined");var e=Object(this),n=parseInt(e.length,10)||0;if(0===n)return !1;var t,o,i=parseInt(arguments[1],10)||0;for(0<=i?t=i:(t=n+i)<0&&(t=0);t<n;){if(r===(o=e[t])||r!=r&&o!=o)return !0;t++;}return !1});

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
        this.svgspacer = this.shadowRoot.querySelector('.svg_spacer'); // this.offset = 100;

        if (this.offset === undefined) this.offset = 100; // const addPlaceholder = () => this.placeholder;
        // this.placeholder();
        // const addPlaceholder_onece = () => Onebang(addPlaceholder);
        // addPlaceholder_onece();

        var placeHolder = function placeHolder() {
          _this2.placeholder();
        };

        var addPlaceHolder_onece = Onebang(placeHolder);
        addPlaceHolder_onece(); // element entry viewport

        var entry = function entry() {
          _this2.entry();
        };

        var entry_onebang = Onebang(entry);
        this.ovserver = new IntersectionObserver(function (e) {
          if (e[0].intersectionRatio !== 0) entry_onebang();
        }, {
          rootMargin: "".concat(this.offset, "px")
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

        // this.shadowRoot.removeChild(this.placeholder_container);
        this.placeholder_container.style.display = 'none'; // create img element

        var imgnode = document.createElement('img');
        this.img = imgnode;
        imgnode.src = this.src;
        imgnode.alt = this.alt;
        Object.assign(imgnode.style, {
          width: '100%'
        });

        var render = function render() {
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

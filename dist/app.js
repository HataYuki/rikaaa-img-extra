/**
 * @license
 * rikaaa-img-extra.js
 *
 * Generated : 2019-08-04
 * Version : 1.1.0
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

(function () {
  'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var ready = (function (fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
      setTimeout(function () {
        fn();
      }, 0);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  });

  ready(function () {
    var ex_img = document.getElementById('s');
    var slider = document.querySelectorAll('input');

    _toConsumableArray(Array.from(slider)).forEach(function (elem) {
      elem.addEventListener('change', function (e) {
        var input = e.currentTarget;
        var id = input.getAttribute('id');
        var outputId = "".concat(id, "-o");
        if (input.type === 'range') document.getElementById(outputId).innerHTML = input.value;
        if (input.type === 'range') ex_img.setAttribute(id, input.value);
      });
    });

    Array.from(document.querySelectorAll("rikaaa-img-extra")).forEach(function (elem) {
      elem.addEventListener("loadImage", function () {
        console.log("image loaded");
      });
    });
    Array.from(document.querySelectorAll("rikaaa-img-extra")).forEach(function (elem) {
      elem.addEventListener("load", function () {
        console.log("load");
      });
    });
  });

}());

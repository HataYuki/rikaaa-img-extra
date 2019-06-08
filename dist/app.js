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

    Array.from(document.querySelectorAll('rikaaa-img-extra')).forEach(function (elem) {
      elem.addEventListener('load', function () {
        console.log('loaded');
      });
    });
  });

}());

'use strict';

(function () {
  var IMAGE_WIDTH = 40;
  var IMAGE_HEIGHT = 70;
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms
  var PIN_RADIUS = Math.floor(65 / 2);

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEY_CODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      action();
    }
  };

  var mainElement = document.querySelector('main');
  var errorTemplateElement = document.querySelector('#error');

  var onLoadError = function (error) {
    var errorElement = errorTemplateElement.content.cloneNode(true);
    var errorMessageElement = errorElement.querySelector('.error__message');
    var errorButtonElement = errorElement.querySelector('.error__button');
    errorMessageElement.innerHTML = error + ', упс!';

    mainElement.prepend(errorElement);

    var closeErrorMessage = function () {
      mainElement.querySelector('.error').remove();

      errorButtonElement.removeEventListener('click', onCloseErrorClick);
      mainElement.removeEventListener('click', onCloseErrorClick);
      document.removeEventListener('keydown', onPopupPressEsc);
    };

    var onCloseErrorClick = function () {
      closeErrorMessage();
    };

    var onPopupPressEsc = function (evt) {
      isEscEvent(evt, closeErrorMessage);
    };

    errorButtonElement.addEventListener('click', onCloseErrorClick);
    mainElement.addEventListener('click', onCloseErrorClick);
    document.addEventListener('keydown', onPopupPressEsc);
  };


  var removeChildren = function (node) {
    node.innerHTML = '';
  };


  window.util = {
    IMAGE_WIDTH: IMAGE_WIDTH,
    IMAGE_HEIGHT: IMAGE_HEIGHT,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    PIN_RADIUS: PIN_RADIUS,
    removeChildren: removeChildren,
    debounce: debounce,
    onLoadError: onLoadError,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();

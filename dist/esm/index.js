import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { jsx } from 'react/jsx-runtime';

var getRemoteModuleId = function getRemoteModuleId(_ref) {
  var url = _ref.url,
      module = _ref.module,
      scope = _ref.scope;
  return [url, scope, module].join();
};

var attachScript = function attachScript(remoteModule) {
  var id = getRemoteModuleId(remoteModule);
  var existingElement = document.getElementById(id);

  if (existingElement) {
    //@ts-expect-error
    if (window[remoteModule.scope]) return Promise.resolve(true);else return new Promise(function (resolve) {
      existingElement.onload = function (e) {
        resolve(true);
      };
    });
  }

  var element = document.createElement("script");
  element.src = remoteModule.url;
  element.type = "text/javascript";
  element.async = true;
  element.id = id;
  var scriptLoadPromise = new Promise(function (resolve, reject) {
    element.onload = function () {
      return resolve(element);
    };

    element.onerror = function (e) {
      reject(e);
    };
  });
  document.head.appendChild(element);
  return scriptLoadPromise;
};

/* eslint-disable no-unreachable */
var loadModule = function loadModule(url, scope, module) {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var container, factory, Module, error;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return __webpack_init_sharing__("default");

          case 3:
            container = window[scope];

            if (container.isInitialized) {
              _context.next = 8;
              break;
            }

            container.isInitialized = true; //@ts-expect-error

            _context.next = 8;
            return container.init(__webpack_share_scopes__.default);

          case 8:
            _context.next = 10;
            return window[scope].get(module);

          case 10:
            factory = _context.sent;
            Module = factory();
            return _context.abrupt("return", Module);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            error = new Error("There was a problem loading the remote module. Please check the parameters (url: ".concat(url, " scope: ").concat(scope, " module: ").concat(module, ")"));
            error.name = "RemoteModuleLoadingError";
            throw error;

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));
};

var suspend = function suspend(promise) {
  var result;
  var status = "pending";
  var suspender = promise.then(function (response) {
    status = "success";
    result = response;
  }, function (error) {
    status = "error";
    result = error;
  });
  return function () {
    switch (status) {
      case "pending":
        {
          throw suspender;
        }

      case "error":
        {
          throw result;
        }

      default:
        {
          return result;
        }
    }
  };
};

var _excluded = ["unLoadScriptOnUnmount", "exportName"];
var getModule = function getModule(remoteModule) {
  window.remoteModuleDictionary = window.remoteModuleDictionary || {};
  var id = getRemoteModuleId(remoteModule);
  var existingModule = window.remoteModuleDictionary[id];
  if (existingModule) return existingModule;else {
    window.remoteModuleDictionary[id] = new Promise(function (resolve) {
      attachScript(remoteModule).then(function () {
        resolve(loadModule(remoteModule.url, remoteModule.scope, remoteModule.module)());
      });
    });
    return window.remoteModuleDictionary[id];
  }
};

var getModuleSuspended = function getModuleSuspended(remoteModule) {
  window.remoteObjectDictionary = window.remoteObjectDictionary || {};
  var id = getRemoteModuleId(remoteModule);
  var existingCaller = window.remoteObjectDictionary[id];
  if (existingCaller) return existingCaller();else {
    var caller = suspend(getModule(remoteModule));
    window.remoteObjectDictionary[id] = caller;
    return caller();
  }
};

var useRemoteModule = function useRemoteModule(remoteModule) {
  return getModuleSuspended(remoteModule);
};
var RemoteComponent = function RemoteComponent(_ref) {
  _ref.unLoadScriptOnUnmount;
      var _ref$exportName = _ref.exportName,
      exportName = _ref$exportName === void 0 ? "default" : _ref$exportName,
      remoteModule = _objectWithoutProperties(_ref, _excluded);

  var _getModuleSuspended = getModuleSuspended(remoteModule),
      Component = _getModuleSuspended[exportName];

  return /*#__PURE__*/jsx(Component, {});
};

export { RemoteComponent, getModule, useRemoteModule };
//# sourceMappingURL=index.js.map

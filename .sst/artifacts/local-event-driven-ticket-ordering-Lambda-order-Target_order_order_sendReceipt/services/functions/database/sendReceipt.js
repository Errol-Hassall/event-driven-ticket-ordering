import { createRequire as topLevelCreateRequire } from 'module'
const require = topLevelCreateRequire(import.meta.url)
// node_modules/@middy/core/index.js
import { EventEmitter } from "events";
var defaultLambdaHandler = () => {
};
var defaultPlugin = {
  timeoutEarlyInMillis: 5,
  timeoutEarlyResponse: () => {
    throw new Error("Timeout");
  }
};
var middy = (lambdaHandler = defaultLambdaHandler, plugin = {}) => {
  if (typeof lambdaHandler !== "function") {
    plugin = lambdaHandler;
    lambdaHandler = defaultLambdaHandler;
  }
  plugin = {
    ...defaultPlugin,
    ...plugin
  };
  plugin.timeoutEarly = plugin.timeoutEarlyInMillis > 0;
  plugin.beforePrefetch?.();
  const beforeMiddlewares = [];
  const afterMiddlewares = [];
  const onErrorMiddlewares = [];
  const middy1 = (event = {}, context = {}) => {
    plugin.requestStart?.();
    const request = {
      event,
      context,
      response: void 0,
      error: void 0,
      internal: plugin.internal ?? {}
    };
    return runRequest(request, [
      ...beforeMiddlewares
    ], lambdaHandler, [
      ...afterMiddlewares
    ], [
      ...onErrorMiddlewares
    ], plugin);
  };
  middy1.use = (middlewares) => {
    if (!Array.isArray(middlewares)) {
      middlewares = [
        middlewares
      ];
    }
    for (const middleware of middlewares) {
      const { before, after, onError } = middleware;
      if (!before && !after && !onError) {
        throw new Error('Middleware must be an object containing at least one key among "before", "after", "onError"');
      }
      if (before)
        middy1.before(before);
      if (after)
        middy1.after(after);
      if (onError)
        middy1.onError(onError);
    }
    return middy1;
  };
  middy1.before = (beforeMiddleware) => {
    beforeMiddlewares.push(beforeMiddleware);
    return middy1;
  };
  middy1.after = (afterMiddleware) => {
    afterMiddlewares.unshift(afterMiddleware);
    return middy1;
  };
  middy1.onError = (onErrorMiddleware) => {
    onErrorMiddlewares.unshift(onErrorMiddleware);
    return middy1;
  };
  middy1.handler = (replaceLambdaHandler) => {
    lambdaHandler = replaceLambdaHandler;
    return middy1;
  };
  return middy1;
};
var runRequest = async (request, beforeMiddlewares, lambdaHandler, afterMiddlewares, onErrorMiddlewares, plugin) => {
  const timeoutEarly = plugin.timeoutEarly && request.context.getRemainingTimeInMillis;
  try {
    await runMiddlewares(request, beforeMiddlewares, plugin);
    if (request.response === void 0) {
      plugin.beforeHandler?.();
      const handlerAbort = new AbortController();
      let timeoutAbort;
      if (timeoutEarly)
        timeoutAbort = new AbortController();
      request.response = await Promise.race([
        lambdaHandler(request.event, request.context, {
          signal: handlerAbort.signal
        }),
        timeoutEarly ? setTimeoutPromise(request.context.getRemainingTimeInMillis() - plugin.timeoutEarlyInMillis, {
          signal: timeoutAbort.signal
        }).then(() => {
          handlerAbort.abort();
          return plugin.timeoutEarlyResponse();
        }) : Promise.race([])
      ]);
      if (timeoutEarly)
        timeoutAbort.abort();
      plugin.afterHandler?.();
      await runMiddlewares(request, afterMiddlewares, plugin);
    }
  } catch (e) {
    request.response = void 0;
    request.error = e;
    try {
      await runMiddlewares(request, onErrorMiddlewares, plugin);
    } catch (e2) {
      e2.originalError = request.error;
      request.error = e2;
      throw request.error;
    }
    if (request.response === void 0)
      throw request.error;
  } finally {
    await plugin.requestEnd?.(request);
  }
  return request.response;
};
var runMiddlewares = async (request, middlewares, plugin) => {
  for (const nextMiddleware of middlewares) {
    plugin.beforeMiddleware?.(nextMiddleware.name);
    const res = await nextMiddleware(request);
    plugin.afterMiddleware?.(nextMiddleware.name);
    if (res !== void 0) {
      request.response = res;
      return;
    }
  }
};
var polyfillAbortController = () => {
  if (process.version < "v15.0.0") {
    class AbortSignal {
      toString() {
        return "[object AbortSignal]";
      }
      get [Symbol.toStringTag]() {
        return "AbortSignal";
      }
      removeEventListener(name, handler2) {
        this.eventEmitter.removeListener(name, handler2);
      }
      addEventListener(name, handler2) {
        this.eventEmitter.on(name, handler2);
      }
      dispatchEvent(type) {
        const event = {
          type,
          target: this
        };
        const handlerName = `on${type}`;
        if (typeof this[handlerName] === "function")
          this[handlerName](event);
        this.eventEmitter.emit(type, event);
      }
      constructor() {
        this.eventEmitter = new EventEmitter();
        this.onabort = null;
        this.aborted = false;
      }
    }
    return class AbortController {
      abort() {
        if (this.signal.aborted)
          return;
        this.signal.aborted = true;
        this.signal.dispatchEvent("abort");
      }
      toString() {
        return "[object AbortController]";
      }
      get [Symbol.toStringTag]() {
        return "AbortController";
      }
      constructor() {
        this.signal = new AbortSignal();
      }
    };
  } else {
    return AbortController;
  }
};
global.AbortController = polyfillAbortController();
var polyfillSetTimeoutPromise = () => {
  return (ms, { signal }) => {
    if (signal.aborted) {
      return Promise.reject(new Error("Aborted", "AbortError"));
    }
    return new Promise((resolve, reject) => {
      const abortHandler = () => {
        clearTimeout(timeout);
        reject(new Error("Aborted", "AbortError"));
      };
      const timeout = setTimeout(() => {
        resolve();
        signal.removeEventListener("abort", abortHandler);
      }, ms);
      signal.addEventListener("abort", abortHandler);
    });
  };
};
var setTimeoutPromise = polyfillSetTimeoutPromise();
var core_default = middy;

// services/functions/database/sendReceipt.ts
var _sendReceipt = async (event, context) => {
  console.log("RECEIPT SENT", event);
  return {
    statusCode: 202,
    body: JSON.stringify({
      completed: true
    })
  };
};
var handler = core_default().handler(_sendReceipt);
export {
  handler
};
//# sourceMappingURL=sendReceipt.js.map

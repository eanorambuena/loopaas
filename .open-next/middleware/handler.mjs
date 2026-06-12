
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.2";globalThis.nextVersion = "15.4.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var a = {}, b = {};
      function c(d) {
        var e = b[d];
        if (void 0 !== e) return e.exports;
        var f = b[d] = { exports: {} }, g = true;
        try {
          a[d](f, f.exports, c), g = false;
        } finally {
          g && delete b[d];
        }
        return f.exports;
      }
      c.m = a, c.amdO = {}, (() => {
        var a2 = [];
        c.O = (b2, d, e, f) => {
          if (d) {
            f = f || 0;
            for (var g = a2.length; g > 0 && a2[g - 1][2] > f; g--) a2[g] = a2[g - 1];
            a2[g] = [d, e, f];
            return;
          }
          for (var h = 1 / 0, g = 0; g < a2.length; g++) {
            for (var [d, e, f] = a2[g], i = true, j = 0; j < d.length; j++) (false & f || h >= f) && Object.keys(c.O).every((a3) => c.O[a3](d[j])) ? d.splice(j--, 1) : (i = false, f < h && (h = f));
            if (i) {
              a2.splice(g--, 1);
              var k = e();
              void 0 !== k && (b2 = k);
            }
          }
          return b2;
        };
      })(), c.n = (a2) => {
        var b2 = a2 && a2.__esModule ? () => a2.default : () => a2;
        return c.d(b2, { a: b2 }), b2;
      }, c.d = (a2, b2) => {
        for (var d in b2) c.o(b2, d) && !c.o(a2, d) && Object.defineProperty(a2, d, { enumerable: true, get: b2[d] });
      }, c.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (a2) {
          if ("object" == typeof window) return window;
        }
      }(), c.o = (a2, b2) => Object.prototype.hasOwnProperty.call(a2, b2), c.r = (a2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a2, "__esModule", { value: true });
      }, (() => {
        var a2 = { 149: 0 };
        c.O.j = (b3) => 0 === a2[b3];
        var b2 = (b3, d2) => {
          var e, f, [g, h, i] = d2, j = 0;
          if (g.some((b4) => 0 !== a2[b4])) {
            for (e in h) c.o(h, e) && (c.m[e] = h[e]);
            if (i) var k = i(c);
          }
          for (b3 && b3(d2); j < g.length; j++) f = g[j], c.o(a2, f) && a2[f] && a2[f][0](), a2[f] = 0;
          return c.O(k);
        }, d = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        d.forEach(b2.bind(null, 0)), d.push = b2.bind(null, d.push.bind(d));
      })();
    })();
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/middleware.js
var require_middleware = __commonJS({
  ".next/server/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[751], { 28: (a, b, c) => {
      var d;
      (() => {
        var e = { 226: function(e2, f2) {
          !function(g2, h) {
            "use strict";
            var i = "function", j = "undefined", k = "object", l = "string", m = "major", n = "model", o = "name", p = "type", q = "vendor", r = "version", s = "architecture", t = "console", u = "mobile", v = "tablet", w = "smarttv", x = "wearable", y = "embedded", z = "Amazon", A = "Apple", B = "ASUS", C = "BlackBerry", D = "Browser", E = "Chrome", F = "Firefox", G = "Google", H = "Huawei", I = "Microsoft", J = "Motorola", K = "Opera", L = "Samsung", M = "Sharp", N = "Sony", O = "Xiaomi", P = "Zebra", Q = "Facebook", R = "Chromium OS", S = "Mac OS", T = function(a2, b2) {
              var c2 = {};
              for (var d2 in a2) b2[d2] && b2[d2].length % 2 == 0 ? c2[d2] = b2[d2].concat(a2[d2]) : c2[d2] = a2[d2];
              return c2;
            }, U = function(a2) {
              for (var b2 = {}, c2 = 0; c2 < a2.length; c2++) b2[a2[c2].toUpperCase()] = a2[c2];
              return b2;
            }, V = function(a2, b2) {
              return typeof a2 === l && -1 !== W(b2).indexOf(W(a2));
            }, W = function(a2) {
              return a2.toLowerCase();
            }, X = function(a2, b2) {
              if (typeof a2 === l) return a2 = a2.replace(/^\s\s*/, ""), typeof b2 === j ? a2 : a2.substring(0, 350);
            }, Y = function(a2, b2) {
              for (var c2, d2, e3, f3, g3, j2, l2 = 0; l2 < b2.length && !g3; ) {
                var m2 = b2[l2], n2 = b2[l2 + 1];
                for (c2 = d2 = 0; c2 < m2.length && !g3 && m2[c2]; ) if (g3 = m2[c2++].exec(a2)) for (e3 = 0; e3 < n2.length; e3++) j2 = g3[++d2], typeof (f3 = n2[e3]) === k && f3.length > 0 ? 2 === f3.length ? typeof f3[1] == i ? this[f3[0]] = f3[1].call(this, j2) : this[f3[0]] = f3[1] : 3 === f3.length ? typeof f3[1] !== i || f3[1].exec && f3[1].test ? this[f3[0]] = j2 ? j2.replace(f3[1], f3[2]) : void 0 : this[f3[0]] = j2 ? f3[1].call(this, j2, f3[2]) : void 0 : 4 === f3.length && (this[f3[0]] = j2 ? f3[3].call(this, j2.replace(f3[1], f3[2])) : h) : this[f3] = j2 || h;
                l2 += 2;
              }
            }, Z = function(a2, b2) {
              for (var c2 in b2) if (typeof b2[c2] === k && b2[c2].length > 0) {
                for (var d2 = 0; d2 < b2[c2].length; d2++) if (V(b2[c2][d2], a2)) return "?" === c2 ? h : c2;
              } else if (V(b2[c2], a2)) return "?" === c2 ? h : c2;
              return a2;
            }, $ = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, _ = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [r, [o, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [r, [o, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [o, r], [/opios[\/ ]+([\w\.]+)/i], [r, [o, K + " Mini"]], [/\bopr\/([\w\.]+)/i], [r, [o, K]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [o, r], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [r, [o, "UC" + D]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [r, [o, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [r, [o, "WeChat"]], [/konqueror\/([\w\.]+)/i], [r, [o, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [r, [o, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [r, [o, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[o, /(.+)/, "$1 Secure " + D], r], [/\bfocus\/([\w\.]+)/i], [r, [o, F + " Focus"]], [/\bopt\/([\w\.]+)/i], [r, [o, K + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [r, [o, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [r, [o, "Dolphin"]], [/coast\/([\w\.]+)/i], [r, [o, K + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [r, [o, "MIUI " + D]], [/fxios\/([-\w\.]+)/i], [r, [o, F]], [/\bqihu|(qi?ho?o?|360)browser/i], [[o, "360 " + D]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[o, /(.+)/, "$1 " + D], r], [/(comodo_dragon)\/([\w\.]+)/i], [[o, /_/g, " "], r], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [o, r], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [o], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[o, Q], r], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [o, r], [/\bgsa\/([\w\.]+) .*safari\//i], [r, [o, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [r, [o, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [r, [o, E + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[o, E + " WebView"], r], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [r, [o, "Android " + D]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [o, r], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [r, [o, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [r, o], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [o, [r, Z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [o, r], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[o, "Netscape"], r], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [r, [o, F + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [o, r], [/(cobalt)\/([\w\.]+)/i], [o, [r, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[s, "amd64"]], [/(ia32(?=;))/i], [[s, W]], [/((?:i[346]|x)86)[;\)]/i], [[s, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[s, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[s, "armhf"]], [/windows (ce|mobile); ppc;/i], [[s, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[s, /ower/, "", W]], [/(sun4\w)[;\)]/i], [[s, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[s, W]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [n, [q, L], [p, v]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [n, [q, L], [p, u]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [n, [q, A], [p, u]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [n, [q, A], [p, v]], [/(macintosh);/i], [n, [q, A]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [n, [q, M], [p, u]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [n, [q, H], [p, v]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [n, [q, H], [p, u]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[n, /_/g, " "], [q, O], [p, u]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[n, /_/g, " "], [q, O], [p, v]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [n, [q, "OPPO"], [p, u]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [n, [q, "Vivo"], [p, u]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [n, [q, "Realme"], [p, u]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [n, [q, J], [p, u]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [n, [q, J], [p, v]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [n, [q, "LG"], [p, v]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [n, [q, "LG"], [p, u]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [n, [q, "Lenovo"], [p, v]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[n, /_/g, " "], [q, "Nokia"], [p, u]], [/(pixel c)\b/i], [n, [q, G], [p, v]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [n, [q, G], [p, u]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [n, [q, N], [p, u]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[n, "Xperia Tablet"], [q, N], [p, v]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [n, [q, "OnePlus"], [p, u]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [n, [q, z], [p, v]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[n, /(.+)/g, "Fire Phone $1"], [q, z], [p, u]], [/(playbook);[-\w\),; ]+(rim)/i], [n, q, [p, v]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [n, [q, C], [p, u]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [n, [q, B], [p, v]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [n, [q, B], [p, u]], [/(nexus 9)/i], [n, [q, "HTC"], [p, v]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [q, [n, /_/g, " "], [p, u]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [n, [q, "Acer"], [p, v]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [n, [q, "Meizu"], [p, u]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [q, n, [p, u]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [q, n, [p, v]], [/(surface duo)/i], [n, [q, I], [p, v]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [n, [q, "Fairphone"], [p, u]], [/(u304aa)/i], [n, [q, "AT&T"], [p, u]], [/\bsie-(\w*)/i], [n, [q, "Siemens"], [p, u]], [/\b(rct\w+) b/i], [n, [q, "RCA"], [p, v]], [/\b(venue[\d ]{2,7}) b/i], [n, [q, "Dell"], [p, v]], [/\b(q(?:mv|ta)\w+) b/i], [n, [q, "Verizon"], [p, v]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [n, [q, "Barnes & Noble"], [p, v]], [/\b(tm\d{3}\w+) b/i], [n, [q, "NuVision"], [p, v]], [/\b(k88) b/i], [n, [q, "ZTE"], [p, v]], [/\b(nx\d{3}j) b/i], [n, [q, "ZTE"], [p, u]], [/\b(gen\d{3}) b.+49h/i], [n, [q, "Swiss"], [p, u]], [/\b(zur\d{3}) b/i], [n, [q, "Swiss"], [p, v]], [/\b((zeki)?tb.*\b) b/i], [n, [q, "Zeki"], [p, v]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[q, "Dragon Touch"], n, [p, v]], [/\b(ns-?\w{0,9}) b/i], [n, [q, "Insignia"], [p, v]], [/\b((nxa|next)-?\w{0,9}) b/i], [n, [q, "NextBook"], [p, v]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[q, "Voice"], n, [p, u]], [/\b(lvtel\-)?(v1[12]) b/i], [[q, "LvTel"], n, [p, u]], [/\b(ph-1) /i], [n, [q, "Essential"], [p, u]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [n, [q, "Envizen"], [p, v]], [/\b(trio[-\w\. ]+) b/i], [n, [q, "MachSpeed"], [p, v]], [/\btu_(1491) b/i], [n, [q, "Rotor"], [p, v]], [/(shield[\w ]+) b/i], [n, [q, "Nvidia"], [p, v]], [/(sprint) (\w+)/i], [q, n, [p, u]], [/(kin\.[onetw]{3})/i], [[n, /\./g, " "], [q, I], [p, u]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [n, [q, P], [p, v]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [n, [q, P], [p, u]], [/smart-tv.+(samsung)/i], [q, [p, w]], [/hbbtv.+maple;(\d+)/i], [[n, /^/, "SmartTV"], [q, L], [p, w]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[q, "LG"], [p, w]], [/(apple) ?tv/i], [q, [n, A + " TV"], [p, w]], [/crkey/i], [[n, E + "cast"], [q, G], [p, w]], [/droid.+aft(\w)( bui|\))/i], [n, [q, z], [p, w]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [n, [q, M], [p, w]], [/(bravia[\w ]+)( bui|\))/i], [n, [q, N], [p, w]], [/(mitv-\w{5}) bui/i], [n, [q, O], [p, w]], [/Hbbtv.*(technisat) (.*);/i], [q, n, [p, w]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[q, X], [n, X], [p, w]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[p, w]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [q, n, [p, t]], [/droid.+; (shield) bui/i], [n, [q, "Nvidia"], [p, t]], [/(playstation [345portablevi]+)/i], [n, [q, N], [p, t]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [n, [q, I], [p, t]], [/((pebble))app/i], [q, n, [p, x]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [n, [q, A], [p, x]], [/droid.+; (glass) \d/i], [n, [q, G], [p, x]], [/droid.+; (wt63?0{2,3})\)/i], [n, [q, P], [p, x]], [/(quest( 2| pro)?)/i], [n, [q, Q], [p, x]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [q, [p, y]], [/(aeobc)\b/i], [n, [q, z], [p, y]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [n, [p, u]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [n, [p, v]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[p, v]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[p, u]], [/(android[-\w\. ]{0,9});.+buil/i], [n, [q, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [r, [o, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [r, [o, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [o, r], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [r, o]], os: [[/microsoft (windows) (vista|xp)/i], [o, r], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [o, [r, Z, $]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[o, "Windows"], [r, Z, $]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[r, /_/g, "."], [o, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[o, S], [r, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [r, o], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [o, r], [/\(bb(10);/i], [r, [o, C]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [r, [o, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [r, [o, F + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [r, [o, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [r, [o, "watchOS"]], [/crkey\/([\d\.]+)/i], [r, [o, E + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[o, R], r], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [o, r], [/(sunos) ?([\w\.\d]*)/i], [[o, "Solaris"], r], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [o, r]] }, aa = function(a2, b2) {
              if (typeof a2 === k && (b2 = a2, a2 = h), !(this instanceof aa)) return new aa(a2, b2).getResult();
              var c2 = typeof g2 !== j && g2.navigator ? g2.navigator : h, d2 = a2 || (c2 && c2.userAgent ? c2.userAgent : ""), e3 = c2 && c2.userAgentData ? c2.userAgentData : h, f3 = b2 ? T(_, b2) : _, t2 = c2 && c2.userAgent == d2;
              return this.getBrowser = function() {
                var a3, b3 = {};
                return b3[o] = h, b3[r] = h, Y.call(b3, d2, f3.browser), b3[m] = typeof (a3 = b3[r]) === l ? a3.replace(/[^\d\.]/g, "").split(".")[0] : h, t2 && c2 && c2.brave && typeof c2.brave.isBrave == i && (b3[o] = "Brave"), b3;
              }, this.getCPU = function() {
                var a3 = {};
                return a3[s] = h, Y.call(a3, d2, f3.cpu), a3;
              }, this.getDevice = function() {
                var a3 = {};
                return a3[q] = h, a3[n] = h, a3[p] = h, Y.call(a3, d2, f3.device), t2 && !a3[p] && e3 && e3.mobile && (a3[p] = u), t2 && "Macintosh" == a3[n] && c2 && typeof c2.standalone !== j && c2.maxTouchPoints && c2.maxTouchPoints > 2 && (a3[n] = "iPad", a3[p] = v), a3;
              }, this.getEngine = function() {
                var a3 = {};
                return a3[o] = h, a3[r] = h, Y.call(a3, d2, f3.engine), a3;
              }, this.getOS = function() {
                var a3 = {};
                return a3[o] = h, a3[r] = h, Y.call(a3, d2, f3.os), t2 && !a3[o] && e3 && "Unknown" != e3.platform && (a3[o] = e3.platform.replace(/chrome os/i, R).replace(/macos/i, S)), a3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return d2;
              }, this.setUA = function(a3) {
                return d2 = typeof a3 === l && a3.length > 350 ? X(a3, 350) : a3, this;
              }, this.setUA(d2), this;
            };
            aa.VERSION = "1.0.35", aa.BROWSER = U([o, r, m]), aa.CPU = U([s]), aa.DEVICE = U([n, q, p, t, u, w, v, x, y]), aa.ENGINE = aa.OS = U([o, r]), typeof f2 !== j ? (e2.exports && (f2 = e2.exports = aa), f2.UAParser = aa) : c.amdO ? void 0 === (d = function() {
              return aa;
            }.call(b, c, b, a)) || (a.exports = d) : typeof g2 !== j && (g2.UAParser = aa);
            var ab = typeof g2 !== j && (g2.jQuery || g2.Zepto);
            if (ab && !ab.ua) {
              var ac = new aa();
              ab.ua = ac.getResult(), ab.ua.get = function() {
                return ac.getUA();
              }, ab.ua.set = function(a2) {
                ac.setUA(a2);
                var b2 = ac.getResult();
                for (var c2 in b2) ab.ua[c2] = b2[c2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, f = {};
        function g(a2) {
          var b2 = f[a2];
          if (void 0 !== b2) return b2.exports;
          var c2 = f[a2] = { exports: {} }, d2 = true;
          try {
            e[a2].call(c2.exports, c2, c2.exports, g), d2 = false;
          } finally {
            d2 && delete f[a2];
          }
          return c2.exports;
        }
        g.ab = "//", a.exports = g(226);
      })();
    }, 38: (a) => {
      (() => {
        "use strict";
        var b = { 993: (a2) => {
          var b2 = Object.prototype.hasOwnProperty, c2 = "~";
          function d2() {
          }
          function e2(a3, b3, c3) {
            this.fn = a3, this.context = b3, this.once = c3 || false;
          }
          function f(a3, b3, d3, f2, g2) {
            if ("function" != typeof d3) throw TypeError("The listener must be a function");
            var h2 = new e2(d3, f2 || a3, g2), i = c2 ? c2 + b3 : b3;
            return a3._events[i] ? a3._events[i].fn ? a3._events[i] = [a3._events[i], h2] : a3._events[i].push(h2) : (a3._events[i] = h2, a3._eventsCount++), a3;
          }
          function g(a3, b3) {
            0 == --a3._eventsCount ? a3._events = new d2() : delete a3._events[b3];
          }
          function h() {
            this._events = new d2(), this._eventsCount = 0;
          }
          Object.create && (d2.prototype = /* @__PURE__ */ Object.create(null), new d2().__proto__ || (c2 = false)), h.prototype.eventNames = function() {
            var a3, d3, e3 = [];
            if (0 === this._eventsCount) return e3;
            for (d3 in a3 = this._events) b2.call(a3, d3) && e3.push(c2 ? d3.slice(1) : d3);
            return Object.getOwnPropertySymbols ? e3.concat(Object.getOwnPropertySymbols(a3)) : e3;
          }, h.prototype.listeners = function(a3) {
            var b3 = c2 ? c2 + a3 : a3, d3 = this._events[b3];
            if (!d3) return [];
            if (d3.fn) return [d3.fn];
            for (var e3 = 0, f2 = d3.length, g2 = Array(f2); e3 < f2; e3++) g2[e3] = d3[e3].fn;
            return g2;
          }, h.prototype.listenerCount = function(a3) {
            var b3 = c2 ? c2 + a3 : a3, d3 = this._events[b3];
            return d3 ? d3.fn ? 1 : d3.length : 0;
          }, h.prototype.emit = function(a3, b3, d3, e3, f2, g2) {
            var h2 = c2 ? c2 + a3 : a3;
            if (!this._events[h2]) return false;
            var i, j, k = this._events[h2], l = arguments.length;
            if (k.fn) {
              switch (k.once && this.removeListener(a3, k.fn, void 0, true), l) {
                case 1:
                  return k.fn.call(k.context), true;
                case 2:
                  return k.fn.call(k.context, b3), true;
                case 3:
                  return k.fn.call(k.context, b3, d3), true;
                case 4:
                  return k.fn.call(k.context, b3, d3, e3), true;
                case 5:
                  return k.fn.call(k.context, b3, d3, e3, f2), true;
                case 6:
                  return k.fn.call(k.context, b3, d3, e3, f2, g2), true;
              }
              for (j = 1, i = Array(l - 1); j < l; j++) i[j - 1] = arguments[j];
              k.fn.apply(k.context, i);
            } else {
              var m, n = k.length;
              for (j = 0; j < n; j++) switch (k[j].once && this.removeListener(a3, k[j].fn, void 0, true), l) {
                case 1:
                  k[j].fn.call(k[j].context);
                  break;
                case 2:
                  k[j].fn.call(k[j].context, b3);
                  break;
                case 3:
                  k[j].fn.call(k[j].context, b3, d3);
                  break;
                case 4:
                  k[j].fn.call(k[j].context, b3, d3, e3);
                  break;
                default:
                  if (!i) for (m = 1, i = Array(l - 1); m < l; m++) i[m - 1] = arguments[m];
                  k[j].fn.apply(k[j].context, i);
              }
            }
            return true;
          }, h.prototype.on = function(a3, b3, c3) {
            return f(this, a3, b3, c3, false);
          }, h.prototype.once = function(a3, b3, c3) {
            return f(this, a3, b3, c3, true);
          }, h.prototype.removeListener = function(a3, b3, d3, e3) {
            var f2 = c2 ? c2 + a3 : a3;
            if (!this._events[f2]) return this;
            if (!b3) return g(this, f2), this;
            var h2 = this._events[f2];
            if (h2.fn) h2.fn !== b3 || e3 && !h2.once || d3 && h2.context !== d3 || g(this, f2);
            else {
              for (var i = 0, j = [], k = h2.length; i < k; i++) (h2[i].fn !== b3 || e3 && !h2[i].once || d3 && h2[i].context !== d3) && j.push(h2[i]);
              j.length ? this._events[f2] = 1 === j.length ? j[0] : j : g(this, f2);
            }
            return this;
          }, h.prototype.removeAllListeners = function(a3) {
            var b3;
            return a3 ? (b3 = c2 ? c2 + a3 : a3, this._events[b3] && g(this, b3)) : (this._events = new d2(), this._eventsCount = 0), this;
          }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = c2, h.EventEmitter = h, a2.exports = h;
        }, 213: (a2) => {
          a2.exports = (a3, b2) => (b2 = b2 || (() => {
          }), a3.then((a4) => new Promise((a5) => {
            a5(b2());
          }).then(() => a4), (a4) => new Promise((a5) => {
            a5(b2());
          }).then(() => {
            throw a4;
          })));
        }, 574: (a2, b2) => {
          Object.defineProperty(b2, "__esModule", { value: true }), b2.default = function(a3, b3, c2) {
            let d2 = 0, e2 = a3.length;
            for (; e2 > 0; ) {
              let f = e2 / 2 | 0, g = d2 + f;
              0 >= c2(a3[g], b3) ? (d2 = ++g, e2 -= f + 1) : e2 = f;
            }
            return d2;
          };
        }, 821: (a2, b2, c2) => {
          Object.defineProperty(b2, "__esModule", { value: true });
          let d2 = c2(574);
          class e2 {
            constructor() {
              this._queue = [];
            }
            enqueue(a3, b3) {
              let c3 = { priority: (b3 = Object.assign({ priority: 0 }, b3)).priority, run: a3 };
              if (this.size && this._queue[this.size - 1].priority >= b3.priority) return void this._queue.push(c3);
              let e3 = d2.default(this._queue, c3, (a4, b4) => b4.priority - a4.priority);
              this._queue.splice(e3, 0, c3);
            }
            dequeue() {
              let a3 = this._queue.shift();
              return null == a3 ? void 0 : a3.run;
            }
            filter(a3) {
              return this._queue.filter((b3) => b3.priority === a3.priority).map((a4) => a4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          b2.default = e2;
        }, 816: (a2, b2, c2) => {
          let d2 = c2(213);
          class e2 extends Error {
            constructor(a3) {
              super(a3), this.name = "TimeoutError";
            }
          }
          let f = (a3, b3, c3) => new Promise((f2, g) => {
            if ("number" != typeof b3 || b3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (b3 === 1 / 0) return void f2(a3);
            let h = setTimeout(() => {
              if ("function" == typeof c3) {
                try {
                  f2(c3());
                } catch (a4) {
                  g(a4);
                }
                return;
              }
              let d3 = "string" == typeof c3 ? c3 : `Promise timed out after ${b3} milliseconds`, h2 = c3 instanceof Error ? c3 : new e2(d3);
              "function" == typeof a3.cancel && a3.cancel(), g(h2);
            }, b3);
            d2(a3.then(f2, g), () => {
              clearTimeout(h);
            });
          });
          a2.exports = f, a2.exports.default = f, a2.exports.TimeoutError = e2;
        } }, c = {};
        function d(a2) {
          var e2 = c[a2];
          if (void 0 !== e2) return e2.exports;
          var f = c[a2] = { exports: {} }, g = true;
          try {
            b[a2](f, f.exports, d), g = false;
          } finally {
            g && delete c[a2];
          }
          return f.exports;
        }
        d.ab = "//";
        var e = {};
        (() => {
          Object.defineProperty(e, "__esModule", { value: true });
          let a2 = d(993), b2 = d(816), c2 = d(821), f = () => {
          }, g = new b2.TimeoutError();
          class h extends a2 {
            constructor(a3) {
              var b3, d2, e2, g2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = f, this._resolveIdle = f, !("number" == typeof (a3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: c2.default }, a3)).intervalCap && a3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (d2 = null == (b3 = a3.intervalCap) ? void 0 : b3.toString()) ? d2 : ""}\` (${typeof a3.intervalCap})`);
              if (void 0 === a3.interval || !(Number.isFinite(a3.interval) && a3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (g2 = null == (e2 = a3.interval) ? void 0 : e2.toString()) ? g2 : ""}\` (${typeof a3.interval})`);
              this._carryoverConcurrencyCount = a3.carryoverConcurrencyCount, this._isIntervalIgnored = a3.intervalCap === 1 / 0 || 0 === a3.interval, this._intervalCap = a3.intervalCap, this._interval = a3.interval, this._queue = new a3.queueClass(), this._queueClass = a3.queueClass, this.concurrency = a3.concurrency, this._timeout = a3.timeout, this._throwOnTimeout = true === a3.throwOnTimeout, this._isPaused = false === a3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = f, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = f, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let a3 = Date.now();
              if (void 0 === this._intervalId) {
                let b3 = this._intervalEnd - a3;
                if (!(b3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, b3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let a3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let b3 = this._queue.dequeue();
                  return !!b3 && (this.emit("active"), b3(), a3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(a3) {
              if (!("number" == typeof a3 && a3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${a3}\` (${typeof a3})`);
              this._concurrency = a3, this._processQueue();
            }
            async add(a3, c3 = {}) {
              return new Promise((d2, e2) => {
                let f2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let f3 = void 0 === this._timeout && void 0 === c3.timeout ? a3() : b2.default(Promise.resolve(a3()), void 0 === c3.timeout ? this._timeout : c3.timeout, () => {
                      (void 0 === c3.throwOnTimeout ? this._throwOnTimeout : c3.throwOnTimeout) && e2(g);
                    });
                    d2(await f3);
                  } catch (a4) {
                    e2(a4);
                  }
                  this._next();
                };
                this._queue.enqueue(f2, c3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(a3, b3) {
              return Promise.all(a3.map(async (a4) => this.add(a4, b3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((a3) => {
                let b3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  b3(), a3();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((a3) => {
                let b3 = this._resolveIdle;
                this._resolveIdle = () => {
                  b3(), a3();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(a3) {
              return this._queue.filter(a3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(a3) {
              this._timeout = a3;
            }
          }
          e.default = h;
        })(), a.exports = e;
      })();
    }, 81: (a, b, c) => {
      "use strict";
      c.r(b), c.d(b, { validateDpopConfiguration: () => g, validateKeyPairCompatibility: () => f });
      var d = c(354), e = c(304);
      async function f(a2, b2) {
        if ((0, e.Ud)()) return true;
        try {
          let { createSign: d2, createVerify: e2 } = await c(799)("crypto"), f2 = "test-data-for-key-pair-validation", g2 = d2("sha256");
          g2.update(f2);
          let h = g2.sign(a2), i = e2("sha256");
          if (i.update(f2), !i.verify(b2, h)) return console.warn("WARNING: Private and public keys do not form a valid key pair - signature verification failed. Please ensure the keys are properly paired and in the correct format. DPoP will be disabled and bearer authentication will be used instead."), false;
          return true;
        } catch (a3) {
          return console.warn(`WARNING: Failed to validate key pair compatibility. This may indicate invalid key format, mismatched algorithms, or corrupted key data. DPoP will be disabled and bearer authentication will be used instead. Error: ${a3 instanceof Error ? a3.message : String(a3)}`), false;
        }
      }
      async function g(a2) {
        let b2 = a2.useDPoP || false;
        if (!b2) return { dpopKeyPair: void 0, dpopOptions: void 0 };
        let g2 = a2.dpopOptions?.clockTolerance ?? (process.env.AUTH0_DPOP_CLOCK_TOLERANCE ? parseInt(process.env.AUTH0_DPOP_CLOCK_TOLERANCE, 10) : d.xk);
        if (g2 > d.mu) {
          let a3 = process.env.AUTH0_DPOP_CLOCK_TOLERANCE_MAX_PROD ? parseInt(process.env.AUTH0_DPOP_CLOCK_TOLERANCE_MAX_PROD, 10) : d.mu;
          if (g2 > a3) throw Error(`clockTolerance of ${g2}s exceeds maximum allowed ${a3}s in production. This could significantly weaken DPoP replay attack protection. Set AUTH0_DPOP_CLOCK_TOLERANCE_MAX_PROD environment variable to override this limit in production.`);
          console.warn(`WARNING: clockTolerance of ${g2}s exceeds recommended maximum of ${d.mu}s. This may weaken DPoP security by allowing replay attacks within a wider time window. Consider synchronizing server clocks using NTP instead of increasing tolerance.`);
        }
        let h = { clockSkew: a2.dpopOptions?.clockSkew ?? (process.env.AUTH0_DPOP_CLOCK_SKEW ? parseInt(process.env.AUTH0_DPOP_CLOCK_SKEW, 10) : d.w9), clockTolerance: g2, retry: { delay: a2.dpopOptions?.retry?.delay ?? (process.env.AUTH0_RETRY_DELAY ? parseInt(process.env.AUTH0_RETRY_DELAY, 10) : d.tn), jitter: a2.dpopOptions?.retry?.jitter ?? (process.env.AUTH0_RETRY_JITTER ? "true" === process.env.AUTH0_RETRY_JITTER : d.cs) } };
        if (h.retry && "number" == typeof h.retry.delay && h.retry.delay < 0) throw Error("Retry delay must be non-negative");
        if (a2.dpopKeyPair) return { dpopKeyPair: a2.dpopKeyPair, dpopOptions: h };
        if (b2) {
          let a3 = process.env.AUTH0_DPOP_PRIVATE_KEY, b3 = process.env.AUTH0_DPOP_PUBLIC_KEY;
          if ((0, e.Ud)() && (a3 || b3)) return console.warn("WARNING: Running in Edge Runtime environment. DPoP keypair loading from environment variables is not supported due to limited Node.js crypto API access. DPoP has been disabled. To use DPoP in Edge Runtime, provide a pre-generated keypair via the dpopKeyPair option."), { dpopKeyPair: void 0, dpopOptions: void 0 };
          if (a3 && b3) try {
            let { createPrivateKey: d2, createPublicKey: e2, webcrypto: g3 } = await c(128)("crypto"), i = d2(a3), j = e2(b3);
            if ("ec" !== i.asymmetricKeyType) throw Error(`DPoP private key must be an Elliptic Curve key for ES256 algorithm, got: ${i.asymmetricKeyType}`);
            if ("ec" !== j.asymmetricKeyType) throw Error(`DPoP public key must be an Elliptic Curve key for ES256 algorithm, got: ${j.asymmetricKeyType}`);
            let k = i.asymmetricKeyDetails, l = j.asymmetricKeyDetails;
            if (k?.namedCurve !== "prime256v1") throw Error(`DPoP private key must use P-256 curve (prime256v1) for ES256 algorithm, got: ${k?.namedCurve}`);
            if (l?.namedCurve !== "prime256v1") throw Error(`DPoP public key must use P-256 curve (prime256v1) for ES256 algorithm, got: ${l?.namedCurve}`);
            if (!await f(i, j)) return console.warn("WARNING: DPoP key pair validation failed. DPoP has been completely disabled. Falling back to bearer authentication. Please verify your key pair configuration."), { dpopKeyPair: void 0, dpopOptions: void 0 };
            let m = i.export({ type: "pkcs8", format: "der" }), n = j.export({ type: "spki", format: "der" }), o = await g3.subtle.importKey("pkcs8", m, { name: "ECDSA", namedCurve: "P-256" }, true, ["sign"]), p = await g3.subtle.importKey("spki", n, { name: "ECDSA", namedCurve: "P-256" }, true, ["verify"]);
            return { dpopKeyPair: { privateKey: o, publicKey: p }, dpopOptions: h };
          } catch (a4) {
            console.warn(`WARNING: Failed to load DPoP keypair from environment variables. Please ensure AUTH0_DPOP_PUBLIC_KEY and AUTH0_DPOP_PRIVATE_KEY contain valid ES256 keys in PEM format. Error: ${a4 instanceof Error ? a4.message : String(a4)}`);
          }
          a3 && b3 || console.warn("WARNING: useDPoP is set to true but dpopKeyPair is not provided. DPoP will not be used and protected requests will use bearer authentication instead. To enable DPoP, provide a dpopKeyPair in the Auth0Client options or set AUTH0_DPOP_PUBLIC_KEY and AUTH0_DPOP_PRIVATE_KEY environment variables.");
        }
        return { dpopKeyPair: void 0, dpopOptions: h };
      }
    }, 128: (a) => {
      function b(a2) {
        return Promise.resolve().then(() => {
          var b2 = Error("Cannot find module '" + a2 + "'");
          throw b2.code = "MODULE_NOT_FOUND", b2;
        });
      }
      b.keys = () => [], b.resolve = b, b.id = 128, a.exports = b;
    }, 172: (a, b, c) => {
      "use strict";
      c.d(b, { J: () => d });
      let d = (0, c(981).xl)();
    }, 185: (a, b, c) => {
      "use strict";
      c.d(b, { Q: () => d });
      var d = function(a2) {
        return a2[a2.SeeOther = 303] = "SeeOther", a2[a2.TemporaryRedirect = 307] = "TemporaryRedirect", a2[a2.PermanentRedirect = 308] = "PermanentRedirect", a2;
      }({});
    }, 249: (a, b, c) => {
      "use strict";
      c.d(b, { Ud: () => d.stringifyCookie, VO: () => d.ResponseCookies, tm: () => d.RequestCookies });
      var d = c(800);
    }, 291: (a, b, c) => {
      "use strict";
      c.d(b, { nJ: () => g, oJ: () => e, zB: () => f });
      var d = c(185);
      let e = "NEXT_REDIRECT";
      var f = function(a2) {
        return a2.push = "push", a2.replace = "replace", a2;
      }({});
      function g(a2) {
        if ("object" != typeof a2 || null === a2 || !("digest" in a2) || "string" != typeof a2.digest) return false;
        let b2 = a2.digest.split(";"), [c2, f2] = b2, g2 = b2.slice(2, -2).join(";"), h = Number(b2.at(-2));
        return c2 === e && ("replace" === f2 || "push" === f2) && "string" == typeof g2 && !isNaN(h) && h in d.Q;
      }
    }, 298: (a, b, c) => {
      "use strict";
      c.d(b, { XN: () => e, FP: () => d });
      let d = (0, c(981).xl)();
      function e(a2) {
        let b2 = d.getStore();
        switch (!b2 && function(a3) {
          throw Object.defineProperty(Error(`\`${a3}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
        }(a2), b2.type) {
          case "request":
          default:
            return b2;
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
            throw Object.defineProperty(Error(`\`${a2}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", { value: "E401", enumerable: false, configurable: true });
          case "cache":
            throw Object.defineProperty(Error(`\`${a2}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E37", enumerable: false, configurable: true });
          case "unstable-cache":
            throw Object.defineProperty(Error(`\`${a2}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E69", enumerable: false, configurable: true });
        }
      }
    }, 303: (a, b, c) => {
      "use strict";
      c.d(b, { Z: () => d });
      let d = (0, c(960).xl)();
    }, 304: (a, b, c) => {
      "use strict";
      c.d(b, { Ud: () => e, bp: () => g });
      var d = c(734);
      function e() {
        return "string" == typeof globalThis.EdgeRuntime;
      }
      let f = async (a2) => {
        let b2 = a2?.delay ?? 100, c2 = a2?.jitter ?? true, d2 = b2;
        c2 && (d2 = b2 * (0.5 + 0.5 * Math.random())), await new Promise((a3) => setTimeout(a3, d2));
      };
      async function g(a2, b2) {
        if (!b2?.isDPoPEnabled) return await a2();
        try {
          let c2 = await a2();
          if (c2 instanceof Response && 400 === c2.status) try {
            let d2 = await c2.clone().json();
            if ("use_dpop_nonce" === d2.error) return await f(b2), await a2();
          } catch {
          }
          return c2;
        } catch (c2) {
          if ((0, d.r5)(c2)) return await f(b2), await a2();
          throw c2;
        }
      }
    }, 328: (a, b, c) => {
      (() => {
        "use strict";
        var b2 = { 491: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ContextAPI = void 0;
          let d2 = c2(223), e2 = c2(172), f2 = c2(930), g = "context", h = new d2.NoopContextManager();
          class i {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new i()), this._instance;
            }
            setGlobalContextManager(a3) {
              return (0, e2.registerGlobal)(g, a3, f2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(a3, b4, c3, ...d3) {
              return this._getContextManager().with(a3, b4, c3, ...d3);
            }
            bind(a3, b4) {
              return this._getContextManager().bind(a3, b4);
            }
            _getContextManager() {
              return (0, e2.getGlobal)(g) || h;
            }
            disable() {
              this._getContextManager().disable(), (0, e2.unregisterGlobal)(g, f2.DiagAPI.instance());
            }
          }
          b3.ContextAPI = i;
        }, 930: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagAPI = void 0;
          let d2 = c2(56), e2 = c2(912), f2 = c2(957), g = c2(172);
          class h {
            constructor() {
              function a3(a4) {
                return function(...b5) {
                  let c3 = (0, g.getGlobal)("diag");
                  if (c3) return c3[a4](...b5);
                };
              }
              let b4 = this;
              b4.setLogger = (a4, c3 = { logLevel: f2.DiagLogLevel.INFO }) => {
                var d3, h2, i;
                if (a4 === b4) {
                  let a5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return b4.error(null != (d3 = a5.stack) ? d3 : a5.message), false;
                }
                "number" == typeof c3 && (c3 = { logLevel: c3 });
                let j = (0, g.getGlobal)("diag"), k = (0, e2.createLogLevelDiagLogger)(null != (h2 = c3.logLevel) ? h2 : f2.DiagLogLevel.INFO, a4);
                if (j && !c3.suppressOverrideMessage) {
                  let a5 = null != (i = Error().stack) ? i : "<failed to generate stacktrace>";
                  j.warn(`Current logger will be overwritten from ${a5}`), k.warn(`Current logger will overwrite one already registered from ${a5}`);
                }
                return (0, g.registerGlobal)("diag", k, b4, true);
              }, b4.disable = () => {
                (0, g.unregisterGlobal)("diag", b4);
              }, b4.createComponentLogger = (a4) => new d2.DiagComponentLogger(a4), b4.verbose = a3("verbose"), b4.debug = a3("debug"), b4.info = a3("info"), b4.warn = a3("warn"), b4.error = a3("error");
            }
            static instance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
          }
          b3.DiagAPI = h;
        }, 653: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.MetricsAPI = void 0;
          let d2 = c2(660), e2 = c2(172), f2 = c2(930), g = "metrics";
          class h {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
            setGlobalMeterProvider(a3) {
              return (0, e2.registerGlobal)(g, a3, f2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, e2.getGlobal)(g) || d2.NOOP_METER_PROVIDER;
            }
            getMeter(a3, b4, c3) {
              return this.getMeterProvider().getMeter(a3, b4, c3);
            }
            disable() {
              (0, e2.unregisterGlobal)(g, f2.DiagAPI.instance());
            }
          }
          b3.MetricsAPI = h;
        }, 181: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.PropagationAPI = void 0;
          let d2 = c2(172), e2 = c2(874), f2 = c2(194), g = c2(277), h = c2(369), i = c2(930), j = "propagation", k = new e2.NoopTextMapPropagator();
          class l {
            constructor() {
              this.createBaggage = h.createBaggage, this.getBaggage = g.getBaggage, this.getActiveBaggage = g.getActiveBaggage, this.setBaggage = g.setBaggage, this.deleteBaggage = g.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalPropagator(a3) {
              return (0, d2.registerGlobal)(j, a3, i.DiagAPI.instance());
            }
            inject(a3, b4, c3 = f2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(a3, b4, c3);
            }
            extract(a3, b4, c3 = f2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(a3, b4, c3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, d2.unregisterGlobal)(j, i.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, d2.getGlobal)(j) || k;
            }
          }
          b3.PropagationAPI = l;
        }, 997: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.TraceAPI = void 0;
          let d2 = c2(172), e2 = c2(846), f2 = c2(139), g = c2(607), h = c2(930), i = "trace";
          class j {
            constructor() {
              this._proxyTracerProvider = new e2.ProxyTracerProvider(), this.wrapSpanContext = f2.wrapSpanContext, this.isSpanContextValid = f2.isSpanContextValid, this.deleteSpan = g.deleteSpan, this.getSpan = g.getSpan, this.getActiveSpan = g.getActiveSpan, this.getSpanContext = g.getSpanContext, this.setSpan = g.setSpan, this.setSpanContext = g.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new j()), this._instance;
            }
            setGlobalTracerProvider(a3) {
              let b4 = (0, d2.registerGlobal)(i, this._proxyTracerProvider, h.DiagAPI.instance());
              return b4 && this._proxyTracerProvider.setDelegate(a3), b4;
            }
            getTracerProvider() {
              return (0, d2.getGlobal)(i) || this._proxyTracerProvider;
            }
            getTracer(a3, b4) {
              return this.getTracerProvider().getTracer(a3, b4);
            }
            disable() {
              (0, d2.unregisterGlobal)(i, h.DiagAPI.instance()), this._proxyTracerProvider = new e2.ProxyTracerProvider();
            }
          }
          b3.TraceAPI = j;
        }, 277: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.deleteBaggage = b3.setBaggage = b3.getActiveBaggage = b3.getBaggage = void 0;
          let d2 = c2(491), e2 = (0, c2(780).createContextKey)("OpenTelemetry Baggage Key");
          function f2(a3) {
            return a3.getValue(e2) || void 0;
          }
          b3.getBaggage = f2, b3.getActiveBaggage = function() {
            return f2(d2.ContextAPI.getInstance().active());
          }, b3.setBaggage = function(a3, b4) {
            return a3.setValue(e2, b4);
          }, b3.deleteBaggage = function(a3) {
            return a3.deleteValue(e2);
          };
        }, 993: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.BaggageImpl = void 0;
          class c2 {
            constructor(a3) {
              this._entries = a3 ? new Map(a3) : /* @__PURE__ */ new Map();
            }
            getEntry(a3) {
              let b4 = this._entries.get(a3);
              if (b4) return Object.assign({}, b4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([a3, b4]) => [a3, b4]);
            }
            setEntry(a3, b4) {
              let d2 = new c2(this._entries);
              return d2._entries.set(a3, b4), d2;
            }
            removeEntry(a3) {
              let b4 = new c2(this._entries);
              return b4._entries.delete(a3), b4;
            }
            removeEntries(...a3) {
              let b4 = new c2(this._entries);
              for (let c3 of a3) b4._entries.delete(c3);
              return b4;
            }
            clear() {
              return new c2();
            }
          }
          b3.BaggageImpl = c2;
        }, 830: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.baggageEntryMetadataSymbol = void 0, b3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.baggageEntryMetadataFromString = b3.createBaggage = void 0;
          let d2 = c2(930), e2 = c2(993), f2 = c2(830), g = d2.DiagAPI.instance();
          b3.createBaggage = function(a3 = {}) {
            return new e2.BaggageImpl(new Map(Object.entries(a3)));
          }, b3.baggageEntryMetadataFromString = function(a3) {
            return "string" != typeof a3 && (g.error(`Cannot create baggage metadata from unknown type: ${typeof a3}`), a3 = ""), { __TYPE__: f2.baggageEntryMetadataSymbol, toString: () => a3 };
          };
        }, 67: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.context = void 0, b3.context = c2(491).ContextAPI.getInstance();
        }, 223: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopContextManager = void 0;
          let d2 = c2(780);
          class e2 {
            active() {
              return d2.ROOT_CONTEXT;
            }
            with(a3, b4, c3, ...d3) {
              return b4.call(c3, ...d3);
            }
            bind(a3, b4) {
              return b4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          b3.NoopContextManager = e2;
        }, 780: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ROOT_CONTEXT = b3.createContextKey = void 0, b3.createContextKey = function(a3) {
            return Symbol.for(a3);
          };
          class c2 {
            constructor(a3) {
              let b4 = this;
              b4._currentContext = a3 ? new Map(a3) : /* @__PURE__ */ new Map(), b4.getValue = (a4) => b4._currentContext.get(a4), b4.setValue = (a4, d2) => {
                let e2 = new c2(b4._currentContext);
                return e2._currentContext.set(a4, d2), e2;
              }, b4.deleteValue = (a4) => {
                let d2 = new c2(b4._currentContext);
                return d2._currentContext.delete(a4), d2;
              };
            }
          }
          b3.ROOT_CONTEXT = new c2();
        }, 506: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.diag = void 0, b3.diag = c2(930).DiagAPI.instance();
        }, 56: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagComponentLogger = void 0;
          let d2 = c2(172);
          class e2 {
            constructor(a3) {
              this._namespace = a3.namespace || "DiagComponentLogger";
            }
            debug(...a3) {
              return f2("debug", this._namespace, a3);
            }
            error(...a3) {
              return f2("error", this._namespace, a3);
            }
            info(...a3) {
              return f2("info", this._namespace, a3);
            }
            warn(...a3) {
              return f2("warn", this._namespace, a3);
            }
            verbose(...a3) {
              return f2("verbose", this._namespace, a3);
            }
          }
          function f2(a3, b4, c3) {
            let e3 = (0, d2.getGlobal)("diag");
            if (e3) return c3.unshift(b4), e3[a3](...c3);
          }
          b3.DiagComponentLogger = e2;
        }, 972: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagConsoleLogger = void 0;
          let c2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class d2 {
            constructor() {
              for (let a3 = 0; a3 < c2.length; a3++) this[c2[a3].n] = /* @__PURE__ */ function(a4) {
                return function(...b4) {
                  if (console) {
                    let c3 = console[a4];
                    if ("function" != typeof c3 && (c3 = console.log), "function" == typeof c3) return c3.apply(console, b4);
                  }
                };
              }(c2[a3].c);
            }
          }
          b3.DiagConsoleLogger = d2;
        }, 912: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.createLogLevelDiagLogger = void 0;
          let d2 = c2(957);
          b3.createLogLevelDiagLogger = function(a3, b4) {
            function c3(c4, d3) {
              let e2 = b4[c4];
              return "function" == typeof e2 && a3 >= d3 ? e2.bind(b4) : function() {
              };
            }
            return a3 < d2.DiagLogLevel.NONE ? a3 = d2.DiagLogLevel.NONE : a3 > d2.DiagLogLevel.ALL && (a3 = d2.DiagLogLevel.ALL), b4 = b4 || {}, { error: c3("error", d2.DiagLogLevel.ERROR), warn: c3("warn", d2.DiagLogLevel.WARN), info: c3("info", d2.DiagLogLevel.INFO), debug: c3("debug", d2.DiagLogLevel.DEBUG), verbose: c3("verbose", d2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagLogLevel = void 0, function(a3) {
            a3[a3.NONE = 0] = "NONE", a3[a3.ERROR = 30] = "ERROR", a3[a3.WARN = 50] = "WARN", a3[a3.INFO = 60] = "INFO", a3[a3.DEBUG = 70] = "DEBUG", a3[a3.VERBOSE = 80] = "VERBOSE", a3[a3.ALL = 9999] = "ALL";
          }(b3.DiagLogLevel || (b3.DiagLogLevel = {}));
        }, 172: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.unregisterGlobal = b3.getGlobal = b3.registerGlobal = void 0;
          let d2 = c2(200), e2 = c2(521), f2 = c2(130), g = e2.VERSION.split(".")[0], h = Symbol.for(`opentelemetry.js.api.${g}`), i = d2._globalThis;
          b3.registerGlobal = function(a3, b4, c3, d3 = false) {
            var f3;
            let g2 = i[h] = null != (f3 = i[h]) ? f3 : { version: e2.VERSION };
            if (!d3 && g2[a3]) {
              let b5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${a3}`);
              return c3.error(b5.stack || b5.message), false;
            }
            if (g2.version !== e2.VERSION) {
              let b5 = Error(`@opentelemetry/api: Registration of version v${g2.version} for ${a3} does not match previously registered API v${e2.VERSION}`);
              return c3.error(b5.stack || b5.message), false;
            }
            return g2[a3] = b4, c3.debug(`@opentelemetry/api: Registered a global for ${a3} v${e2.VERSION}.`), true;
          }, b3.getGlobal = function(a3) {
            var b4, c3;
            let d3 = null == (b4 = i[h]) ? void 0 : b4.version;
            if (d3 && (0, f2.isCompatible)(d3)) return null == (c3 = i[h]) ? void 0 : c3[a3];
          }, b3.unregisterGlobal = function(a3, b4) {
            b4.debug(`@opentelemetry/api: Unregistering a global for ${a3} v${e2.VERSION}.`);
            let c3 = i[h];
            c3 && delete c3[a3];
          };
        }, 130: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.isCompatible = b3._makeCompatibilityCheck = void 0;
          let d2 = c2(521), e2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function f2(a3) {
            let b4 = /* @__PURE__ */ new Set([a3]), c3 = /* @__PURE__ */ new Set(), d3 = a3.match(e2);
            if (!d3) return () => false;
            let f3 = { major: +d3[1], minor: +d3[2], patch: +d3[3], prerelease: d3[4] };
            if (null != f3.prerelease) return function(b5) {
              return b5 === a3;
            };
            function g(a4) {
              return c3.add(a4), false;
            }
            return function(a4) {
              if (b4.has(a4)) return true;
              if (c3.has(a4)) return false;
              let d4 = a4.match(e2);
              if (!d4) return g(a4);
              let h = { major: +d4[1], minor: +d4[2], patch: +d4[3], prerelease: d4[4] };
              if (null != h.prerelease || f3.major !== h.major) return g(a4);
              if (0 === f3.major) return f3.minor === h.minor && f3.patch <= h.patch ? (b4.add(a4), true) : g(a4);
              return f3.minor <= h.minor ? (b4.add(a4), true) : g(a4);
            };
          }
          b3._makeCompatibilityCheck = f2, b3.isCompatible = f2(d2.VERSION);
        }, 886: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.metrics = void 0, b3.metrics = c2(653).MetricsAPI.getInstance();
        }, 901: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ValueType = void 0, function(a3) {
            a3[a3.INT = 0] = "INT", a3[a3.DOUBLE = 1] = "DOUBLE";
          }(b3.ValueType || (b3.ValueType = {}));
        }, 102: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.createNoopMeter = b3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = b3.NOOP_OBSERVABLE_GAUGE_METRIC = b3.NOOP_OBSERVABLE_COUNTER_METRIC = b3.NOOP_UP_DOWN_COUNTER_METRIC = b3.NOOP_HISTOGRAM_METRIC = b3.NOOP_COUNTER_METRIC = b3.NOOP_METER = b3.NoopObservableUpDownCounterMetric = b3.NoopObservableGaugeMetric = b3.NoopObservableCounterMetric = b3.NoopObservableMetric = b3.NoopHistogramMetric = b3.NoopUpDownCounterMetric = b3.NoopCounterMetric = b3.NoopMetric = b3.NoopMeter = void 0;
          class c2 {
            constructor() {
            }
            createHistogram(a3, c3) {
              return b3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(a3, c3) {
              return b3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(a3, c3) {
              return b3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(a3, c3) {
              return b3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(a3, c3) {
              return b3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(a3, c3) {
              return b3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(a3, b4) {
            }
            removeBatchObservableCallback(a3) {
            }
          }
          b3.NoopMeter = c2;
          class d2 {
          }
          b3.NoopMetric = d2;
          class e2 extends d2 {
            add(a3, b4) {
            }
          }
          b3.NoopCounterMetric = e2;
          class f2 extends d2 {
            add(a3, b4) {
            }
          }
          b3.NoopUpDownCounterMetric = f2;
          class g extends d2 {
            record(a3, b4) {
            }
          }
          b3.NoopHistogramMetric = g;
          class h {
            addCallback(a3) {
            }
            removeCallback(a3) {
            }
          }
          b3.NoopObservableMetric = h;
          class i extends h {
          }
          b3.NoopObservableCounterMetric = i;
          class j extends h {
          }
          b3.NoopObservableGaugeMetric = j;
          class k extends h {
          }
          b3.NoopObservableUpDownCounterMetric = k, b3.NOOP_METER = new c2(), b3.NOOP_COUNTER_METRIC = new e2(), b3.NOOP_HISTOGRAM_METRIC = new g(), b3.NOOP_UP_DOWN_COUNTER_METRIC = new f2(), b3.NOOP_OBSERVABLE_COUNTER_METRIC = new i(), b3.NOOP_OBSERVABLE_GAUGE_METRIC = new j(), b3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new k(), b3.createNoopMeter = function() {
            return b3.NOOP_METER;
          };
        }, 660: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NOOP_METER_PROVIDER = b3.NoopMeterProvider = void 0;
          let d2 = c2(102);
          class e2 {
            getMeter(a3, b4, c3) {
              return d2.NOOP_METER;
            }
          }
          b3.NoopMeterProvider = e2, b3.NOOP_METER_PROVIDER = new e2();
        }, 200: function(a2, b3, c2) {
          var d2 = this && this.__createBinding || (Object.create ? function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), Object.defineProperty(a3, d3, { enumerable: true, get: function() {
              return b4[c3];
            } });
          } : function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), a3[d3] = b4[c3];
          }), e2 = this && this.__exportStar || function(a3, b4) {
            for (var c3 in a3) "default" === c3 || Object.prototype.hasOwnProperty.call(b4, c3) || d2(b4, a3, c3);
          };
          Object.defineProperty(b3, "__esModule", { value: true }), e2(c2(46), b3);
        }, 651: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3._globalThis = void 0, b3._globalThis = "object" == typeof globalThis ? globalThis : c.g;
        }, 46: function(a2, b3, c2) {
          var d2 = this && this.__createBinding || (Object.create ? function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), Object.defineProperty(a3, d3, { enumerable: true, get: function() {
              return b4[c3];
            } });
          } : function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), a3[d3] = b4[c3];
          }), e2 = this && this.__exportStar || function(a3, b4) {
            for (var c3 in a3) "default" === c3 || Object.prototype.hasOwnProperty.call(b4, c3) || d2(b4, a3, c3);
          };
          Object.defineProperty(b3, "__esModule", { value: true }), e2(c2(651), b3);
        }, 939: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.propagation = void 0, b3.propagation = c2(181).PropagationAPI.getInstance();
        }, 874: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopTextMapPropagator = void 0;
          class c2 {
            inject(a3, b4) {
            }
            extract(a3, b4) {
              return a3;
            }
            fields() {
              return [];
            }
          }
          b3.NoopTextMapPropagator = c2;
        }, 194: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.defaultTextMapSetter = b3.defaultTextMapGetter = void 0, b3.defaultTextMapGetter = { get(a3, b4) {
            if (null != a3) return a3[b4];
          }, keys: (a3) => null == a3 ? [] : Object.keys(a3) }, b3.defaultTextMapSetter = { set(a3, b4, c2) {
            null != a3 && (a3[b4] = c2);
          } };
        }, 845: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.trace = void 0, b3.trace = c2(997).TraceAPI.getInstance();
        }, 403: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NonRecordingSpan = void 0;
          let d2 = c2(476);
          class e2 {
            constructor(a3 = d2.INVALID_SPAN_CONTEXT) {
              this._spanContext = a3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(a3, b4) {
              return this;
            }
            setAttributes(a3) {
              return this;
            }
            addEvent(a3, b4) {
              return this;
            }
            setStatus(a3) {
              return this;
            }
            updateName(a3) {
              return this;
            }
            end(a3) {
            }
            isRecording() {
              return false;
            }
            recordException(a3, b4) {
            }
          }
          b3.NonRecordingSpan = e2;
        }, 614: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopTracer = void 0;
          let d2 = c2(491), e2 = c2(607), f2 = c2(403), g = c2(139), h = d2.ContextAPI.getInstance();
          class i {
            startSpan(a3, b4, c3 = h.active()) {
              var d3;
              if (null == b4 ? void 0 : b4.root) return new f2.NonRecordingSpan();
              let i2 = c3 && (0, e2.getSpanContext)(c3);
              return "object" == typeof (d3 = i2) && "string" == typeof d3.spanId && "string" == typeof d3.traceId && "number" == typeof d3.traceFlags && (0, g.isSpanContextValid)(i2) ? new f2.NonRecordingSpan(i2) : new f2.NonRecordingSpan();
            }
            startActiveSpan(a3, b4, c3, d3) {
              let f3, g2, i2;
              if (arguments.length < 2) return;
              2 == arguments.length ? i2 = b4 : 3 == arguments.length ? (f3 = b4, i2 = c3) : (f3 = b4, g2 = c3, i2 = d3);
              let j = null != g2 ? g2 : h.active(), k = this.startSpan(a3, f3, j), l = (0, e2.setSpan)(j, k);
              return h.with(l, i2, void 0, k);
            }
          }
          b3.NoopTracer = i;
        }, 124: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopTracerProvider = void 0;
          let d2 = c2(614);
          class e2 {
            getTracer(a3, b4, c3) {
              return new d2.NoopTracer();
            }
          }
          b3.NoopTracerProvider = e2;
        }, 125: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ProxyTracer = void 0;
          let d2 = new (c2(614)).NoopTracer();
          class e2 {
            constructor(a3, b4, c3, d3) {
              this._provider = a3, this.name = b4, this.version = c3, this.options = d3;
            }
            startSpan(a3, b4, c3) {
              return this._getTracer().startSpan(a3, b4, c3);
            }
            startActiveSpan(a3, b4, c3, d3) {
              let e3 = this._getTracer();
              return Reflect.apply(e3.startActiveSpan, e3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let a3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return a3 ? (this._delegate = a3, this._delegate) : d2;
            }
          }
          b3.ProxyTracer = e2;
        }, 846: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ProxyTracerProvider = void 0;
          let d2 = c2(125), e2 = new (c2(124)).NoopTracerProvider();
          class f2 {
            getTracer(a3, b4, c3) {
              var e3;
              return null != (e3 = this.getDelegateTracer(a3, b4, c3)) ? e3 : new d2.ProxyTracer(this, a3, b4, c3);
            }
            getDelegate() {
              var a3;
              return null != (a3 = this._delegate) ? a3 : e2;
            }
            setDelegate(a3) {
              this._delegate = a3;
            }
            getDelegateTracer(a3, b4, c3) {
              var d3;
              return null == (d3 = this._delegate) ? void 0 : d3.getTracer(a3, b4, c3);
            }
          }
          b3.ProxyTracerProvider = f2;
        }, 996: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.SamplingDecision = void 0, function(a3) {
            a3[a3.NOT_RECORD = 0] = "NOT_RECORD", a3[a3.RECORD = 1] = "RECORD", a3[a3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(b3.SamplingDecision || (b3.SamplingDecision = {}));
        }, 607: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.getSpanContext = b3.setSpanContext = b3.deleteSpan = b3.setSpan = b3.getActiveSpan = b3.getSpan = void 0;
          let d2 = c2(780), e2 = c2(403), f2 = c2(491), g = (0, d2.createContextKey)("OpenTelemetry Context Key SPAN");
          function h(a3) {
            return a3.getValue(g) || void 0;
          }
          function i(a3, b4) {
            return a3.setValue(g, b4);
          }
          b3.getSpan = h, b3.getActiveSpan = function() {
            return h(f2.ContextAPI.getInstance().active());
          }, b3.setSpan = i, b3.deleteSpan = function(a3) {
            return a3.deleteValue(g);
          }, b3.setSpanContext = function(a3, b4) {
            return i(a3, new e2.NonRecordingSpan(b4));
          }, b3.getSpanContext = function(a3) {
            var b4;
            return null == (b4 = h(a3)) ? void 0 : b4.spanContext();
          };
        }, 325: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.TraceStateImpl = void 0;
          let d2 = c2(564);
          class e2 {
            constructor(a3) {
              this._internalState = /* @__PURE__ */ new Map(), a3 && this._parse(a3);
            }
            set(a3, b4) {
              let c3 = this._clone();
              return c3._internalState.has(a3) && c3._internalState.delete(a3), c3._internalState.set(a3, b4), c3;
            }
            unset(a3) {
              let b4 = this._clone();
              return b4._internalState.delete(a3), b4;
            }
            get(a3) {
              return this._internalState.get(a3);
            }
            serialize() {
              return this._keys().reduce((a3, b4) => (a3.push(b4 + "=" + this.get(b4)), a3), []).join(",");
            }
            _parse(a3) {
              !(a3.length > 512) && (this._internalState = a3.split(",").reverse().reduce((a4, b4) => {
                let c3 = b4.trim(), e3 = c3.indexOf("=");
                if (-1 !== e3) {
                  let f2 = c3.slice(0, e3), g = c3.slice(e3 + 1, b4.length);
                  (0, d2.validateKey)(f2) && (0, d2.validateValue)(g) && a4.set(f2, g);
                }
                return a4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let a3 = new e2();
              return a3._internalState = new Map(this._internalState), a3;
            }
          }
          b3.TraceStateImpl = e2;
        }, 564: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.validateValue = b3.validateKey = void 0;
          let c2 = "[_0-9a-z-*/]", d2 = `[a-z]${c2}{0,255}`, e2 = `[a-z0-9]${c2}{0,240}@[a-z]${c2}{0,13}`, f2 = RegExp(`^(?:${d2}|${e2})$`), g = /^[ -~]{0,255}[!-~]$/, h = /,|=/;
          b3.validateKey = function(a3) {
            return f2.test(a3);
          }, b3.validateValue = function(a3) {
            return g.test(a3) && !h.test(a3);
          };
        }, 98: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.createTraceState = void 0;
          let d2 = c2(325);
          b3.createTraceState = function(a3) {
            return new d2.TraceStateImpl(a3);
          };
        }, 476: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.INVALID_SPAN_CONTEXT = b3.INVALID_TRACEID = b3.INVALID_SPANID = void 0;
          let d2 = c2(475);
          b3.INVALID_SPANID = "0000000000000000", b3.INVALID_TRACEID = "00000000000000000000000000000000", b3.INVALID_SPAN_CONTEXT = { traceId: b3.INVALID_TRACEID, spanId: b3.INVALID_SPANID, traceFlags: d2.TraceFlags.NONE };
        }, 357: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.SpanKind = void 0, function(a3) {
            a3[a3.INTERNAL = 0] = "INTERNAL", a3[a3.SERVER = 1] = "SERVER", a3[a3.CLIENT = 2] = "CLIENT", a3[a3.PRODUCER = 3] = "PRODUCER", a3[a3.CONSUMER = 4] = "CONSUMER";
          }(b3.SpanKind || (b3.SpanKind = {}));
        }, 139: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.wrapSpanContext = b3.isSpanContextValid = b3.isValidSpanId = b3.isValidTraceId = void 0;
          let d2 = c2(476), e2 = c2(403), f2 = /^([0-9a-f]{32})$/i, g = /^[0-9a-f]{16}$/i;
          function h(a3) {
            return f2.test(a3) && a3 !== d2.INVALID_TRACEID;
          }
          function i(a3) {
            return g.test(a3) && a3 !== d2.INVALID_SPANID;
          }
          b3.isValidTraceId = h, b3.isValidSpanId = i, b3.isSpanContextValid = function(a3) {
            return h(a3.traceId) && i(a3.spanId);
          }, b3.wrapSpanContext = function(a3) {
            return new e2.NonRecordingSpan(a3);
          };
        }, 847: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.SpanStatusCode = void 0, function(a3) {
            a3[a3.UNSET = 0] = "UNSET", a3[a3.OK = 1] = "OK", a3[a3.ERROR = 2] = "ERROR";
          }(b3.SpanStatusCode || (b3.SpanStatusCode = {}));
        }, 475: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.TraceFlags = void 0, function(a3) {
            a3[a3.NONE = 0] = "NONE", a3[a3.SAMPLED = 1] = "SAMPLED";
          }(b3.TraceFlags || (b3.TraceFlags = {}));
        }, 521: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.VERSION = void 0, b3.VERSION = "1.6.0";
        } }, d = {};
        function e(a2) {
          var c2 = d[a2];
          if (void 0 !== c2) return c2.exports;
          var f2 = d[a2] = { exports: {} }, g = true;
          try {
            b2[a2].call(f2.exports, f2, f2.exports, e), g = false;
          } finally {
            g && delete d[a2];
          }
          return f2.exports;
        }
        e.ab = "//";
        var f = {};
        (() => {
          Object.defineProperty(f, "__esModule", { value: true }), f.trace = f.propagation = f.metrics = f.diag = f.context = f.INVALID_SPAN_CONTEXT = f.INVALID_TRACEID = f.INVALID_SPANID = f.isValidSpanId = f.isValidTraceId = f.isSpanContextValid = f.createTraceState = f.TraceFlags = f.SpanStatusCode = f.SpanKind = f.SamplingDecision = f.ProxyTracerProvider = f.ProxyTracer = f.defaultTextMapSetter = f.defaultTextMapGetter = f.ValueType = f.createNoopMeter = f.DiagLogLevel = f.DiagConsoleLogger = f.ROOT_CONTEXT = f.createContextKey = f.baggageEntryMetadataFromString = void 0;
          var a2 = e(369);
          Object.defineProperty(f, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return a2.baggageEntryMetadataFromString;
          } });
          var b3 = e(780);
          Object.defineProperty(f, "createContextKey", { enumerable: true, get: function() {
            return b3.createContextKey;
          } }), Object.defineProperty(f, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return b3.ROOT_CONTEXT;
          } });
          var c2 = e(972);
          Object.defineProperty(f, "DiagConsoleLogger", { enumerable: true, get: function() {
            return c2.DiagConsoleLogger;
          } });
          var d2 = e(957);
          Object.defineProperty(f, "DiagLogLevel", { enumerable: true, get: function() {
            return d2.DiagLogLevel;
          } });
          var g = e(102);
          Object.defineProperty(f, "createNoopMeter", { enumerable: true, get: function() {
            return g.createNoopMeter;
          } });
          var h = e(901);
          Object.defineProperty(f, "ValueType", { enumerable: true, get: function() {
            return h.ValueType;
          } });
          var i = e(194);
          Object.defineProperty(f, "defaultTextMapGetter", { enumerable: true, get: function() {
            return i.defaultTextMapGetter;
          } }), Object.defineProperty(f, "defaultTextMapSetter", { enumerable: true, get: function() {
            return i.defaultTextMapSetter;
          } });
          var j = e(125);
          Object.defineProperty(f, "ProxyTracer", { enumerable: true, get: function() {
            return j.ProxyTracer;
          } });
          var k = e(846);
          Object.defineProperty(f, "ProxyTracerProvider", { enumerable: true, get: function() {
            return k.ProxyTracerProvider;
          } });
          var l = e(996);
          Object.defineProperty(f, "SamplingDecision", { enumerable: true, get: function() {
            return l.SamplingDecision;
          } });
          var m = e(357);
          Object.defineProperty(f, "SpanKind", { enumerable: true, get: function() {
            return m.SpanKind;
          } });
          var n = e(847);
          Object.defineProperty(f, "SpanStatusCode", { enumerable: true, get: function() {
            return n.SpanStatusCode;
          } });
          var o = e(475);
          Object.defineProperty(f, "TraceFlags", { enumerable: true, get: function() {
            return o.TraceFlags;
          } });
          var p = e(98);
          Object.defineProperty(f, "createTraceState", { enumerable: true, get: function() {
            return p.createTraceState;
          } });
          var q = e(139);
          Object.defineProperty(f, "isSpanContextValid", { enumerable: true, get: function() {
            return q.isSpanContextValid;
          } }), Object.defineProperty(f, "isValidTraceId", { enumerable: true, get: function() {
            return q.isValidTraceId;
          } }), Object.defineProperty(f, "isValidSpanId", { enumerable: true, get: function() {
            return q.isValidSpanId;
          } });
          var r = e(476);
          Object.defineProperty(f, "INVALID_SPANID", { enumerable: true, get: function() {
            return r.INVALID_SPANID;
          } }), Object.defineProperty(f, "INVALID_TRACEID", { enumerable: true, get: function() {
            return r.INVALID_TRACEID;
          } }), Object.defineProperty(f, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return r.INVALID_SPAN_CONTEXT;
          } });
          let s = e(67);
          Object.defineProperty(f, "context", { enumerable: true, get: function() {
            return s.context;
          } });
          let t = e(506);
          Object.defineProperty(f, "diag", { enumerable: true, get: function() {
            return t.diag;
          } });
          let u = e(886);
          Object.defineProperty(f, "metrics", { enumerable: true, get: function() {
            return u.metrics;
          } });
          let v = e(939);
          Object.defineProperty(f, "propagation", { enumerable: true, get: function() {
            return v.propagation;
          } });
          let w = e(845);
          Object.defineProperty(f, "trace", { enumerable: true, get: function() {
            return w.trace;
          } }), f.default = { context: s.context, diag: t.diag, metrics: u.metrics, propagation: v.propagation, trace: w.trace };
        })(), a.exports = f;
      })();
    }, 349: (a, b, c) => {
      "use strict";
      c.d(b, { redirect: () => g });
      var d = c(185), e = c(291);
      let f = c(621).s;
      function g(a2, b2) {
        var c2;
        throw null != b2 || (b2 = (null == f || null == (c2 = f.getStore()) ? void 0 : c2.isAction) ? e.zB.push : e.zB.replace), function(a3, b3, c3) {
          void 0 === c3 && (c3 = d.Q.TemporaryRedirect);
          let f2 = Object.defineProperty(Error(e.oJ), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          return f2.digest = e.oJ + ";" + b3 + ";" + a3 + ";" + c3 + ";", f2;
        }(a2, b2, d.Q.TemporaryRedirect);
      }
      var h = c(379);
      h.s8, h.s8, h.s8, c(612).X;
    }, 354: (a, b, c) => {
      "use strict";
      c.d(b, { I2: () => j, cs: () => i, m1: () => d, mu: () => g, tn: () => h, w9: () => e, xk: () => f });
      let d = "openid profile email offline_access", e = 0, f = 30, g = 300, h = 100, i = true, j = 300;
    }, 356: (a) => {
      "use strict";
      a.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 379: (a, b, c) => {
      "use strict";
      c.d(b, { RM: () => f, s8: () => e });
      let d = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), e = "NEXT_HTTP_ERROR_FALLBACK";
      function f(a2) {
        if ("object" != typeof a2 || null === a2 || !("digest" in a2) || "string" != typeof a2.digest) return false;
        let [b2, c2] = a2.digest.split(";");
        return b2 === e && d.has(Number(c2));
      }
    }, 381: (a, b, c) => {
      "use strict";
      Object.defineProperty(b, "__esModule", { value: true }), !function(a2, b2) {
        for (var c2 in b2) Object.defineProperty(a2, c2, { enumerable: true, get: b2[c2] });
      }(b, { interceptTestApis: function() {
        return f;
      }, wrapRequestHandler: function() {
        return g;
      } });
      let d = c(941), e = c(684);
      function f() {
        return (0, e.interceptFetch)(c.g.fetch);
      }
      function g(a2) {
        return (b2, c2) => (0, d.withRequest)(b2, e.reader, () => a2(b2, c2));
      }
    }, 484: (a, b, c) => {
      "use strict";
      c.d(b, { F: () => e, h: () => f });
      let d = "DYNAMIC_SERVER_USAGE";
      class e extends Error {
        constructor(a2) {
          super("Dynamic server usage: " + a2), this.description = a2, this.digest = d;
        }
      }
      function f(a2) {
        return "object" == typeof a2 && null !== a2 && "digest" in a2 && "string" == typeof a2.digest && a2.digest === d;
      }
    }, 521: (a) => {
      "use strict";
      a.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 543: (a, b) => {
      "use strict";
      var c = { H: null, A: null };
      function d(a2) {
        var b2 = "https://react.dev/errors/" + a2;
        if (1 < arguments.length) {
          b2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var c2 = 2; c2 < arguments.length; c2++) b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
        }
        return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var e = Array.isArray;
      function f() {
      }
      var g = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.memo"), o = Symbol.for("react.lazy"), p = Symbol.iterator, q = Object.prototype.hasOwnProperty, r = Object.assign;
      function s(a2, b2, c2, d2, e2, f2) {
        return { $$typeof: g, type: a2, key: b2, ref: void 0 !== (c2 = f2.ref) ? c2 : null, props: f2 };
      }
      function t(a2) {
        return "object" == typeof a2 && null !== a2 && a2.$$typeof === g;
      }
      var u = /\/+/g;
      function v(a2, b2) {
        var c2, d2;
        return "object" == typeof a2 && null !== a2 && null != a2.key ? (c2 = "" + a2.key, d2 = { "=": "=0", ":": "=2" }, "$" + c2.replace(/[=:]/g, function(a3) {
          return d2[a3];
        })) : b2.toString(36);
      }
      function w(a2, b2, c2) {
        if (null == a2) return a2;
        var i2 = [], j2 = 0;
        return !function a3(b3, c3, i3, j3, k2) {
          var l2, m2, n2, q2 = typeof b3;
          ("undefined" === q2 || "boolean" === q2) && (b3 = null);
          var r2 = false;
          if (null === b3) r2 = true;
          else switch (q2) {
            case "bigint":
            case "string":
            case "number":
              r2 = true;
              break;
            case "object":
              switch (b3.$$typeof) {
                case g:
                case h:
                  r2 = true;
                  break;
                case o:
                  return a3((r2 = b3._init)(b3._payload), c3, i3, j3, k2);
              }
          }
          if (r2) return k2 = k2(b3), r2 = "" === j3 ? "." + v(b3, 0) : j3, e(k2) ? (i3 = "", null != r2 && (i3 = r2.replace(u, "$&/") + "/"), a3(k2, c3, i3, "", function(a4) {
            return a4;
          })) : null != k2 && (t(k2) && (l2 = k2, m2 = i3 + (null == k2.key || b3 && b3.key === k2.key ? "" : ("" + k2.key).replace(u, "$&/") + "/") + r2, k2 = s(l2.type, m2, void 0, void 0, void 0, l2.props)), c3.push(k2)), 1;
          r2 = 0;
          var w2 = "" === j3 ? "." : j3 + ":";
          if (e(b3)) for (var x2 = 0; x2 < b3.length; x2++) q2 = w2 + v(j3 = b3[x2], x2), r2 += a3(j3, c3, i3, q2, k2);
          else if ("function" == typeof (x2 = null === (n2 = b3) || "object" != typeof n2 ? null : "function" == typeof (n2 = p && n2[p] || n2["@@iterator"]) ? n2 : null)) for (b3 = x2.call(b3), x2 = 0; !(j3 = b3.next()).done; ) q2 = w2 + v(j3 = j3.value, x2++), r2 += a3(j3, c3, i3, q2, k2);
          else if ("object" === q2) {
            if ("function" == typeof b3.then) return a3(function(a4) {
              switch (a4.status) {
                case "fulfilled":
                  return a4.value;
                case "rejected":
                  throw a4.reason;
                default:
                  switch ("string" == typeof a4.status ? a4.then(f, f) : (a4.status = "pending", a4.then(function(b4) {
                    "pending" === a4.status && (a4.status = "fulfilled", a4.value = b4);
                  }, function(b4) {
                    "pending" === a4.status && (a4.status = "rejected", a4.reason = b4);
                  })), a4.status) {
                    case "fulfilled":
                      return a4.value;
                    case "rejected":
                      throw a4.reason;
                  }
              }
              throw a4;
            }(b3), c3, i3, j3, k2);
            throw Error(d(31, "[object Object]" === (c3 = String(b3)) ? "object with keys {" + Object.keys(b3).join(", ") + "}" : c3));
          }
          return r2;
        }(a2, i2, "", "", function(a3) {
          return b2.call(c2, a3, j2++);
        }), i2;
      }
      function x(a2) {
        if (-1 === a2._status) {
          var b2 = a2._result;
          (b2 = b2()).then(function(b3) {
            (0 === a2._status || -1 === a2._status) && (a2._status = 1, a2._result = b3);
          }, function(b3) {
            (0 === a2._status || -1 === a2._status) && (a2._status = 2, a2._result = b3);
          }), -1 === a2._status && (a2._status = 0, a2._result = b2);
        }
        if (1 === a2._status) return a2._result.default;
        throw a2._result;
      }
      function y() {
        return /* @__PURE__ */ new WeakMap();
      }
      function z() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      b.Children = { map: w, forEach: function(a2, b2, c2) {
        w(a2, function() {
          b2.apply(this, arguments);
        }, c2);
      }, count: function(a2) {
        var b2 = 0;
        return w(a2, function() {
          b2++;
        }), b2;
      }, toArray: function(a2) {
        return w(a2, function(a3) {
          return a3;
        }) || [];
      }, only: function(a2) {
        if (!t(a2)) throw Error(d(143));
        return a2;
      } }, b.Fragment = i, b.Profiler = k, b.StrictMode = j, b.Suspense = m, b.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, b.cache = function(a2) {
        return function() {
          var b2 = c.A;
          if (!b2) return a2.apply(null, arguments);
          var d2 = b2.getCacheForType(y);
          void 0 === (b2 = d2.get(a2)) && (b2 = z(), d2.set(a2, b2)), d2 = 0;
          for (var e2 = arguments.length; d2 < e2; d2++) {
            var f2 = arguments[d2];
            if ("function" == typeof f2 || "object" == typeof f2 && null !== f2) {
              var g2 = b2.o;
              null === g2 && (b2.o = g2 = /* @__PURE__ */ new WeakMap()), void 0 === (b2 = g2.get(f2)) && (b2 = z(), g2.set(f2, b2));
            } else null === (g2 = b2.p) && (b2.p = g2 = /* @__PURE__ */ new Map()), void 0 === (b2 = g2.get(f2)) && (b2 = z(), g2.set(f2, b2));
          }
          if (1 === b2.s) return b2.v;
          if (2 === b2.s) throw b2.v;
          try {
            var h2 = a2.apply(null, arguments);
            return (d2 = b2).s = 1, d2.v = h2;
          } catch (a3) {
            throw (h2 = b2).s = 2, h2.v = a3, a3;
          }
        };
      }, b.cacheSignal = function() {
        var a2 = c.A;
        return a2 ? a2.cacheSignal() : null;
      }, b.captureOwnerStack = function() {
        return null;
      }, b.cloneElement = function(a2, b2, c2) {
        if (null == a2) throw Error(d(267, a2));
        var e2 = r({}, a2.props), f2 = a2.key, g2 = void 0;
        if (null != b2) for (h2 in void 0 !== b2.ref && (g2 = void 0), void 0 !== b2.key && (f2 = "" + b2.key), b2) q.call(b2, h2) && "key" !== h2 && "__self" !== h2 && "__source" !== h2 && ("ref" !== h2 || void 0 !== b2.ref) && (e2[h2] = b2[h2]);
        var h2 = arguments.length - 2;
        if (1 === h2) e2.children = c2;
        else if (1 < h2) {
          for (var i2 = Array(h2), j2 = 0; j2 < h2; j2++) i2[j2] = arguments[j2 + 2];
          e2.children = i2;
        }
        return s(a2.type, f2, void 0, void 0, g2, e2);
      }, b.createElement = function(a2, b2, c2) {
        var d2, e2 = {}, f2 = null;
        if (null != b2) for (d2 in void 0 !== b2.key && (f2 = "" + b2.key), b2) q.call(b2, d2) && "key" !== d2 && "__self" !== d2 && "__source" !== d2 && (e2[d2] = b2[d2]);
        var g2 = arguments.length - 2;
        if (1 === g2) e2.children = c2;
        else if (1 < g2) {
          for (var h2 = Array(g2), i2 = 0; i2 < g2; i2++) h2[i2] = arguments[i2 + 2];
          e2.children = h2;
        }
        if (a2 && a2.defaultProps) for (d2 in g2 = a2.defaultProps) void 0 === e2[d2] && (e2[d2] = g2[d2]);
        return s(a2, f2, void 0, void 0, null, e2);
      }, b.createRef = function() {
        return { current: null };
      }, b.forwardRef = function(a2) {
        return { $$typeof: l, render: a2 };
      }, b.isValidElement = t, b.lazy = function(a2) {
        return { $$typeof: o, _payload: { _status: -1, _result: a2 }, _init: x };
      }, b.memo = function(a2, b2) {
        return { $$typeof: n, type: a2, compare: void 0 === b2 ? null : b2 };
      }, b.use = function(a2) {
        return c.H.use(a2);
      }, b.useCallback = function(a2, b2) {
        return c.H.useCallback(a2, b2);
      }, b.useDebugValue = function() {
      }, b.useId = function() {
        return c.H.useId();
      }, b.useMemo = function(a2, b2) {
        return c.H.useMemo(a2, b2);
      }, b.version = "19.2.0-canary-97cdd5d3-20250710";
    }, 565: (a, b, c) => {
      "use strict";
      function d(a2) {
        return "object" == typeof a2 && null !== a2 && "digest" in a2 && a2.digest === e;
      }
      c.d(b, { T: () => d, W: () => h });
      let e = "HANGING_PROMISE_REJECTION";
      class f extends Error {
        constructor(a2) {
          super(`During prerendering, ${a2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${a2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = a2, this.digest = e;
        }
      }
      let g = /* @__PURE__ */ new WeakMap();
      function h(a2, b2) {
        if (a2.aborted) return Promise.reject(new f(b2));
        {
          let c2 = new Promise((c3, d2) => {
            let e2 = d2.bind(null, new f(b2)), h2 = g.get(a2);
            if (h2) h2.push(e2);
            else {
              let b3 = [e2];
              g.set(a2, b3), a2.addEventListener("abort", () => {
                for (let a3 = 0; a3 < b3.length; a3++) b3[a3]();
              }, { once: true });
            }
          });
          return c2.catch(i), c2;
        }
      }
      function i() {
      }
    }, 593: (a, b, c) => {
      "use strict";
      c.d(b, { I3: () => k, Ui: () => i, xI: () => g, Pk: () => h });
      var d = c(915), e = c(484);
      c(622), c(298), c(172), c(565);
      let f = "function" == typeof d.unstable_postpone;
      function g(a2, b2, c2) {
        let d2 = Object.defineProperty(new e.F(`Route ${b2.route} couldn't be rendered statically because it used \`${a2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw c2.revalidate = 0, b2.dynamicUsageDescription = a2, b2.dynamicUsageStack = d2.stack, d2;
      }
      function h(a2, b2) {
        b2 && "cache" !== b2.type && "unstable-cache" !== b2.type && ("prerender" === b2.type || "prerender-client" === b2.type || "prerender-legacy" === b2.type) && (b2.revalidate = 0);
      }
      function i(a2, b2, c2) {
        (function() {
          if (!f) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), c2 && c2.dynamicAccesses.push({ stack: c2.isDebugDynamicAccesses ? Error().stack : void 0, expression: b2 }), d.unstable_postpone(j(a2, b2));
      }
      function j(a2, b2) {
        return `Route ${a2} needs to bail out of prerendering at this point because it used ${b2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function k(a2) {
        return "object" == typeof a2 && null !== a2 && "string" == typeof a2.message && l(a2.message);
      }
      function l(a2) {
        return a2.includes("needs to bail out of prerendering at this point because it used") && a2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === l(j("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
    }, 612: (a, b, c) => {
      "use strict";
      c.d(b, { X: () => function a2(b2) {
        if ((0, f.p)(b2) || "object" == typeof b2 && null !== b2 && "digest" in b2 && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === b2.digest || (0, h.h)(b2) || (0, g.I3)(b2) || "object" == typeof b2 && null !== b2 && b2.$$typeof === e || (0, d.T)(b2)) throw b2;
        b2 instanceof Error && "cause" in b2 && a2(b2.cause);
      } });
      var d = c(565);
      let e = Symbol.for("react.postpone");
      var f = c(667), g = c(593), h = c(484);
    }, 621: (a, b, c) => {
      "use strict";
      c.d(b, { s: () => d });
      let d = (0, c(981).xl)();
    }, 622: (a, b, c) => {
      "use strict";
      c.d(b, { f: () => d });
      class d extends Error {
        constructor(...a2) {
          super(...a2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    }, 667: (a, b, c) => {
      "use strict";
      c.d(b, { p: () => f });
      var d = c(379), e = c(291);
      function f(a2) {
        return (0, e.nJ)(a2) || (0, d.RM)(a2);
      }
    }, 684: (a, b, c) => {
      "use strict";
      var d = c(356).Buffer;
      Object.defineProperty(b, "__esModule", { value: true }), !function(a2, b2) {
        for (var c2 in b2) Object.defineProperty(a2, c2, { enumerable: true, get: b2[c2] });
      }(b, { handleFetch: function() {
        return h;
      }, interceptFetch: function() {
        return i;
      }, reader: function() {
        return f;
      } });
      let e = c(941), f = { url: (a2) => a2.url, header: (a2, b2) => a2.headers.get(b2) };
      async function g(a2, b2) {
        let { url: c2, method: e2, headers: f2, body: g2, cache: h2, credentials: i2, integrity: j, mode: k, redirect: l, referrer: m, referrerPolicy: n } = b2;
        return { testData: a2, api: "fetch", request: { url: c2, method: e2, headers: [...Array.from(f2), ["next-test-stack", function() {
          let a3 = (Error().stack ?? "").split("\n");
          for (let b3 = 1; b3 < a3.length; b3++) if (a3[b3].length > 0) {
            a3 = a3.slice(b3);
            break;
          }
          return (a3 = (a3 = (a3 = a3.filter((a4) => !a4.includes("/next/dist/"))).slice(0, 5)).map((a4) => a4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: g2 ? d.from(await b2.arrayBuffer()).toString("base64") : null, cache: h2, credentials: i2, integrity: j, mode: k, redirect: l, referrer: m, referrerPolicy: n } };
      }
      async function h(a2, b2) {
        let c2 = (0, e.getTestReqInfo)(b2, f);
        if (!c2) return a2(b2);
        let { testData: h2, proxyPort: i2 } = c2, j = await g(h2, b2), k = await a2(`http://localhost:${i2}`, { method: "POST", body: JSON.stringify(j), next: { internal: true } });
        if (!k.ok) throw Object.defineProperty(Error(`Proxy request failed: ${k.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let l = await k.json(), { api: m } = l;
        switch (m) {
          case "continue":
            return a2(b2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${b2.method} ${b2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
        }
        let { status: n, headers: o, body: p } = l.response;
        return new Response(p ? d.from(p, "base64") : null, { status: n, headers: new Headers(o) });
      }
      function i(a2) {
        return c.g.fetch = function(b2, c2) {
          var d2;
          return (null == c2 || null == (d2 = c2.next) ? void 0 : d2.internal) ? a2(b2, c2) : h(a2, new Request(b2, c2));
        }, () => {
          c.g.fetch = a2;
        };
      }
    }, 689: (a, b, c) => {
      "use strict";
      let d, e, f, g, h, i;
      c.r(b), c.d(b, { default: () => fS });
      var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = {};
      async function z() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      c.r(y), c.d(y, { config: () => fO, middleware: () => fN });
      let A = null;
      async function B() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        A || (A = z());
        let a10 = await A;
        if (null == a10 ? void 0 : a10.register) try {
          await a10.register();
        } catch (a11) {
          throw a11.message = `An error occurred while loading instrumentation hook: ${a11.message}`, a11;
        }
      }
      async function C(...a10) {
        let b10 = await z();
        try {
          var c10;
          await (null == b10 || null == (c10 = b10.onRequestError) ? void 0 : c10.call(b10, ...a10));
        } catch (a11) {
          console.error("Error in instrumentation.onRequestError:", a11);
        }
      }
      let D = null;
      function E() {
        return D || (D = B()), D;
      }
      function F(a10) {
        return `The edge runtime does not support Node.js '${a10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== c.g.process && (process.env = c.g.process.env, c.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(a10) {
        let b10 = new Proxy(function() {
        }, { get(b11, c10) {
          if ("then" === c10) return {};
          throw Object.defineProperty(Error(F(a10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }, construct() {
          throw Object.defineProperty(Error(F(a10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }, apply(c10, d10, e10) {
          if ("function" == typeof e10[0]) return e10[0](b10);
          throw Object.defineProperty(Error(F(a10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        } });
        return new Proxy({}, { get: () => b10 });
      }, enumerable: false, configurable: false }), E();
      class G extends Error {
        constructor({ page: a10 }) {
          super(`The middleware "${a10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class H extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class I extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let J = "_N_T_", K = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function L(a10) {
        var b10, c10, d10, e10, f2, g2 = [], h2 = 0;
        function i2() {
          for (; h2 < a10.length && /\s/.test(a10.charAt(h2)); ) h2 += 1;
          return h2 < a10.length;
        }
        for (; h2 < a10.length; ) {
          for (b10 = h2, f2 = false; i2(); ) if ("," === (c10 = a10.charAt(h2))) {
            for (d10 = h2, h2 += 1, i2(), e10 = h2; h2 < a10.length && "=" !== (c10 = a10.charAt(h2)) && ";" !== c10 && "," !== c10; ) h2 += 1;
            h2 < a10.length && "=" === a10.charAt(h2) ? (f2 = true, h2 = e10, g2.push(a10.substring(b10, d10)), b10 = h2) : h2 = d10 + 1;
          } else h2 += 1;
          (!f2 || h2 >= a10.length) && g2.push(a10.substring(b10, a10.length));
        }
        return g2;
      }
      function M(a10) {
        let b10 = {}, c10 = [];
        if (a10) for (let [d10, e10] of a10.entries()) "set-cookie" === d10.toLowerCase() ? (c10.push(...L(e10)), b10[d10] = 1 === c10.length ? c10[0] : c10) : b10[d10] = e10;
        return b10;
      }
      function N(a10) {
        try {
          return String(new URL(String(a10)));
        } catch (b10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(a10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: b10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...K, GROUP: { builtinReact: [K.reactServerComponents, K.actionBrowser], serverOnly: [K.reactServerComponents, K.actionBrowser, K.instrument, K.middleware], neutralTarget: [K.apiNode, K.apiEdge], clientOnly: [K.serverSideRendering, K.appPagesBrowser], bundled: [K.reactServerComponents, K.actionBrowser, K.serverSideRendering, K.appPagesBrowser, K.shared, K.instrument, K.middleware], appPages: [K.reactServerComponents, K.serverSideRendering, K.appPagesBrowser, K.actionBrowser] } });
      let O = Symbol("response"), P = Symbol("passThrough"), Q = Symbol("waitUntil");
      class R {
        constructor(a10, b10) {
          this[P] = false, this[Q] = b10 ? { kind: "external", function: b10 } : { kind: "internal", promises: [] };
        }
        respondWith(a10) {
          this[O] || (this[O] = Promise.resolve(a10));
        }
        passThroughOnException() {
          this[P] = true;
        }
        waitUntil(a10) {
          if ("external" === this[Q].kind) return (0, this[Q].function)(a10);
          this[Q].promises.push(a10);
        }
      }
      class S extends R {
        constructor(a10) {
          var b10;
          super(a10.request, null == (b10 = a10.context) ? void 0 : b10.waitUntil), this.sourcePage = a10.page;
        }
        get request() {
          throw Object.defineProperty(new G({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new G({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function T(a10) {
        return a10.replace(/\/$/, "") || "/";
      }
      function U(a10) {
        let b10 = a10.indexOf("#"), c10 = a10.indexOf("?"), d10 = c10 > -1 && (b10 < 0 || c10 < b10);
        return d10 || b10 > -1 ? { pathname: a10.substring(0, d10 ? c10 : b10), query: d10 ? a10.substring(c10, b10 > -1 ? b10 : void 0) : "", hash: b10 > -1 ? a10.slice(b10) : "" } : { pathname: a10, query: "", hash: "" };
      }
      function V(a10, b10) {
        if (!a10.startsWith("/") || !b10) return a10;
        let { pathname: c10, query: d10, hash: e10 } = U(a10);
        return "" + b10 + c10 + d10 + e10;
      }
      function W(a10, b10) {
        if (!a10.startsWith("/") || !b10) return a10;
        let { pathname: c10, query: d10, hash: e10 } = U(a10);
        return "" + c10 + b10 + d10 + e10;
      }
      function X(a10, b10) {
        if ("string" != typeof a10) return false;
        let { pathname: c10 } = U(a10);
        return c10 === b10 || c10.startsWith(b10 + "/");
      }
      let Y = /* @__PURE__ */ new WeakMap();
      function Z(a10, b10) {
        let c10;
        if (!b10) return { pathname: a10 };
        let d10 = Y.get(b10);
        d10 || (d10 = b10.map((a11) => a11.toLowerCase()), Y.set(b10, d10));
        let e10 = a10.split("/", 2);
        if (!e10[1]) return { pathname: a10 };
        let f2 = e10[1].toLowerCase(), g2 = d10.indexOf(f2);
        return g2 < 0 ? { pathname: a10 } : (c10 = b10[g2], { pathname: a10 = a10.slice(c10.length + 1) || "/", detectedLocale: c10 });
      }
      let $ = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function _(a10, b10) {
        return new URL(String(a10).replace($, "localhost"), b10 && String(b10).replace($, "localhost"));
      }
      let aa = Symbol("NextURLInternal");
      class ab {
        constructor(a10, b10, c10) {
          let d10, e10;
          "object" == typeof b10 && "pathname" in b10 || "string" == typeof b10 ? (d10 = b10, e10 = c10 || {}) : e10 = c10 || b10 || {}, this[aa] = { url: _(a10, d10 ?? e10.base), options: e10, basePath: "" }, this.analyze();
        }
        analyze() {
          var a10, b10, c10, d10, e10;
          let f2 = function(a11, b11) {
            var c11, d11;
            let { basePath: e11, i18n: f3, trailingSlash: g3 } = null != (c11 = b11.nextConfig) ? c11 : {}, h3 = { pathname: a11, trailingSlash: "/" !== a11 ? a11.endsWith("/") : g3 };
            e11 && X(h3.pathname, e11) && (h3.pathname = function(a12, b12) {
              if (!X(a12, b12)) return a12;
              let c12 = a12.slice(b12.length);
              return c12.startsWith("/") ? c12 : "/" + c12;
            }(h3.pathname, e11), h3.basePath = e11);
            let i2 = h3.pathname;
            if (h3.pathname.startsWith("/_next/data/") && h3.pathname.endsWith(".json")) {
              let a12 = h3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              h3.buildId = a12[0], i2 = "index" !== a12[1] ? "/" + a12.slice(1).join("/") : "/", true === b11.parseData && (h3.pathname = i2);
            }
            if (f3) {
              let a12 = b11.i18nProvider ? b11.i18nProvider.analyze(h3.pathname) : Z(h3.pathname, f3.locales);
              h3.locale = a12.detectedLocale, h3.pathname = null != (d11 = a12.pathname) ? d11 : h3.pathname, !a12.detectedLocale && h3.buildId && (a12 = b11.i18nProvider ? b11.i18nProvider.analyze(i2) : Z(i2, f3.locales)).detectedLocale && (h3.locale = a12.detectedLocale);
            }
            return h3;
          }(this[aa].url.pathname, { nextConfig: this[aa].options.nextConfig, parseData: true, i18nProvider: this[aa].options.i18nProvider }), g2 = function(a11, b11) {
            let c11;
            if ((null == b11 ? void 0 : b11.host) && !Array.isArray(b11.host)) c11 = b11.host.toString().split(":", 1)[0];
            else {
              if (!a11.hostname) return;
              c11 = a11.hostname;
            }
            return c11.toLowerCase();
          }(this[aa].url, this[aa].options.headers);
          this[aa].domainLocale = this[aa].options.i18nProvider ? this[aa].options.i18nProvider.detectDomainLocale(g2) : function(a11, b11, c11) {
            if (a11) for (let f3 of (c11 && (c11 = c11.toLowerCase()), a11)) {
              var d11, e11;
              if (b11 === (null == (d11 = f3.domain) ? void 0 : d11.split(":", 1)[0].toLowerCase()) || c11 === f3.defaultLocale.toLowerCase() || (null == (e11 = f3.locales) ? void 0 : e11.some((a12) => a12.toLowerCase() === c11))) return f3;
            }
          }(null == (b10 = this[aa].options.nextConfig) || null == (a10 = b10.i18n) ? void 0 : a10.domains, g2);
          let h2 = (null == (c10 = this[aa].domainLocale) ? void 0 : c10.defaultLocale) || (null == (e10 = this[aa].options.nextConfig) || null == (d10 = e10.i18n) ? void 0 : d10.defaultLocale);
          this[aa].url.pathname = f2.pathname, this[aa].defaultLocale = h2, this[aa].basePath = f2.basePath ?? "", this[aa].buildId = f2.buildId, this[aa].locale = f2.locale ?? h2, this[aa].trailingSlash = f2.trailingSlash;
        }
        formatPathname() {
          var a10;
          let b10;
          return b10 = function(a11, b11, c10, d10) {
            if (!b11 || b11 === c10) return a11;
            let e10 = a11.toLowerCase();
            return !d10 && (X(e10, "/api") || X(e10, "/" + b11.toLowerCase())) ? a11 : V(a11, "/" + b11);
          }((a10 = { basePath: this[aa].basePath, buildId: this[aa].buildId, defaultLocale: this[aa].options.forceLocale ? void 0 : this[aa].defaultLocale, locale: this[aa].locale, pathname: this[aa].url.pathname, trailingSlash: this[aa].trailingSlash }).pathname, a10.locale, a10.buildId ? void 0 : a10.defaultLocale, a10.ignorePrefix), (a10.buildId || !a10.trailingSlash) && (b10 = T(b10)), a10.buildId && (b10 = W(V(b10, "/_next/data/" + a10.buildId), "/" === a10.pathname ? "index.json" : ".json")), b10 = V(b10, a10.basePath), !a10.buildId && a10.trailingSlash ? b10.endsWith("/") ? b10 : W(b10, "/") : T(b10);
        }
        formatSearch() {
          return this[aa].url.search;
        }
        get buildId() {
          return this[aa].buildId;
        }
        set buildId(a10) {
          this[aa].buildId = a10;
        }
        get locale() {
          return this[aa].locale ?? "";
        }
        set locale(a10) {
          var b10, c10;
          if (!this[aa].locale || !(null == (c10 = this[aa].options.nextConfig) || null == (b10 = c10.i18n) ? void 0 : b10.locales.includes(a10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${a10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[aa].locale = a10;
        }
        get defaultLocale() {
          return this[aa].defaultLocale;
        }
        get domainLocale() {
          return this[aa].domainLocale;
        }
        get searchParams() {
          return this[aa].url.searchParams;
        }
        get host() {
          return this[aa].url.host;
        }
        set host(a10) {
          this[aa].url.host = a10;
        }
        get hostname() {
          return this[aa].url.hostname;
        }
        set hostname(a10) {
          this[aa].url.hostname = a10;
        }
        get port() {
          return this[aa].url.port;
        }
        set port(a10) {
          this[aa].url.port = a10;
        }
        get protocol() {
          return this[aa].url.protocol;
        }
        set protocol(a10) {
          this[aa].url.protocol = a10;
        }
        get href() {
          let a10 = this.formatPathname(), b10 = this.formatSearch();
          return `${this.protocol}//${this.host}${a10}${b10}${this.hash}`;
        }
        set href(a10) {
          this[aa].url = _(a10), this.analyze();
        }
        get origin() {
          return this[aa].url.origin;
        }
        get pathname() {
          return this[aa].url.pathname;
        }
        set pathname(a10) {
          this[aa].url.pathname = a10;
        }
        get hash() {
          return this[aa].url.hash;
        }
        set hash(a10) {
          this[aa].url.hash = a10;
        }
        get search() {
          return this[aa].url.search;
        }
        set search(a10) {
          this[aa].url.search = a10;
        }
        get password() {
          return this[aa].url.password;
        }
        set password(a10) {
          this[aa].url.password = a10;
        }
        get username() {
          return this[aa].url.username;
        }
        set username(a10) {
          this[aa].url.username = a10;
        }
        get basePath() {
          return this[aa].basePath;
        }
        set basePath(a10) {
          this[aa].basePath = a10.startsWith("/") ? a10 : `/${a10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new ab(String(this), this[aa].options);
        }
      }
      var ac = c(249);
      let ad = Symbol("internal request");
      class ae extends Request {
        constructor(a10, b10 = {}) {
          let c10 = "string" != typeof a10 && "url" in a10 ? a10.url : String(a10);
          N(c10), a10 instanceof Request ? super(a10, b10) : super(c10, b10);
          let d10 = new ab(c10, { headers: M(this.headers), nextConfig: b10.nextConfig });
          this[ad] = { cookies: new ac.tm(this.headers), nextUrl: d10, url: d10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[ad].cookies;
        }
        get nextUrl() {
          return this[ad].nextUrl;
        }
        get page() {
          throw new H();
        }
        get ua() {
          throw new I();
        }
        get url() {
          return this[ad].url;
        }
      }
      var af = c(704);
      let ag = Symbol("internal response"), ah = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function ai(a10, b10) {
        var c10;
        if (null == a10 || null == (c10 = a10.request) ? void 0 : c10.headers) {
          if (!(a10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let c11 = [];
          for (let [d10, e10] of a10.request.headers) b10.set("x-middleware-request-" + d10, e10), c11.push(d10);
          b10.set("x-middleware-override-headers", c11.join(","));
        }
      }
      class aj extends Response {
        constructor(a10, b10 = {}) {
          super(a10, b10);
          let c10 = this.headers, d10 = new Proxy(new ac.VO(c10), { get(a11, d11, e10) {
            switch (d11) {
              case "delete":
              case "set":
                return (...e11) => {
                  let f2 = Reflect.apply(a11[d11], a11, e11), g2 = new Headers(c10);
                  return f2 instanceof ac.VO && c10.set("x-middleware-set-cookie", f2.getAll().map((a12) => (0, ac.Ud)(a12)).join(",")), ai(b10, g2), f2;
                };
              default:
                return af.l.get(a11, d11, e10);
            }
          } });
          this[ag] = { cookies: d10, url: b10.url ? new ab(b10.url, { headers: M(c10), nextConfig: b10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[ag].cookies;
        }
        static json(a10, b10) {
          let c10 = Response.json(a10, b10);
          return new aj(c10.body, c10);
        }
        static redirect(a10, b10) {
          let c10 = "number" == typeof b10 ? b10 : (null == b10 ? void 0 : b10.status) ?? 307;
          if (!ah.has(c10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let d10 = "object" == typeof b10 ? b10 : {}, e10 = new Headers(null == d10 ? void 0 : d10.headers);
          return e10.set("Location", N(a10)), new aj(null, { ...d10, headers: e10, status: c10 });
        }
        static rewrite(a10, b10) {
          let c10 = new Headers(null == b10 ? void 0 : b10.headers);
          return c10.set("x-middleware-rewrite", N(a10)), ai(b10, c10), new aj(null, { ...b10, headers: c10 });
        }
        static next(a10) {
          let b10 = new Headers(null == a10 ? void 0 : a10.headers);
          return b10.set("x-middleware-next", "1"), ai(a10, b10), new aj(null, { ...a10, headers: b10 });
        }
      }
      function ak(a10, b10) {
        let c10 = "string" == typeof b10 ? new URL(b10) : b10, d10 = new URL(a10, b10), e10 = d10.origin === c10.origin;
        return { url: e10 ? d10.toString().slice(c10.origin.length) : d10.toString(), isRelative: e10 };
      }
      let al = "Next-Router-Prefetch", am = ["RSC", "Next-Router-State-Tree", al, "Next-HMR-Refresh", "Next-Router-Segment-Prefetch"];
      var an = c(921), ao = c(718), ap = function(a10) {
        return a10.handleRequest = "BaseServer.handleRequest", a10.run = "BaseServer.run", a10.pipe = "BaseServer.pipe", a10.getStaticHTML = "BaseServer.getStaticHTML", a10.render = "BaseServer.render", a10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", a10.renderToResponse = "BaseServer.renderToResponse", a10.renderToHTML = "BaseServer.renderToHTML", a10.renderError = "BaseServer.renderError", a10.renderErrorToResponse = "BaseServer.renderErrorToResponse", a10.renderErrorToHTML = "BaseServer.renderErrorToHTML", a10.render404 = "BaseServer.render404", a10;
      }(ap || {}), aq = function(a10) {
        return a10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", a10.loadComponents = "LoadComponents.loadComponents", a10;
      }(aq || {}), ar = function(a10) {
        return a10.getRequestHandler = "NextServer.getRequestHandler", a10.getServer = "NextServer.getServer", a10.getServerRequestHandler = "NextServer.getServerRequestHandler", a10.createServer = "createServer.createServer", a10;
      }(ar || {}), as = function(a10) {
        return a10.compression = "NextNodeServer.compression", a10.getBuildId = "NextNodeServer.getBuildId", a10.createComponentTree = "NextNodeServer.createComponentTree", a10.clientComponentLoading = "NextNodeServer.clientComponentLoading", a10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", a10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", a10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", a10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", a10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", a10.sendRenderResult = "NextNodeServer.sendRenderResult", a10.proxyRequest = "NextNodeServer.proxyRequest", a10.runApi = "NextNodeServer.runApi", a10.render = "NextNodeServer.render", a10.renderHTML = "NextNodeServer.renderHTML", a10.imageOptimizer = "NextNodeServer.imageOptimizer", a10.getPagePath = "NextNodeServer.getPagePath", a10.getRoutesManifest = "NextNodeServer.getRoutesManifest", a10.findPageComponents = "NextNodeServer.findPageComponents", a10.getFontManifest = "NextNodeServer.getFontManifest", a10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", a10.getRequestHandler = "NextNodeServer.getRequestHandler", a10.renderToHTML = "NextNodeServer.renderToHTML", a10.renderError = "NextNodeServer.renderError", a10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", a10.render404 = "NextNodeServer.render404", a10.startResponse = "NextNodeServer.startResponse", a10.route = "route", a10.onProxyReq = "onProxyReq", a10.apiResolver = "apiResolver", a10.internalFetch = "internalFetch", a10;
      }(as || {}), at = function(a10) {
        return a10.startServer = "startServer.startServer", a10;
      }(at || {}), au = function(a10) {
        return a10.getServerSideProps = "Render.getServerSideProps", a10.getStaticProps = "Render.getStaticProps", a10.renderToString = "Render.renderToString", a10.renderDocument = "Render.renderDocument", a10.createBodyResult = "Render.createBodyResult", a10;
      }(au || {}), av = function(a10) {
        return a10.renderToString = "AppRender.renderToString", a10.renderToReadableStream = "AppRender.renderToReadableStream", a10.getBodyResult = "AppRender.getBodyResult", a10.fetch = "AppRender.fetch", a10;
      }(av || {}), aw = function(a10) {
        return a10.executeRoute = "Router.executeRoute", a10;
      }(aw || {}), ax = function(a10) {
        return a10.runHandler = "Node.runHandler", a10;
      }(ax || {}), ay = function(a10) {
        return a10.runHandler = "AppRouteRouteHandlers.runHandler", a10;
      }(ay || {}), az = function(a10) {
        return a10.generateMetadata = "ResolveMetadata.generateMetadata", a10.generateViewport = "ResolveMetadata.generateViewport", a10;
      }(az || {}), aA = function(a10) {
        return a10.execute = "Middleware.execute", a10;
      }(aA || {});
      let aB = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], aC = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function aD(a10) {
        return null !== a10 && "object" == typeof a10 && "then" in a10 && "function" == typeof a10.then;
      }
      let { context: aE, propagation: aF, trace: aG, SpanStatusCode: aH, SpanKind: aI, ROOT_CONTEXT: aJ } = d = c(328);
      class aK extends Error {
        constructor(a10, b10) {
          super(), this.bubble = a10, this.result = b10;
        }
      }
      let aL = (a10, b10) => {
        (function(a11) {
          return "object" == typeof a11 && null !== a11 && a11 instanceof aK;
        })(b10) && b10.bubble ? a10.setAttribute("next.bubble", true) : (b10 && a10.recordException(b10), a10.setStatus({ code: aH.ERROR, message: null == b10 ? void 0 : b10.message })), a10.end();
      }, aM = /* @__PURE__ */ new Map(), aN = d.createContextKey("next.rootSpanId"), aO = 0, aP = { set(a10, b10, c10) {
        a10.push({ key: b10, value: c10 });
      } };
      class aQ {
        getTracerInstance() {
          return aG.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return aE;
        }
        getTracePropagationData() {
          let a10 = aE.active(), b10 = [];
          return aF.inject(a10, b10, aP), b10;
        }
        getActiveScopeSpan() {
          return aG.getSpan(null == aE ? void 0 : aE.active());
        }
        withPropagatedContext(a10, b10, c10) {
          let d10 = aE.active();
          if (aG.getSpanContext(d10)) return b10();
          let e10 = aF.extract(d10, a10, c10);
          return aE.with(e10, b10);
        }
        trace(...a10) {
          var b10;
          let [c10, d10, e10] = a10, { fn: f2, options: g2 } = "function" == typeof d10 ? { fn: d10, options: {} } : { fn: e10, options: { ...d10 } }, h2 = g2.spanName ?? c10;
          if (!aB.includes(c10) && "1" !== process.env.NEXT_OTEL_VERBOSE || g2.hideSpan) return f2();
          let i2 = this.getSpanContext((null == g2 ? void 0 : g2.parentSpan) ?? this.getActiveScopeSpan()), j2 = false;
          i2 ? (null == (b10 = aG.getSpanContext(i2)) ? void 0 : b10.isRemote) && (j2 = true) : (i2 = (null == aE ? void 0 : aE.active()) ?? aJ, j2 = true);
          let k2 = aO++;
          return g2.attributes = { "next.span_name": h2, "next.span_type": c10, ...g2.attributes }, aE.with(i2.setValue(aN, k2), () => this.getTracerInstance().startActiveSpan(h2, g2, (a11) => {
            let b11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, d11 = () => {
              aM.delete(k2), b11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && aC.includes(c10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(c10.split(".").pop() || "").replace(/[A-Z]/g, (a12) => "-" + a12.toLowerCase())}`, { start: b11, end: performance.now() });
            };
            j2 && aM.set(k2, new Map(Object.entries(g2.attributes ?? {})));
            try {
              if (f2.length > 1) return f2(a11, (b13) => aL(a11, b13));
              let b12 = f2(a11);
              if (aD(b12)) return b12.then((b13) => (a11.end(), b13)).catch((b13) => {
                throw aL(a11, b13), b13;
              }).finally(d11);
              return a11.end(), d11(), b12;
            } catch (b12) {
              throw aL(a11, b12), d11(), b12;
            }
          }));
        }
        wrap(...a10) {
          let b10 = this, [c10, d10, e10] = 3 === a10.length ? a10 : [a10[0], {}, a10[1]];
          return aB.includes(c10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let a11 = d10;
            "function" == typeof a11 && "function" == typeof e10 && (a11 = a11.apply(this, arguments));
            let f2 = arguments.length - 1, g2 = arguments[f2];
            if ("function" != typeof g2) return b10.trace(c10, a11, () => e10.apply(this, arguments));
            {
              let d11 = b10.getContext().bind(aE.active(), g2);
              return b10.trace(c10, a11, (a12, b11) => (arguments[f2] = function(a13) {
                return null == b11 || b11(a13), d11.apply(this, arguments);
              }, e10.apply(this, arguments)));
            }
          } : e10;
        }
        startSpan(...a10) {
          let [b10, c10] = a10, d10 = this.getSpanContext((null == c10 ? void 0 : c10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(b10, c10, d10);
        }
        getSpanContext(a10) {
          return a10 ? aG.setSpan(aE.active(), a10) : void 0;
        }
        getRootSpanAttributes() {
          let a10 = aE.active().getValue(aN);
          return aM.get(a10);
        }
        setRootSpanAttribute(a10, b10) {
          let c10 = aE.active().getValue(aN), d10 = aM.get(c10);
          d10 && d10.set(a10, b10);
        }
      }
      let aR = (() => {
        let a10 = new aQ();
        return () => a10;
      })(), aS = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(aS);
      class aT {
        constructor(a10, b10, c10, d10) {
          var e10;
          let f2 = a10 && function(a11, b11) {
            let c11 = an.o.from(a11.headers);
            return { isOnDemandRevalidate: c11.get("x-prerender-revalidate") === b11.previewModeId, revalidateOnlyGenerated: c11.has("x-prerender-revalidate-if-generated") };
          }(b10, a10).isOnDemandRevalidate, g2 = null == (e10 = c10.get(aS)) ? void 0 : e10.value;
          this._isEnabled = !!(!f2 && g2 && a10 && g2 === a10.previewModeId), this._previewModeId = null == a10 ? void 0 : a10.previewModeId, this._mutableCookies = d10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: aS, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: aS, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function aU(a10, b10) {
        if ("x-middleware-set-cookie" in a10.headers && "string" == typeof a10.headers["x-middleware-set-cookie"]) {
          let c10 = a10.headers["x-middleware-set-cookie"], d10 = new Headers();
          for (let a11 of L(c10)) d10.append("set-cookie", a11);
          for (let a11 of new ac.VO(d10).getAll()) b10.set(a11);
        }
      }
      var aV = c(298), aW = c(38), aX = c.n(aW), aY = c(726), aZ = c(172);
      class a$ {
        constructor(a10, b10) {
          this.cache = /* @__PURE__ */ new Map(), this.sizes = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = a10, this.calculateSize = b10 || (() => 1);
        }
        set(a10, b10) {
          if (!a10 || !b10) return;
          let c10 = this.calculateSize(b10);
          if (c10 > this.maxSize) return void console.warn("Single item size exceeds maxSize");
          this.cache.has(a10) && (this.totalSize -= this.sizes.get(a10) || 0), this.cache.set(a10, b10), this.sizes.set(a10, c10), this.totalSize += c10, this.touch(a10);
        }
        has(a10) {
          return !!a10 && (this.touch(a10), !!this.cache.get(a10));
        }
        get(a10) {
          if (!a10) return;
          let b10 = this.cache.get(a10);
          if (void 0 !== b10) return this.touch(a10), b10;
        }
        touch(a10) {
          let b10 = this.cache.get(a10);
          void 0 !== b10 && (this.cache.delete(a10), this.cache.set(a10, b10), this.evictIfNecessary());
        }
        evictIfNecessary() {
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) this.evictLeastRecentlyUsed();
        }
        evictLeastRecentlyUsed() {
          let a10 = this.cache.keys().next().value;
          if (void 0 !== a10) {
            let b10 = this.sizes.get(a10) || 0;
            this.totalSize -= b10, this.cache.delete(a10), this.sizes.delete(a10);
          }
        }
        reset() {
          this.cache.clear(), this.sizes.clear(), this.totalSize = 0;
        }
        keys() {
          return [...this.cache.keys()];
        }
        remove(a10) {
          this.cache.has(a10) && (this.totalSize -= this.sizes.get(a10) || 0, this.cache.delete(a10), this.sizes.delete(a10));
        }
        clear() {
          this.cache.clear(), this.sizes.clear(), this.totalSize = 0;
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      c(356).Buffer, new a$(52428800, (a10) => a10.size), process.env.NEXT_PRIVATE_DEBUG_CACHE && console.debug.bind(console, "DefaultCacheHandler:"), process.env.NEXT_PRIVATE_DEBUG_CACHE && ((a10, ...b10) => {
        console.log(`use-cache: ${a10}`, ...b10);
      }), Symbol.for("@next/cache-handlers");
      let a_ = Symbol.for("@next/cache-handlers-map"), a0 = Symbol.for("@next/cache-handlers-set"), a1 = globalThis;
      function a2() {
        if (a1[a_]) return a1[a_].entries();
      }
      async function a3(a10, b10) {
        if (!a10) return b10();
        let c10 = a4(a10);
        try {
          return await b10();
        } finally {
          let b11 = function(a11, b12) {
            let c11 = new Set(a11.pendingRevalidatedTags), d10 = new Set(a11.pendingRevalidateWrites);
            return { pendingRevalidatedTags: b12.pendingRevalidatedTags.filter((a12) => !c11.has(a12)), pendingRevalidates: Object.fromEntries(Object.entries(b12.pendingRevalidates).filter(([b13]) => !(b13 in a11.pendingRevalidates))), pendingRevalidateWrites: b12.pendingRevalidateWrites.filter((a12) => !d10.has(a12)) };
          }(c10, a4(a10));
          await a6(a10, b11);
        }
      }
      function a4(a10) {
        return { pendingRevalidatedTags: a10.pendingRevalidatedTags ? [...a10.pendingRevalidatedTags] : [], pendingRevalidates: { ...a10.pendingRevalidates }, pendingRevalidateWrites: a10.pendingRevalidateWrites ? [...a10.pendingRevalidateWrites] : [] };
      }
      async function a5(a10, b10) {
        if (0 === a10.length) return;
        let c10 = [];
        b10 && c10.push(b10.revalidateTag(a10));
        let d10 = function() {
          if (a1[a0]) return a1[a0].values();
        }();
        if (d10) for (let b11 of d10) c10.push(b11.expireTags(...a10));
        await Promise.all(c10);
      }
      async function a6(a10, b10) {
        let c10 = (null == b10 ? void 0 : b10.pendingRevalidatedTags) ?? a10.pendingRevalidatedTags ?? [], d10 = (null == b10 ? void 0 : b10.pendingRevalidates) ?? a10.pendingRevalidates ?? {}, e10 = (null == b10 ? void 0 : b10.pendingRevalidateWrites) ?? a10.pendingRevalidateWrites ?? [];
        return Promise.all([a5(c10, a10.incrementalCache), ...Object.values(d10), ...e10]);
      }
      var a7 = c(960), a8 = c(303);
      class a9 {
        constructor({ waitUntil: a10, onClose: b10, onTaskError: c10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = a10, this.onClose = b10, this.onTaskError = c10, this.callbackQueue = new (aX())(), this.callbackQueue.pause();
        }
        after(a10) {
          if (aD(a10)) this.waitUntil || ba(), this.waitUntil(a10.catch((a11) => this.reportTaskError("promise", a11)));
          else if ("function" == typeof a10) this.addCallback(a10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(a10) {
          this.waitUntil || ba();
          let b10 = aV.FP.getStore();
          b10 && this.workUnitStores.add(b10);
          let c10 = a8.Z.getStore(), d10 = c10 ? c10.rootTaskSpawnPhase : null == b10 ? void 0 : b10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let e10 = (0, a7.cg)(async () => {
            try {
              await a8.Z.run({ rootTaskSpawnPhase: d10 }, () => a10());
            } catch (a11) {
              this.reportTaskError("function", a11);
            }
          });
          this.callbackQueue.add(e10);
        }
        async runCallbacksOnClose() {
          return await new Promise((a10) => this.onClose(a10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let a11 of this.workUnitStores) a11.phase = "after";
          let a10 = aZ.J.getStore();
          if (!a10) throw Object.defineProperty(new aY.z("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return a3(a10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(a10, b10) {
          if (console.error("promise" === a10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", b10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, b10);
          } catch (a11) {
            console.error(Object.defineProperty(new aY.z("`onTaskError` threw while handling an error thrown from an `after` task", { cause: a11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function ba() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function bb(a10) {
        let b10, c10 = { then: (d10, e10) => (b10 || (b10 = a10()), b10.then((a11) => {
          c10.value = a11;
        }).catch(() => {
        }), b10.then(d10, e10)) };
        return c10;
      }
      class bc {
        onClose(a10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", a10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function bd() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let be = Symbol.for("@next/request-context");
      async function bf(a10, b10, c10) {
        let d10 = [], e10 = c10 && c10.size > 0;
        for (let b11 of ((a11) => {
          let b12 = ["/layout"];
          if (a11.startsWith("/")) {
            let c11 = a11.split("/");
            for (let a12 = 1; a12 < c11.length + 1; a12++) {
              let d11 = c11.slice(0, a12).join("/");
              d11 && (d11.endsWith("/page") || d11.endsWith("/route") || (d11 = `${d11}${!d11.endsWith("/") ? "/" : ""}layout`), b12.push(d11));
            }
          }
          return b12;
        })(a10)) b11 = `${J}${b11}`, d10.push(b11);
        if (b10.pathname && !e10) {
          let a11 = `${J}${b10.pathname}`;
          d10.push(a11);
        }
        return { tags: d10, expirationsByCacheKind: function(a11) {
          let b11 = /* @__PURE__ */ new Map(), c11 = a2();
          if (c11) for (let [d11, e11] of c11) "getExpiration" in e11 && b11.set(d11, bb(async () => e11.getExpiration(...a11)));
          return b11;
        }(d10) };
      }
      class bg extends ae {
        constructor(a10) {
          super(a10.input, a10.init), this.sourcePage = a10.page;
        }
        get request() {
          throw Object.defineProperty(new G({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new G({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new G({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let bh = { keys: (a10) => Array.from(a10.keys()), get: (a10, b10) => a10.get(b10) ?? void 0 }, bi = (a10, b10) => aR().withPropagatedContext(a10.headers, b10, bh), bj = false;
      async function bk(a10) {
        var b10;
        let d10, e10;
        if (!bj && (bj = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
          let { interceptTestApis: a11, wrapRequestHandler: b11 } = c(381);
          a11(), bi = b11(bi);
        }
        await E();
        let f2 = void 0 !== globalThis.__BUILD_MANIFEST;
        a10.request.url = a10.request.url.replace(/\.rsc($|\?)/, "$1");
        let g2 = a10.bypassNextUrl ? new URL(a10.request.url) : new ab(a10.request.url, { headers: a10.request.headers, nextConfig: a10.request.nextConfig });
        for (let a11 of [...g2.searchParams.keys()]) {
          let b11 = g2.searchParams.getAll(a11), c10 = function(a12) {
            for (let b12 of ["nxtP", "nxtI"]) if (a12 !== b12 && a12.startsWith(b12)) return a12.substring(b12.length);
            return null;
          }(a11);
          if (c10) {
            for (let a12 of (g2.searchParams.delete(c10), b11)) g2.searchParams.append(c10, a12);
            g2.searchParams.delete(a11);
          }
        }
        let h2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in g2 && (h2 = g2.buildId || "", g2.buildId = "");
        let i2 = function(a11) {
          let b11 = new Headers();
          for (let [c10, d11] of Object.entries(a11)) for (let a12 of Array.isArray(d11) ? d11 : [d11]) void 0 !== a12 && ("number" == typeof a12 && (a12 = a12.toString()), b11.append(c10, a12));
          return b11;
        }(a10.request.headers), j2 = i2.has("x-nextjs-data"), k2 = "1" === i2.get("RSC");
        j2 && "/index" === g2.pathname && (g2.pathname = "/");
        let l2 = /* @__PURE__ */ new Map();
        if (!f2) for (let a11 of am) {
          let b11 = a11.toLowerCase(), c10 = i2.get(b11);
          null !== c10 && (l2.set(b11, c10), i2.delete(b11));
        }
        let m2 = new bg({ page: a10.page, input: function(a11) {
          let b11 = "string" == typeof a11, c10 = b11 ? new URL(a11) : a11;
          return c10.searchParams.delete("_rsc"), b11 ? c10.toString() : c10;
        }(g2).toString(), init: { body: a10.request.body, headers: i2, method: a10.request.method, nextConfig: a10.request.nextConfig, signal: a10.request.signal } });
        j2 && Object.defineProperty(m2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && a10.IncrementalCache && (globalThis.__incrementalCache = new a10.IncrementalCache({ CurCacheHandler: a10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: a10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: bd() }) }));
        let n2 = a10.request.waitUntil ?? (null == (b10 = function() {
          let a11 = globalThis[be];
          return null == a11 ? void 0 : a11.get();
        }()) ? void 0 : b10.waitUntil), o2 = new S({ request: m2, page: a10.page, context: n2 ? { waitUntil: n2 } : void 0 });
        if ((d10 = await bi(m2, () => {
          if ("/middleware" === a10.page || "/src/middleware" === a10.page) {
            let b11 = o2.waitUntil.bind(o2), c10 = new bc();
            return aR().trace(aA.execute, { spanName: `middleware ${m2.method} ${m2.nextUrl.pathname}`, attributes: { "http.target": m2.nextUrl.pathname, "http.method": m2.method } }, async () => {
              try {
                var d11, f3, g3, i3, j3, k3;
                let l3 = bd(), n3 = await bf("/", m2.nextUrl, null), p3 = (j3 = m2.nextUrl, k3 = (a11) => {
                  e10 = a11;
                }, function(a11, b12, c11, d12, e11, f4, g4, h3, i4, j4, k4) {
                  function l4(a12) {
                    c11 && c11.setHeader("Set-Cookie", a12);
                  }
                  let m3 = {};
                  return { type: "request", phase: a11, implicitTags: f4, url: { pathname: d12.pathname, search: d12.search ?? "" }, rootParams: e11, get headers() {
                    return m3.headers || (m3.headers = function(a12) {
                      let b13 = an.o.from(a12);
                      for (let a13 of am) b13.delete(a13.toLowerCase());
                      return an.o.seal(b13);
                    }(b12.headers)), m3.headers;
                  }, get cookies() {
                    if (!m3.cookies) {
                      let a12 = new ac.tm(an.o.from(b12.headers));
                      aU(b12, a12), m3.cookies = ao.Ck.seal(a12);
                    }
                    return m3.cookies;
                  }, set cookies(value) {
                    m3.cookies = value;
                  }, get mutableCookies() {
                    if (!m3.mutableCookies) {
                      let a12 = function(a13, b13) {
                        let c12 = new ac.tm(an.o.from(a13));
                        return ao.K8.wrap(c12, b13);
                      }(b12.headers, g4 || (c11 ? l4 : void 0));
                      aU(b12, a12), m3.mutableCookies = a12;
                    }
                    return m3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return m3.userspaceMutableCookies || (m3.userspaceMutableCookies = (0, ao.hm)(this.mutableCookies)), m3.userspaceMutableCookies;
                  }, get draftMode() {
                    return m3.draftMode || (m3.draftMode = new aT(i4, b12, this.cookies, this.mutableCookies)), m3.draftMode;
                  }, renderResumeDataCache: h3 ?? null, isHmrRefresh: j4, serverComponentsHmrCache: k4 || globalThis.__serverComponentsHmrCache };
                }("action", m2, void 0, j3, {}, n3, k3, void 0, l3, false, void 0)), q3 = function({ page: a11, fallbackRouteParams: b12, renderOpts: c11, requestEndedState: d12, isPrefetchRequest: e11, buildId: f4, previouslyRevalidatedTags: g4 }) {
                  var h3;
                  let i4 = { isStaticGeneration: !c11.shouldWaitOnAllReady && !c11.supportsDynamicResponse && !c11.isDraftMode && !c11.isPossibleServerAction, page: a11, fallbackRouteParams: b12, route: (h3 = a11.split("/").reduce((a12, b13, c12, d13) => b13 ? "(" === b13[0] && b13.endsWith(")") || "@" === b13[0] || ("page" === b13 || "route" === b13) && c12 === d13.length - 1 ? a12 : a12 + "/" + b13 : a12, "")).startsWith("/") ? h3 : "/" + h3, incrementalCache: c11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: c11.cacheLifeProfiles, isRevalidate: c11.isRevalidate, isBuildTimePrerendering: c11.nextExport, hasReadableErrorStacks: c11.hasReadableErrorStacks, fetchCache: c11.fetchCache, isOnDemandRevalidate: c11.isOnDemandRevalidate, isDraftMode: c11.isDraftMode, requestEndedState: d12, isPrefetchRequest: e11, buildId: f4, reactLoadableManifest: (null == c11 ? void 0 : c11.reactLoadableManifest) || {}, assetPrefix: (null == c11 ? void 0 : c11.assetPrefix) || "", afterContext: function(a12) {
                    let { waitUntil: b13, onClose: c12, onAfterTaskError: d13 } = a12;
                    return new a9({ waitUntil: b13, onClose: c12, onTaskError: d13 });
                  }(c11), dynamicIOEnabled: c11.experimental.dynamicIO, dev: c11.dev ?? false, previouslyRevalidatedTags: g4, refreshTagsByCacheKind: function() {
                    let a12 = /* @__PURE__ */ new Map(), b13 = a2();
                    if (b13) for (let [c12, d13] of b13) "refreshTags" in d13 && a12.set(c12, bb(async () => d13.refreshTags()));
                    return a12;
                  }(), runInCleanSnapshot: (0, a7.$p)() };
                  return c11.store = i4, i4;
                }({ page: "/", fallbackRouteParams: null, renderOpts: { cacheLifeProfiles: null == (f3 = a10.request.nextConfig) || null == (d11 = f3.experimental) ? void 0 : d11.cacheLife, experimental: { isRoutePPREnabled: false, dynamicIO: false, authInterrupts: !!(null == (i3 = a10.request.nextConfig) || null == (g3 = i3.experimental) ? void 0 : g3.authInterrupts) }, supportsDynamicResponse: true, waitUntil: b11, onClose: c10.onClose.bind(c10), onAfterTaskError: void 0 }, requestEndedState: { ended: false }, isPrefetchRequest: m2.headers.has(al), buildId: h2 ?? "", previouslyRevalidatedTags: [] });
                return await aZ.J.run(q3, () => aV.FP.run(p3, a10.handler, m2, o2));
              } finally {
                setTimeout(() => {
                  c10.dispatchClose();
                }, 0);
              }
            });
          }
          return a10.handler(m2, o2);
        })) && !(d10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        d10 && e10 && d10.headers.set("set-cookie", e10);
        let p2 = null == d10 ? void 0 : d10.headers.get("x-middleware-rewrite");
        if (d10 && p2 && (k2 || !f2)) {
          let b11 = new ab(p2, { forceLocale: true, headers: a10.request.headers, nextConfig: a10.request.nextConfig });
          f2 || b11.host !== m2.nextUrl.host || (b11.buildId = h2 || b11.buildId, d10.headers.set("x-middleware-rewrite", String(b11)));
          let { url: c10, isRelative: e11 } = ak(b11.toString(), g2.toString());
          !f2 && j2 && d10.headers.set("x-nextjs-rewrite", c10), k2 && e11 && (g2.pathname !== b11.pathname && d10.headers.set("x-nextjs-rewritten-path", b11.pathname), g2.search !== b11.search && d10.headers.set("x-nextjs-rewritten-query", b11.search.slice(1)));
        }
        let q2 = null == d10 ? void 0 : d10.headers.get("Location");
        if (d10 && q2 && !f2) {
          let b11 = new ab(q2, { forceLocale: false, headers: a10.request.headers, nextConfig: a10.request.nextConfig });
          d10 = new Response(d10.body, d10), b11.host === g2.host && (b11.buildId = h2 || b11.buildId, d10.headers.set("Location", b11.toString())), j2 && (d10.headers.delete("Location"), d10.headers.set("x-nextjs-redirect", ak(b11.toString(), g2.toString()).url));
        }
        let r2 = d10 || aj.next(), s2 = r2.headers.get("x-middleware-override-headers"), t2 = [];
        if (s2) {
          for (let [a11, b11] of l2) r2.headers.set(`x-middleware-request-${a11}`, b11), t2.push(a11);
          t2.length > 0 && r2.headers.set("x-middleware-override-headers", s2 + "," + t2.join(","));
        }
        return { response: r2, waitUntil: ("internal" === o2[Q].kind ? Promise.all(o2[Q].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: m2.fetchMetrics };
      }
      var bl = c(982);
      c(28), "undefined" == typeof URLPattern || URLPattern, c(593), c(622), c(565), c(744), /* @__PURE__ */ new WeakMap();
      class bm extends Error {
      }
      class bn extends bm {
        constructor({ code: a10, message: b10 }) {
          super(b10 ?? "An error occurred while interacting with the authorization server."), this.name = "OAuth2Error", this.code = a10;
        }
      }
      class bo extends bm {
        constructor(a10) {
          super(a10 ?? "Discovery failed for the OpenID Connect configuration."), this.code = "discovery_error", this.name = "DiscoveryError";
        }
      }
      class bp extends bm {
        constructor(a10) {
          super(a10 ?? "The state parameter is missing."), this.code = "missing_state", this.name = "MissingStateError";
        }
      }
      class bq extends bm {
        constructor(a10) {
          super(a10 ?? "The state parameter is invalid."), this.code = "invalid_state", this.name = "InvalidStateError";
        }
      }
      class br extends bm {
        constructor(a10) {
          super(a10 ?? "The configuration is invalid."), this.code = "invalid_configuration", this.name = "InvalidConfigurationError";
        }
      }
      class bs extends bm {
        constructor({ cause: a10, message: b10 }) {
          super(b10 ?? "An error occurred during the authorization flow."), this.code = "authorization_error", this.cause = a10, this.name = "AuthorizationError";
        }
      }
      class bt extends bm {
        constructor(a10) {
          super(a10 ?? "An error occurred while preparing or performing the authorization code grant request."), this.code = "authorization_code_grant_request_error", this.name = "AuthorizationCodeGrantRequestError";
        }
      }
      class bu extends bm {
        constructor({ cause: a10, message: b10 }) {
          super(b10 ?? "An error occurred while trying to exchange the authorization code."), this.code = "authorization_code_grant_error", this.cause = a10, this.name = "AuthorizationCodeGrantError";
        }
      }
      class bv extends bm {
        constructor(a10) {
          super(a10 ?? "An error occurred while completing the backchannel logout request."), this.code = "backchannel_logout_error", this.name = "BackchannelLogoutError";
        }
      }
      class bw extends bm {
        constructor() {
          super("The authorization server does not support backchannel authentication. Learn how to enable it here: https://auth0.com/docs/get-started/applications/configure-client-initiated-backchannel-authentication"), this.code = "backchannel_authentication_not_supported_error", this.name = "BackchannelAuthenticationNotSupportedError";
        }
      }
      class bx extends bm {
        constructor({ cause: a10 }) {
          super("There was an error when trying to use Client-Initiated Backchannel Authentication."), this.code = "backchannel_authentication_error", this.cause = a10, this.name = "BackchannelAuthenticationError";
        }
      }
      !function(a10) {
        a10.MISSING_SESSION = "missing_session", a10.MISSING_REFRESH_TOKEN = "missing_refresh_token", a10.FAILED_TO_REFRESH_TOKEN = "failed_to_refresh_token";
      }(j || (j = {}));
      class by extends bm {
        constructor(a10, b10, c10) {
          super(b10), this.name = "AccessTokenError", this.code = a10, this.cause = c10;
        }
      }
      !function(a10) {
        a10.MISSING_SESSION = "missing_session", a10.MISSING_REFRESH_TOKEN = "missing_refresh_token", a10.FAILED_TO_EXCHANGE = "failed_to_exchange_refresh_token";
      }(k || (k = {}));
      class bz extends bm {
        constructor(a10, b10, c10) {
          super(b10), this.name = "AccessTokenForConnectionError", this.code = a10, this.cause = c10;
        }
      }
      !function(a10) {
        a10.MISSING_SUBJECT_TOKEN = "missing_subject_token", a10.INVALID_SUBJECT_TOKEN_TYPE = "invalid_subject_token_type", a10.MISSING_ACTOR_TOKEN_TYPE = "missing_actor_token_type", a10.EXCHANGE_FAILED = "exchange_failed";
      }(l || (l = {}));
      class bA extends bm {
        constructor(a10, b10, c10) {
          super(b10), this.name = "CustomTokenExchangeError", this.code = a10, this.cause = c10;
        }
      }
      !function(a10) {
        a10.DPOP_JKT_CALCULATION_FAILED = "dpop_jkt_calculation_failed", a10.DPOP_KEY_EXPORT_FAILED = "dpop_key_export_failed", a10.DPOP_CONFIGURATION_ERROR = "dpop_configuration_error";
      }(m || (m = {}));
      class bB extends bm {
        constructor(a10, b10, c10) {
          super(b10), this.name = "DPoPError", this.code = a10, this.cause = c10;
        }
      }
      class bC extends bm {
        constructor({ type: a10, title: b10, detail: c10, status: d10, validationErrors: e10 }) {
          super(`${b10}: ${c10}`), this.name = "MyAccountApiError", this.code = "my_account_api_error", this.type = a10, this.title = b10, this.detail = c10, this.status = d10, this.validationErrors = e10;
        }
      }
      !function(a10) {
        a10.MISSING_SESSION = "missing_session", a10.FAILED_TO_INITIATE = "failed_to_initiate", a10.FAILED_TO_COMPLETE = "failed_to_complete";
      }(n || (n = {}));
      class bD extends bm {
        constructor({ code: a10, message: b10, cause: c10 }) {
          super(b10), this.name = "ConnectAccountError", this.code = a10, this.cause = c10;
        }
      }
      class bE extends bm {
        toJSON() {
          return { error: this.error, error_description: this.error_description };
        }
        get code() {
          return this.error;
        }
      }
      class bF extends bm {
        constructor(a10) {
          super(a10), this.code = "invalid_request", Object.setPrototypeOf(this, bF.prototype), this.name = "InvalidRequestError";
        }
        toJSON() {
          return { error: this.code, error_description: this.message };
        }
      }
      class bG extends bE {
        constructor(a10, b10, c10) {
          super(b10), this.name = "MfaGetAuthenticatorsError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bG.prototype);
        }
      }
      class bH extends bE {
        constructor(a10, b10, c10) {
          super(b10), this.name = "MfaChallengeError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bH.prototype);
        }
      }
      class bI extends bE {
        constructor(a10, b10, c10) {
          super(b10), this.name = "MfaVerifyError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bI.prototype);
        }
      }
      class bJ extends bm {
        constructor(a10) {
          super(a10), this.code = "mfa_no_available_factors", this.error = "mfa_no_available_factors", this.name = "MfaNoAvailableFactorsError", this.error_description = a10, Object.setPrototypeOf(this, bJ.prototype);
        }
      }
      class bK extends bE {
        constructor(a10, b10, c10) {
          super(b10), this.name = "MfaEnrollmentError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bK.prototype);
        }
      }
      class bL extends bm {
        constructor(a10, b10, c10, d10) {
          super(a10), this.code = "mfa_required", this.error = "mfa_required", this.name = "MfaRequiredError", this.error_description = a10, this.mfa_token = b10, this.mfa_requirements = c10, this.cause = d10;
        }
        toJSON() {
          return { error: this.error, error_description: this.error_description, mfa_token: this.mfa_token, ...this.mfa_requirements && { mfa_requirements: this.mfa_requirements } };
        }
      }
      class bM extends bm {
        constructor() {
          super("MFA token has expired. Please restart the MFA flow."), this.code = "mfa_token_expired", this.name = "MfaTokenExpiredError";
        }
      }
      class bN extends bm {
        constructor() {
          super("MFA token is invalid."), this.code = "mfa_token_invalid", this.name = "MfaTokenInvalidError";
        }
      }
      class bO extends bm {
        toJSON() {
          return { error: this.error, error_description: this.error_description };
        }
      }
      class bP extends bO {
        get code() {
          return "passwordless_start_error";
        }
        constructor(a10, b10, c10) {
          super(b10), this.name = "PasswordlessStartError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bP.prototype);
        }
      }
      class bQ extends bO {
        get code() {
          return "passwordless_verify_error";
        }
        constructor(a10, b10, c10) {
          super(b10), this.name = "PasswordlessVerifyError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bQ.prototype);
        }
      }
      class bR extends bm {
        constructor(a10, b10) {
          super(a10 ?? "Failed to resolve the domain from the request."), this.cause = b10, this.code = "domain_resolution_error", this.name = "DomainResolutionError";
        }
      }
      class bS extends bm {
        constructor(a10) {
          super(a10 ?? "The domain failed validation."), this.code = "domain_validation_error", this.name = "DomainValidationError";
        }
      }
      class bT extends bm {
        constructor(a10, b10) {
          super(`Issuer Mismatch: expected "${a10}" but received "${b10}"`), this.expectedIssuer = a10, this.actualIssuer = b10, this.code = "issuer_validation_error", this.name = "IssuerValidationError";
        }
      }
      class bU extends bm {
        constructor(a10) {
          super(a10 ?? "The session domain does not match the current request domain."), this.code = "session_domain_mismatch", this.name = "SessionDomainMismatchError";
        }
      }
      class bV extends bm {
        toJSON() {
          return { error: this.error, error_description: this.error_description };
        }
      }
      class bW extends bV {
        get code() {
          return "passkey_register_error";
        }
        constructor(a10, b10, c10) {
          super(b10), this.name = "PasskeyRegisterError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bW.prototype);
        }
      }
      class bX extends bV {
        get code() {
          return "passkey_challenge_error";
        }
        constructor(a10, b10, c10) {
          super(b10), this.name = "PasskeyChallengeError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bX.prototype);
        }
      }
      class bY extends bV {
        get code() {
          return "passkey_get_token_error";
        }
        constructor(a10, b10, c10) {
          super(b10), this.name = "PasskeyGetTokenError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bY.prototype);
        }
      }
      class bZ extends bV {
        get code() {
          return "passkey_enrollment_challenge_error";
        }
        constructor(a10, b10, c10) {
          super(b10), this.name = "PasskeyEnrollmentChallengeError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, bZ.prototype);
        }
      }
      class b$ extends bV {
        get code() {
          return "passkey_enrollment_verify_error";
        }
        constructor(a10, b10, c10) {
          super(b10), this.name = "PasskeyEnrollmentVerifyError", this.error = a10, this.error_description = b10, this.cause = c10, Object.setPrototypeOf(this, b$.prototype);
        }
      }
      var b_ = c(354);
      let b0 = (a10) => a10 instanceof Request || a10.headers instanceof Headers || "boolean" == typeof a10.bodyUsed;
      function b1(a10, b10) {
        if (a10) {
          if ("string" == typeof a10) return a10;
          if (!b10) throw new br("When defining scope as a Map, an audience is required to look up the correct scope.");
          return a10[b10];
        }
      }
      function b2(a10) {
        if (!a10) return "Bearer";
        let b10 = a10.toLowerCase();
        return "dpop" === b10 ? "DPoP" : "bearer" === b10 ? "Bearer" : a10.charAt(0).toUpperCase() + a10.slice(1);
      }
      function b3(a10) {
        if ("number" == typeof a10) return Number.isFinite(a10) ? a10 : void 0;
        if ("string" == typeof a10) {
          if ("" === a10.trim()) return;
          let b10 = Number(a10);
          return Number.isFinite(b10) ? b10 : void 0;
        }
      }
      function b4(a10, b10) {
        let c10 = b3(a10);
        return void 0 !== c10 && c10 <= b10;
      }
      function b5(a10, b10) {
        return { accessToken: a10.accessToken, expiresAt: a10.expiresAt, audience: b10.audience, scope: a10.scope, requestedScope: a10.requestedScope, ...a10.token_type && { token_type: a10.token_type } };
      }
      function b6(a10) {
        return a10 ? a10.trim().split(" ").filter(Boolean) : [];
      }
      let b7 = (a10, b10, c10 = {}) => {
        if (a10 === b10) return true;
        if (!a10 || !b10) return false;
        let d10 = new Set(b6(a10)), e10 = new Set(b6(b10)), f2 = Array.from(e10).every((a11) => d10.has(a11));
        return c10.strict ? f2 && d10.size === e10.size : f2;
      };
      function b8(a10, b10) {
        return Array.from(/* @__PURE__ */ new Set([...a10 ? b6(a10) : [], ...b10 ? b6(b10) : []])).join(" ");
      }
      function b9(a10, b10) {
        let c10 = b10.matchMode ?? "requestedScope", d10 = a10?.accessTokens;
        if (!d10 || 0 === d10.length) return;
        let e10 = d10.filter((a11) => a11.audience === b10.audience && b7("scope" === c10 ? a11.scope : a11.requestedScope ?? a11.scope, b10.scope, { strict: "scope" === c10 }));
        if (0 !== e10.length) return e10.sort((a11, b11) => {
          let c11 = new Set(b6(a11.scope)), d11 = new Set(b6(b11.scope));
          return c11.size - d11.size;
        }), e10[0];
      }
      function ca(a10, b10, c10) {
        if (c10) return { accessTokens: c10.accessTokens, tokenSet: { ...a10.tokenSet, idToken: b10.idToken, refreshToken: b10.refreshToken } };
      }
      function cb(a10, b10, c10) {
        let d10 = b1(c10.scope, b10.audience ?? c10.audience);
        if (function(a11, b11, c11, d11) {
          let e11 = !a11.audience || a11.audience === (b11.tokenSet.audience ?? d11.audience), f3 = !a11.requestedScope || b7(b11.tokenSet.requestedScope ?? c11, a11.requestedScope);
          return e11 && f3;
        }(b10, a10, d10, c10)) return b10.accessToken !== a10.tokenSet.accessToken || b10.expiresAt !== a10.tokenSet.expiresAt || b10.refreshToken !== a10.tokenSet.refreshToken ? { tokenSet: b10 } : void 0;
        let e10 = b10.audience ?? c10.audience, f2 = b10.requestedScope ?? d10 ?? void 0;
        if (e10) return function(a11, b11, c11, d11) {
          var e11;
          let f3 = b9(a11, { scope: d11, audience: c11, matchMode: "requestedScope" });
          if (f3) {
            let d12 = function(a12, b12, c12, d13) {
              if (b12.accessToken !== c12.accessToken) return { accessTokens: a12.accessTokens?.map((a13) => a13 === c12 ? b5(b12, { audience: d13 }) : a13) };
            }(a11, b11, f3, c11);
            return ca(a11, b11, d12);
          }
          if (f3 = b9(a11, { scope: b11.scope, audience: c11, matchMode: "scope" })) {
            let d12 = (e11 = f3, { accessTokens: a11.accessTokens?.map((a12) => a12 === e11 ? b5({ ...b11, requestedScope: b8(a12.requestedScope, b11.requestedScope), scope: b11.scope }, { audience: c11 }) : a12) });
            return ca(a11, b11, d12);
          }
          {
            let d12 = { accessTokens: [...a11.accessTokens || [], b5(b11, { audience: c11 })] };
            return ca(a11, b11, d12);
          }
        }(a10, b10, e10, f2);
      }
      class cc {
        constructor(a10) {
          if (this.maxSize = a10, this.map = /* @__PURE__ */ new Map(), a10 <= 0) throw Error("maxSize must be greater than 0");
        }
        get(a10) {
          if (this.map.has(a10)) {
            let b10 = this.map.get(a10);
            return this.map.delete(a10), this.map.set(a10, b10), b10;
          }
        }
        set(a10, b10) {
          if (this.map.has(a10) && this.map.delete(a10), this.map.size >= this.maxSize) {
            let a11 = this.map.keys().next().value;
            void 0 !== a11 && this.map.delete(a11);
          }
          this.map.set(a10, b10);
        }
        has(a10) {
          return this.map.has(a10);
        }
        get size() {
          return this.map.size;
        }
        delete(a10) {
          return this.map.delete(a10);
        }
      }
      function cd(a10) {
        return a10.endsWith("/") ? a10 : a10 + "/";
      }
      function ce(a10, b10) {
        let c10, d10, e10 = a10.trim(), f2 = "https", g2 = "/";
        try {
          let a11 = e10.toLowerCase();
          if (a11.startsWith("http://") || a11.startsWith("https://")) {
            let a12 = new URL(e10);
            if (c10 = a12.hostname, f2 = a12.protocol.replace(":", ""), a12.search || a12.hash) throw new bS("Domain URL cannot contain query or fragment parameters.");
            g2 = a12.pathname;
          } else c10 = e10;
        } catch (a11) {
          if (a11 instanceof bS) throw a11;
          c10 = e10;
        }
        var h2 = c10, i2 = { allowInsecureRequests: b10?.allowInsecureRequests };
        let j2 = h2.trim();
        if (!j2) throw new bS("Domain cannot be empty.");
        if (j2.includes("/")) throw new bS("Domain cannot contain paths. Provide a hostname only.");
        if (/^\[?([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}\]?$/.test(j2) || "::1" === j2 || "::" === j2) throw new bS("IPv6 addresses are not supported.");
        if (j2.includes(":")) throw new bS("Domain cannot contain ports. Provide a hostname only.");
        if (!i2?.allowInsecureRequests && ("localhost" === j2 || j2.startsWith("localhost.") || j2.endsWith(".localhost"))) throw new bS("localhost domains are not supported.");
        if (j2.endsWith(".local")) throw new bS(".local domains are not supported.");
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(j2)) throw new bS("IPv4 addresses are not supported.");
        let k2 = c10.toLowerCase();
        if (b10?.issuerHint) d10 = cd(b10.issuerHint);
        else {
          let a11 = b10?.allowInsecureRequests ? f2 : "https";
          d10 = cd(`${a11}://${k2}${g2}`);
        }
        return { domain: k2, issuer: d10 };
      }
      class cf {
        constructor(a10) {
          if (this.createAuthClientFactory = a10.createAuthClient, this.domainClients = new cc(100), "string" == typeof a10.domain) {
            this.mode = "static";
            let b10 = ce(a10.domain, { allowInsecureRequests: a10.allowInsecureRequests ?? false });
            this.staticDomain = b10.domain, this.staticIssuer = b10.issuer;
            let c10 = this.createAuthClientFactory(this.staticDomain, b10.issuer);
            this.domainClients.set(b10.issuer, c10);
          } else if ("function" == typeof a10.domain) this.mode = "resolver", this.resolver = a10.domain;
          else throw new br("You must provide either a domain string or a DomainResolver function.");
        }
        get configuredDomain() {
          return this.staticDomain;
        }
        get isResolverMode() {
          return "resolver" === this.mode;
        }
        getAuthClientForStaticMode() {
          if ("static" === this.mode && this.staticIssuer) return this.domainClients.get(this.staticIssuer);
        }
        async forRequest(a10, b10) {
          if ("static" === this.mode && this.staticIssuer) return this.domainClients.get(this.staticIssuer);
          let c10 = await this.resolveDomain(a10, b10);
          return this.forDomainSync(c10);
        }
        forDomainSync(a10) {
          let b10 = ce(a10), c10 = b10.issuer, d10 = this.domainClients.get(c10);
          if (d10) return d10;
          let e10 = this.createAuthClientFactory(b10.domain, b10.issuer);
          return this.domainClients.set(c10, e10), e10;
        }
        async resolveDomain(a10, b10) {
          let c10;
          if (!this.resolver) throw new br("Domain resolver is not configured.");
          try {
            c10 = await this.resolver({ headers: a10, url: b10 });
          } catch (a11) {
            throw new bR("Domain resolver threw an error.", a11 instanceof Error ? a11 : Error(String(a11)));
          }
          if (!c10) throw new bR("Domain resolver returned an empty string.");
          return ce(c10).issuer;
        }
      }
      function cg(a10, b10, ...c10) {
        if ((c10 = c10.filter(Boolean)).length > 2) {
          let b11 = c10.pop();
          a10 += `one of type ${c10.join(", ")}, or ${b11}.`;
        } else 2 === c10.length ? a10 += `one of type ${c10[0]} or ${c10[1]}.` : a10 += `of type ${c10[0]}.`;
        return null == b10 ? a10 += ` Received ${b10}` : "function" == typeof b10 && b10.name ? a10 += ` Received function ${b10.name}` : "object" == typeof b10 && null != b10 && b10.constructor?.name && (a10 += ` Received an instance of ${b10.constructor.name}`), a10;
      }
      let ch = (a10, ...b10) => cg("Key must be ", a10, ...b10), ci = (a10, b10, ...c10) => cg(`Key for the ${a10} algorithm must be `, b10, ...c10), cj = new TextEncoder(), ck = new TextDecoder();
      function cl(...a10) {
        let b10 = new Uint8Array(a10.reduce((a11, { length: b11 }) => a11 + b11, 0)), c10 = 0;
        for (let d10 of a10) b10.set(d10, c10), c10 += d10.length;
        return b10;
      }
      function cm(a10, b10, c10) {
        if (b10 < 0 || b10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${b10}`);
        a10.set([b10 >>> 24, b10 >>> 16, b10 >>> 8, 255 & b10], c10);
      }
      function cn(a10) {
        let b10 = Math.floor(a10 / 4294967296), c10 = new Uint8Array(8);
        return cm(c10, b10, 0), cm(c10, a10 % 4294967296, 4), c10;
      }
      function co(a10) {
        let b10 = new Uint8Array(4);
        return cm(b10, a10), b10;
      }
      function cp(a10) {
        let b10 = new Uint8Array(a10.length);
        for (let c10 = 0; c10 < a10.length; c10++) {
          let d10 = a10.charCodeAt(c10);
          if (d10 > 127) throw TypeError("non-ASCII string encountered in encode()");
          b10[c10] = d10;
        }
        return b10;
      }
      function cq(a10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64(a10);
        let b10 = atob(a10), c10 = new Uint8Array(b10.length);
        for (let a11 = 0; a11 < b10.length; a11++) c10[a11] = b10.charCodeAt(a11);
        return c10;
      }
      function cr(a10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof a10 ? a10 : ck.decode(a10), { alphabet: "base64url" });
        let b10 = a10;
        b10 instanceof Uint8Array && (b10 = ck.decode(b10)), b10 = b10.replace(/-/g, "+").replace(/_/g, "/");
        try {
          return cq(b10);
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }
      function cs(a10) {
        let b10 = a10;
        return ("string" == typeof b10 && (b10 = cj.encode(b10)), Uint8Array.prototype.toBase64) ? b10.toBase64({ alphabet: "base64url", omitPadding: true }) : function(a11) {
          if (Uint8Array.prototype.toBase64) return a11.toBase64();
          let b11 = [];
          for (let c10 = 0; c10 < a11.length; c10 += 32768) b11.push(String.fromCharCode.apply(null, a11.subarray(c10, c10 + 32768)));
          return btoa(b11.join(""));
        }(b10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      function ct(a10) {
        if (!cu(a10)) throw Error("CryptoKey instance expected");
      }
      let cu = (a10) => {
        if (a10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return a10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, cv = (a10) => a10?.[Symbol.toStringTag] === "KeyObject", cw = (a10) => cu(a10) || cv(a10);
      async function cx(a10) {
        if (cv(a10)) if ("secret" !== a10.type) return a10.export({ format: "jwk" });
        else a10 = a10.export();
        if (a10 instanceof Uint8Array) return { kty: "oct", k: cs(a10) };
        if (!cu(a10)) throw TypeError(ch(a10, "CryptoKey", "KeyObject", "Uint8Array"));
        if (!a10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: b10, key_ops: c10, alg: d10, use: e10, ...f2 } = await crypto.subtle.exportKey("jwk", a10);
        return "AKP" === f2.kty && (f2.alg = d10), f2;
      }
      async function cy(a10) {
        return cx(a10);
      }
      let cz = Symbol();
      function cA(a10, b10) {
        if (a10) throw TypeError(`${b10} can only be called once`);
      }
      function cB(a10, b10, c10) {
        try {
          return cr(a10);
        } catch {
          throw new c10(`Failed to base64url decode the ${b10}`);
        }
      }
      async function cC(a10, b10) {
        let c10 = `SHA-${a10.slice(-3)}`;
        return new Uint8Array(await crypto.subtle.digest(c10, b10));
      }
      class cD extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(a10, b10) {
          super(a10, b10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class cE extends cD {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(a10, b10, c10 = "unspecified", d10 = "unspecified") {
          super(a10, { cause: { claim: c10, reason: d10, payload: b10 } }), this.claim = c10, this.reason = d10, this.payload = b10;
        }
      }
      class cF extends cD {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(a10, b10, c10 = "unspecified", d10 = "unspecified") {
          super(a10, { cause: { claim: c10, reason: d10, payload: b10 } }), this.claim = c10, this.reason = d10, this.payload = b10;
        }
      }
      class cG extends cD {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class cH extends cD {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class cI extends cD {
        static code = "ERR_JWE_DECRYPTION_FAILED";
        code = "ERR_JWE_DECRYPTION_FAILED";
        constructor(a10 = "decryption operation failed", b10) {
          super(a10, b10);
        }
      }
      class cJ extends cD {
        static code = "ERR_JWE_INVALID";
        code = "ERR_JWE_INVALID";
      }
      class cK extends cD {
        static code = "ERR_JWS_INVALID";
        code = "ERR_JWS_INVALID";
      }
      class cL extends cD {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class cM extends cD {
        static code = "ERR_JWK_INVALID";
        code = "ERR_JWK_INVALID";
      }
      class cN extends cD {
        static code = "ERR_JWKS_INVALID";
        code = "ERR_JWKS_INVALID";
      }
      class cO extends cD {
        static code = "ERR_JWKS_NO_MATCHING_KEY";
        code = "ERR_JWKS_NO_MATCHING_KEY";
        constructor(a10 = "no applicable key found in the JSON Web Key Set", b10) {
          super(a10, b10);
        }
      }
      class cP extends cD {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(a10 = "multiple matching keys found in the JSON Web Key Set", b10) {
          super(a10, b10);
        }
      }
      class cQ extends cD {
        static code = "ERR_JWKS_TIMEOUT";
        code = "ERR_JWKS_TIMEOUT";
        constructor(a10 = "request timed out", b10) {
          super(a10, b10);
        }
      }
      class cR extends cD {
        static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        constructor(a10 = "signature verification failed", b10) {
          super(a10, b10);
        }
      }
      function cS(a10) {
        if ("object" != typeof a10 || null === a10 || "[object Object]" !== Object.prototype.toString.call(a10)) return false;
        if (null === Object.getPrototypeOf(a10)) return true;
        let b10 = a10;
        for (; null !== Object.getPrototypeOf(b10); ) b10 = Object.getPrototypeOf(b10);
        return Object.getPrototypeOf(a10) === b10;
      }
      function cT(...a10) {
        let b10, c10 = a10.filter(Boolean);
        if (0 === c10.length || 1 === c10.length) return true;
        for (let a11 of c10) {
          let c11 = Object.keys(a11);
          if (!b10 || 0 === b10.size) {
            b10 = new Set(c11);
            continue;
          }
          for (let a12 of c11) {
            if (b10.has(a12)) return false;
            b10.add(a12);
          }
        }
        return true;
      }
      let cU = (a10) => cS(a10) && "string" == typeof a10.kty, cV = (a10, b10) => {
        if ("string" != typeof a10 || !a10) throw new cM(`${b10} missing or invalid`);
      };
      async function cW(a10, b10) {
        let c10, d10;
        if (cU(a10)) c10 = a10;
        else if (cw(a10)) c10 = await cy(a10);
        else throw TypeError(ch(a10, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("sha256" !== (b10 ??= "sha256") && "sha384" !== b10 && "sha512" !== b10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (c10.kty) {
          case "AKP":
            cV(c10.alg, '"alg" (Algorithm) Parameter'), cV(c10.pub, '"pub" (Public key) Parameter'), d10 = { alg: c10.alg, kty: c10.kty, pub: c10.pub };
            break;
          case "EC":
            cV(c10.crv, '"crv" (Curve) Parameter'), cV(c10.x, '"x" (X Coordinate) Parameter'), cV(c10.y, '"y" (Y Coordinate) Parameter'), d10 = { crv: c10.crv, kty: c10.kty, x: c10.x, y: c10.y };
            break;
          case "OKP":
            cV(c10.crv, '"crv" (Subtype of Key Pair) Parameter'), cV(c10.x, '"x" (Public Key) Parameter'), d10 = { crv: c10.crv, kty: c10.kty, x: c10.x };
            break;
          case "RSA":
            cV(c10.e, '"e" (Exponent) Parameter'), cV(c10.n, '"n" (Modulus) Parameter'), d10 = { e: c10.e, kty: c10.kty, n: c10.n };
            break;
          case "oct":
            cV(c10.k, '"k" (Key Value) Parameter'), d10 = { k: c10.k, kty: c10.kty };
            break;
          default:
            throw new cH('"kty" (Key Type) Parameter missing or unsupported');
        }
        let e10 = cp(JSON.stringify(d10));
        return cs(await cC(b10, e10));
      }
      let cX = (a10, b10) => {
        if (a10.byteLength !== b10.length) return false;
        for (let c10 = 0; c10 < a10.byteLength; c10++) if (a10[c10] !== b10[c10]) return false;
        return true;
      }, cY = (a10) => {
        let b10 = a10.data[a10.pos++];
        if (128 & b10) {
          let c10 = 127 & b10, d10 = 0;
          for (let b11 = 0; b11 < c10; b11++) d10 = d10 << 8 | a10.data[a10.pos++];
          return d10;
        }
        return b10;
      }, cZ = (a10, b10, c10) => {
        if (a10.data[a10.pos++] !== b10) throw Error(c10);
      }, c$ = (a10, b10) => {
        let c10 = a10.data.subarray(a10.pos, a10.pos + b10);
        return a10.pos += b10, c10;
      }, c_ = async (a10, b10, c10, d10) => {
        let e10, f2, g2 = "spki" === a10, h2 = () => g2 ? ["verify"] : ["sign"];
        switch (c10) {
          case "PS256":
          case "PS384":
          case "PS512":
            e10 = { name: "RSA-PSS", hash: `SHA-${c10.slice(-3)}` }, f2 = h2();
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            e10 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${c10.slice(-3)}` }, f2 = h2();
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            e10 = { name: "RSA-OAEP", hash: `SHA-${parseInt(c10.slice(-3), 10) || 1}` }, f2 = g2 ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
            break;
          case "ES256":
          case "ES384":
          case "ES512":
            e10 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[c10] }, f2 = h2();
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            try {
              let a11 = d10.getNamedCurve(b10);
              e10 = "X25519" === a11 ? { name: "X25519" } : { name: "ECDH", namedCurve: a11 };
            } catch (a11) {
              throw new cH("Invalid or unsupported key format");
            }
            f2 = g2 ? [] : ["deriveBits"];
            break;
          case "Ed25519":
          case "EdDSA":
            e10 = { name: "Ed25519" }, f2 = h2();
            break;
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            e10 = { name: c10 }, f2 = h2();
            break;
          default:
            throw new cH('Invalid or unsupported "alg" (Algorithm) value');
        }
        return crypto.subtle.importKey(a10, b10, e10, d10?.extractable ?? !!g2, f2);
      }, c0 = 'Invalid or unsupported JWK "alg" (Algorithm) Parameter value';
      async function c1(a10) {
        if (!a10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: b10, keyUsages: c10 } = function(a11) {
          let b11, c11;
          switch (a11.kty) {
            case "AKP":
              switch (a11.alg) {
                case "ML-DSA-44":
                case "ML-DSA-65":
                case "ML-DSA-87":
                  b11 = { name: a11.alg }, c11 = a11.priv ? ["sign"] : ["verify"];
                  break;
                default:
                  throw new cH(c0);
              }
              break;
            case "RSA":
              switch (a11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  b11 = { name: "RSA-PSS", hash: `SHA-${a11.alg.slice(-3)}` }, c11 = a11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  b11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${a11.alg.slice(-3)}` }, c11 = a11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  b11 = { name: "RSA-OAEP", hash: `SHA-${parseInt(a11.alg.slice(-3), 10) || 1}` }, c11 = a11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new cH(c0);
              }
              break;
            case "EC":
              switch (a11.alg) {
                case "ES256":
                case "ES384":
                case "ES512":
                  b11 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[a11.alg] }, c11 = a11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  b11 = { name: "ECDH", namedCurve: a11.crv }, c11 = a11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new cH(c0);
              }
              break;
            case "OKP":
              switch (a11.alg) {
                case "Ed25519":
                case "EdDSA":
                  b11 = { name: "Ed25519" }, c11 = a11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  b11 = { name: a11.crv }, c11 = a11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new cH(c0);
              }
              break;
            default:
              throw new cH('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: b11, keyUsages: c11 };
        }(a10), d10 = { ...a10 };
        return "AKP" !== d10.kty && delete d10.alg, delete d10.use, crypto.subtle.importKey("jwk", d10, b10, a10.ext ?? (!a10.d && !a10.priv), a10.key_ops ?? c10);
      }
      async function c2(a10, b10, c10) {
        let d10;
        if ("string" != typeof a10 || 0 !== a10.indexOf("-----BEGIN PRIVATE KEY-----")) throw TypeError('"pkcs8" must be PKCS#8 formatted string');
        let e10 = (d10 = /(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, cq(a10.replace(d10, ""))), f2 = c10;
        return b10?.startsWith?.("ECDH-ES") && ((f2 ||= {}).getNamedCurve = (a11) => {
          let b11 = { data: a11, pos: 0 };
          return !function(a12) {
            cZ(a12, 48, "Invalid PKCS#8 structure"), cY(a12), cZ(a12, 2, "Expected version field");
            let b12 = cY(a12);
            a12.pos += b12, cZ(a12, 48, "Expected algorithm identifier"), cY(a12), a12.pos;
          }(b11), ((a12) => {
            let b12 = ((a13) => {
              cZ(a13, 6, "Expected algorithm OID");
              let b13 = cY(a13);
              return c$(a13, b13);
            })(a12);
            if (cX(b12, [43, 101, 110])) return "X25519";
            if (!cX(b12, [42, 134, 72, 206, 61, 2, 1])) throw Error("Unsupported key algorithm");
            cZ(a12, 6, "Expected curve OID");
            let c11 = cY(a12), d11 = c$(a12, c11);
            for (let { name: a13, oid: b13 } of [{ name: "P-256", oid: [42, 134, 72, 206, 61, 3, 1, 7] }, { name: "P-384", oid: [43, 129, 4, 0, 34] }, { name: "P-521", oid: [43, 129, 4, 0, 35] }]) if (cX(d11, b13)) return a13;
            throw Error("Unsupported named curve");
          })(b11);
        }), c_("pkcs8", e10, b10, f2);
      }
      async function c3(a10, b10, c10) {
        let d10;
        if (!cS(a10)) throw TypeError("JWK must be an object");
        switch (b10 ??= a10.alg, d10 ??= c10?.extractable ?? a10.ext, a10.kty) {
          case "oct":
            if ("string" != typeof a10.k || !a10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return cr(a10.k);
          case "RSA":
            if ("oth" in a10 && void 0 !== a10.oth) throw new cH('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            return c1({ ...a10, alg: b10, ext: d10 });
          case "AKP":
            if ("string" != typeof a10.alg || !a10.alg) throw TypeError('missing "alg" (Algorithm) Parameter value');
            if (void 0 !== b10 && b10 !== a10.alg) throw TypeError("JWK alg and alg option value mismatch");
            return c1({ ...a10, ext: d10 });
          case "EC":
          case "OKP":
            return c1({ ...a10, alg: b10, ext: d10 });
          default:
            throw new cH('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      function c4(a10) {
        return cS(a10);
      }
      class c5 {
        #a;
        #b = /* @__PURE__ */ new WeakMap();
        constructor(a10) {
          if (!function(a11) {
            return a11 && "object" == typeof a11 && Array.isArray(a11.keys) && a11.keys.every(c4);
          }(a10)) throw new cN("JSON Web Key Set malformed");
          this.#a = structuredClone(a10);
        }
        jwks() {
          return this.#a;
        }
        async getKey(a10, b10) {
          let { alg: c10, kid: d10 } = { ...a10, ...b10?.header }, e10 = function(a11) {
            switch ("string" == typeof a11 && a11.slice(0, 2)) {
              case "RS":
              case "PS":
                return "RSA";
              case "ES":
                return "EC";
              case "Ed":
                return "OKP";
              case "ML":
                return "AKP";
              default:
                throw new cH('Unsupported "alg" value for a JSON Web Key Set');
            }
          }(c10), f2 = this.#a.keys.filter((a11) => {
            let b11 = e10 === a11.kty;
            if (b11 && "string" == typeof d10 && (b11 = d10 === a11.kid), b11 && ("string" == typeof a11.alg || "AKP" === e10) && (b11 = c10 === a11.alg), b11 && "string" == typeof a11.use && (b11 = "sig" === a11.use), b11 && Array.isArray(a11.key_ops) && (b11 = a11.key_ops.includes("verify")), b11) switch (c10) {
              case "ES256":
                b11 = "P-256" === a11.crv;
                break;
              case "ES384":
                b11 = "P-384" === a11.crv;
                break;
              case "ES512":
                b11 = "P-521" === a11.crv;
                break;
              case "Ed25519":
              case "EdDSA":
                b11 = "Ed25519" === a11.crv;
            }
            return b11;
          }), { 0: g2, length: h2 } = f2;
          if (0 === h2) throw new cO();
          if (1 !== h2) {
            let a11 = new cP(), b11 = this.#b;
            throw a11[Symbol.asyncIterator] = async function* () {
              for (let a12 of f2) try {
                yield await c6(b11, a12, c10);
              } catch {
              }
            }, a11;
          }
          return c6(this.#b, g2, c10);
        }
      }
      async function c6(a10, b10, c10) {
        let d10 = a10.get(b10) || a10.set(b10, {}).get(b10);
        if (void 0 === d10[c10]) {
          let a11 = await c3({ ...b10, ext: true }, c10);
          if (a11 instanceof Uint8Array || "public" !== a11.type) throw new cN("JSON Web Key Set members must be public keys");
          d10[c10] = a11;
        }
        return d10[c10];
      }
      function c7(a10) {
        let b10 = new c5(a10), c10 = async (a11, c11) => b10.getKey(a11, c11);
        return Object.defineProperties(c10, { jwks: { value: () => structuredClone(b10.jwks()), enumerable: false, configurable: false, writable: false } }), c10;
      }
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (e = "jose/v6.2.3");
      let c8 = Symbol();
      async function c9(a10, b10, c10, d10 = fetch) {
        let e10 = await d10(a10, { method: "GET", signal: c10, redirect: "manual", headers: b10 }).catch((a11) => {
          if ("TimeoutError" === a11.name) throw new cQ();
          throw a11;
        });
        if (200 !== e10.status) throw new cD("Expected 200 OK from the JSON Web Key Set HTTP response");
        try {
          return await e10.json();
        } catch {
          throw new cD("Failed to parse the JSON Web Key Set HTTP response as JSON");
        }
      }
      let da = Symbol();
      class db {
        #c;
        #d;
        #e;
        #f;
        #g;
        #h;
        #i;
        #j;
        #k;
        #l;
        constructor(a10, b10) {
          if (!(a10 instanceof URL)) throw TypeError("url must be an instance of URL");
          this.#c = new URL(a10.href), this.#d = "number" == typeof b10?.timeoutDuration ? b10?.timeoutDuration : 5e3, this.#e = "number" == typeof b10?.cooldownDuration ? b10?.cooldownDuration : 3e4, this.#f = "number" == typeof b10?.cacheMaxAge ? b10?.cacheMaxAge : 6e5, this.#i = new Headers(b10?.headers), e && !this.#i.has("User-Agent") && this.#i.set("User-Agent", e), this.#i.has("accept") || (this.#i.set("accept", "application/json"), this.#i.append("accept", "application/jwk-set+json")), this.#j = b10?.[c8], b10?.[da] !== void 0 && (this.#l = b10?.[da], function(a11, b11) {
            return !("object" != typeof a11 || null === a11 || !("uat" in a11) || "number" != typeof a11.uat || Date.now() - a11.uat >= b11) && "jwks" in a11 && !!cS(a11.jwks) && !!Array.isArray(a11.jwks.keys) && !!Array.prototype.every.call(a11.jwks.keys, cS);
          }(b10?.[da], this.#f) && (this.#g = this.#l.uat, this.#k = c7(this.#l.jwks)));
        }
        pendingFetch() {
          return !!this.#h;
        }
        coolingDown() {
          return "number" == typeof this.#g && Date.now() < this.#g + this.#e;
        }
        fresh() {
          return "number" == typeof this.#g && Date.now() < this.#g + this.#f;
        }
        jwks() {
          return this.#k?.jwks();
        }
        async getKey(a10, b10) {
          this.#k && this.fresh() || await this.reload();
          try {
            return await this.#k(a10, b10);
          } catch (c10) {
            if (c10 instanceof cO && false === this.coolingDown()) return await this.reload(), this.#k(a10, b10);
            throw c10;
          }
        }
        async reload() {
          this.#h && ("undefined" != typeof WebSocketPair || "undefined" != typeof navigator && "Cloudflare-Workers" === navigator.userAgent) && (this.#h = void 0), this.#h ||= c9(this.#c.href, this.#i, AbortSignal.timeout(this.#d), this.#j).then((a10) => {
            this.#k = c7(a10), this.#l && (this.#l.uat = Date.now(), this.#l.jwks = a10), this.#g = Date.now(), this.#h = void 0;
          }).catch((a10) => {
            throw this.#h = void 0, a10;
          }), await this.#h;
        }
      }
      let dc = (a10, b10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${b10} must be ${a10}`);
      function dd(a10, b10) {
        if (parseInt(a10.hash.name.slice(4), 10) !== b10) throw dc(`SHA-${b10}`, "algorithm.hash");
      }
      function de(a10, b10) {
        if (b10 && !a10.usages.includes(b10)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${b10}.`);
      }
      function df(a10, b10, c10) {
        switch (b10) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if ("AES-GCM" !== a10.algorithm.name) throw dc("AES-GCM");
            let c11 = parseInt(b10.slice(1, 4), 10);
            if (a10.algorithm.length !== c11) throw dc(c11, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if ("AES-KW" !== a10.algorithm.name) throw dc("AES-KW");
            let c11 = parseInt(b10.slice(1, 4), 10);
            if (a10.algorithm.length !== c11) throw dc(c11, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (a10.algorithm.name) {
              case "ECDH":
              case "X25519":
                break;
              default:
                throw dc("ECDH or X25519");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if ("PBKDF2" !== a10.algorithm.name) throw dc("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if ("RSA-OAEP" !== a10.algorithm.name) throw dc("RSA-OAEP");
            dd(a10.algorithm, parseInt(b10.slice(9), 10) || 1);
            break;
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        de(a10, c10);
      }
      function dg(a10, b10) {
        if (a10.startsWith("RS") || a10.startsWith("PS")) {
          let { modulusLength: c10 } = b10.algorithm;
          if ("number" != typeof c10 || c10 < 2048) throw TypeError(`${a10} requires key modulusLength to be 2048 bits or larger`);
        }
      }
      async function dh(a10, b10, c10) {
        if (b10 instanceof Uint8Array) {
          if (!a10.startsWith("HS")) throw TypeError(ch(b10, "CryptoKey", "KeyObject", "JSON Web Key"));
          return crypto.subtle.importKey("raw", b10, { hash: `SHA-${a10.slice(-3)}`, name: "HMAC" }, false, [c10]);
        }
        switch (a10) {
          case "HS256":
          case "HS384":
          case "HS512":
            if ("HMAC" !== b10.algorithm.name) throw dc("HMAC");
            dd(b10.algorithm, parseInt(a10.slice(2), 10));
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            if ("RSASSA-PKCS1-v1_5" !== b10.algorithm.name) throw dc("RSASSA-PKCS1-v1_5");
            dd(b10.algorithm, parseInt(a10.slice(2), 10));
            break;
          case "PS256":
          case "PS384":
          case "PS512":
            if ("RSA-PSS" !== b10.algorithm.name) throw dc("RSA-PSS");
            dd(b10.algorithm, parseInt(a10.slice(2), 10));
            break;
          case "Ed25519":
          case "EdDSA":
            if ("Ed25519" !== b10.algorithm.name) throw dc("Ed25519");
            break;
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            let d10;
            if (d10 = b10.algorithm, d10.name !== a10) throw dc(a10);
            break;
          case "ES256":
          case "ES384":
          case "ES512": {
            if ("ECDSA" !== b10.algorithm.name) throw dc("ECDSA");
            let c11 = function(a11) {
              switch (a11) {
                case "ES256":
                  return "P-256";
                case "ES384":
                  return "P-384";
                case "ES512":
                  return "P-521";
                default:
                  throw Error("unreachable");
              }
            }(a10);
            if (b10.algorithm.namedCurve !== c11) throw dc(c11, "algorithm.namedCurve");
            break;
          }
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        return de(b10, c10), b10;
      }
      async function di(a10, b10, c10, d10) {
        let e10 = await dh(a10, b10, "verify");
        dg(a10, e10);
        let f2 = function(a11, b11) {
          let c11 = `SHA-${a11.slice(-3)}`;
          switch (a11) {
            case "HS256":
            case "HS384":
            case "HS512":
              return { hash: c11, name: "HMAC" };
            case "PS256":
            case "PS384":
            case "PS512":
              return { hash: c11, name: "RSA-PSS", saltLength: parseInt(a11.slice(-3), 10) >> 3 };
            case "RS256":
            case "RS384":
            case "RS512":
              return { hash: c11, name: "RSASSA-PKCS1-v1_5" };
            case "ES256":
            case "ES384":
            case "ES512":
              return { hash: c11, name: "ECDSA", namedCurve: b11.namedCurve };
            case "Ed25519":
            case "EdDSA":
              return { name: "Ed25519" };
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              return { name: a11 };
            default:
              throw new cH(`alg ${a11} is not supported either by JOSE or your javascript runtime`);
          }
        }(a10, e10.algorithm);
        try {
          return await crypto.subtle.verify(f2, e10, c10, d10);
        } catch {
          return false;
        }
      }
      let dj = (a10) => a10?.[Symbol.toStringTag], dk = (a10, b10, c10) => {
        if (void 0 !== b10.use) {
          let a11;
          switch (c10) {
            case "sign":
            case "verify":
              a11 = "sig";
              break;
            case "encrypt":
            case "decrypt":
              a11 = "enc";
          }
          if (b10.use !== a11) throw TypeError(`Invalid key for this operation, its "use" must be "${a11}" when present`);
        }
        if (void 0 !== b10.alg && b10.alg !== a10) throw TypeError(`Invalid key for this operation, its "alg" must be "${a10}" when present`);
        if (Array.isArray(b10.key_ops)) {
          let d10;
          switch (true) {
            case ("sign" === c10 || "verify" === c10):
            case "dir" === a10:
            case a10.includes("CBC-HS"):
              d10 = c10;
              break;
            case a10.startsWith("PBES2"):
              d10 = "deriveBits";
              break;
            case /^A\d{3}(?:GCM)?(?:KW)?$/.test(a10):
              d10 = !a10.includes("GCM") && a10.endsWith("KW") ? "encrypt" === c10 ? "wrapKey" : "unwrapKey" : c10;
              break;
            case ("encrypt" === c10 && a10.startsWith("RSA")):
              d10 = "wrapKey";
              break;
            case "decrypt" === c10:
              d10 = a10.startsWith("RSA") ? "unwrapKey" : "deriveBits";
          }
          if (d10 && b10.key_ops?.includes?.(d10) === false) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${d10}" when present`);
        }
        return true;
      };
      function dl(a10, b10, c10) {
        switch (a10.substring(0, 2)) {
          case "A1":
          case "A2":
          case "di":
          case "HS":
          case "PB":
            ((a11, b11, c11) => {
              if (!(b11 instanceof Uint8Array)) {
                if (cU(b11)) {
                  let d10;
                  if ("oct" === (d10 = b11).kty && "string" == typeof d10.k && dk(a11, b11, c11)) return;
                  throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
                }
                if (!cw(b11)) throw TypeError(ci(a11, b11, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
                if ("secret" !== b11.type) throw TypeError(`${dj(b11)} instances for symmetric algorithms must be of type "secret"`);
              }
            })(a10, b10, c10);
            break;
          default:
            ((a11, b11, c11) => {
              if (cU(b11)) switch (c11) {
                case "decrypt":
                case "sign":
                  let d10;
                  if ("oct" !== (d10 = b11).kty && ("AKP" === d10.kty && "string" == typeof d10.priv || "string" == typeof d10.d) && dk(a11, b11, c11)) return;
                  throw TypeError("JSON Web Key for this operation must be a private JWK");
                case "encrypt":
                case "verify":
                  let e10;
                  if ("oct" !== (e10 = b11).kty && void 0 === e10.d && void 0 === e10.priv && dk(a11, b11, c11)) return;
                  throw TypeError("JSON Web Key for this operation must be a public JWK");
              }
              if (!cw(b11)) throw TypeError(ci(a11, b11, "CryptoKey", "KeyObject", "JSON Web Key"));
              if ("secret" === b11.type) throw TypeError(`${dj(b11)} instances for asymmetric algorithms must not be of type "secret"`);
              if ("public" === b11.type) switch (c11) {
                case "sign":
                  throw TypeError(`${dj(b11)} instances for asymmetric algorithm signing must be of type "private"`);
                case "decrypt":
                  throw TypeError(`${dj(b11)} instances for asymmetric algorithm decryption must be of type "private"`);
              }
              if ("private" === b11.type) switch (c11) {
                case "verify":
                  throw TypeError(`${dj(b11)} instances for asymmetric algorithm verifying must be of type "public"`);
                case "encrypt":
                  throw TypeError(`${dj(b11)} instances for asymmetric algorithm encryption must be of type "public"`);
              }
            })(a10, b10, c10);
        }
      }
      function dm(a10, b10, c10, d10, e10) {
        let f2;
        if (void 0 !== e10.crit && d10?.crit === void 0) throw new a10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!d10 || void 0 === d10.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(d10.crit) || 0 === d10.crit.length || d10.crit.some((a11) => "string" != typeof a11 || 0 === a11.length)) throw new a10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let g2 of (f2 = void 0 !== c10 ? new Map([...Object.entries(c10), ...b10.entries()]) : b10, d10.crit)) {
          if (!f2.has(g2)) throw new cH(`Extension Header Parameter "${g2}" is not recognized`);
          if (void 0 === e10[g2]) throw new a10(`Extension Header Parameter "${g2}" is missing`);
          if (f2.get(g2) && void 0 === d10[g2]) throw new a10(`Extension Header Parameter "${g2}" MUST be integrity protected`);
        }
        return new Set(d10.crit);
      }
      function dn(a10, b10) {
        if (void 0 !== b10 && (!Array.isArray(b10) || b10.some((a11) => "string" != typeof a11))) throw TypeError(`"${a10}" option must be an array of strings`);
        if (b10) return new Set(b10);
      }
      let dp = "given KeyObject instance cannot be used for this algorithm", dq = async (a10, b10, c10, d10 = false) => {
        let e10 = (f ||= /* @__PURE__ */ new WeakMap()).get(a10);
        if (e10?.[c10]) return e10[c10];
        let g2 = await c1({ ...b10, alg: c10 });
        return d10 && Object.freeze(a10), e10 ? e10[c10] = g2 : f.set(a10, { [c10]: g2 }), g2;
      };
      async function dr(a10, b10) {
        if (a10 instanceof Uint8Array || cu(a10)) return a10;
        if (cv(a10)) {
          if ("secret" === a10.type) return a10.export();
          if ("toCryptoKey" in a10 && "function" == typeof a10.toCryptoKey) try {
            return ((a11, b11) => {
              let c11, d10 = (f ||= /* @__PURE__ */ new WeakMap()).get(a11);
              if (d10?.[b11]) return d10[b11];
              let e10 = "public" === a11.type, g2 = !!e10;
              if ("x25519" === a11.asymmetricKeyType) {
                switch (b11) {
                  case "ECDH-ES":
                  case "ECDH-ES+A128KW":
                  case "ECDH-ES+A192KW":
                  case "ECDH-ES+A256KW":
                    break;
                  default:
                    throw TypeError(dp);
                }
                c11 = a11.toCryptoKey(a11.asymmetricKeyType, g2, e10 ? [] : ["deriveBits"]);
              }
              if ("ed25519" === a11.asymmetricKeyType) {
                if ("EdDSA" !== b11 && "Ed25519" !== b11) throw TypeError(dp);
                c11 = a11.toCryptoKey(a11.asymmetricKeyType, g2, [e10 ? "verify" : "sign"]);
              }
              switch (a11.asymmetricKeyType) {
                case "ml-dsa-44":
                case "ml-dsa-65":
                case "ml-dsa-87":
                  if (b11 !== a11.asymmetricKeyType.toUpperCase()) throw TypeError(dp);
                  c11 = a11.toCryptoKey(a11.asymmetricKeyType, g2, [e10 ? "verify" : "sign"]);
              }
              if ("rsa" === a11.asymmetricKeyType) {
                let d11;
                switch (b11) {
                  case "RSA-OAEP":
                    d11 = "SHA-1";
                    break;
                  case "RS256":
                  case "PS256":
                  case "RSA-OAEP-256":
                    d11 = "SHA-256";
                    break;
                  case "RS384":
                  case "PS384":
                  case "RSA-OAEP-384":
                    d11 = "SHA-384";
                    break;
                  case "RS512":
                  case "PS512":
                  case "RSA-OAEP-512":
                    d11 = "SHA-512";
                    break;
                  default:
                    throw TypeError(dp);
                }
                if (b11.startsWith("RSA-OAEP")) return a11.toCryptoKey({ name: "RSA-OAEP", hash: d11 }, g2, e10 ? ["encrypt"] : ["decrypt"]);
                c11 = a11.toCryptoKey({ name: b11.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: d11 }, g2, [e10 ? "verify" : "sign"]);
              }
              if ("ec" === a11.asymmetricKeyType) {
                let d11 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(a11.asymmetricKeyDetails?.namedCurve);
                if (!d11) throw TypeError(dp);
                let f2 = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
                f2[b11] && d11 === f2[b11] && (c11 = a11.toCryptoKey({ name: "ECDSA", namedCurve: d11 }, g2, [e10 ? "verify" : "sign"])), b11.startsWith("ECDH-ES") && (c11 = a11.toCryptoKey({ name: "ECDH", namedCurve: d11 }, g2, e10 ? [] : ["deriveBits"]));
              }
              if (!c11) throw TypeError(dp);
              return d10 ? d10[b11] = c11 : f.set(a11, { [b11]: c11 }), c11;
            })(a10, b10);
          } catch (a11) {
            if (a11 instanceof TypeError) throw a11;
          }
          let c10 = a10.export({ format: "jwk" });
          return dq(a10, c10, b10);
        }
        if (cU(a10)) return a10.k ? cr(a10.k) : dq(a10, a10, b10, true);
        throw Error("unreachable");
      }
      async function ds(a10, b10, c10) {
        if (!cS(a10)) throw new cK("Flattened JWS must be an object");
        if (void 0 === a10.protected && void 0 === a10.header) throw new cK('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== a10.protected && "string" != typeof a10.protected) throw new cK("JWS Protected Header incorrect type");
        if (void 0 === a10.payload) throw new cK("JWS Payload missing");
        if ("string" != typeof a10.signature) throw new cK("JWS Signature missing or incorrect type");
        if (void 0 !== a10.header && !cS(a10.header)) throw new cK("JWS Unprotected Header incorrect type");
        let d10 = {};
        if (a10.protected) try {
          let b11 = cr(a10.protected);
          d10 = JSON.parse(ck.decode(b11));
        } catch {
          throw new cK("JWS Protected Header is invalid");
        }
        if (!cT(d10, a10.header)) throw new cK("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let e10 = { ...d10, ...a10.header }, f2 = dm(cK, /* @__PURE__ */ new Map([["b64", true]]), c10?.crit, d10, e10), g2 = true;
        if (f2.has("b64") && "boolean" != typeof (g2 = d10.b64)) throw new cK('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: h2 } = e10;
        if ("string" != typeof h2 || !h2) throw new cK('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let i2 = c10 && dn("algorithms", c10.algorithms);
        if (i2 && !i2.has(h2)) throw new cG('"alg" (Algorithm) Header Parameter value not allowed');
        if (g2) {
          if ("string" != typeof a10.payload) throw new cK("JWS Payload must be a string");
        } else if ("string" != typeof a10.payload && !(a10.payload instanceof Uint8Array)) throw new cK("JWS Payload must be a string or an Uint8Array instance");
        let j2 = false;
        "function" == typeof b10 && (b10 = await b10(d10, a10), j2 = true), dl(h2, b10, "verify");
        let k2 = cl(void 0 !== a10.protected ? cp(a10.protected) : new Uint8Array(), cp("."), "string" == typeof a10.payload ? g2 ? cp(a10.payload) : cj.encode(a10.payload) : a10.payload), l2 = cB(a10.signature, "signature", cK), m2 = await dr(b10, h2);
        if (!await di(h2, m2, l2, k2)) throw new cR();
        let n2 = { payload: g2 ? cB(a10.payload, "payload", cK) : "string" == typeof a10.payload ? cj.encode(a10.payload) : a10.payload };
        return (void 0 !== a10.protected && (n2.protectedHeader = d10), void 0 !== a10.header && (n2.unprotectedHeader = a10.header), j2) ? { ...n2, key: m2 } : n2;
      }
      async function dt(a10, b10, c10) {
        if (a10 instanceof Uint8Array && (a10 = ck.decode(a10)), "string" != typeof a10) throw new cK("Compact JWS must be a string or Uint8Array");
        let { 0: d10, 1: e10, 2: f2, length: g2 } = a10.split(".");
        if (3 !== g2) throw new cK("Invalid Compact JWS");
        let h2 = await ds({ payload: e10, protected: d10, signature: f2 }, b10, c10), i2 = { payload: h2.payload, protectedHeader: h2.protectedHeader };
        return "function" == typeof b10 ? { ...i2, key: h2.key } : i2;
      }
      let du = (a10) => Math.floor(a10.getTime() / 1e3), dv = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      function dw(a10) {
        let b10, c10 = dv.exec(a10);
        if (!c10 || c10[4] && c10[1]) throw TypeError("Invalid time period format");
        let d10 = parseFloat(c10[2]);
        switch (c10[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            b10 = Math.round(d10);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            b10 = Math.round(60 * d10);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            b10 = Math.round(3600 * d10);
            break;
          case "day":
          case "days":
          case "d":
            b10 = Math.round(86400 * d10);
            break;
          case "week":
          case "weeks":
          case "w":
            b10 = Math.round(604800 * d10);
            break;
          default:
            b10 = Math.round(31557600 * d10);
        }
        return "-" === c10[1] || "ago" === c10[4] ? -b10 : b10;
      }
      function dx(a10, b10) {
        if (!Number.isFinite(b10)) throw TypeError(`Invalid ${a10} input`);
        return b10;
      }
      let dy = (a10) => a10.includes("/") ? a10.toLowerCase() : `application/${a10.toLowerCase()}`;
      function dz(a10, b10, c10 = {}) {
        var d10, e10;
        let f2, g2;
        try {
          f2 = JSON.parse(ck.decode(b10));
        } catch {
        }
        if (!cS(f2)) throw new cL("JWT Claims Set must be a top-level JSON object");
        let { typ: h2 } = c10;
        if (h2 && ("string" != typeof a10.typ || dy(a10.typ) !== dy(h2))) throw new cE('unexpected "typ" JWT header value', f2, "typ", "check_failed");
        let { requiredClaims: i2 = [], issuer: j2, subject: k2, audience: l2, maxTokenAge: m2 } = c10, n2 = [...i2];
        for (let a11 of (void 0 !== m2 && n2.push("iat"), void 0 !== l2 && n2.push("aud"), void 0 !== k2 && n2.push("sub"), void 0 !== j2 && n2.push("iss"), new Set(n2.reverse()))) if (!(a11 in f2)) throw new cE(`missing required "${a11}" claim`, f2, a11, "missing");
        if (j2 && !(Array.isArray(j2) ? j2 : [j2]).includes(f2.iss)) throw new cE('unexpected "iss" claim value', f2, "iss", "check_failed");
        if (k2 && f2.sub !== k2) throw new cE('unexpected "sub" claim value', f2, "sub", "check_failed");
        if (l2 && (d10 = f2.aud, e10 = "string" == typeof l2 ? [l2] : l2, "string" == typeof d10 ? !e10.includes(d10) : !(Array.isArray(d10) && e10.some(Set.prototype.has.bind(new Set(d10)))))) throw new cE('unexpected "aud" claim value', f2, "aud", "check_failed");
        switch (typeof c10.clockTolerance) {
          case "string":
            g2 = dw(c10.clockTolerance);
            break;
          case "number":
            g2 = c10.clockTolerance;
            break;
          case "undefined":
            g2 = 0;
            break;
          default:
            throw TypeError("Invalid clockTolerance option type");
        }
        let { currentDate: o2 } = c10, p2 = du(o2 || /* @__PURE__ */ new Date());
        if ((void 0 !== f2.iat || m2) && "number" != typeof f2.iat) throw new cE('"iat" claim must be a number', f2, "iat", "invalid");
        if (void 0 !== f2.nbf) {
          if ("number" != typeof f2.nbf) throw new cE('"nbf" claim must be a number', f2, "nbf", "invalid");
          if (f2.nbf > p2 + g2) throw new cE('"nbf" claim timestamp check failed', f2, "nbf", "check_failed");
        }
        if (void 0 !== f2.exp) {
          if ("number" != typeof f2.exp) throw new cE('"exp" claim must be a number', f2, "exp", "invalid");
          if (f2.exp <= p2 - g2) throw new cF('"exp" claim timestamp check failed', f2, "exp", "check_failed");
        }
        if (m2) {
          let a11 = p2 - f2.iat;
          if (a11 - g2 > ("number" == typeof m2 ? m2 : dw(m2))) throw new cF('"iat" claim timestamp check failed (too far in the past)', f2, "iat", "check_failed");
          if (a11 < 0 - g2) throw new cE('"iat" claim timestamp check failed (it should be in the past)', f2, "iat", "check_failed");
        }
        return f2;
      }
      class dA {
        #m;
        constructor(a10) {
          if (!cS(a10)) throw TypeError("JWT Claims Set MUST be an object");
          this.#m = structuredClone(a10);
        }
        data() {
          return cj.encode(JSON.stringify(this.#m));
        }
        get iss() {
          return this.#m.iss;
        }
        set iss(a10) {
          this.#m.iss = a10;
        }
        get sub() {
          return this.#m.sub;
        }
        set sub(a10) {
          this.#m.sub = a10;
        }
        get aud() {
          return this.#m.aud;
        }
        set aud(a10) {
          this.#m.aud = a10;
        }
        set jti(a10) {
          this.#m.jti = a10;
        }
        set nbf(a10) {
          "number" == typeof a10 ? this.#m.nbf = dx("setNotBefore", a10) : a10 instanceof Date ? this.#m.nbf = dx("setNotBefore", du(a10)) : this.#m.nbf = du(/* @__PURE__ */ new Date()) + dw(a10);
        }
        set exp(a10) {
          "number" == typeof a10 ? this.#m.exp = dx("setExpirationTime", a10) : a10 instanceof Date ? this.#m.exp = dx("setExpirationTime", du(a10)) : this.#m.exp = du(/* @__PURE__ */ new Date()) + dw(a10);
        }
        set iat(a10) {
          void 0 === a10 ? this.#m.iat = du(/* @__PURE__ */ new Date()) : a10 instanceof Date ? this.#m.iat = dx("setIssuedAt", du(a10)) : "string" == typeof a10 ? this.#m.iat = dx("setIssuedAt", du(/* @__PURE__ */ new Date()) + dw(a10)) : this.#m.iat = dx("setIssuedAt", a10);
        }
      }
      async function dB(a10, b10, c10) {
        let d10 = await dt(a10, b10, c10);
        if (d10.protectedHeader.crit?.includes("b64") && false === d10.protectedHeader.b64) throw new cL("JWTs MUST NOT use unencoded payload");
        let e10 = { payload: dz(d10.protectedHeader, d10.payload, c10), protectedHeader: d10.protectedHeader };
        return "function" == typeof b10 ? { ...e10, key: d10.key } : e10;
      }
      function dC(a10) {
        let b10, c10;
        if ("string" != typeof a10) throw new cL("JWTs must use Compact JWS serialization, JWT must be a string");
        let { 1: d10, length: e10 } = a10.split(".");
        if (5 === e10) throw new cL("Only JWTs using Compact JWS serialization can be decoded");
        if (3 !== e10) throw new cL("Invalid JWT");
        if (!d10) throw new cL("JWTs must contain a payload");
        try {
          b10 = cr(d10);
        } catch {
          throw new cL("Failed to base64url decode the payload");
        }
        try {
          c10 = JSON.parse(ck.decode(b10));
        } catch {
          throw new cL("Failed to parse the decoded payload as JSON");
        }
        if (!cS(c10)) throw new cL("Invalid JWT Claims Set");
        return c10;
      }
      var dD = c(734);
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (g = { "user-agent": "openid-client/v6.8.4" });
      let dE = (a10) => h.get(a10);
      dD.ZC, dD.un;
      let dF = dD.A6;
      dD.LB, dD.nW, dD.AH;
      let dG = "ERR_INVALID_ARG_VALUE", dH = "ERR_INVALID_ARG_TYPE";
      function dI(a10, b10, c10) {
        let d10 = TypeError(a10, { cause: c10 });
        return Object.assign(d10, { code: b10 }), d10;
      }
      class dJ extends Error {
        code;
        constructor(a10, b10) {
          super(a10, b10), this.name = this.constructor.name, this.code = b10?.code, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function dK(a10, b10, c10) {
        return new dJ(a10, { cause: b10, code: c10 });
      }
      function dL(a10) {
        if (a10 instanceof TypeError || a10 instanceof dJ || a10 instanceof dD.uK || a10 instanceof dD.pG || a10 instanceof dD.m4) throw a10;
        if (a10 instanceof dD.Hx) switch (a10.code) {
          case dD.fN:
            throw dK("only requests to HTTPS are allowed", a10, a10.code);
          case dD.nZ:
            throw dK("only requests to HTTP or HTTPS are allowed", a10, a10.code);
          case dD.U$:
            throw dK("unexpected HTTP response status code", a10.cause, a10.code);
          case dD.Qx:
            throw dK("unexpected response content-type", a10.cause, a10.code);
          case dD.to:
            throw dK("parsing error occured", a10, a10.code);
          case dD.Gl:
            throw dK("invalid response encountered", a10, a10.code);
          case dD.lp:
            throw dK("unexpected JWT claim value encountered", a10, a10.code);
          case dD.wh:
            throw dK("unexpected JSON attribute value encountered", a10, a10.code);
          case dD.ck:
            throw dK("JWT timestamp claim value failed validation", a10, a10.code);
          default:
            throw dK(a10.message, a10, a10.code);
        }
        if (a10 instanceof dD.vR) throw dK("unsupported operation", a10, a10.code);
        if (a10 instanceof DOMException) switch (a10.name) {
          case "OperationError":
            throw dK("runtime operation error", a10, dD.AW);
          case "NotSupportedError":
            throw dK("runtime unsupported operation", a10, dD.AW);
          case "TimeoutError":
            throw dK("operation timed out", a10, "OAUTH_TIMEOUT");
          case "AbortError":
            throw dK("operation aborted", a10, "OAUTH_ABORT");
        }
        throw new dJ("something went wrong", { cause: a10 });
      }
      new TextDecoder();
      let dM = Symbol();
      class dN {
        constructor(a10, b10, c10, d10) {
          let e10;
          if ("string" != typeof b10 || !b10.length) throw dI('"clientId" must be a non-empty string', dH);
          if ("string" == typeof c10 && (c10 = { client_secret: c10 }), c10?.client_id !== void 0 && b10 !== c10.client_id) throw dI('"clientId" and "metadata.client_id" must be the same', dG);
          let f2 = { ...structuredClone(c10), client_id: b10 };
          f2[dD.nW] = c10?.[dD.nW] ?? 0, f2[dD.AH] = c10?.[dD.AH] ?? 30, e10 = d10 || ("string" == typeof f2.client_secret && f2.client_secret.length ? function(a11) {
            return void 0 !== a11 ? dD.qm(a11) : (i ||= /* @__PURE__ */ new WeakMap(), (a12, b11, c11, d11) => {
              let e11;
              return (e11 = i.get(b11)) || (function(a13, b12) {
                if ("string" != typeof a13) throw dI(`${b12} must be a string`, dH);
                if (0 === a13.length) throw dI(`${b12} must not be empty`, dG);
              }(b11.client_secret, '"metadata.client_secret"'), e11 = dD.qm(b11.client_secret), i.set(b11, e11)), e11(a12, b11, c11, d11);
            });
          }(f2.client_secret) : dD.NV());
          let g2 = Object.freeze(f2), j2 = structuredClone(a10);
          dM in a10 && (j2[dD.Vw] = ({ claims: { tid: b11 } }) => a10.issuer.replace("{tenantid}", b11));
          let k2 = Object.freeze(j2);
          (h ||= /* @__PURE__ */ new WeakMap()).set(this, { __proto__: null, as: k2, c: g2, auth: e10, tlsOnly: true, jwksCache: {} });
        }
        serverMetadata() {
          let a10 = structuredClone(dE(this).as);
          return Object.defineProperties(a10, { supportsPKCE: { __proto__: null, value: (b10 = "S256") => a10.code_challenge_methods_supported?.includes(b10) === true } }), a10;
        }
        clientMetadata() {
          return structuredClone(dE(this).c);
        }
        get timeout() {
          return dE(this).timeout;
        }
        set timeout(a10) {
          dE(this).timeout = a10;
        }
        get [dF]() {
          return dE(this).fetch;
        }
        set [dF](a10) {
          dE(this).fetch = a10;
        }
      }
      async function dO(a10, b10, c10, d10 = false) {
        let e10, f2 = a10.headers.get("retry-after")?.trim();
        if (void 0 !== f2) {
          if (/^\d+$/.test(f2)) e10 = parseInt(f2, 10);
          else {
            let a11 = new Date(f2);
            if (Number.isFinite(a11.getTime())) {
              let b11 = /* @__PURE__ */ new Date(), c11 = a11.getTime() - b11.getTime();
              c11 > 0 && (e10 = Math.ceil(c11 / 1e3));
            }
          }
          if (d10 && !Number.isFinite(e10)) throw new dD.Hx("invalid Retry-After header value", { cause: a10 });
          e10 > b10 && await dP(e10 - b10, c10);
        }
      }
      function dP(a10, b10) {
        return new Promise((c10, d10) => {
          let e10 = (a11) => {
            try {
              b10.throwIfAborted();
            } catch (a12) {
              d10(a12);
              return;
            }
            if (a11 <= 0) return void c10();
            let f2 = Math.min(a11, 5);
            setTimeout(() => e10(a11 - f2), 1e3 * f2);
          };
          e10(a10);
        });
      }
      async function dQ(a10, b10) {
        dS(a10);
        let { as: c10, c: d10, auth: e10, fetch: f2, tlsOnly: h2, timeout: i2 } = dE(a10);
        return dD.GR(c10, d10, e10, b10, { [dD.A6]: f2, [dD.cm]: !h2, headers: new Headers(g), signal: dT(i2) }).then((a11) => dD.Z5(c10, d10, a11)).catch(dL);
      }
      async function dR(a10, b10, c10, d10) {
        var e10, f2, h2;
        let i2;
        dS(a10), c10 = new URLSearchParams(c10);
        let j2 = b10.interval ?? 5, k2 = d10?.signal ?? AbortSignal.timeout(1e3 * b10.expires_in);
        try {
          await dP(j2, k2);
        } catch (a11) {
          dL(a11);
        }
        let { as: l2, c: m2, auth: n2, fetch: o2, tlsOnly: p2, nonRepudiation: q2, timeout: r2, decrypt: s2 } = dE(a10), t2 = (e11, f3) => dR(a10, { ...b10, interval: e11 }, c10, { ...d10, signal: k2, flag: f3 }), u2 = function(a11, b11) {
          let c11 = dT(b11);
          if (!c11) return { signal: a11, cleanup() {
          } };
          let d11 = new AbortController(), e11 = (a12) => {
            let b12 = a12.target;
            d11.abort(b12.reason);
          };
          return a11.aborted ? d11.abort(a11.reason) : c11.aborted ? d11.abort(c11.reason) : (a11.addEventListener("abort", e11, { once: true }), c11.addEventListener("abort", e11, { once: true })), { signal: d11.signal, cleanup() {
            a11.removeEventListener("abort", e11), c11.removeEventListener("abort", e11);
          } };
        }(k2, r2), v2 = await dD.Uc(l2, m2, n2, b10.auth_req_id, { [dD.A6]: o2, [dD.cm]: !p2, additionalParameters: c10, DPoP: d10?.DPoP, headers: new Headers(g), signal: u2.signal }).catch(dL).finally(u2.cleanup);
        if (503 === v2.status && v2.headers.has("retry-after")) return await dO(v2, j2, k2, true), await v2.body?.cancel(), t2(j2);
        let w2 = dD.pe(l2, m2, v2, { [dD.oM]: s2 });
        try {
          i2 = await w2;
        } catch (a11) {
          if (f2 = a11, h2 = d10, h2?.DPoP && h2.flag !== dU && dD.r5(f2)) return t2(j2, dU);
          if (a11 instanceof dD.uK) switch (a11.error) {
            case "slow_down":
              j2 += 5;
            case "authorization_pending":
              return await dO(a11.response, j2, k2), t2(j2);
          }
          dL(a11);
        }
        return i2.id_token && await q2?.(v2), Object.defineProperties(e10 = i2, function(a11) {
          let b11;
          if (void 0 !== a11.expires_in) {
            let c11 = /* @__PURE__ */ new Date();
            c11.setSeconds(c11.getSeconds() + a11.expires_in), b11 = c11.getTime();
          }
          return { expiresIn: { __proto__: null, value() {
            if (b11) {
              let a12 = Date.now();
              return b11 > a12 ? Math.floor((b11 - a12) / 1e3) : 0;
            }
          } }, claims: { __proto__: null, value() {
            try {
              return dD.ON(this);
            } catch {
              return;
            }
          } } };
        }(e10)), i2;
      }
      function dS(a10) {
        if (!(a10 instanceof dN)) throw dI('"config" must be an instance of Configuration', dH);
        if (Object.getPrototypeOf(a10) !== dN.prototype) throw dI("subclassing Configuration is not allowed", dG);
      }
      function dT(a10) {
        return a10 ? AbortSignal.timeout(1e3 * a10) : void 0;
      }
      Object.freeze(dN.prototype);
      let dU = Symbol(), dV = { rE: "4.22.0" };
      !function(a10) {
        a10.SUBJECT_TYPE_REFRESH_TOKEN = "urn:ietf:params:oauth:token-type:refresh_token", a10.SUBJECT_TYPE_ACCESS_TOKEN = "urn:ietf:params:oauth:token-type:access_token";
      }(o || (o = {})), !function(a10) {
        a10.CODE = "code", a10.CONNECT_CODE = "connect_code";
      }(p || (p = {}));
      let dW = /* @__PURE__ */ new Set(["http:", "https:"]);
      function dX(a10) {
        if (!a10) return null;
        let [b10] = a10.split(",");
        return b10?.trim() || null;
      }
      function dY(a10, b10) {
        let c10 = "string" == typeof a10 ? a10 : void 0, d10 = "string" == typeof a10 ? void 0 : a10;
        if (c10) return c10;
        if (!b10) throw new br("APP_BASE_URL is not configured as a static string, and a request context is not available.");
        let e10 = function(a11) {
          let b11 = dX(a11.headers.get("x-forwarded-proto")), c11 = dX(a11.headers.get("x-forwarded-host")) || dX(a11.headers.get("host")) || a11.nextUrl?.host, d11 = b11 || a11.nextUrl?.protocol?.replace(":", "") || void 0;
          if (!c11 || !d11) return null;
          try {
            return function(a12, b12, c12 = false) {
              let d12, e11 = a12.trim();
              try {
                d12 = new URL(e11);
              } catch {
                throw new br(`${b12} must be an absolute URL.`);
              }
              return c12 && function(a13, b13) {
                if (!dW.has(a13.protocol)) throw new br(`${b13} must use http or https.`);
              }(d12, b12), e11;
            }(`${d11}://${c11}`, "Request host", true);
          } catch {
            return null;
          }
        }(b10);
        if (!e10) throw new br("APP_BASE_URL is not configured as a static string, and the request origin could not be determined from the request context. ");
        if (!d10) return e10;
        let f2 = new URL(e10).origin;
        if (d10.some((a11) => {
          try {
            return new URL(a11).origin === f2;
          } catch {
            return false;
          }
        })) return f2;
        throw new br("APP_BASE_URL is not configured as a static string, and the APP_BASE_URL configuration does not contain a match for the current request origin.");
      }
      function dZ(a10, b10, c10 = []) {
        let d10 = new URLSearchParams(), e10 = { ...a10, ...b10 };
        return Object.entries(e10).forEach(([a11, b11]) => {
          c10 && (c10.includes(a11) || null == b11) || ("scope" === a11 && "object" == typeof b11 && (b11 = b1(b11, e10.audience)), null != b11 && d10.set(a11, String(b11)));
        }), d10;
      }
      var d$ = c(304);
      function d_(a10) {
        let b10 = (a10.success ? JSON.stringify({ type: "auth_complete", success: true, user: a10.user }) : JSON.stringify({ type: "auth_complete", success: false, error: a10.error })).replace(/</g, "\\u003c"), c10 = a10.nonce ? ` nonce="${function(a11) {
          if (!/^[A-Za-z0-9+/=\-_]+$/.test(a11)) throw new br(`cspNonce must contain only base64 characters (A-Za-z0-9+/=-_). Received: "${a11}"`);
          return a11;
        }(a10.nonce)}"` : "", d10 = a10.success ? "Authentication completed successfully. This window will close automatically." : "Authentication failed. Please close this window and try again.";
        return new aj(`<!DOCTYPE html>
<html>
<head><title>Authentication Complete</title></head>
<body>
<p>${d10.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;").replace(/`/g, "&#96;")}</p>
<script${c10}>
(function(){
  try {
    if (window.opener) {
      window.opener.postMessage(${b10}, window.location.origin);
    }
  } catch(e) {}
  setTimeout(function(){ window.close(); }, 100);
})();
</script>
</body>
</html>`, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
      }
      function d0(a10) {
        return { id: a10.id, authenticatorType: a10.authenticator_type, type: a10.type, active: a10.active, name: a10.name, phoneNumber: a10.phone_number, oobChannel: a10.oob_channel, createdAt: a10.created_at, lastAuthenticatedAt: a10.last_auth };
      }
      let d1 = { otp: { authenticator_types: ["otp"] }, sms: { authenticator_types: ["oob"], oob_channels: ["sms"] }, voice: { authenticator_types: ["oob"], oob_channels: ["voice"] }, email: { authenticator_types: ["oob"], oob_channels: ["email"] }, push: { authenticator_types: ["oob"], oob_channels: ["auth0"] } };
      function d2(a10) {
        var b10;
        let c10 = ["path" in a10 && a10.path && `Path=${a10.path}`, "expires" in a10 && (a10.expires || 0 === a10.expires) && `Expires=${("number" == typeof a10.expires ? new Date(a10.expires) : a10.expires).toUTCString()}`, "maxAge" in a10 && "number" == typeof a10.maxAge && `Max-Age=${a10.maxAge}`, "domain" in a10 && a10.domain && `Domain=${a10.domain}`, "secure" in a10 && a10.secure && "Secure", "httpOnly" in a10 && a10.httpOnly && "HttpOnly", "sameSite" in a10 && a10.sameSite && `SameSite=${a10.sameSite}`, "partitioned" in a10 && a10.partitioned && "Partitioned", "priority" in a10 && a10.priority && `Priority=${a10.priority}`].filter(Boolean), d10 = `${a10.name}=${encodeURIComponent(null != (b10 = a10.value) ? b10 : "")}`;
        return 0 === c10.length ? d10 : `${d10}; ${c10.join("; ")}`;
      }
      function d3(a10) {
        let b10 = /* @__PURE__ */ new Map();
        for (let c10 of a10.split(/; */)) {
          if (!c10) continue;
          let a11 = c10.indexOf("=");
          if (-1 === a11) {
            b10.set(c10, "true");
            continue;
          }
          let [d10, e10] = [c10.slice(0, a11), c10.slice(a11 + 1)];
          try {
            b10.set(d10, decodeURIComponent(null != e10 ? e10 : "true"));
          } catch {
          }
        }
        return b10;
      }
      var d4 = ["strict", "lax", "none"], d5 = ["low", "medium", "high"], d6 = class {
        constructor(a10) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = a10;
          let b10 = a10.get("cookie");
          if (b10) for (let [a11, c10] of d3(b10)) this._parsed.set(a11, { name: a11, value: c10 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...a10) {
          let b10 = "string" == typeof a10[0] ? a10[0] : a10[0].name;
          return this._parsed.get(b10);
        }
        getAll(...a10) {
          var b10;
          let c10 = Array.from(this._parsed);
          if (!a10.length) return c10.map(([a11, b11]) => b11);
          let d10 = "string" == typeof a10[0] ? a10[0] : null == (b10 = a10[0]) ? void 0 : b10.name;
          return c10.filter(([a11]) => a11 === d10).map(([a11, b11]) => b11);
        }
        has(a10) {
          return this._parsed.has(a10);
        }
        set(...a10) {
          let [b10, c10] = 1 === a10.length ? [a10[0].name, a10[0].value] : a10, d10 = this._parsed;
          return d10.set(b10, { name: b10, value: c10 }), this._headers.set("cookie", Array.from(d10).map(([a11, b11]) => d2(b11)).join("; ")), this;
        }
        delete(a10) {
          let b10 = this._parsed, c10 = Array.isArray(a10) ? a10.map((a11) => b10.delete(a11)) : b10.delete(a10);
          return this._headers.set("cookie", Array.from(b10).map(([a11, b11]) => d2(b11)).join("; ")), c10;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((a10) => `${a10.name}=${encodeURIComponent(a10.value)}`).join("; ");
        }
      }, d7 = class {
        constructor(a10) {
          var b10, c10, d10;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = a10;
          let e10 = null != (d10 = null != (c10 = null == (b10 = a10.getSetCookie) ? void 0 : b10.call(a10)) ? c10 : a10.get("set-cookie")) ? d10 : [];
          for (let a11 of Array.isArray(e10) ? e10 : function(a12) {
            if (!a12) return [];
            var b11, c11, d11, e11, f2, g2 = [], h2 = 0;
            function i2() {
              for (; h2 < a12.length && /\s/.test(a12.charAt(h2)); ) h2 += 1;
              return h2 < a12.length;
            }
            for (; h2 < a12.length; ) {
              for (b11 = h2, f2 = false; i2(); ) if ("," === (c11 = a12.charAt(h2))) {
                for (d11 = h2, h2 += 1, i2(), e11 = h2; h2 < a12.length && "=" !== (c11 = a12.charAt(h2)) && ";" !== c11 && "," !== c11; ) h2 += 1;
                h2 < a12.length && "=" === a12.charAt(h2) ? (f2 = true, h2 = e11, g2.push(a12.substring(b11, d11)), b11 = h2) : h2 = d11 + 1;
              } else h2 += 1;
              (!f2 || h2 >= a12.length) && g2.push(a12.substring(b11, a12.length));
            }
            return g2;
          }(e10)) {
            let b11 = function(a12) {
              if (!a12) return;
              let [[b12, c11], ...d11] = d3(a12), { domain: e11, expires: f2, httponly: g2, maxage: h2, path: i2, samesite: j2, secure: k2, partitioned: l2, priority: m2 } = Object.fromEntries(d11.map(([a13, b13]) => [a13.toLowerCase().replace(/-/g, ""), b13]));
              {
                var n2, o2, p2 = { name: b12, value: decodeURIComponent(c11), domain: e11, ...f2 && { expires: new Date(f2) }, ...g2 && { httpOnly: true }, ..."string" == typeof h2 && { maxAge: Number(h2) }, path: i2, ...j2 && { sameSite: (n2 = (n2 = j2).toLowerCase(), d4.includes(n2) ? n2 : void 0) }, ...k2 && { secure: true }, ...m2 && { priority: (o2 = (o2 = m2).toLowerCase(), d5.includes(o2) ? o2 : void 0) }, ...l2 && { partitioned: true } };
                let a13 = {};
                for (let b13 in p2) p2[b13] && (a13[b13] = p2[b13]);
                return a13;
              }
            }(a11);
            b11 && this._parsed.set(b11.name, b11);
          }
        }
        get(...a10) {
          let b10 = "string" == typeof a10[0] ? a10[0] : a10[0].name;
          return this._parsed.get(b10);
        }
        getAll(...a10) {
          var b10;
          let c10 = Array.from(this._parsed.values());
          if (!a10.length) return c10;
          let d10 = "string" == typeof a10[0] ? a10[0] : null == (b10 = a10[0]) ? void 0 : b10.name;
          return c10.filter((a11) => a11.name === d10);
        }
        has(a10) {
          return this._parsed.has(a10);
        }
        set(...a10) {
          let [b10, c10, d10] = 1 === a10.length ? [a10[0].name, a10[0].value, a10[0]] : a10, e10 = this._parsed;
          return e10.set(b10, function(a11 = { name: "", value: "" }) {
            return "number" == typeof a11.expires && (a11.expires = new Date(a11.expires)), a11.maxAge && (a11.expires = new Date(Date.now() + 1e3 * a11.maxAge)), (null === a11.path || void 0 === a11.path) && (a11.path = "/"), a11;
          }({ name: b10, value: c10, ...d10 })), function(a11, b11) {
            for (let [, c11] of (b11.delete("set-cookie"), a11)) {
              let a12 = d2(c11);
              b11.append("set-cookie", a12);
            }
          }(e10, this._headers), this;
        }
        delete(...a10) {
          let [b10, c10] = "string" == typeof a10[0] ? [a10[0]] : [a10[0].name, a10[0]];
          return this.set({ ...c10, name: b10, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(d2).join("; ");
        }
      };
      let d8 = async (a10, b10, c10, d10, e10) => {
        let { crypto: { subtle: f2 } } = (() => {
          if ("undefined" != typeof globalThis) return globalThis;
          if ("undefined" != typeof self) return self;
          if ("undefined" != typeof window) return window;
          throw Error("unable to locate global object");
        })();
        return new Uint8Array(await f2.deriveBits({ name: "HKDF", hash: `SHA-${a10.substr(3)}`, salt: c10, info: d10 }, await f2.importKey("raw", b10, "HKDF", false, ["deriveBits"]), e10 << 3));
      };
      function d9(a10, b10) {
        if ("string" == typeof a10) return new TextEncoder().encode(a10);
        if (!(a10 instanceof Uint8Array)) throw TypeError(`"${b10}"" must be an instance of Uint8Array or a string`);
        return a10;
      }
      async function ea(a10, b10, c10, d10, e10) {
        return d8(function(a11) {
          switch (a11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return a11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(a10), function(a11) {
          let b11 = d9(a11, "ikm");
          if (!b11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return b11;
        }(b10), d9(c10, "salt"), function(a11) {
          let b11 = d9(a11, "info");
          if (b11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return b11;
        }(d10), function(a11, b11) {
          if ("number" != typeof a11 || !Number.isInteger(a11) || a11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (a11 > 255 * (parseInt(b11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return a11;
        }(e10, a10));
      }
      function eb(a10) {
        switch (a10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new cH(`Unsupported JWE Algorithm: ${a10}`);
        }
      }
      let ec = (a10) => crypto.getRandomValues(new Uint8Array(eb(a10) >> 3));
      function ed(a10, b10) {
        let c10 = a10.byteLength << 3;
        if (c10 !== b10) throw new cJ(`Invalid Content Encryption Key length. Expected ${b10} bits, got ${c10} bits`);
      }
      function ee(a10) {
        switch (a10) {
          case "A128GCM":
          case "A128GCMKW":
          case "A192GCM":
          case "A192GCMKW":
          case "A256GCM":
          case "A256GCMKW":
            return 96;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return 128;
          default:
            throw new cH(`Unsupported JWE Algorithm: ${a10}`);
        }
      }
      function ef(a10, b10) {
        if (b10.length << 3 !== ee(a10)) throw new cJ("Invalid Initialization Vector length");
      }
      async function eg(a10, b10, c10) {
        if (!(b10 instanceof Uint8Array)) throw TypeError(ch(b10, "Uint8Array"));
        let d10 = parseInt(a10.slice(1, 4), 10);
        return { encKey: await crypto.subtle.importKey("raw", b10.subarray(d10 >> 3), "AES-CBC", false, [c10]), macKey: await crypto.subtle.importKey("raw", b10.subarray(0, d10 >> 3), { hash: `SHA-${d10 << 1}`, name: "HMAC" }, false, ["sign"]), keySize: d10 };
      }
      async function eh(a10, b10, c10) {
        return new Uint8Array((await crypto.subtle.sign("HMAC", a10, b10)).slice(0, c10 >> 3));
      }
      async function ei(a10, b10, c10, d10, e10) {
        let { encKey: f2, macKey: g2, keySize: h2 } = await eg(a10, c10, "encrypt"), i2 = new Uint8Array(await crypto.subtle.encrypt({ iv: d10, name: "AES-CBC" }, f2, b10)), j2 = cl(e10, d10, i2, cn(e10.length << 3));
        return { ciphertext: i2, tag: await eh(g2, j2, h2), iv: d10 };
      }
      async function ej(a10, b10) {
        if (!(a10 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
        if (!(b10 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
        let c10 = { name: "HMAC", hash: "SHA-256" }, d10 = await crypto.subtle.generateKey(c10, false, ["sign"]), e10 = new Uint8Array(await crypto.subtle.sign(c10, d10, a10)), f2 = new Uint8Array(await crypto.subtle.sign(c10, d10, b10)), g2 = 0, h2 = -1;
        for (; ++h2 < 32; ) g2 |= e10[h2] ^ f2[h2];
        return 0 === g2;
      }
      async function ek(a10, b10, c10, d10, e10, f2) {
        let g2, h2, { encKey: i2, macKey: j2, keySize: k2 } = await eg(a10, b10, "decrypt"), l2 = cl(f2, d10, c10, cn(f2.length << 3)), m2 = await eh(j2, l2, k2);
        try {
          g2 = await ej(e10, m2);
        } catch {
        }
        if (!g2) throw new cI();
        try {
          h2 = new Uint8Array(await crypto.subtle.decrypt({ iv: d10, name: "AES-CBC" }, i2, c10));
        } catch {
        }
        if (!h2) throw new cI();
        return h2;
      }
      async function el(a10, b10, c10, d10, e10) {
        let f2;
        c10 instanceof Uint8Array ? f2 = await crypto.subtle.importKey("raw", c10, "AES-GCM", false, ["encrypt"]) : (df(c10, a10, "encrypt"), f2 = c10);
        let g2 = new Uint8Array(await crypto.subtle.encrypt({ additionalData: e10, iv: d10, name: "AES-GCM", tagLength: 128 }, f2, b10)), h2 = g2.slice(-16);
        return { ciphertext: g2.slice(0, -16), tag: h2, iv: d10 };
      }
      async function em(a10, b10, c10, d10, e10, f2) {
        let g2;
        b10 instanceof Uint8Array ? g2 = await crypto.subtle.importKey("raw", b10, "AES-GCM", false, ["decrypt"]) : (df(b10, a10, "decrypt"), g2 = b10);
        try {
          return new Uint8Array(await crypto.subtle.decrypt({ additionalData: f2, iv: d10, name: "AES-GCM", tagLength: 128 }, g2, cl(c10, e10)));
        } catch {
          throw new cI();
        }
      }
      let en = "Unsupported JWE Content Encryption Algorithm";
      async function eo(a10, b10, c10, d10, e10) {
        if (!cu(c10) && !(c10 instanceof Uint8Array)) throw TypeError(ch(c10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (d10) ef(a10, d10);
        else d10 = crypto.getRandomValues(new Uint8Array(ee(a10) >> 3));
        switch (a10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return c10 instanceof Uint8Array && ed(c10, parseInt(a10.slice(-3), 10)), ei(a10, b10, c10, d10, e10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return c10 instanceof Uint8Array && ed(c10, parseInt(a10.slice(1, 4), 10)), el(a10, b10, c10, d10, e10);
          default:
            throw new cH(en);
        }
      }
      async function ep(a10, b10, c10, d10, e10, f2) {
        if (!cu(b10) && !(b10 instanceof Uint8Array)) throw TypeError(ch(b10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (!d10) throw new cJ("JWE Initialization Vector missing");
        if (!e10) throw new cJ("JWE Authentication Tag missing");
        switch (ef(a10, d10), a10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return b10 instanceof Uint8Array && ed(b10, parseInt(a10.slice(-3), 10)), ek(a10, b10, c10, d10, e10, f2);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return b10 instanceof Uint8Array && ed(b10, parseInt(a10.slice(1, 4), 10)), em(a10, b10, c10, d10, e10, f2);
          default:
            throw new cH(en);
        }
      }
      function eq(a10, b10) {
        if (a10.algorithm.length !== parseInt(b10.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${b10}`);
      }
      function er(a10, b10, c10) {
        return a10 instanceof Uint8Array ? crypto.subtle.importKey("raw", a10, "AES-KW", true, [c10]) : (df(a10, b10, c10), a10);
      }
      async function es(a10, b10, c10) {
        let d10 = await er(b10, a10, "wrapKey");
        eq(d10, a10);
        let e10 = await crypto.subtle.importKey("raw", c10, { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.wrapKey("raw", e10, d10, "AES-KW"));
      }
      async function et(a10, b10, c10) {
        let d10 = await er(b10, a10, "unwrapKey");
        eq(d10, a10);
        let e10 = await crypto.subtle.unwrapKey("raw", c10, d10, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.exportKey("raw", e10));
      }
      function eu(a10) {
        return cl(co(a10.length), a10);
      }
      async function ev(a10, b10, c10) {
        let d10 = b10 >> 3, e10 = Math.ceil(d10 / 32), f2 = new Uint8Array(32 * e10);
        for (let b11 = 1; b11 <= e10; b11++) {
          let d11 = new Uint8Array(4 + a10.length + c10.length);
          d11.set(co(b11), 0), d11.set(a10, 4), d11.set(c10, 4 + a10.length);
          let e11 = await cC("sha256", d11);
          f2.set(e11, (b11 - 1) * 32);
        }
        return f2.slice(0, d10);
      }
      async function ew(a10, b10, c10, d10, e10 = new Uint8Array(), f2 = new Uint8Array()) {
        var g2;
        df(a10, "ECDH"), df(b10, "ECDH", "deriveBits");
        let h2 = eu(cp(c10)), i2 = eu(e10), j2 = eu(f2), k2 = cl(h2, i2, j2, co(d10), new Uint8Array());
        return ev(new Uint8Array(await crypto.subtle.deriveBits({ name: a10.algorithm.name, public: a10 }, b10, "X25519" === (g2 = a10).algorithm.name ? 256 : Math.ceil(parseInt(g2.algorithm.namedCurve.slice(-3), 10) / 8) << 3)), d10, k2);
      }
      function ex(a10) {
        switch (a10.algorithm.namedCurve) {
          case "P-256":
          case "P-384":
          case "P-521":
            return true;
          default:
            return "X25519" === a10.algorithm.name;
        }
      }
      async function ey(a10, b10, c10, d10) {
        if (!(a10 instanceof Uint8Array) || a10.length < 8) throw new cJ("PBES2 Salt Input must be 8 or more octets");
        if (!Number.isSafeInteger(c10) || 1 !== Math.sign(c10)) throw new cJ("PBES2 Count Input must be a positive integer");
        let e10 = cl(cp(b10), Uint8Array.of(0), a10), f2 = parseInt(b10.slice(13, 16), 10), g2 = { hash: `SHA-${b10.slice(8, 11)}`, iterations: c10, name: "PBKDF2", salt: e10 }, h2 = await (d10 instanceof Uint8Array ? crypto.subtle.importKey("raw", d10, "PBKDF2", false, ["deriveBits"]) : (df(d10, b10, "deriveBits"), d10));
        return new Uint8Array(await crypto.subtle.deriveBits(g2, h2, f2));
      }
      async function ez(a10, b10, c10, d10 = 2048, e10 = crypto.getRandomValues(new Uint8Array(16))) {
        let f2 = await ey(e10, a10, d10, b10);
        return { encryptedKey: await es(a10.slice(-6), f2, c10), p2c: d10, p2s: cs(e10) };
      }
      async function eA(a10, b10, c10, d10, e10) {
        let f2 = await ey(e10, a10, d10, b10);
        return et(a10.slice(-6), f2, c10);
      }
      let eB = (a10) => {
        switch (a10) {
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return "RSA-OAEP";
          default:
            throw new cH(`alg ${a10} is not supported either by JOSE or your javascript runtime`);
        }
      };
      async function eC(a10, b10, c10) {
        return df(b10, a10, "encrypt"), dg(a10, b10), new Uint8Array(await crypto.subtle.encrypt(eB(a10), b10, c10));
      }
      async function eD(a10, b10, c10) {
        return df(b10, a10, "decrypt"), dg(a10, b10), new Uint8Array(await crypto.subtle.decrypt(eB(a10), b10, c10));
      }
      async function eE(a10, b10, c10, d10) {
        let e10 = a10.slice(0, 7), f2 = await eo(e10, c10, b10, d10, new Uint8Array());
        return { encryptedKey: f2.ciphertext, iv: cs(f2.iv), tag: cs(f2.tag) };
      }
      async function eF(a10, b10, c10, d10, e10) {
        return ep(a10.slice(0, 7), b10, c10, d10, e10, new Uint8Array());
      }
      let eG = 'Invalid or unsupported "alg" (JWE Algorithm) header value';
      function eH(a10) {
        if (void 0 === a10) throw new cJ("JWE Encrypted Key missing");
      }
      async function eI(a10, b10, c10, d10, e10) {
        switch (a10) {
          case "dir":
            if (void 0 !== c10) throw new cJ("Encountered unexpected JWE Encrypted Key");
            return b10;
          case "ECDH-ES":
            if (void 0 !== c10) throw new cJ("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let e11, f2;
            if (!cS(d10.epk)) throw new cJ('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (ct(b10), !ex(b10)) throw new cH("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let g2 = await c3(d10.epk, a10);
            if (ct(g2), void 0 !== d10.apu) {
              if ("string" != typeof d10.apu) throw new cJ('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              e11 = cB(d10.apu, "apu", cJ);
            }
            if (void 0 !== d10.apv) {
              if ("string" != typeof d10.apv) throw new cJ('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              f2 = cB(d10.apv, "apv", cJ);
            }
            let h2 = await ew(g2, b10, "ECDH-ES" === a10 ? d10.enc : a10, "ECDH-ES" === a10 ? eb(d10.enc) : parseInt(a10.slice(-5, -2), 10), e11, f2);
            if ("ECDH-ES" === a10) return h2;
            return eH(c10), et(a10.slice(-6), h2, c10);
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return eH(c10), ct(b10), eD(a10, b10, c10);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let f2;
            if (eH(c10), "number" != typeof d10.p2c) throw new cJ('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let g2 = e10?.maxPBES2Count || 1e4;
            if (d10.p2c > g2) throw new cJ('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof d10.p2s) throw new cJ('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            return f2 = cB(d10.p2s, "p2s", cJ), eA(a10, b10, c10, d10.p2c, f2);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            return eH(c10), et(a10, b10, c10);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW":
            if (eH(c10), "string" != typeof d10.iv) throw new cJ('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof d10.tag) throw new cJ('JOSE Header "tag" (Authentication Tag) missing or invalid');
            return eF(a10, b10, c10, cB(d10.iv, "iv", cJ), cB(d10.tag, "tag", cJ));
          default:
            throw new cH(eG);
        }
      }
      async function eJ(a10, b10, c10, d10, e10 = {}) {
        let f2, g2, h2;
        switch (a10) {
          case "dir":
            h2 = c10;
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let i2;
            if (ct(c10), !ex(c10)) throw new cH("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let { apu: j2, apv: k2 } = e10;
            i2 = e10.epk ? await dr(e10.epk, a10) : (await crypto.subtle.generateKey(c10.algorithm, true, ["deriveBits"])).privateKey;
            let { x: l2, y: m2, crv: n2, kty: o2 } = await cy(i2), p2 = await ew(c10, i2, "ECDH-ES" === a10 ? b10 : a10, "ECDH-ES" === a10 ? eb(b10) : parseInt(a10.slice(-5, -2), 10), j2, k2);
            if (g2 = { epk: { x: l2, crv: n2, kty: o2 } }, "EC" === o2 && (g2.epk.y = m2), j2 && (g2.apu = cs(j2)), k2 && (g2.apv = cs(k2)), "ECDH-ES" === a10) {
              h2 = p2;
              break;
            }
            h2 = d10 || ec(b10);
            let q2 = a10.slice(-6);
            f2 = await es(q2, p2, h2);
            break;
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            h2 = d10 || ec(b10), ct(c10), f2 = await eC(a10, c10, h2);
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            h2 = d10 || ec(b10);
            let { p2c: i2, p2s: j2 } = e10;
            ({ encryptedKey: f2, ...g2 } = await ez(a10, c10, h2, i2, j2));
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            h2 = d10 || ec(b10), f2 = await es(a10, c10, h2);
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            h2 = d10 || ec(b10);
            let { iv: i2 } = e10;
            ({ encryptedKey: f2, ...g2 } = await eE(a10, c10, h2, i2));
            break;
          }
          default:
            throw new cH(eG);
        }
        return { cek: h2, encryptedKey: f2, parameters: g2 };
      }
      function eK(a10) {
        if (void 0 === globalThis[a10]) throw new cH(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${a10} API.`);
      }
      async function eL(a10) {
        eK("CompressionStream");
        let b10 = new CompressionStream("deflate-raw"), c10 = b10.writable.getWriter();
        c10.write(a10).catch(() => {
        }), c10.close().catch(() => {
        });
        let d10 = [], e10 = b10.readable.getReader();
        for (; ; ) {
          let { value: a11, done: b11 } = await e10.read();
          if (b11) break;
          d10.push(a11);
        }
        return cl(...d10);
      }
      async function eM(a10, b10) {
        eK("DecompressionStream");
        let c10 = new DecompressionStream("deflate-raw"), d10 = c10.writable.getWriter();
        d10.write(a10).catch(() => {
        }), d10.close().catch(() => {
        });
        let e10 = [], f2 = 0, g2 = c10.readable.getReader();
        for (; ; ) {
          let { value: a11, done: c11 } = await g2.read();
          if (c11) break;
          if (e10.push(a11), f2 += a11.byteLength, b10 !== 1 / 0 && f2 > b10) throw new cJ("Decompressed plaintext exceeded the configured limit");
        }
        return cl(...e10);
      }
      class eN {
        #n;
        #o;
        #p;
        #q;
        #r;
        #s;
        #t;
        #u;
        constructor(a10) {
          if (!(a10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this.#n = a10;
        }
        setKeyManagementParameters(a10) {
          return cA(this.#u, "setKeyManagementParameters"), this.#u = a10, this;
        }
        setProtectedHeader(a10) {
          return cA(this.#o, "setProtectedHeader"), this.#o = a10, this;
        }
        setSharedUnprotectedHeader(a10) {
          return cA(this.#p, "setSharedUnprotectedHeader"), this.#p = a10, this;
        }
        setUnprotectedHeader(a10) {
          return cA(this.#q, "setUnprotectedHeader"), this.#q = a10, this;
        }
        setAdditionalAuthenticatedData(a10) {
          return this.#r = a10, this;
        }
        setContentEncryptionKey(a10) {
          return cA(this.#s, "setContentEncryptionKey"), this.#s = a10, this;
        }
        setInitializationVector(a10) {
          return cA(this.#t, "setInitializationVector"), this.#t = a10, this;
        }
        async encrypt(a10, b10) {
          let c10, d10, e10, f2, g2, h2;
          if (!this.#o && !this.#q && !this.#p) throw new cJ("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          if (!cT(this.#o, this.#q, this.#p)) throw new cJ("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          let i2 = { ...this.#o, ...this.#q, ...this.#p };
          if (dm(cJ, /* @__PURE__ */ new Map(), b10?.crit, this.#o, i2), void 0 !== i2.zip && "DEF" !== i2.zip) throw new cH('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
          if (void 0 !== i2.zip && !this.#o?.zip) throw new cJ('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
          let { alg: j2, enc: k2 } = i2;
          if ("string" != typeof j2 || !j2) throw new cJ('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" != typeof k2 || !k2) throw new cJ('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          if (this.#s && ("dir" === j2 || "ECDH-ES" === j2)) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${j2}`);
          dl("dir" === j2 ? k2 : j2, a10, "encrypt");
          {
            let e11, f3 = await dr(a10, j2);
            ({ cek: d10, encryptedKey: c10, parameters: e11 } = await eJ(j2, k2, f3, this.#s, this.#u)), e11 && (b10 && cz in b10 ? this.#q ? this.#q = { ...this.#q, ...e11 } : this.setUnprotectedHeader(e11) : this.#o ? this.#o = { ...this.#o, ...e11 } : this.setProtectedHeader(e11));
          }
          if (this.#o ? g2 = cp(f2 = cs(JSON.stringify(this.#o))) : (f2 = "", g2 = new Uint8Array()), this.#r) {
            let a11 = cp(h2 = cs(this.#r));
            e10 = cl(g2, cp("."), a11);
          } else e10 = g2;
          let l2 = this.#n;
          "DEF" === i2.zip && (l2 = await eL(l2).catch((a11) => {
            throw new cJ("Failed to compress plaintext", { cause: a11 });
          }));
          let { ciphertext: m2, tag: n2, iv: o2 } = await eo(k2, l2, d10, this.#t, e10), p2 = { ciphertext: cs(m2) };
          return o2 && (p2.iv = cs(o2)), n2 && (p2.tag = cs(n2)), c10 && (p2.encrypted_key = cs(c10)), h2 && (p2.aad = h2), this.#o && (p2.protected = f2), this.#p && (p2.unprotected = this.#p), this.#q && (p2.header = this.#q), p2;
        }
      }
      class eO {
        #v;
        constructor(a10) {
          this.#v = new eN(a10);
        }
        setContentEncryptionKey(a10) {
          return this.#v.setContentEncryptionKey(a10), this;
        }
        setInitializationVector(a10) {
          return this.#v.setInitializationVector(a10), this;
        }
        setProtectedHeader(a10) {
          return this.#v.setProtectedHeader(a10), this;
        }
        setKeyManagementParameters(a10) {
          return this.#v.setKeyManagementParameters(a10), this;
        }
        async encrypt(a10, b10) {
          let c10 = await this.#v.encrypt(a10, b10);
          return [c10.protected, c10.encrypted_key, c10.iv, c10.ciphertext, c10.tag].join(".");
        }
      }
      class eP {
        #s;
        #t;
        #u;
        #o;
        #w;
        #x;
        #y;
        #z;
        constructor(a10 = {}) {
          this.#z = new dA(a10);
        }
        setIssuer(a10) {
          return this.#z.iss = a10, this;
        }
        setSubject(a10) {
          return this.#z.sub = a10, this;
        }
        setAudience(a10) {
          return this.#z.aud = a10, this;
        }
        setJti(a10) {
          return this.#z.jti = a10, this;
        }
        setNotBefore(a10) {
          return this.#z.nbf = a10, this;
        }
        setExpirationTime(a10) {
          return this.#z.exp = a10, this;
        }
        setIssuedAt(a10) {
          return this.#z.iat = a10, this;
        }
        setProtectedHeader(a10) {
          return cA(this.#o, "setProtectedHeader"), this.#o = a10, this;
        }
        setKeyManagementParameters(a10) {
          return cA(this.#u, "setKeyManagementParameters"), this.#u = a10, this;
        }
        setContentEncryptionKey(a10) {
          return cA(this.#s, "setContentEncryptionKey"), this.#s = a10, this;
        }
        setInitializationVector(a10) {
          return cA(this.#t, "setInitializationVector"), this.#t = a10, this;
        }
        replicateIssuerAsHeader() {
          return this.#w = true, this;
        }
        replicateSubjectAsHeader() {
          return this.#x = true, this;
        }
        replicateAudienceAsHeader() {
          return this.#y = true, this;
        }
        async encrypt(a10, b10) {
          let c10 = new eO(this.#z.data());
          return this.#o && (this.#w || this.#x || this.#y) && (this.#o = { ...this.#o, iss: this.#w ? this.#z.iss : void 0, sub: this.#x ? this.#z.sub : void 0, aud: this.#y ? this.#z.aud : void 0 }), c10.setProtectedHeader(this.#o), this.#t && c10.setInitializationVector(this.#t), this.#s && c10.setContentEncryptionKey(this.#s), this.#u && c10.setKeyManagementParameters(this.#u), c10.encrypt(a10, b10);
        }
      }
      async function eQ(a10, b10, c10) {
        let d10, e10, f2, g2, h2, i2;
        if (!cS(a10)) throw new cJ("Flattened JWE must be an object");
        if (void 0 === a10.protected && void 0 === a10.header && void 0 === a10.unprotected) throw new cJ("JOSE Header missing");
        if (void 0 !== a10.iv && "string" != typeof a10.iv) throw new cJ("JWE Initialization Vector incorrect type");
        if ("string" != typeof a10.ciphertext) throw new cJ("JWE Ciphertext missing or incorrect type");
        if (void 0 !== a10.tag && "string" != typeof a10.tag) throw new cJ("JWE Authentication Tag incorrect type");
        if (void 0 !== a10.protected && "string" != typeof a10.protected) throw new cJ("JWE Protected Header incorrect type");
        if (void 0 !== a10.encrypted_key && "string" != typeof a10.encrypted_key) throw new cJ("JWE Encrypted Key incorrect type");
        if (void 0 !== a10.aad && "string" != typeof a10.aad) throw new cJ("JWE AAD incorrect type");
        if (void 0 !== a10.header && !cS(a10.header)) throw new cJ("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== a10.unprotected && !cS(a10.unprotected)) throw new cJ("JWE Per-Recipient Unprotected Header incorrect type");
        if (a10.protected) try {
          let b11 = cr(a10.protected);
          d10 = JSON.parse(ck.decode(b11));
        } catch {
          throw new cJ("JWE Protected Header is invalid");
        }
        if (!cT(d10, a10.header, a10.unprotected)) throw new cJ("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        let j2 = { ...d10, ...a10.header, ...a10.unprotected };
        if (dm(cJ, /* @__PURE__ */ new Map(), c10?.crit, d10, j2), void 0 !== j2.zip && "DEF" !== j2.zip) throw new cH('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
        if (void 0 !== j2.zip && !d10?.zip) throw new cJ('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
        let { alg: k2, enc: l2 } = j2;
        if ("string" != typeof k2 || !k2) throw new cJ("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof l2 || !l2) throw new cJ("missing JWE Encryption Algorithm (enc) in JWE Header");
        let m2 = c10 && dn("keyManagementAlgorithms", c10.keyManagementAlgorithms), n2 = c10 && dn("contentEncryptionAlgorithms", c10.contentEncryptionAlgorithms);
        if (m2 && !m2.has(k2) || !m2 && k2.startsWith("PBES2")) throw new cG('"alg" (Algorithm) Header Parameter value not allowed');
        if (n2 && !n2.has(l2)) throw new cG('"enc" (Encryption Algorithm) Header Parameter value not allowed');
        void 0 !== a10.encrypted_key && (e10 = cB(a10.encrypted_key, "encrypted_key", cJ));
        let o2 = false;
        "function" == typeof b10 && (b10 = await b10(d10, a10), o2 = true), dl("dir" === k2 ? l2 : k2, b10, "decrypt");
        let p2 = await dr(b10, k2);
        try {
          f2 = await eI(k2, p2, e10, j2, c10);
        } catch (a11) {
          if (a11 instanceof TypeError || a11 instanceof cJ || a11 instanceof cH) throw a11;
          f2 = ec(l2);
        }
        void 0 !== a10.iv && (g2 = cB(a10.iv, "iv", cJ)), void 0 !== a10.tag && (h2 = cB(a10.tag, "tag", cJ));
        let q2 = void 0 !== a10.protected ? cp(a10.protected) : new Uint8Array();
        i2 = void 0 !== a10.aad ? cl(q2, cp("."), cp(a10.aad)) : q2;
        let r2 = cB(a10.ciphertext, "ciphertext", cJ), s2 = await ep(l2, f2, r2, g2, h2, i2), t2 = { plaintext: s2 };
        if ("DEF" === j2.zip) {
          let a11 = c10?.maxDecompressedLength ?? 25e4;
          if (0 === a11) throw new cH('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          if (a11 !== 1 / 0 && (!Number.isSafeInteger(a11) || a11 < 1)) throw TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
          t2.plaintext = await eM(s2, a11).catch((a12) => {
            if (a12 instanceof cJ) throw a12;
            throw new cJ("Failed to decompress plaintext", { cause: a12 });
          });
        }
        return (void 0 !== a10.protected && (t2.protectedHeader = d10), void 0 !== a10.aad && (t2.additionalAuthenticatedData = cB(a10.aad, "aad", cJ)), void 0 !== a10.unprotected && (t2.sharedUnprotectedHeader = a10.unprotected), void 0 !== a10.header && (t2.unprotectedHeader = a10.header), o2) ? { ...t2, key: p2 } : t2;
      }
      async function eR(a10, b10, c10) {
        if (a10 instanceof Uint8Array && (a10 = ck.decode(a10)), "string" != typeof a10) throw new cJ("Compact JWE must be a string or Uint8Array");
        let { 0: d10, 1: e10, 2: f2, 3: g2, 4: h2, length: i2 } = a10.split(".");
        if (5 !== i2) throw new cJ("Invalid Compact JWE");
        let j2 = await eQ({ ciphertext: g2, iv: f2 || void 0, protected: d10, tag: h2 || void 0, encrypted_key: e10 || void 0 }, b10, c10), k2 = { plaintext: j2.plaintext, protectedHeader: j2.protectedHeader };
        return "function" == typeof b10 ? { ...k2, key: j2.key } : k2;
      }
      async function eS(a10, b10, c10) {
        let d10 = await eR(a10, b10, c10), e10 = dz(d10.protectedHeader, d10.plaintext, c10), { protectedHeader: f2 } = d10;
        if (void 0 !== f2.iss && f2.iss !== e10.iss) throw new cE('replicated "iss" claim header parameter mismatch', e10, "iss", "mismatch");
        if (void 0 !== f2.sub && f2.sub !== e10.sub) throw new cE('replicated "sub" claim header parameter mismatch', e10, "sub", "mismatch");
        if (void 0 !== f2.aud && JSON.stringify(f2.aud) !== JSON.stringify(e10.aud)) throw new cE('replicated "aud" claim header parameter mismatch', e10, "aud", "mismatch");
        let g2 = { payload: e10, protectedHeader: f2 };
        return "function" == typeof b10 ? { ...g2, key: d10.key } : g2;
      }
      let eT = "sha256", eU = "JWE CEK";
      async function eV(a10, b10, c10, d10) {
        let e10 = await ea(eT, b10, "", eU, 32);
        return (await new eP(a10).setProtectedHeader({ enc: "A256GCM", alg: "dir", ...d10 }).setExpirationTime(c10).encrypt(e10)).toString();
      }
      async function eW(a10, b10, c10, d10) {
        try {
          let d11 = await ea(eT, b10, "", eU, 32);
          return await eS(a10, d11, { ...c10, clockTolerance: 15 });
        } catch (a11) {
          if (d10) throw a11;
          if ("ERR_JWE_DECRYPTION_FAILED" === a11.code || "ERR_JWT_EXPIRED" === a11.code || "ERR_JWE_INVALID" === a11.code) return null;
          throw a11;
        }
      }
      async function eX(a10, b10, c10) {
        if (!b10) return;
        let [d10, e10] = b10.split("."), f2 = { protected: cs(JSON.stringify({ alg: "HS256", b64: false, crit: ["b64"] })), payload: `${a10}=${d10}`, signature: e10 }, g2 = await ea("sha256", c10, "", "JWS Cookie Signing", 32);
        try {
          return await ds(f2, g2, { algorithms: ["HS256"] }), d10;
        } catch (a11) {
          return;
        }
      }
      let eY = RegExp("__(\\d+)$"), eZ = /\.(\d+)$/, e$ = (a10, b10) => {
        let c10 = b10 ? eZ.exec(a10) : eY.exec(a10);
        if (c10) return parseInt(c10[1], 10);
      }, e_ = (a10, b10, c10) => {
        let d10 = new RegExp(c10 ? `^${b10}${eZ.source}$` : `^${b10}__\\d+$`);
        return a10.getAll().filter((a11) => d10.test(a11.name));
      };
      function e0(a10, b10, c10) {
        let d10 = b10.get(a10);
        if (d10?.value) return d10.value;
        let e10 = e_(b10, a10, c10).sort((a11, b11) => e$(a11.name, c10) - e$(b11.name, c10));
        if (0 === e10.length) return;
        let f2 = e$(e10[e10.length - 1].name, c10);
        return e10.length !== f2 + 1 ? void console.warn(`Incomplete chunked cookie '${a10}': Found ${e10.length} chunks, expected ${f2 + 1}`) : e10.map((a11) => a11.value).join("");
      }
      function e1(a10, b10, c10, d10, e10) {
        e3(c10, a10, e10), e_(b10, a10, d10).forEach((a11) => {
          e3(c10, a11.name, e10);
        });
      }
      function e2(a10) {
        a10.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate, max-age=0"), a10.headers.set("Pragma", "no-cache"), a10.headers.set("Expires", "0");
      }
      function e3(a10, b10, c10) {
        let d10 = { maxAge: 0 };
        c10?.domain && (d10.domain = c10.domain), c10?.path && (d10.path = c10.path), c10?.secure !== void 0 && (d10.secure = c10.secure), c10?.sameSite !== void 0 && (d10.sameSite = c10.sameSite), c10?.httpOnly !== void 0 && (d10.httpOnly = c10.httpOnly), a10.set(b10, "", d10);
      }
      async function e4(a10, b10, c10, d10, e10, f2) {
        let g2 = { mfaToken: a10, audience: b10, scope: c10, mfaRequirements: d10, createdAt: Date.now() };
        return await eV(g2, e10, Math.floor(Date.now() / 1e3) + f2);
      }
      async function e5(a10, b10) {
        try {
          return (await eW(a10, b10, void 0, true)).payload;
        } catch (a11) {
          if ("ERR_JWT_EXPIRED" === a11.code) throw new bM();
          throw new bN();
        }
      }
      function e6(a10) {
        a10 instanceof bm || (a10 = new bn({ code: "server_error", message: a10 instanceof Error ? a10.message : "Internal server error" }));
        let b10 = a10, c10 = b10 instanceof bM || b10 instanceof bN ? 401 : b10 instanceof bF || b10 instanceof bJ || b10 instanceof bG || b10 instanceof bH || b10 instanceof bI ? 400 : b10 instanceof bL ? 403 : 500, d10 = b10.toJSON?.() ?? { error: b10.code || "server_error", error_description: b10.message || "Internal server error" };
        return aj.json(d10, { status: c10 });
      }
      function e7(a10) {
        let b10 = a10.headers.get("Authorization");
        if (!b10 || !b10.startsWith("Bearer ")) throw new bF("Missing or invalid Authorization header");
        return b10.substring(7);
      }
      function e8(a10, b10) {
        if ("string" != typeof a10 || "" === a10) throw new bF(`Missing or invalid ${b10}`);
        return a10;
      }
      async function e9(a10) {
        try {
          return await a10.json();
        } catch (a11) {
          throw new bF("Invalid JSON in request body");
        }
      }
      async function fa(a10) {
        if (!a10 || "object" != typeof a10) return {};
        if ("string" == typeof a10.error) return { error: a10.error, error_description: "string" == typeof a10.error_description ? a10.error_description : void 0 };
        if (a10.cause instanceof Response) try {
          let b10 = await a10.cause.clone().json();
          if (b10 && "object" == typeof b10) return { error: "string" == typeof b10.error ? b10.error : void 0, error_description: "string" == typeof b10.error_description ? b10.error_description : void 0 };
        } catch {
        }
        return {};
      }
      function fb(a10) {
        return a10 && !a10.endsWith("/") ? `${a10}/` : a10;
      }
      function fc(a10) {
        return a10 && a10.startsWith("/") ? a10.substring(1, a10.length) : a10;
      }
      function fd(a10, b10) {
        if (!b10) throw new br("appBaseUrl is required for this operation. Provide it in Auth0ClientOptions or ensure it can be resolved from request headers.");
        return new URL(fc(fe(a10)), fb(b10));
      }
      let fe = (a10) => {
        let b10 = process.env.NEXT_PUBLIC_BASE_PATH;
        return b10 ? fb(function(a11) {
          return a11 && !a11.startsWith("/") ? `/${a11}` : a11;
        }(b10)) + fc(a10) : a10;
      }, ff = /* @__PURE__ */ new Set(["accept", "accept-language", "content-language", "content-type", "user-agent", "cache-control", "if-match", "if-none-match", "if-modified-since", "if-unmodified-since", "etag", "x-request-id", "x-correlation-id", "traceparent", "tracestate", "x-forwarded-for", "x-forwarded-host", "x-forwarded-proto", "x-real-ip", "auth0-client", "origin", "access-control-request-method", "access-control-request-headers"]), fg = /* @__PURE__ */ new Set(["connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailer", "transfer-encoding", "upgrade"]);
      function fh(a10) {
        let b10 = new Headers();
        return a10.headers.forEach((a11, c10) => {
          let d10 = c10.toLowerCase();
          ff.has(d10) && !fg.has(d10) && b10.set(c10, a11);
        }), b10;
      }
      function fi(a10) {
        let b10 = new Headers();
        return a10.headers.forEach((a11, c10) => {
          let d10 = c10.toLowerCase();
          fg.has(d10) || b10.set(c10, a11);
        }), b10;
      }
      function fj(a10, b10) {
        let c10 = b10.targetBaseUrl, d10 = a10.nextUrl.pathname.startsWith(b10.proxyPath) ? a10.nextUrl.pathname.slice(b10.proxyPath.length) : a10.nextUrl.pathname;
        d10 && !d10.startsWith("/") && (d10 = "/" + d10);
        let e10 = new URL(c10.replace(/\/$/, "")), f2 = e10.pathname, g2 = f2;
        if (d10 && "/" !== d10) {
          let a11 = f2.split("/").filter(Boolean), b11 = d10.split("/").filter(Boolean), c11 = 0, e11 = Math.min(a11.length, b11.length);
          for (let d11 = e11; d11 >= 1; d11--) {
            let e12 = a11.slice(-d11), f3 = b11.slice(0, d11);
            if (e12.every((a12, b12) => a12 === f3[b12])) {
              c11 = d11;
              break;
            }
          }
          let h3 = b11.slice(c11);
          if (h3.length > 0) {
            let a12 = "/" === f2 || f2.endsWith("/") ? "" : "/";
            g2 = f2 + a12 + h3.join("/");
          }
        }
        let h2 = new URL(e10.origin + g2);
        return a10.nextUrl.searchParams.forEach((a11, b11) => {
          h2.searchParams.set(b11, a11);
        }), h2;
      }
      function fk(a10, b10, c10) {
        return { user: a10, tokenSet: { accessToken: b10.access_token, idToken: b10.id_token, scope: b10.scope, requestedScope: c10.scope, audience: c10.audience, refreshToken: b10.refresh_token, expiresAt: Math.floor(Date.now() / 1e3) + Number(b10.expires_in) }, internal: { sid: a10.sid, createdAt: Math.floor(Date.now() / 1e3) } };
      }
      function fl(a10, b10) {
        let c10;
        try {
          c10 = new URL(a10, b10);
        } catch (a11) {
          return;
        }
        if (c10.origin === b10.origin) return c10;
      }
      function fm(a10) {
        return a10.keys().next().value;
      }
      class fn {
        constructor(a10) {
          this.cache = /* @__PURE__ */ new Map(), this.inFlight = /* @__PURE__ */ new Map(), this.jwksCache = /* @__PURE__ */ new Map(), this.ttl = a10?.ttl ?? 600, this.maxEntries = a10?.maxEntries ?? 100;
        }
        async get(a10, b10) {
          let c10 = Math.floor(Date.now() / 1e3), d10 = this.cache.get(a10);
          if (d10 && d10.expiresAt > c10) return this.cache.delete(a10), this.cache.set(a10, d10), d10.metadata;
          let e10 = this.inFlight.get(a10);
          if (e10) return e10;
          let f2 = b10(a10).then((b11) => {
            let d11 = c10 + this.ttl;
            for (this.cache.set(a10, { metadata: b11, expiresAt: d11 }), this.inFlight.delete(a10); this.cache.size > this.maxEntries; ) {
              let a11 = fm(this.cache);
              void 0 !== a11 && this.cache.delete(a11);
            }
            return b11;
          }).catch((b11) => {
            throw this.inFlight.delete(a10), b11;
          });
          return this.inFlight.set(a10, f2), f2;
        }
        getJwksCacheForUri(a10) {
          let b10 = this.jwksCache.get(a10);
          if (b10) this.jwksCache.delete(a10), this.jwksCache.set(a10, b10);
          else {
            if (this.jwksCache.size >= this.maxEntries) {
              let a11 = fm(this.jwksCache);
              void 0 !== a11 && this.jwksCache.delete(a11);
            }
            b10 = {}, this.jwksCache.set(a10, b10);
          }
          return b10;
        }
        clear() {
          this.cache.clear(), this.jwksCache.clear(), this.inFlight.clear();
        }
      }
      class fo {
        constructor(a10, b10) {
          this.hooks = b10, this.config = { ...a10, fetch: a10.fetch || ("undefined" == typeof window ? fetch : window.fetch.bind(window)) };
        }
        isAbsoluteUrl(a10) {
          try {
            return new URL(a10), true;
          } catch {
            return false;
          }
        }
        buildUrl(a10, b10) {
          if (b10) {
            if (this.isAbsoluteUrl(b10)) return b10;
            if (a10) return `${a10.replace(/\/?\/$/, "")}/${b10.replace(/^\/+/, "")}`;
          }
          throw TypeError("`url` must be absolute or `baseUrl` non-empty.");
        }
        getAccessToken(a10) {
          return this.config.getAccessToken ? this.config.getAccessToken(a10 ?? {}) : this.hooks.getAccessToken(a10 ?? {});
        }
        buildBaseRequest(a10, b10) {
          let c10;
          return c10 = a10 instanceof Request ? a10.url : a10 instanceof URL ? a10.toString() : this.config.baseUrl && !this.isAbsoluteUrl(a10) ? this.buildUrl(this.config.baseUrl, a10) : a10, new Request(c10, b10);
        }
        getHeader(a10, b10) {
          return Array.isArray(a10) ? new Headers(a10).get(b10) || "" : "function" == typeof a10.get ? a10.get(b10) || "" : a10[b10] || "";
        }
        async internalFetchWithAuth(a10, b10, c10, d10) {
          let e10, f2, g2 = this.buildBaseRequest(a10, b10), h2 = await this.getAccessToken(d10);
          "string" == typeof h2 ? (e10 = !!this.config.dpopHandle, f2 = h2) : (e10 = !!this.config.dpopHandle && h2.token_type?.toLowerCase() === "dpop", f2 = h2.accessToken);
          try {
            return await (0, dD.c6)(f2, g2.method, new URL(g2.url), g2.headers, g2.body, { ...this.config.httpOptions(), [dD.A6]: (a11, b11) => this.config.fetch(a11, b11), [dD.cm]: this.config.allowInsecureRequests || false, ...e10 && { DPoP: this.config.dpopHandle } });
          } catch (a11) {
            if ((0, dD.r5)(a11) && c10.onUseDpopNonceError) return c10.onUseDpopNonceError();
            throw a11;
          }
        }
        isRequestInit(a10) {
          return !!a10 && "object" == typeof a10 && !["refresh", "scope", "audience"].some((b10) => Object.prototype.hasOwnProperty.call(a10, b10));
        }
        fetchWithAuth(a10, b10, c10) {
          let d10, e10;
          2 == arguments.length && void 0 !== b10 ? this.isRequestInit(b10) ? (d10 = b10, e10 = void 0) : (d10 = void 0, e10 = b10) : (d10 = b10, e10 = c10);
          let f2 = { onUseDpopNonceError: async () => {
            let b11 = this.config.retryConfig ?? { delay: 100, jitter: true }, c11 = b11.delay ?? 100;
            b11.jitter && (c11 *= 0.5 + 0.5 * Math.random()), await new Promise((a11) => setTimeout(a11, c11));
            try {
              return await this.internalFetchWithAuth(a10, d10, { ...f2, onUseDpopNonceError: void 0 }, e10);
            } catch (a11) {
              if ((0, dD.r5)(a11)) {
                let b12 = Error(`DPoP nonce error persisted after retry: ${a11.message}`);
                throw b12.code = a11.code || "dpop_nonce_retry_failed", b12;
              }
              throw a11;
            }
          } };
          return this.internalFetchWithAuth(a10, d10, f2, e10);
        }
      }
      let fp = ["sub", "name", "nickname", "given_name", "family_name", "picture", "email", "email_verified", "org_id"];
      var fq = function(a10, b10, c10, d10) {
        if ("a" === c10 && !d10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof b10 ? a10 !== b10 || !d10 : !b10.has(a10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === c10 ? d10 : "a" === c10 ? d10.call(a10) : d10 ? d10.value : b10.get(a10);
      };
      let fr = ["client_id", "redirect_uri", "response_type", "code_challenge", "code_challenge_method", "state", "nonce"];
      class fs {
        constructor(a10) {
          q.add(this), this.dpopValidated = false, this.proxyDpopHandles = {}, this.fetch = /* @__PURE__ */ function(a11, b11) {
            return async (c11, d11) => {
              let e10 = await a11(c11, d11), f2 = e10.headers.get("content-length");
              if (f2 && parseInt(f2, 10) > b11) throw await e10.body?.cancel(), Error(`Response body too large: ${f2} bytes exceeds ${b11} byte limit`);
              if (e10.body) {
                let a12 = e10.body.getReader(), c12 = 0;
                return new Response(new ReadableStream({ async pull(d12) {
                  let { done: e11, value: f3 } = await a12.read();
                  if (e11) return void d12.close();
                  if ((c12 += f3.byteLength) > b11) {
                    d12.error(Error(`Response body too large: exceeded ${b11} byte limit`)), a12.cancel();
                    return;
                  }
                  d12.enqueue(f3);
                } }), { status: e10.status, statusText: e10.statusText, headers: e10.headers });
              }
              return e10;
            };
          }(a10.fetch || fetch, fs.MAX_RESPONSE_BODY_SIZE), this.discoveryCache = a10.discoveryCache || new fn(), this.provider = a10.provider, this.allowInsecureRequests = a10.allowInsecureRequests ?? false, this.httpTimeout = a10.httpTimeout ?? 5e3, this.httpOptions = () => {
            let b11 = new Headers();
            if (a10.enableTelemetry ?? true) {
              let a11 = "nextjs-auth0", c11 = dV.rE;
              b11.set("User-Agent", `${a11}/${c11}`), b11.set("Auth0-Client", ft(JSON.stringify({ name: a11, version: c11 })));
            }
            return { signal: AbortSignal.timeout(this.httpTimeout), headers: b11 };
          }, this.allowInsecureRequests && console.warn("allowInsecureRequests is enabled in a production environment. This is not recommended."), this.transactionStore = a10.transactionStore, this.sessionStore = a10.sessionStore, this.domain = a10.domain, this._issuer = a10.issuer ?? `https://${a10.domain}/`, this.clientMetadata = { client_id: a10.clientId }, a10.dpopOptions && ("number" == typeof a10.dpopOptions.clockSkew && (this.clientMetadata[dD.nW] = a10.dpopOptions.clockSkew), "number" == typeof a10.dpopOptions.clockTolerance && (this.clientMetadata[dD.AH] = a10.dpopOptions.clockTolerance)), this.dpopOptions = a10.dpopOptions, this.clientSecret = a10.clientSecret, this.authorizationParameters = a10.authorizationParameters || { scope: b_.m1 }, this.pushedAuthorizationRequests = a10.pushedAuthorizationRequests ?? false, this.clientAssertionSigningKey = a10.clientAssertionSigningKey, this.clientAssertionSigningAlg = a10.clientAssertionSigningAlg || "RS256", this.authorizationParameters.scope = function(a11) {
            if (!a11.scope) return b_.m1;
            if ("object" == typeof a11.scope && !b1(a11.scope, a11.audience)) {
              let b11 = a11.audience;
              return { ...a11.scope, [b11]: b_.m1 };
            }
            return a11.scope;
          }(this.authorizationParameters);
          let b10 = b1(this.authorizationParameters.scope, this.authorizationParameters.audience)?.split(" ").map((a11) => a11.trim());
          if (!b10 || !b10.includes("openid")) throw Error("The 'openid' scope must be included in the set of scopes. See https://auth0.com/docs");
          if (Array.isArray(a10.appBaseUrl)) {
            if (0 === a10.appBaseUrl.length) throw new br("APP_BASE_URL array configuration cannot be empty.");
            let b11 = a10.appBaseUrl.filter((a11) => false === function(a12) {
              try {
                let b12 = new URL(a12);
                return "http:" === b12.protocol || "https:" === b12.protocol;
              } catch {
                return false;
              }
            }(a11));
            if (b11.length > 0) throw new br(`APP_BASE_URL array contains invalid URLs: ${b11.join(", ")}`);
          }
          this.appBaseUrl = a10.appBaseUrl, this.signInReturnToPath = a10.signInReturnToPath || "/";
          let c10 = ["auto", "oidc", "v2"], d10 = a10.logoutStrategy || "auto";
          c10.includes(d10) || (console.error(`Invalid logoutStrategy: ${d10}. Must be one of: ${c10.join(", ")}. Defaulting to "auto"`), d10 = "auto"), this.logoutStrategy = d10, this.includeIdTokenHintInOIDCLogoutUrl = a10.includeIdTokenHintInOIDCLogoutUrl ?? true, this.beforeSessionSaved = a10.beforeSessionSaved, this.onCallback = a10.onCallback || this.defaultOnCallback, this.routes = a10.routes, this.enableAccessTokenEndpoint = a10.enableAccessTokenEndpoint ?? true, this.noContentProfileResponseWhenUnauthenticated = a10.noContentProfileResponseWhenUnauthenticated ?? false, this.enableConnectAccountEndpoint = a10.enableConnectAccountEndpoint ?? false, this.tokenRefreshBuffer = a10.tokenRefreshBuffer ?? 0, this.useDPoP = a10.useDPoP ?? false, this.mfaTokenTtl = a10.mfaTokenTtl ?? b_.I2, this.cspNonce = a10.cspNonce, this.dpopKeyPair = a10.dpopKeyPair;
        }
        async ensureDpopValidated() {
          if (this.dpopValidated || !this.useDPoP) return;
          let a10 = await Promise.resolve().then(c.bind(c, 81)), b10 = await a10.validateDpopConfiguration({ useDPoP: this.useDPoP, dpopKeyPair: this.dpopKeyPair, dpopOptions: this.dpopOptions });
          b10.dpopKeyPair && (this.dpopKeyPair = b10.dpopKeyPair), b10.dpopOptions && (this.dpopOptions = b10.dpopOptions, "number" == typeof this.dpopOptions.clockSkew && (this.clientMetadata[dD.nW] = this.dpopOptions.clockSkew), "number" == typeof this.dpopOptions.clockTolerance && (this.clientMetadata[dD.AH] = this.dpopOptions.clockTolerance)), this.dpopValidated = true;
        }
        async handler(a10) {
          let b10, { pathname: c10 } = a10.nextUrl, d10 = a10.nextUrl.basePath;
          d10 && c10.startsWith(d10) && (c10 = c10.slice(d10.length) || "/");
          let e10 = (b10 = c10).endsWith("/") ? b10.slice(0, -1) : b10, f2 = a10.method;
          if ("GET" === f2 && e10 === this.routes.login) return this.handleLogin(a10);
          {
            if ("GET" === f2 && e10 === this.routes.logout) return this.handleLogout(a10);
            if ("GET" === f2 && e10 === this.routes.callback) return this.handleCallback(a10);
            if ("GET" === f2 && e10 === this.routes.profile) return this.handleProfile(a10);
            if ("GET" === f2 && e10 === this.routes.accessToken && this.enableAccessTokenEndpoint) return this.handleAccessToken(a10);
            if ("POST" === f2 && e10 === this.routes.backChannelLogout) return this.handleBackChannelLogout(a10);
            if ("GET" === f2 && e10 === this.routes.connectAccount && this.enableConnectAccountEndpoint) return this.handleConnectAccount(a10);
            if ("GET" === f2 && e10 === this.routes.mfaAuthenticators) return this.handleGetAuthenticators(a10);
            if ("POST" === f2 && e10 === this.routes.mfaChallenge) return this.handleChallenge(a10);
            if ("POST" === f2 && e10 === this.routes.mfaAssociate) return this.handleAssociate(a10);
            if ("POST" === f2 && e10 === this.routes.mfaVerify) return this.handleVerify(a10);
            if ("POST" === f2 && e10 === this.routes.passwordlessStart) return this.handlePasswordlessStart(a10);
            if ("POST" === f2 && e10 === this.routes.passwordlessVerify) return this.handlePasswordlessVerify(a10);
            if ("POST" === f2 && e10 === this.routes.passkeyRegister) return this.handlePasskeyRegister(a10);
            if ("POST" === f2 && e10 === this.routes.passkeyChallenge) return this.handlePasskeyChallenge(a10);
            if ("POST" === f2 && e10 === this.routes.passkeyGetToken) return this.handlePasskeyGetToken(a10);
            if ("POST" === f2 && e10 === this.routes.passkeyEnrollmentChallenge) return this.handlePasskeyEnrollmentChallenge(a10);
            if ("POST" === f2 && e10 === this.routes.passkeyEnrollmentVerify) return this.handlePasskeyEnrollmentVerify(a10);
            if (e10.startsWith("/me/")) return this.handleMyAccount(a10);
            if (e10.startsWith("/my-org/")) return this.handleMyOrg(a10);
            let b11 = aj.next();
            if (this.sessionStore.isRolling) {
              let { error: c11, session: d11 } = await this.getSessionWithDomainCheck(a10.cookies);
              c11 instanceof bU && console.warn(`[nextjs-auth0] ${c11.message}`), !c11 && d11 && (await this.sessionStore.set(a10.cookies, b11.cookies, { ...d11 }), e2(b11));
            }
            return b11;
          }
        }
        async startInteractiveLogin(a10 = {}, b10) {
          await this.ensureDpopValidated();
          let c10 = dY(this.appBaseUrl, b10), d10 = fd(this.routes.callback, c10).toString(), e10 = this.signInReturnToPath;
          if (a10.returnTo) {
            let b11 = new URL(this.authorizationParameters.redirect_uri || c10), d11 = fl(a10.returnTo, b11);
            d11 && (e10 = d11.pathname + d11.search + d11.hash);
          }
          let f2 = dD.YI(), g2 = await dD.Yv(f2), h2 = dD.Ot(), i2 = dD.q4(), j2 = dZ(this.authorizationParameters, a10.authorizationParameters, fr);
          if (j2.set("client_id", this.clientMetadata.client_id), j2.set("redirect_uri", d10), j2.set("response_type", p.CODE), j2.set("code_challenge", g2), j2.set("code_challenge_method", "S256"), j2.set("state", h2), j2.set("nonce", i2), this.dpopKeyPair) try {
            let a11 = await cy(this.dpopKeyPair.publicKey), b11 = await cW(a11);
            j2.set("dpop_jkt", b11);
          } catch (a11) {
            throw new bB(m.DPOP_JKT_CALCULATION_FAILED, "DPoP is enabled but failed to calculate key thumbprint (dpop_jkt). This is required for secure DPoP binding. Please check your key configuration.", a11 instanceof Error ? a11 : void 0);
          }
          let k2 = a10.challengeMode || "redirect";
          if ("redirect" !== k2 && "popup" !== k2) throw new br(`Invalid challengeMode: ${k2}. Expected 'redirect' or 'popup'.`);
          if (this.provider?.isResolverMode) {
            let b11 = a10.authorizationParameters?.scope;
            if (!new Set([this.authorizationParameters.scope || "", b11].filter(Boolean).join(" ").split(/\s+/).filter(Boolean)).has("openid")) throw new br('The "openid" scope is required in resolver mode (DomainResolver). Add "openid" to your SDK configuration or login options.');
          }
          let l2 = { nonce: i2, maxAge: this.authorizationParameters.max_age, codeVerifier: f2, responseType: p.CODE, state: h2, returnTo: e10, scope: j2.get("scope") || void 0, audience: j2.get("audience") || void 0, challengeMode: "redirect" !== k2 ? k2 : void 0, originDomain: this.provider?.isResolverMode ? this.domain : void 0, originIssuer: this.provider?.isResolverMode ? this.issuer : void 0 }, [n2, o2] = await this.authorizationUrl(j2);
          if (n2) return new aj("An error occurred while trying to initiate the login request.", { status: 500 });
          let q2 = aj.redirect(o2.toString());
          return await this.transactionStore.save(q2.cookies, l2), q2;
        }
        async handleLogin(a10) {
          let b10 = Object.fromEntries(a10.nextUrl.searchParams.entries()), c10 = b10.challengeMode;
          if (delete b10.challengeMode, c10 && "popup" !== c10 && "redirect" !== c10) return new aj(`Invalid challengeMode query param: ${c10}. Expected 'redirect', 'popup', or omit.`, { status: 400 });
          let { returnTo: d10, ...e10 } = b10;
          return this.startInteractiveLogin({ authorizationParameters: e10, returnTo: d10, challengeMode: c10 }, a10);
        }
        async handleLogout(a10) {
          let b10, { error: c10, session: d10, exists: e10 } = await this.getSessionWithDomainCheck(a10.cookies), f2 = c10 && e10, [g2, h2] = await this.discoverAuthorizationServerMetadata();
          if (g2) {
            let b11 = new aj("An error occurred while trying to initiate the logout request.", { status: 500 });
            return f2 || await this.sessionStore.delete(a10.cookies, b11.cookies), await this.transactionStore.deleteAll(a10.cookies, b11.cookies), b11;
          }
          let i2 = dY(this.appBaseUrl, a10), j2 = a10.nextUrl.searchParams.get("returnTo") || i2, k2 = a10.nextUrl.searchParams.has("federated"), l2 = () => {
            let a11 = new URL("/v2/logout", this.issuer);
            return a11.searchParams.set("returnTo", j2), a11.searchParams.set("client_id", this.clientMetadata.client_id), k2 && a11.searchParams.set("federated", ""), aj.redirect(a11);
          }, m2 = () => {
            let a11 = new URL(h2.end_session_endpoint);
            return a11.searchParams.set("client_id", this.clientMetadata.client_id), a11.searchParams.set("post_logout_redirect_uri", j2), d10?.internal.sid && a11.searchParams.set("logout_hint", d10.internal.sid), this.includeIdTokenHintInOIDCLogoutUrl && d10?.tokenSet.idToken && a11.searchParams.set("id_token_hint", d10.tokenSet.idToken), k2 && a11.searchParams.set("federated", ""), aj.redirect(a11);
          };
          if ("v2" === this.logoutStrategy) b10 = l2();
          else if ("oidc" === this.logoutStrategy) {
            if (!h2.end_session_endpoint) {
              let b11 = new aj("OIDC RP-Initiated Logout is not supported by the authorization server. Enable it or use a different logout strategy.", { status: 500 });
              return f2 || await this.sessionStore.delete(a10.cookies, b11.cookies), await this.transactionStore.deleteAll(a10.cookies, b11.cookies), b11;
            }
            b10 = m2();
          } else h2.end_session_endpoint ? b10 = m2() : (console.warn("The Auth0 client does not have RP-initiated logout enabled, the user will be redirected to the `/v2/logout` endpoint instead. Learn how to enable it here: https://auth0.com/docs/authenticate/login/logout/log-users-out-of-auth0#enable-endpoint-discovery"), b10 = l2());
          return f2 || await this.sessionStore.delete(a10.cookies, b10.cookies), e2(b10), await this.transactionStore.deleteAll(a10.cookies, b10.cookies), b10;
        }
        async handleCallback(a10) {
          let b10, c10, d10, e10, f2;
          await this.ensureDpopValidated();
          let g2 = a10.nextUrl.searchParams.get("state");
          if (!g2) return this.handleCallbackError(new bp(), {}, a10);
          let h2 = await this.transactionStore.get(a10.cookies, g2);
          if (!h2) return this.onCallback(new bq(), {}, null);
          let i2 = h2.payload, j2 = dY(this.appBaseUrl, a10), k2 = { responseType: i2.responseType, returnTo: i2.returnTo, challengeMode: i2.challengeMode || "redirect", appBaseUrl: j2 };
          if (g2 && this.provider?.isResolverMode && (i2.originIssuer || i2.originDomain)) {
            let b11 = i2.originIssuer ?? i2.originDomain;
            if (ce(b11).issuer !== this.issuer) return this.provider.forDomainSync(b11).handleCallback(a10);
          }
          if (i2.responseType === p.CONNECT_CODE) {
            let { error: b11, session: c11 } = await this.getSessionWithDomainCheck(a10.cookies);
            if (b11 || !c11) return this.handleCallbackError(b11 || new bD({ code: n.MISSING_SESSION, message: "The user does not have an active session." }), k2, a10, g2, i2);
            let [d11, e11] = await this.getTokenSet(c11, { audience: `${this.issuer}me/`, scope: "create:me:connected_accounts" });
            if (d11) return this.handleCallbackError(d11, k2, a10, g2, i2);
            let [f3, h3] = await this.completeConnectAccount({ tokenSet: e11.tokenSet, authSession: i2.authSession, connectCode: a10.nextUrl.searchParams.get("connect_code"), redirectUri: fd(this.routes.callback, j2).toString(), codeVerifier: i2.codeVerifier });
            if (f3) return this.handleCallbackError(f3, k2, a10, g2, i2);
            let l3 = await this.onCallback(null, { ...k2, connectedAccount: h3 }, c11);
            return await this.transactionStore.delete(l3.cookies, g2), l3;
          }
          let [l2, m2] = await this.discoverAuthorizationServerMetadata();
          if (l2) return this.handleCallbackError(l2, k2, a10, g2, i2);
          try {
            b10 = dD.kO(m2, this.clientMetadata, a10.nextUrl.searchParams, i2.state);
          } catch (c11) {
            let b11 = await fa(c11);
            return this.handleCallbackError(new bs({ cause: new bn({ code: b11.error ?? "unknown_error", message: b11.error_description }) }), k2, a10, g2, i2);
          }
          try {
            d10 = fd(this.routes.callback, j2);
            let a11 = this.useDPoP && this.dpopKeyPair ? dD.UM(this.clientMetadata, this.dpopKeyPair) : void 0;
            e10 = async () => dD.m(m2, this.clientMetadata, await this.getClientAuth(), b10, d10.toString(), i2.codeVerifier ?? dD.B9, { ...this.httpOptions(), [dD.A6]: this.fetch, [dD.cm]: this.allowInsecureRequests, ...a11 && { DPoP: a11 } }), c10 = await (0, d$.bp)(e10, { isDPoPEnabled: !!a11, ...this.dpopOptions?.retry });
          } catch (b11) {
            return this.handleCallbackError(new bt(b11.message), k2, a10, g2, i2);
          }
          let o2 = i2.challengeMode || "redirect";
          try {
            f2 = await dD.d_(m2, this.clientMetadata, c10, { expectedNonce: i2.nonce, maxAge: i2.maxAge, requireIdToken: "popup" !== o2 });
          } catch (c11) {
            let b11 = await fa(c11);
            return this.handleCallbackError(new bu({ cause: new bn({ code: b11.error ?? "unknown_error", message: b11.error_description }) }), k2, a10, g2, i2);
          }
          let q2 = f2.id_token ? dD.ON(f2) : void 0;
          if (i2.originIssuer && q2) {
            let b11 = cd(q2.iss), c11 = cd(i2.originIssuer);
            if (b11 !== c11) return this.handleCallbackError(new bT(c11, b11), k2, a10, g2);
          }
          if ("popup" === o2) {
            let { error: b11, session: c11 } = await this.getSessionWithDomainCheck(a10.cookies);
            if (b11) {
              let a11 = d_({ success: false, error: { code: b11.code || "session_domain_mismatch", message: b11.message }, nonce: this.cspNonce });
              return await this.transactionStore.delete(a11.cookies, g2), a11;
            }
            if (c11) {
              var r2 = f2;
              c11.accessTokens = c11.accessTokens || [];
              let b12 = { accessToken: r2.access_token, scope: r2.scope, requestedScope: i2.scope, audience: i2.audience || "", expiresAt: Math.floor(Date.now() / 1e3) + Number(r2.expires_in), token_type: r2.token_type }, d11 = c11.accessTokens.findIndex((a11) => a11.audience === i2.audience);
              d11 >= 0 ? c11.accessTokens[d11] = b12 : c11.accessTokens.push(b12), r2.refresh_token && (c11.tokenSet.refreshToken = r2.refresh_token), r2.id_token && (c11.tokenSet.idToken = r2.id_token, q2 && (c11.user = { ...c11.user, ...q2 }));
              let e11 = await this.finalizeSession(c11, f2.id_token);
              await this.onCallback(null, k2, e11);
              let h3 = d_({ success: true, user: { sub: e11.user.sub, email: e11.user.email }, nonce: this.cspNonce });
              return await this.sessionStore.set(a10.cookies, h3.cookies, e11, true), e2(h3), await this.transactionStore.delete(h3.cookies, g2), h3;
            }
            {
              if (!q2) {
                let a11 = d_({ success: false, error: { code: "session_expired", message: "Session expired during popup flow and no ID token available to create new session" }, nonce: this.cspNonce });
                return await this.transactionStore.delete(a11.cookies, g2), a11;
              }
              let b12 = fk(q2, f2, i2), c12 = await this.finalizeSession(b12, f2.id_token);
              await this.onCallback(null, k2, c12);
              let d11 = d_({ success: true, user: { sub: c12.user.sub, email: c12.user.email }, nonce: this.cspNonce });
              return await this.sessionStore.set(a10.cookies, d11.cookies, c12, true), e2(d11), await this.transactionStore.delete(d11.cookies, g2), d11;
            }
          }
          let s2 = fk(q2, f2, i2);
          this.provider?.isResolverMode && (s2.internal = { ...s2.internal, mcd: { domain: this.domain, issuer: this.issuer } });
          let t2 = await this.onCallback(null, k2, s2);
          if (s2 = await this.finalizeSession(s2, f2.id_token), this.provider?.isResolverMode && !s2.internal?.mcd) throw new br("beforeSessionSaved hook must not remove the internal.mcd field in resolver mode. The internal.mcd object is required for multi-custom-domain session isolation. If you need to modify session.internal, preserve the .mcd field.");
          return await this.sessionStore.set(a10.cookies, t2.cookies, s2, true), e2(t2), await this.transactionStore.delete(t2.cookies, g2), t2;
        }
        async handleProfile(a10) {
          let { error: b10, session: c10 } = await this.getSessionWithDomainCheck(a10.cookies);
          if (b10 || !c10) return this.noContentProfileResponseWhenUnauthenticated ? new aj(null, { status: 204 }) : new aj(null, { status: 401 });
          let d10 = aj.json(c10?.user);
          return e2(d10), d10;
        }
        async handleGetAuthenticators(a10) {
          try {
            let b10 = e7(a10), c10 = await this.mfaGetAuthenticators(b10);
            return aj.json(c10);
          } catch (a11) {
            return e6(a11);
          }
        }
        async handleChallenge(a10) {
          try {
            let b10 = await e9(a10), c10 = e8(b10.mfa_token, "mfa_token"), d10 = e8(b10.challenge_type, "challenge_type"), e10 = b10.authenticator_id ? e8(b10.authenticator_id, "authenticator_id") : void 0, f2 = await this.mfaChallenge(c10, d10, e10);
            return aj.json(f2);
          } catch (a11) {
            return e6(a11);
          }
        }
        async handleAssociate(a10) {
          try {
            let b10 = e7(a10), c10 = await e9(a10), d10 = function(a11, b11) {
              if (!a11 || !Array.isArray(a11) || 0 === a11.length) throw new bF(`Missing or invalid ${b11}`);
              return a11;
            }(c10.authenticator_types, "authenticator_types")[0], [e10, f2] = function(a11, b11) {
              if ("oob" === b11) {
                let b12 = a11.oob_channels;
                if (!b12 || !Array.isArray(b12)) return [null, aj.json({ error: "invalid_request", error_description: "Missing or invalid oob_channels for OOB enrollment" }, { status: 400 })];
                let c11 = "string" == typeof a11.phone_number && "" !== a11.phone_number ? a11.phone_number : void 0;
                return [{ authenticatorTypes: ["oob"], oobChannels: b12, phoneNumber: c11, email: "string" == typeof a11.email && "" !== a11.email ? a11.email : void 0 }, null];
              }
              return "otp" === b11 ? [{ authenticatorTypes: ["otp"] }, null] : [null, aj.json({ error: "invalid_request", error_description: `Unsupported authenticator_type: ${b11}` }, { status: 400 })];
            }(c10, d10);
            if (f2) return f2;
            let g2 = await this.mfaAssociate(b10, e10);
            return aj.json(g2);
          } catch (a11) {
            return e6(a11);
          }
        }
        async handleVerify(a10) {
          try {
            let c10 = e7(a10), d10 = await e9(a10);
            var b10 = d10;
            let e10 = "otp" in b10 && "string" == typeof b10.otp && "" !== b10.otp, f2 = "oob_code" in b10 && "string" == typeof b10.oob_code && "" !== b10.oob_code && "binding_code" in b10 && "string" == typeof b10.binding_code && "" !== b10.binding_code, g2 = "recovery_code" in b10 && "string" == typeof b10.recovery_code && "" !== b10.recovery_code;
            if (!e10 && !f2 && !g2) throw new bF("Missing verification credential (otp, oob_code+binding_code, or recovery_code required)");
            let h2 = function(a11) {
              if (a11.otp) return { otp: a11.otp };
              if (a11.oob_code && a11.binding_code) return { oobCode: a11.oob_code, bindingCode: a11.binding_code };
              if (a11.recovery_code) return { recoveryCode: a11.recovery_code };
              throw new bF("Missing verification credential");
            }(d10), i2 = { mfaToken: c10, ...h2 }, j2 = await this.mfaVerify(i2), k2 = aj.json(j2), { error: l2, session: m2 } = await this.getSessionWithDomainCheck(a10.cookies);
            return !l2 && m2 && await this.cacheTokenFromMfaVerify(j2, c10, a10.cookies, k2.cookies), k2;
          } catch (a11) {
            return e6(a11);
          }
        }
        async handlePasswordlessStart(a10) {
          try {
            let b10 = await e9(a10), c10 = e8(b10.connection, "connection"), d10 = new aj(null, { status: 204 }), e10 = "string" == typeof b10.language && b10.language ? b10.language : void 0;
            if ("email" === c10) {
              let c11 = e8(b10.email, "email"), f2 = e8(b10.send, "send");
              await this.passwordlessStart({ connection: "email", email: c11, send: f2, language: e10 }, d10.cookies, a10);
            } else {
              if ("sms" !== c10) return aj.json({ error: "invalid_connection", error_description: "connection must be 'email' or 'sms'" }, { status: 400 });
              let a11 = e8(b10.phoneNumber, "phoneNumber");
              await this.passwordlessStart({ connection: "sms", phoneNumber: a11, language: e10 });
            }
            return d10;
          } catch (a11) {
            if (a11 instanceof bP) {
              if ("unexpected_error" === a11.error) return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
              return aj.json(a11.toJSON(), { status: 400 });
            }
            if (a11 instanceof bm) return aj.json({ error: a11.code, error_description: a11.message }, { status: 400 });
            return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
          }
        }
        async handlePasswordlessVerify(a10) {
          try {
            let b10, c10 = await e9(a10), d10 = e8(c10.connection, "connection"), e10 = e8(c10.verificationCode, "verificationCode");
            if ("email" === d10) {
              let a11 = e8(c10.email, "email");
              b10 = { connection: "email", email: a11, verificationCode: e10 };
            } else {
              if ("sms" !== d10) return aj.json({ error: "invalid_connection", error_description: "connection must be 'email' or 'sms'" }, { status: 400 });
              let a11 = e8(c10.phoneNumber, "phoneNumber");
              b10 = { connection: "sms", phoneNumber: a11, verificationCode: e10 };
            }
            let f2 = await this.passwordlessVerify(b10), g2 = aj.json({ success: true });
            return await this.createSessionFromPasswordlessVerify(f2, a10.cookies, g2.cookies), e2(g2), g2;
          } catch (a11) {
            if (a11 instanceof bQ) {
              if ((/* @__PURE__ */ new Set(["discovery_error", "unexpected_error"])).has(a11.error)) return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
              return aj.json(a11.toJSON(), { status: 403 });
            }
            if (a11 instanceof bm) return aj.json({ error: a11.code, error_description: a11.message }, { status: 400 });
            return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
          }
        }
        async handleAccessToken(a10) {
          let { error: b10, session: c10 } = await this.getSessionWithDomainCheck(a10.cookies), d10 = a10.nextUrl.searchParams.get("audience"), e10 = a10.nextUrl.searchParams.get("scope"), f2 = a10.nextUrl.searchParams.get("mergeScopes");
          if (b10 || !c10) return aj.json({ error: { message: b10 ? b10.message : "The user does not have an active session.", code: b10?.code ?? j.MISSING_SESSION } }, { status: 401 });
          let [g2, h2] = await this.getTokenSet(c10, { scope: e10, audience: d10, mergeScopes: "false" !== f2 && void 0 });
          if (g2) return g2 instanceof bL ? fq(this, q, "m", v).call(this, a10, c10, g2) : aj.json({ error: { message: g2.message, code: g2.code } }, { status: 401 });
          let { tokenSet: i2 } = h2, k2 = Math.floor(Date.now() / 1e3), l2 = "number" == typeof i2.expiresAt ? i2.expiresAt : 0, m2 = Math.max(0, l2 - k2), n2 = aj.json({ token: i2.accessToken, scope: i2.scope, expires_at: l2, expires_in: m2, ...i2.token_type && { token_type: i2.token_type } });
          return await fq(this, q, "m", u).call(this, a10, n2, c10, h2), n2;
        }
        async handleBackChannelLogout(a10) {
          if (!this.sessionStore.store) return new aj("A session data store is not configured.", { status: 500 });
          if (!this.sessionStore.store.deleteByLogoutToken) return new aj("Back-channel logout is not supported by the session data store.", { status: 500 });
          let b10 = new URLSearchParams(await a10.text()).get("logout_token");
          if (!b10) return new aj("Missing `logout_token` in the request body.", { status: 400 });
          if (this.provider?.isResolverMode) try {
            let [c11, d11] = fw(b10);
            if (c11) return fv("Missing 'iss' claim in logout token.", 400);
            let e11 = await this.provider.forRequest(a10.headers, a10.nextUrl);
            if (d11.domain !== e11.domain) return fv("Logout token issuer does not match the resolved domain.", 403);
            let [f2, g2] = await e11.verifyLogoutToken(b10);
            if (f2) return fv(f2.message, 400);
            return await this.sessionStore.store.deleteByLogoutToken(g2), new aj(null, { status: 204 });
          } catch (a11) {
            return console.error(`Unexpected error in backchannel logout: ${a11 instanceof Error ? a11.message : String(a11)}`), fv("Failed to process logout token.", 400);
          }
          let [, c10] = fw(b10);
          if (c10 && c10.domain !== this.domain) return fv("Logout token issuer does not match the configured domain.", 403);
          let [d10, e10] = await this.verifyLogoutToken(b10);
          return d10 ? fv(d10.message, 400) : (await this.sessionStore.store.deleteByLogoutToken(e10), new aj(null, { status: 204 }));
        }
        async handleConnectAccount(a10) {
          let { error: b10, session: c10 } = await this.getSessionWithDomainCheck(a10.cookies), d10 = a10.nextUrl.searchParams.get("connection"), e10 = a10.nextUrl.searchParams.get("returnTo") ?? void 0, f2 = a10.nextUrl.searchParams.getAll("scopes"), g2 = Object.fromEntries([...a10.nextUrl.searchParams.entries()].filter(([a11]) => "connection" !== a11 && "returnTo" !== a11 && "scopes" !== a11));
          if (!d10) return new aj("A connection is required.", { status: 400 });
          if (b10 || !c10) return new aj(b10?.message ?? "The user does not have an active session.", { status: 401 });
          let [h2, i2] = await this.getTokenSet(c10, { scope: "create:me:connected_accounts", audience: `${this.issuer}me/` });
          if (h2) return h2 instanceof bL ? fq(this, q, "m", v).call(this, a10, c10, h2) : new aj("Failed to retrieve a connected account access token.", { status: 401 });
          let { tokenSet: j2 } = i2, k2 = { connection: d10, authorizationParams: g2, returnTo: e10 };
          f2.length > 0 && (k2.scopes = f2);
          let [l2, m2] = await this.connectAccount({ tokenSet: j2, ...k2 }, a10);
          return l2 ? new aj(l2.message, { status: l2.cause?.status ?? 500 }) : (await fq(this, q, "m", u).call(this, a10, m2, c10, i2), m2);
        }
        async handleMyAccount(a10) {
          return fq(this, q, "m", t).call(this, a10, { proxyPath: "/me", targetBaseUrl: `${this.issuer}me/v1`, audience: `${this.issuer}me/`, scope: a10.headers.get("scope") });
        }
        async handleMyOrg(a10) {
          return fq(this, q, "m", t).call(this, a10, { proxyPath: "/my-org", targetBaseUrl: `${this.issuer}my-org`, audience: `${this.issuer}my-org/`, scope: a10.headers.get("scope") });
        }
        async getTokenSet(a10, b10 = {}) {
          let c10 = false !== b10.mergeScopes ? b8(b1(this.authorizationParameters.scope, b10.audience ?? this.authorizationParameters.audience), b10.scope) : b10.scope || "", d10 = fq(this, q, "m", r).call(this, a10, { scope: c10, audience: b10.audience ?? this.authorizationParameters.audience }), e10 = Date.now() / 1e3, f2 = b3(d10.expiresAt), g2 = b4(d10.expiresAt, e10), h2 = b4(d10.expiresAt, e10 + this.tokenRefreshBuffer);
          if (!d10.refreshToken && !d10.accessToken) return [new by(j.MISSING_REFRESH_TOKEN, "No access token found and a refresh token was not provided. The user needs to re-authenticate."), null];
          if (!d10.refreshToken && d10.accessToken && g2) return [new by(j.MISSING_REFRESH_TOKEN, "The access token has expired and a refresh token was not provided. The user needs to re-authenticate."), null];
          if (d10.refreshToken && (b10.refresh || void 0 === f2 || h2)) {
            let [a11, e11] = await fq(this, q, "m", w).call(this, d10, { audience: b10.audience, scope: b10.scope ? c10 : void 0, requestedScope: c10 });
            return a11 ? [a11, null] : [null, { tokenSet: e11.updatedTokenSet, idTokenClaims: e11.idTokenClaims }];
          }
          return [null, { tokenSet: d10, idTokenClaims: void 0 }];
        }
        async backchannelAuthentication(a10) {
          let [b10, c10] = await this.discoverAuthorizationServerMetadata();
          if (b10) return [b10, null];
          if (!c10.backchannel_authentication_endpoint) return [new bw(), null];
          let d10 = dZ(this.authorizationParameters, a10.authorizationParams, fr);
          d10.get("scope") || d10.set("scope", b_.m1), d10.set("client_id", this.clientMetadata.client_id), d10.set("binding_message", a10.bindingMessage), d10.set("login_hint", JSON.stringify({ format: "iss_sub", iss: c10.issuer, sub: a10.loginHint.sub })), a10.requestedExpiry && d10.append("requested_expiry", a10.requestedExpiry.toString()), a10.authorizationDetails && d10.append("authorization_details", JSON.stringify(a10.authorizationDetails));
          let [e10, f2] = await this.getOpenIdClientConfig();
          if (e10) return [e10, null];
          try {
            let a11 = await dQ(f2, d10), b11 = await dR(f2, a11), c11 = Math.floor(Date.now() / 1e3) + Number(b11.expires_in);
            return [null, { tokenSet: { accessToken: b11.access_token, idToken: b11.id_token, scope: b11.scope, refreshToken: b11.refresh_token, expiresAt: c11 }, idTokenClaims: b11.claims(), authorizationDetails: b11.authorization_details }];
          } catch (b11) {
            let a11 = await fa(b11);
            return [new bx({ cause: new bn({ code: a11.error ?? "unknown_error", message: a11.error_description }) }), null];
          }
        }
        async discoverAuthorizationServerMetadata() {
          if (this.authorizationServerMetadata) return [null, this.authorizationServerMetadata];
          let a10 = new URL(this.issuer);
          try {
            let b10 = await this.discoveryCache.get(this.issuer, async () => await dD.CN(a10, { ...this.httpOptions(), [dD.A6]: this.fetch, [dD.cm]: this.allowInsecureRequests }).then((b11) => dD.vA(a10, b11)));
            return this.authorizationServerMetadata = b10, [null, b10];
          } catch (b10) {
            return console.error(`An error occurred while performing the discovery request. issuer=${a10.toString()}, error:`, b10), [new bo("Discovery failed for the OpenID Connect configuration."), null];
          }
        }
        async defaultOnCallback(a10, b10) {
          if (a10) return new aj(a10.message, { status: 500 });
          let c10 = b10.appBaseUrl;
          if (!c10) throw new br("appBaseUrl could not be resolved for the callback redirect.");
          return aj.redirect(fd(b10.returnTo || "/", c10).toString());
        }
        async handleCallbackError(a10, b10, c10, d10, e10) {
          if (e10?.challengeMode === "popup") {
            await this.onCallback(a10, b10, null);
            let c11 = d_({ success: false, error: { code: a10.code || "callback_error", message: a10.message }, nonce: this.cspNonce });
            return d10 && await this.transactionStore.delete(c11.cookies, d10), c11;
          }
          let f2 = await this.onCallback(a10, b10, null);
          return d10 && await this.transactionStore.delete(f2.cookies, d10), f2;
        }
        async verifyLogoutToken(a10) {
          let [b10, c10] = await this.discoverAuthorizationServerMetadata();
          if (b10) return [b10, null];
          let d10 = function(a11, b11) {
            let c11 = new db(a11, b11), d11 = async (a12, b12) => c11.getKey(a12, b12);
            return Object.defineProperties(d11, { coolingDown: { get: () => c11.coolingDown(), enumerable: true, configurable: false }, fresh: { get: () => c11.fresh(), enumerable: true, configurable: false }, reload: { value: () => c11.reload(), enumerable: true, configurable: false, writable: false }, reloading: { get: () => c11.pendingFetch(), enumerable: true, configurable: false }, jwks: { value: () => c11.jwks(), enumerable: true, configurable: false, writable: false } }), d11;
          }(new URL(c10.jwks_uri), { [da]: this.discoveryCache.getJwksCacheForUri(c10.jwks_uri), timeoutDuration: this.httpTimeout, [c8]: this.fetch }), { payload: e10 } = await dB(a10, d10, { issuer: c10.issuer, audience: this.clientMetadata.client_id, algorithms: ["RS256"], requiredClaims: ["iat"] });
          if (!("sid" in e10) && !("sub" in e10)) return [new bv('either "sid" or "sub" (or both) claims must be present'), null];
          if ("sid" in e10 && "string" != typeof e10.sid) return [new bv('"sid" claim must be a string'), null];
          if ("sub" in e10 && "string" != typeof e10.sub) return [new bv('"sub" claim must be a string'), null];
          if ("nonce" in e10) return [new bv('"nonce" claim is prohibited'), null];
          if (!("events" in e10)) return [new bv('"events" claim is missing'), null];
          if ("object" != typeof e10.events || null === e10.events) return [new bv('"events" claim must be an object'), null];
          if (!("http://schemas.openid.net/event/backchannel-logout" in e10.events)) return [new bv('"http://schemas.openid.net/event/backchannel-logout" member is missing in the "events" claim'), null];
          if ("object" != typeof e10.events["http://schemas.openid.net/event/backchannel-logout"]) return [new bv('"http://schemas.openid.net/event/backchannel-logout" member in the "events" claim must be an object'), null];
          let f2 = e10.iss;
          return [null, { sid: e10.sid, sub: e10.sub, iss: f2 }];
        }
        async authorizationUrl(a10) {
          let [b10, c10] = await this.discoverAuthorizationServerMetadata();
          if (b10) return [b10, null];
          if (this.pushedAuthorizationRequests && !c10.pushed_authorization_request_endpoint) return console.error("The Auth0 tenant does not have pushed authorization requests enabled. Learn how to enable it here: https://auth0.com/docs/get-started/applications/configure-par"), [Error("The authorization server does not support pushed authorization requests."), null];
          let d10 = new URL(c10.authorization_endpoint);
          if (this.pushedAuthorizationRequests) {
            let b11, e10 = await dD.YM(c10, this.clientMetadata, await this.getClientAuth(), a10, { ...this.httpOptions(), [dD.A6]: this.fetch, [dD.cm]: this.allowInsecureRequests });
            try {
              b11 = await dD.ng(c10, this.clientMetadata, e10);
            } catch (b12) {
              let a11 = await fa(b12);
              return [new bs({ cause: new bn({ code: a11.error ?? "unknown_error", message: a11.error_description }), message: "An error occurred while pushing the authorization request." }), null];
            }
            return d10.searchParams.set("request_uri", b11.request_uri), d10.searchParams.set("client_id", this.clientMetadata.client_id), [null, d10];
          }
          return d10.search = a10.toString(), [null, d10];
        }
        async getClientAuth() {
          if (!this.clientSecret && !this.clientAssertionSigningKey) throw Error("The client secret or client assertion signing key must be provided.");
          let a10 = this.clientAssertionSigningKey;
          return a10 && "string" == typeof a10 && (a10 = await c2(a10, this.clientAssertionSigningAlg)), a10 ? dD.IX(a10) : dD.qm(this.clientSecret);
        }
        get issuer() {
          return this._issuer;
        }
        async getSessionWithDomainCheck(a10) {
          let b10, c10 = await this.sessionStore.get(a10);
          if (!c10) return { error: null, session: null, exists: false };
          if (c10.internal?.mcd) return c10.internal.mcd.domain !== this.domain ? { error: new bU(`Session was created for domain '${c10.internal.mcd.domain}' but the current request is for domain '${this.domain}'. This may indicate a cross-domain session reuse attempt.`), session: null, exists: true } : { error: null, session: c10, exists: true };
          if (!this.provider?.isResolverMode) return { error: null, session: c10, exists: true };
          if (c10.tokenSet.idToken) try {
            let { iss: a11 } = dC(c10.tokenSet.idToken);
            "string" == typeof a11 && (b10 = ce(a11).domain);
          } catch {
          }
          let d10 = b10 ?? this.domain;
          return c10.internal = c10.internal || {}, c10.internal.mcd = { domain: d10, issuer: `https://${d10}/` }, { error: null, session: c10, exists: true };
        }
        async getConnectionTokenSet(a10, b10, c10) {
          if (await this.ensureDpopValidated(), !a10.refreshToken && (!b10 || b10.expiresAt <= Date.now() / 1e3)) return [new bz(k.MISSING_REFRESH_TOKEN, "A refresh token was not present, Connection Access Token requires a refresh token. The user needs to re-authenticate."), null];
          if (a10.refreshToken && (!b10 || b10.expiresAt <= Date.now() / 1e3)) {
            let b11, d10 = new URLSearchParams();
            d10.append("connection", c10.connection);
            let e10 = c10.subject_token_type ?? o.SUBJECT_TYPE_REFRESH_TOKEN, f2 = e10 === o.SUBJECT_TYPE_ACCESS_TOKEN ? a10.accessToken : a10.refreshToken;
            d10.append("subject_token_type", e10), d10.append("subject_token", f2), d10.append("requested_token_type", "http://auth0.com/oauth/token-type/federated-connection-access-token"), c10.login_hint && d10.append("login_hint", c10.login_hint);
            let [g2, h2] = await this.discoverAuthorizationServerMetadata();
            if (g2) return [g2, null];
            let i2 = this.useDPoP && this.dpopKeyPair ? dD.UM(this.clientMetadata, this.dpopKeyPair) : void 0, j2 = async () => dD.Nb(h2, this.clientMetadata, await this.getClientAuth(), "urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token", d10, { [dD.A6]: this.fetch, [dD.cm]: this.allowInsecureRequests, ...i2 && { DPoP: i2 } }), l2 = async () => {
              let a11 = await j2();
              return dD.kU(h2, this.clientMetadata, a11);
            };
            try {
              b11 = await (0, d$.bp)(l2, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
            } catch (b12) {
              let a11 = await fa(b12);
              return [new bz(k.FAILED_TO_EXCHANGE, "There was an error trying to exchange the refresh token for a connection access token.", new bn({ code: a11.error ?? "unknown_error", message: a11.error_description })), null];
            }
            return [null, { accessToken: b11.access_token, expiresAt: Math.floor(Date.now() / 1e3) + Number(b11.expires_in), scope: b11.scope, connection: c10.connection }];
          }
          return [null, b10];
        }
        validateSubjectTokenType(a10) {
          if (a10.length < 10) return new bA(l.INVALID_SUBJECT_TOKEN_TYPE, `Invalid subject_token_type: must be at least 10 characters. Received ${a10.length} characters.`);
          if (a10.length > 100) return new bA(l.INVALID_SUBJECT_TOKEN_TYPE, `Invalid subject_token_type: must be at most 100 characters. Received ${a10.length} characters.`);
          let b10 = false;
          try {
            new URL(a10), b10 = true;
          } catch {
          }
          let c10 = /^urn:[a-z0-9][a-z0-9-]{0,31}:[a-z0-9()+,\-.:=@;$_!*'%/?#]+$/i.test(a10);
          return b10 || c10 ? null : new bA(l.INVALID_SUBJECT_TOKEN_TYPE, `Invalid subject_token_type: must be a valid URI (URL or URN format). Received: "${a10}"`);
        }
        async customTokenExchange(a10) {
          let b10;
          if (await this.ensureDpopValidated(), !a10.subjectToken || "" === a10.subjectToken.trim()) return [new bA(l.MISSING_SUBJECT_TOKEN, "The subject_token is required and cannot be empty."), null];
          let c10 = this.validateSubjectTokenType(a10.subjectTokenType);
          if (c10) return [c10, null];
          if (a10.actorToken && !a10.actorTokenType) return [new bA(l.MISSING_ACTOR_TOKEN_TYPE, "The actor_token_type is required when actor_token is provided."), null];
          let [d10, e10] = await this.discoverAuthorizationServerMetadata();
          if (d10) return [new bA(l.EXCHANGE_FAILED, "Failed to discover authorization server metadata.", new bn({ code: "discovery_error", message: d10.message })), null];
          let f2 = b8(b_.m1, a10.scope), g2 = new URLSearchParams();
          if (g2.append("subject_token", a10.subjectToken), g2.append("subject_token_type", a10.subjectTokenType), g2.append("scope", f2), a10.audience && g2.append("audience", a10.audience), a10.organization && g2.append("organization", a10.organization), a10.actorToken && a10.actorTokenType && (g2.append("actor_token", a10.actorToken), g2.append("actor_token_type", a10.actorTokenType)), a10.additionalParameters) for (let [b11, c11] of Object.entries(a10.additionalParameters)) null != c11 && g2.append(b11, String(c11));
          let h2 = this.useDPoP && this.dpopKeyPair ? dD.UM(this.clientMetadata, this.dpopKeyPair) : void 0, i2 = async () => {
            let a11 = await dD.Nb(e10, this.clientMetadata, await this.getClientAuth(), "urn:ietf:params:oauth:grant-type:token-exchange", g2, { [dD.A6]: this.fetch, [dD.cm]: this.allowInsecureRequests, ...h2 && { DPoP: h2 } });
            return dD.kU(e10, this.clientMetadata, a11);
          };
          try {
            b10 = await (0, d$.bp)(i2, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
          } catch (b11) {
            let a11 = await fa(b11);
            return [new bA(l.EXCHANGE_FAILED, "There was an error trying to exchange the token.", new bn({ code: a11.error ?? "unknown_error", message: a11.error_description ?? b11.message })), null];
          }
          return [null, { accessToken: b10.access_token, idToken: b10.id_token, refreshToken: b10.refresh_token, tokenType: b10.token_type ?? "Bearer", expiresIn: Number(b10.expires_in), scope: b10.scope }];
        }
        async finalizeSession(a10, b10) {
          if (this.beforeSessionSaved) a10 = { ...await this.beforeSessionSaved(a10, b10 ?? null), internal: a10.internal };
          else {
            var c10;
            a10.user = Object.keys(c10 = a10.user).reduce((a11, b11) => (fp.includes(b11) && (a11[b11] = c10[b11]), a11), {});
          }
          return a10;
        }
        async connectAccount(a10, b10) {
          let c10 = dY(this.appBaseUrl, b10), d10 = fd(this.routes.callback, c10).toString(), e10 = this.signInReturnToPath;
          if (a10.returnTo) {
            let b11 = new URL(c10), d11 = fl(a10.returnTo, b11);
            d11 && (e10 = d11.pathname + d11.search + d11.hash);
          }
          let f2 = dD.YI(), g2 = await dD.Yv(f2), h2 = dD.Ot(), [i2, j2] = await this.createConnectAccountTicket({ tokenSet: a10.tokenSet, connection: a10.connection, redirectUri: d10, state: h2, codeChallenge: g2, codeChallengeMethod: "S256", scopes: a10.scopes, authorizationParams: a10.authorizationParams });
          if (i2) return [i2, null];
          let k2 = { codeVerifier: f2, responseType: p.CONNECT_CODE, state: h2, returnTo: e10, authSession: j2.authSession }, l2 = aj.redirect(`${j2.connectUri}?ticket=${encodeURIComponent(j2.connectParams.ticket)}`);
          return await this.transactionStore.save(l2.cookies, k2), [null, l2];
        }
        async createConnectAccountTicket(a10) {
          try {
            let b10 = new URL("/me/v1/connected-accounts/connect", this.issuer), c10 = await this.fetcherFactory({ useDPoP: this.useDPoP, getAccessToken: async () => ({ accessToken: a10.tokenSet.accessToken, expiresAt: a10.tokenSet.expiresAt || 0, scope: a10.tokenSet.scope, token_type: a10.tokenSet.token_type }), fetch: this.fetch }), d10 = this.httpOptions();
            new Headers(d10.headers).set("Content-Type", "application/json");
            let e10 = { connection: a10.connection, redirect_uri: a10.redirectUri, state: a10.state, code_challenge: a10.codeChallenge, code_challenge_method: a10.codeChallengeMethod, scopes: a10.scopes, authorization_params: a10.authorizationParams }, f2 = await c10.fetchWithAuth(b10.toString(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e10) });
            if (!f2.ok) return fu(f2, n.FAILED_TO_INITIATE);
            let { connect_uri: g2, connect_params: h2, auth_session: i2, expires_in: j2 } = await f2.json();
            return [null, { connectUri: g2, connectParams: h2, authSession: i2, expiresIn: j2 }];
          } catch (b10) {
            let a11 = "An unexpected error occurred while trying to initiate the connect account flow.";
            return b10 instanceof bB && (a11 = b10.message), [new bD({ code: n.FAILED_TO_INITIATE, message: a11 }), null];
          }
        }
        async completeConnectAccount(a10) {
          let b10 = new URL("/me/v1/connected-accounts/complete", this.issuer);
          try {
            let c10 = this.httpOptions();
            new Headers(c10.headers).set("Content-Type", "application/json");
            let d10 = await this.fetcherFactory({ useDPoP: this.useDPoP, getAccessToken: async () => ({ accessToken: a10.tokenSet.accessToken, expiresAt: a10.tokenSet.expiresAt || 0, scope: a10.tokenSet.scope, token_type: a10.tokenSet.token_type }), fetch: this.fetch }), e10 = { auth_session: a10.authSession, connect_code: a10.connectCode, redirect_uri: a10.redirectUri, code_verifier: a10.codeVerifier }, f2 = await d10.fetchWithAuth(b10, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e10) });
            if (!f2.ok) return fu(f2, n.FAILED_TO_COMPLETE);
            let { id: g2, connection: h2, access_type: i2, scopes: j2, created_at: k2, expires_at: l2 } = await f2.json();
            return [null, { id: g2, connection: h2, accessType: i2, scopes: j2, createdAt: k2, expiresAt: l2 }];
          } catch (a11) {
            return [new bD({ code: n.FAILED_TO_COMPLETE, message: "An unexpected error occurred while trying to complete the connect account flow." }), null];
          }
        }
        async getOpenIdClientConfig() {
          let [a10, b10] = await this.discoverAuthorizationServerMetadata();
          if (a10) return [a10, null];
          let c10 = new dN(b10, this.clientMetadata.client_id, {}, await this.getClientAuth()), d10 = new Headers(this.httpOptions().headers);
          return c10[dF] = (...a11) => {
            let b11 = new Headers(a11[1].headers);
            return this.fetch(a11[0], { ...a11[1], body: a11[1].body, headers: new Headers([...d10, ...b11]) });
          }, c10.timeout = this.httpTimeout, this.allowInsecureRequests && (dE(c10).tlsOnly = false), [null, c10];
        }
        async fetcherFactory(a10) {
          if (await this.ensureDpopValidated(), this.useDPoP && !this.dpopKeyPair) throw new bB(m.DPOP_CONFIGURATION_ERROR, "DPoP is enabled but no keypair is configured.");
          let [b10, c10] = await this.discoverAuthorizationServerMetadata();
          if (b10) throw b10;
          let d10 = this.useDPoP && (a10.useDPoP ?? true);
          return new fo({ dpopHandle: d10 ? a10.dpopHandle ?? dD.UM(this.clientMetadata, this.dpopKeyPair) : void 0, httpOptions: this.httpOptions, allowInsecureRequests: this.allowInsecureRequests, retryConfig: this.dpopOptions?.retry, fetch: a10.fetch, getAccessToken: a10.getAccessToken, baseUrl: a10.baseUrl }, { getAccessToken: a10.getAccessToken, isDpopEnabled: () => d10 });
        }
        async mfaGetAuthenticators(a10) {
          let b10 = await e5(a10, this.sessionStore.secret), c10 = b10.mfaToken, d10 = new URL("/mfa/authenticators", this.issuer).toString(), e10 = this.httpOptions();
          e10.headers.set("Authorization", `Bearer ${c10}`);
          try {
            let a11 = await this.fetch(d10, { method: "GET", ...e10 });
            if (!a11.ok) {
              let b11 = await a11.json().catch(() => ({ error: "unknown_error", error_description: "Failed to retrieve authenticators" }));
              throw new bG(b11.error || "unknown_error", b11.error_description || "Failed to retrieve authenticators", b11.error ? b11 : void 0);
            }
            let c11 = await a11.json(), f2 = new Set((b10.mfaRequirements?.challenge ?? []).map((a12) => a12.type.toLowerCase()));
            if (0 === f2.size) return c11;
            return c11.filter((a12) => a12.type && f2.has(a12.type.toLowerCase()));
          } catch (a11) {
            if (a11 instanceof bG) throw a11;
            throw new bG("unexpected_error", "Unexpected error during authenticator retrieval", void 0);
          }
        }
        async mfaChallenge(a10, b10, c10) {
          let d10 = await e5(a10, this.sessionStore.secret);
          if (0 === new Set((d10.mfaRequirements?.challenge ?? []).map((a11) => a11.type.toLowerCase())).size) throw new bJ("No MFA challenge types available in mfa_requirements");
          let e10 = d10.mfaToken, f2 = new URL("/mfa/challenge", this.issuer).toString(), g2 = this.httpOptions();
          g2.headers.set("Content-Type", "application/json");
          try {
            let a11 = { client_id: this.clientMetadata.client_id, challenge_type: b10, mfa_token: e10 };
            this.clientSecret && (a11.client_secret = this.clientSecret), c10 && (a11.authenticator_id = c10);
            let d11 = await this.fetch(f2, { method: "POST", body: JSON.stringify(a11), ...g2 });
            if (!d11.ok) {
              let a12 = await d11.json().catch(() => ({ error: "unknown_error", error_description: "Failed to initiate MFA challenge" }));
              throw new bH(a12.error || "unknown_error", a12.error_description || "Failed to initiate MFA challenge", a12.error ? a12 : void 0);
            }
            return await d11.json();
          } catch (a11) {
            if (a11 instanceof bH) throw a11;
            throw new bH("unexpected_error", "Unexpected error during MFA challenge", void 0);
          }
        }
        async mfaAssociate(a10, b10) {
          let c10 = (await e5(a10, this.sessionStore.secret)).mfaToken, d10 = new URL("/mfa/associate", this.issuer).toString(), e10 = this.httpOptions();
          e10.headers.set("Authorization", `Bearer ${c10}`), e10.headers.set("Content-Type", "application/json");
          let f2 = { authenticator_types: b10.authenticatorTypes };
          "oobChannels" in b10 && (f2.oob_channels = b10.oobChannels, b10.phoneNumber && (f2.phone_number = b10.phoneNumber), b10.email && (f2.email = b10.email));
          try {
            let a11 = await this.fetch(d10, { method: "POST", body: JSON.stringify(f2), ...e10 });
            if (!a11.ok) {
              let b11 = await a11.json().catch(() => ({ error: "unknown_error", error_description: "Failed to enroll authenticator" }));
              throw new bK(b11.error || "unknown_error", b11.error_description || "Failed to enroll authenticator", b11.error ? b11 : void 0);
            }
            return await a11.json();
          } catch (a11) {
            if (a11 instanceof bK) throw a11;
            throw new bK("unexpected_error", "Unexpected error during MFA enrollment", void 0);
          }
        }
        async mfaVerify(a10) {
          let b10;
          await this.ensureDpopValidated();
          let { mfaToken: c10, audience: d10, scope: e10 } = await e5(a10.mfaToken, this.sessionStore.secret), [f2, g2] = await this.discoverAuthorizationServerMetadata();
          if (f2) throw new bI("discovery_error", "Failed to discover authorization server metadata", void 0);
          let h2 = ((a11, b11) => {
            let c11 = new URLSearchParams();
            if (c11.append("mfa_token", b11), "otp" in a11 && a11.otp) c11.append("otp", a11.otp);
            else if ("oobCode" in a11 && "bindingCode" in a11 && a11.oobCode && a11.bindingCode) c11.append("oob_code", a11.oobCode), c11.append("binding_code", a11.bindingCode);
            else if ("recoveryCode" in a11 && a11.recoveryCode) c11.append("recovery_code", a11.recoveryCode);
            else throw new bI("invalid_request", "At least one verification credential required (otp, oobCode+bindingCode, or recoveryCode)");
            return c11;
          })(a10, c10), i2 = ((a11) => {
            if (a11.has("otp")) return "http://auth0.com/oauth/grant-type/mfa-otp";
            if (a11.has("oob_code") && a11.has("binding_code")) return "http://auth0.com/oauth/grant-type/mfa-oob";
            if (a11.has("recovery_code")) return "http://auth0.com/oauth/grant-type/mfa-recovery-code";
            throw new bI("invalid_request", "No verification credential provided");
          })(h2), j2 = this.useDPoP && this.dpopKeyPair ? dD.UM(this.clientMetadata, this.dpopKeyPair) : void 0;
          try {
            b10 = await (0, d$.bp)(async () => {
              let a11 = await dD.Nb(g2, this.clientMetadata, await this.getClientAuth(), i2, h2, { ...this.httpOptions(), [dD.A6]: this.fetch, [dD.cm]: this.allowInsecureRequests, ...j2 && { DPoP: j2 } });
              return dD.kU(g2, this.clientMetadata, a11);
            }, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
          } catch (b11) {
            let a11 = await fa(b11);
            if ("mfa_required" === a11.error || "mfa_required" === b11.error) {
              let c11 = !b11.cause || "object" != typeof b11.cause || b11.cause instanceof Response ? b11 : b11.cause, f3 = await e4(c11.mfa_token, d10, e10, c11.mfa_requirements, this.sessionStore.secret, b_.I2);
              throw new bL(a11.error_description || c11.error_description || "Additional MFA factor required", f3, c11.mfa_requirements, new bn({ code: "mfa_required", message: a11.error_description || c11.error_description }));
            }
            throw new bI(a11.error || "unknown_error", a11.error_description || b11.message || "MFA verification failed", a11.error ? { error: a11.error, error_description: a11.error_description ?? "" } : void 0);
          }
          return { ...b10, token_type: b2(b10.token_type) };
        }
        async cacheTokenFromMfaVerify(a10, b10, c10, d10) {
          let { error: e10, session: f2 } = await this.getSessionWithDomainCheck(c10);
          if (e10 || !f2) throw new bI(e10?.code ?? j.MISSING_SESSION, e10?.message ?? "The user does not have an active session.");
          let { audience: g2 } = await e5(b10, this.sessionStore.secret);
          f2.accessTokens = f2.accessTokens || [], f2.accessTokens.push({ accessToken: a10.access_token, scope: a10.scope, audience: g2 || "", expiresAt: Math.floor(Date.now() / 1e3) + Number(a10.expires_in), token_type: a10.token_type }), await this.sessionStore.set(c10, d10, f2);
        }
        async passkeyRegister(a10) {
          let b10 = new URL("/passkey/register", this.issuer).toString(), c10 = this.httpOptions();
          c10.headers.set("Content-Type", "application/json");
          let d10 = { client_id: this.clientMetadata.client_id };
          this.clientSecret && (d10.client_secret = this.clientSecret);
          let e10 = {};
          a10?.name && (e10.name = a10.name), a10?.email && (e10.email = a10.email), a10?.username && (e10.username = a10.username), a10?.phoneNumber && (e10.phone_number = a10.phoneNumber), a10?.givenName && (e10.given_name = a10.givenName), a10?.familyName && (e10.family_name = a10.familyName), a10?.nickname && (e10.nickname = a10.nickname), a10?.picture && (e10.picture = a10.picture), d10.user_profile = e10, a10?.userMetadata && (d10.user_metadata = a10.userMetadata), a10?.connection && (d10.realm = a10.connection), a10?.organization && (d10.organization = a10.organization);
          try {
            let a11 = await this.fetch(b10, { method: "POST", body: JSON.stringify(d10), ...c10 });
            if (!a11.ok) {
              let b11 = await a11.json().catch(() => ({ error: "unknown_error", error_description: "Failed to get passkey signup challenge" }));
              throw new bW(b11.error || "unknown_error", b11.error_description || "Failed to get passkey signup challenge", b11.error ? b11 : void 0);
            }
            let e11 = await a11.json();
            return { authSession: e11.auth_session, authnParamsPublicKey: e11.authn_params_public_key };
          } catch (a11) {
            if (a11 instanceof bW) throw a11;
            throw new bW("unexpected_error", "Unexpected error during passkey signup challenge", void 0);
          }
        }
        async passkeyChallenge(a10) {
          let b10 = new URL("/passkey/challenge", this.issuer).toString(), c10 = this.httpOptions();
          c10.headers.set("Content-Type", "application/json");
          let d10 = { client_id: this.clientMetadata.client_id };
          this.clientSecret && (d10.client_secret = this.clientSecret), a10?.connection && (d10.realm = a10.connection), a10?.organization && (d10.organization = a10.organization);
          try {
            let a11 = await this.fetch(b10, { method: "POST", body: JSON.stringify(d10), ...c10 });
            if (!a11.ok) {
              let b11 = await a11.json().catch(() => ({ error: "unknown_error", error_description: "Failed to get passkey login challenge" }));
              throw new bX(b11.error || "unknown_error", b11.error_description || "Failed to get passkey login challenge", b11.error ? b11 : void 0);
            }
            let e10 = await a11.json();
            return { authSession: e10.auth_session, authnParamsPublicKey: e10.authn_params_public_key };
          } catch (a11) {
            if (a11 instanceof bX) throw a11;
            throw new bX("unexpected_error", "Unexpected error during passkey login challenge", void 0);
          }
        }
        async passkeyGetToken(a10, b10, c10) {
          let d10;
          await this.ensureDpopValidated();
          let [e10, f2] = await this.discoverAuthorizationServerMetadata();
          if (e10) throw new bY("discovery_error", "Failed to discover authorization server metadata", void 0);
          let g2 = b1(this.authorizationParameters.scope, this.authorizationParameters.audience) || b_.m1, h2 = new URL("/oauth/token", this.issuer).toString(), i2 = { grant_type: "urn:okta:params:oauth:grant-type:webauthn", client_id: this.clientMetadata.client_id, auth_session: a10.authSession, authn_response: a10.authResponse, scope: g2 };
          this.clientSecret && (i2.client_secret = this.clientSecret), this.authorizationParameters.audience && (i2.audience = this.authorizationParameters.audience), a10.connection && (i2.realm = a10.connection), a10.organization && (i2.organization = a10.organization);
          let j2 = this.useDPoP && this.dpopKeyPair ? dD.UM(this.clientMetadata, this.dpopKeyPair) : void 0;
          try {
            d10 = await (0, d$.bp)(async () => {
              let a11 = this.httpOptions();
              a11.headers.set("Content-Type", "application/json");
              let b11 = new URL(h2);
              j2 && await j2.addProof(b11, a11.headers, "POST");
              let c11 = await this.fetch(h2, { method: "POST", body: JSON.stringify(i2), ...a11 });
              return j2 && j2.cacheNonce(c11, b11), dD.kU(f2, this.clientMetadata, c11);
            }, { isDPoPEnabled: !!j2, ...this.dpopOptions?.retry });
          } catch (b11) {
            if (b11?.code === dD.lp) {
              let a12 = b11.cause?.claim;
              if ("iss" === a12) throw new bY("invalid_issuer", "ID token issuer mismatch. Check AUTH0_DOMAIN configuration.");
              if ("aud" === a12) throw new bY("invalid_audience", "ID token audience mismatch. Check AUTH0_CLIENT_ID configuration.");
            }
            let a11 = await fa(b11);
            throw new bY(a11.error || "unknown_error", a11.error_description || b11.message || "Passkey verification failed", a11.error ? { error: a11.error, error_description: a11.error_description ?? "" } : void 0);
          }
          if (!d10.id_token) throw new bY("missing_id_token", "No id_token in passkey get-token response. Ensure 'openid' scope is requested.");
          let k2 = dC(d10.id_token), l2 = { user: k2, tokenSet: { accessToken: d10.access_token, idToken: d10.id_token, scope: d10.scope, refreshToken: d10.refresh_token, expiresAt: Math.floor(Date.now() / 1e3) + Number(d10.expires_in), token_type: b2(d10.token_type) }, internal: { sid: k2.sid || "", createdAt: Math.floor(Date.now() / 1e3), ...this.provider?.isResolverMode && { mcd: { domain: this.domain, issuer: this.issuer } } } };
          l2 = await this.finalizeSession(l2, d10.id_token), await this.sessionStore.set(b10, c10, l2, true);
        }
        async handlePasskeyRegister(a10) {
          try {
            let b10 = await e9(a10), c10 = {};
            b10.email && (c10.email = b10.email), b10.username && (c10.username = b10.username), b10.phoneNumber && (c10.phoneNumber = b10.phoneNumber), b10.name && (c10.name = b10.name), b10.givenName && (c10.givenName = b10.givenName), b10.familyName && (c10.familyName = b10.familyName), b10.nickname && (c10.nickname = b10.nickname), b10.picture && (c10.picture = b10.picture), b10.userMetadata && (c10.userMetadata = b10.userMetadata), b10.connection && (c10.connection = b10.connection), b10.organization && (c10.organization = b10.organization);
            let d10 = await this.passkeyRegister(c10);
            return aj.json(d10);
          } catch (a11) {
            if (a11 instanceof bW) {
              if ("unexpected_error" === a11.error) return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
              return aj.json(a11.toJSON(), { status: 400 });
            }
            if (a11 instanceof bm) return aj.json({ error: a11.code, error_description: a11.message }, { status: 400 });
            return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
          }
        }
        async handlePasskeyChallenge(a10) {
          try {
            let b10 = await e9(a10), c10 = {};
            "string" == typeof b10.connection && (c10.connection = b10.connection), "string" == typeof b10.organization && (c10.organization = b10.organization);
            let d10 = await this.passkeyChallenge(c10);
            return aj.json(d10);
          } catch (a11) {
            if (a11 instanceof bX) {
              if ("unexpected_error" === a11.error) return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
              return aj.json(a11.toJSON(), { status: 400 });
            }
            if (a11 instanceof bm) return aj.json({ error: a11.code, error_description: a11.message }, { status: 400 });
            return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
          }
        }
        async handlePasskeyGetToken(a10) {
          try {
            let b10 = await e9(a10), c10 = e8(b10.authSession, "authSession");
            if (!b10.authResponse || "object" != typeof b10.authResponse) return aj.json({ error: "invalid_request", error_description: "authResponse is required" }, { status: 400 });
            let d10 = { authSession: c10, authResponse: b10.authResponse };
            "string" == typeof b10.connection && (d10.connection = b10.connection), "string" == typeof b10.organization && (d10.organization = b10.organization);
            let e10 = aj.json({ success: true });
            return await this.passkeyGetToken(d10, a10.cookies, e10.cookies), e2(e10), e10;
          } catch (a11) {
            if (a11 instanceof bY) {
              if ((/* @__PURE__ */ new Set(["discovery_error", "unexpected_error"])).has(a11.error)) return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
              return aj.json(a11.toJSON(), { status: 403 });
            }
            if (a11 instanceof bm) return aj.json({ error: a11.code, error_description: a11.message }, { status: 400 });
            return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
          }
        }
        async handlePasskeyEnrollmentChallenge(a10) {
          try {
            let b10 = await e9(a10), c10 = {};
            "string" == typeof b10.connection && (c10.connection = b10.connection), "string" == typeof b10.userIdentityId && (c10.userIdentityId = b10.userIdentityId);
            let d10 = await this.passkeyEnrollmentChallenge(a10.cookies, c10);
            return aj.json(d10);
          } catch (a11) {
            if (a11 instanceof bZ) {
              if ("not_authenticated" === a11.error || "token_error" === a11.error) return aj.json(a11.toJSON(), { status: 401 });
              if ("unexpected_error" === a11.error) return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
              return aj.json(a11.toJSON(), { status: 400 });
            }
            if (a11 instanceof bm) return aj.json({ error: a11.code, error_description: a11.message }, { status: 400 });
            return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
          }
        }
        async handlePasskeyEnrollmentVerify(a10) {
          try {
            let b10 = await e9(a10), c10 = e8(b10.authenticationMethodId, "authenticationMethodId"), d10 = e8(b10.authSession, "authSession");
            if (!b10.authResponse || "object" != typeof b10.authResponse) return aj.json({ error: "invalid_request", error_description: "authResponse is required" }, { status: 400 });
            let e10 = { authenticationMethodId: c10, authSession: d10, authResponse: b10.authResponse }, f2 = await this.passkeyEnrollmentVerify(e10, a10.cookies);
            return aj.json(f2);
          } catch (a11) {
            if (a11 instanceof b$) {
              if ("not_authenticated" === a11.error || "token_error" === a11.error) return aj.json(a11.toJSON(), { status: 401 });
              if ("unexpected_error" === a11.error) return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
              return aj.json(a11.toJSON(), { status: 400 });
            }
            if (a11 instanceof bm) return aj.json({ error: a11.code, error_description: a11.message }, { status: 400 });
            return aj.json({ error: "server_error", error_description: "Internal server error" }, { status: 500 });
          }
        }
        async passkeyEnrollmentChallenge(a10, b10) {
          let { error: c10, session: d10 } = await this.getSessionWithDomainCheck(a10);
          if (c10 || !d10) throw new bZ("not_authenticated", c10?.message ?? "The user does not have an active session.");
          let [e10, f2] = await this.getTokenSet(d10, { audience: `${this.issuer}me/`, scope: "create:me:authentication_methods" });
          if (e10) throw new bZ("token_error", "Failed to retrieve MyAccount access token.");
          let { tokenSet: g2 } = f2, h2 = new URL("/me/v1/authentication-methods", this.issuer).toString(), i2 = this.httpOptions();
          i2.headers.set("Content-Type", "application/json"), i2.headers.set("Authorization", `Bearer ${g2.accessToken}`);
          let j2 = { type: "passkey" };
          b10?.connection && (j2.connection = b10.connection), b10?.userIdentityId && (j2.identity = b10.userIdentityId);
          try {
            let a11 = await this.fetch(h2, { method: "POST", body: JSON.stringify(j2), ...i2 });
            if (!a11.ok) {
              let b12 = await a11.json().catch(() => ({ error_description: "Failed to get passkey enrollment challenge" }));
              throw new bZ(b12.error || "unknown_error", b12.error_description || "Failed to get passkey enrollment challenge", b12.error ? b12 : void 0);
            }
            let b11 = (a11.headers.get("Location") ?? "").split("/").pop() ?? "";
            if (!b11) throw new bZ("unexpected_error", "No authentication method ID in Location header.");
            let c11 = await a11.json();
            return { authenticationMethodId: b11, authSession: c11.auth_session, authnParamsPublicKey: c11.authn_params_public_key };
          } catch (a11) {
            if (a11 instanceof bZ) throw a11;
            throw new bZ("unexpected_error", "Unexpected error during passkey enrollment challenge.");
          }
        }
        async passkeyEnrollmentVerify(a10, b10) {
          let { error: c10, session: d10 } = await this.getSessionWithDomainCheck(b10);
          if (c10 || !d10) throw new b$("not_authenticated", c10?.message ?? "The user does not have an active session.");
          let [e10, f2] = await this.getTokenSet(d10, { audience: `${this.issuer}me/`, scope: "create:me:authentication_methods" });
          if (e10) throw new b$("token_error", "Failed to retrieve MyAccount access token.");
          let { tokenSet: g2 } = f2, h2 = new URL(`/me/v1/authentication-methods/${a10.authenticationMethodId}/verify`, this.issuer).toString(), i2 = this.httpOptions();
          i2.headers.set("Content-Type", "application/json"), i2.headers.set("Authorization", `Bearer ${g2.accessToken}`);
          try {
            let b11 = await this.fetch(h2, { method: "POST", body: JSON.stringify({ auth_session: a10.authSession, authn_response: a10.authResponse }), ...i2 });
            if (!b11.ok) {
              let a11 = await b11.json().catch(() => ({ error_description: "Failed to verify passkey enrollment" }));
              throw new b$(a11.error || "unknown_error", a11.error_description || "Failed to verify passkey enrollment", a11.error ? a11 : void 0);
            }
            return await b11.json();
          } catch (a11) {
            if (a11 instanceof b$) throw a11;
            throw new b$("unexpected_error", "Unexpected error during passkey enrollment verification.");
          }
        }
        async createSessionFromPasswordlessVerify(a10, b10, c10) {
          if (!a10.id_token) throw new bQ("missing_id_token", "No id_token in passwordless verify response. Ensure 'openid' scope is requested.");
          let d10 = dC(a10.id_token), e10 = { user: d10, tokenSet: { accessToken: a10.access_token, idToken: a10.id_token, scope: a10.scope, refreshToken: a10.refresh_token, expiresAt: Math.floor(Date.now() / 1e3) + Number(a10.expires_in), token_type: a10.token_type }, internal: { sid: d10.sid || "", createdAt: Math.floor(Date.now() / 1e3), ...this.provider?.isResolverMode && { mcd: { domain: this.domain, issuer: this.issuer } } } };
          e10 = await this.finalizeSession(e10, a10.id_token), await this.sessionStore.set(b10, c10, e10, true);
        }
        async passwordlessStart(a10, b10, c10) {
          let d10;
          if ("email" === a10.connection && "send" in a10 && "link" === a10.send) {
            let b11 = dY(this.appBaseUrl, c10), e11 = fd(this.routes.callback, b11).toString(), f3 = dD.Ot(), g3 = dZ(this.authorizationParameters, void 0, ["client_id", "redirect_uri", "response_type", "state", "nonce", "code_challenge", "code_challenge_method"]), h2 = this.authorizationParameters.audience, i2 = b1(this.authorizationParameters.scope, h2) || "openid email profile";
            a10 = { ...a10, authParams: { ...Object.fromEntries(g3), redirect_uri: e11, response_type: p.CODE, scope: i2, state: f3, ...h2 && { audience: h2 } } }, d10 = { responseType: p.CODE, state: f3, returnTo: this.signInReturnToPath, scope: i2, audience: this.authorizationParameters.audience, originDomain: this.provider?.isResolverMode ? this.domain : void 0, originIssuer: this.provider?.isResolverMode ? this.issuer : void 0 };
          }
          let e10 = new URL("/passwordless/start", this.issuer).toString(), f2 = this.httpOptions();
          f2.headers.set("Content-Type", "application/json"), a10.language && f2.headers.set("x-request-language", a10.language);
          let g2 = { client_id: this.clientMetadata.client_id, connection: a10.connection };
          this.clientSecret && (g2.client_secret = this.clientSecret), "email" === a10.connection ? (g2.email = a10.email, g2.send = a10.send) : g2.phone_number = a10.phoneNumber, a10.authParams && (g2.authParams = a10.authParams);
          try {
            let a11 = await this.fetch(e10, { method: "POST", body: JSON.stringify(g2), ...f2 });
            if (!a11.ok) {
              let b11 = await a11.json().catch(() => ({ error: "unknown_error", error_description: "Failed to start passwordless flow" }));
              throw new bP(b11.error || "unknown_error", b11.error_description || "Failed to start passwordless flow", b11.error ? b11 : void 0);
            }
          } catch (a11) {
            if (a11 instanceof bP) throw a11;
            throw new bP("unexpected_error", "Unexpected error during passwordless start", void 0);
          }
          if (d10) {
            if (!b10) throw new br("Magic link requires a response cookies object to persist the transaction state. Pass the NextResponse cookies (App Router: next/headers cookies; Pages Router: res.cookies).");
            await this.transactionStore.save(b10, d10);
          }
        }
        async passwordlessVerify(a10) {
          let b10;
          await this.ensureDpopValidated();
          let [c10, d10] = await this.discoverAuthorizationServerMetadata();
          if (c10) throw new bQ("discovery_error", "Failed to discover authorization server metadata", void 0);
          let e10 = new URLSearchParams();
          e10.append("realm", a10.connection), e10.append("otp", a10.verificationCode), "email" === a10.connection ? e10.append("username", a10.email) : e10.append("username", a10.phoneNumber);
          let f2 = b1(this.authorizationParameters.scope, this.authorizationParameters.audience) || b_.m1;
          e10.append("scope", f2), this.authorizationParameters.audience && e10.append("audience", this.authorizationParameters.audience);
          let g2 = this.useDPoP && this.dpopKeyPair ? dD.UM(this.clientMetadata, this.dpopKeyPair) : void 0;
          try {
            b10 = await (0, d$.bp)(async () => {
              let a11 = await dD.Nb(d10, this.clientMetadata, await this.getClientAuth(), "http://auth0.com/oauth/grant-type/passwordless/otp", e10, { ...this.httpOptions(), [dD.A6]: this.fetch, [dD.cm]: this.allowInsecureRequests, ...g2 && { DPoP: g2 } });
              return dD.kU(d10, this.clientMetadata, a11);
            }, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
          } catch (b11) {
            if (b11?.code === dD.lp) {
              let a12 = b11.cause?.claim;
              if ("iss" === a12) throw new bQ("invalid_issuer", "ID token issuer mismatch. Check AUTH0_DOMAIN configuration.");
              if ("aud" === a12) throw new bQ("invalid_audience", "ID token audience mismatch. Check AUTH0_CLIENT_ID configuration.");
            }
            let a11 = await fa(b11);
            throw new bQ(a11.error || "unknown_error", a11.error_description || b11.message || "Passwordless verification failed", a11.error ? { error: a11.error, error_description: a11.error_description ?? "" } : void 0);
          }
          return { access_token: b10.access_token, refresh_token: b10.refresh_token, id_token: b10.id_token, token_type: b2(b10.token_type), scope: b10.scope, expires_in: Number(b10.expires_in) };
        }
      }
      q = /* @__PURE__ */ new WeakSet(), r = function(a10, b10) {
        var c10;
        let d10, e10 = a10.tokenSet, f2 = b10.audience, g2 = b10.scope, h2 = !f2 || f2 === (e10.audience || this.authorizationParameters.audience), i2 = !g2 || b7(e10.requestedScope || b1(this.authorizationParameters.scope, f2), g2);
        return h2 && i2 ? e10 : (f2 && (d10 = b9(a10, { scope: g2, audience: f2 })), c10 = d10, { ...e10, accessToken: c10?.accessToken, expiresAt: c10?.expiresAt, scope: c10?.scope, requestedScope: c10?.requestedScope, audience: c10?.audience, ...c10?.token_type && { token_type: c10.token_type } });
      }, s = async function(a10, b10) {
        let c10 = fh(a10), d10 = fj(a10, b10);
        c10.set("host", d10.host);
        try {
          let a11 = await this.fetch(d10.toString(), { method: "OPTIONS", headers: c10 });
          return new aj(null, { status: a11.status, headers: fi(a11) });
        } catch (a11) {
          return new aj(a11.cause || a11.message || "Preflight request failed", { status: 500 });
        }
      }, t = async function(a10, b10) {
        let c10, { error: d10, session: e10 } = await this.getSessionWithDomainCheck(a10.cookies);
        if (d10 || !e10) return new aj(d10?.message ?? "The user does not have an active session.", { status: 401 });
        if ("OPTIONS" === a10.method && a10.headers.has("access-control-request-method")) return fq(this, q, "m", s).call(this, a10, b10);
        let f2 = fh(a10), g2 = this.useDPoP ? a10.clone() : a10, h2 = fj(a10, b10);
        f2.set("host", h2.host);
        let i2 = g2.body ? await g2.arrayBuffer() : void 0, k2 = structuredClone(e10), l2 = /* @__PURE__ */ new Map(), m2 = (a11) => {
          let b11 = cb(k2, a11.tokenSet, { scope: this.authorizationParameters?.scope ?? b_.m1, audience: this.authorizationParameters?.audience });
          b11 && Object.assign(k2, b11), a11.idTokenClaims && (k2.user = a11.idTokenClaims);
        }, n2 = async (a11) => {
          let b11 = JSON.stringify([a11.refresh ?? false, a11.audience ?? null, a11.scope ?? null]), d11 = l2.get(b11);
          if (d11) return c10 = d11, d11.tokenSet;
          let [e11, f3] = await this.getTokenSet(k2, { audience: a11.audience, scope: a11.scope });
          if (e11) throw e11;
          return m2(f3), l2.set(b11, f3), c10 = f3, f3.tokenSet;
        }, o2 = this.useDPoP && this.dpopKeyPair ? this.proxyDpopHandles[b10.audience] ??= dD.UM(this.clientMetadata, this.dpopKeyPair) : void 0, p2 = await this.fetcherFactory({ useDPoP: this.useDPoP, fetch: this.fetch, getAccessToken: n2, dpopHandle: o2 });
        try {
          let d11 = await p2.fetchWithAuth(h2.toString(), { method: g2.method, headers: f2, body: i2 }, { scope: b10.scope, audience: b10.audience }), j2 = new aj(d11.body, { status: d11.status, statusText: d11.statusText, headers: fi(d11) });
          return c10 && await fq(this, q, "m", u).call(this, a10, j2, e10, c10), j2;
        } catch (b11) {
          if (b11 instanceof bL) return fq(this, q, "m", v).call(this, a10, k2, b11);
          if (b11 instanceof by && b11.code === j.MISSING_REFRESH_TOKEN) return new aj(b11.message, { status: 401 });
          return new aj(b11.cause || b11.message || "An error occurred while proxying the request.", { status: 500 });
        }
      }, u = async function(a10, b10, c10, d10) {
        let e10 = cb(c10, d10.tokenSet, { scope: this.authorizationParameters?.scope ?? b_.m1, audience: this.authorizationParameters?.audience });
        if (e10) {
          d10.idTokenClaims && (c10.user = d10.idTokenClaims);
          let f2 = await this.finalizeSession({ ...c10, ...e10 }, d10.tokenSet.idToken);
          await this.sessionStore.set(a10.cookies, b10.cookies, f2), e2(b10);
        }
      }, v = async function(a10, b10, c10) {
        let d10 = aj.json(c10.toJSON(), { status: 403 });
        return await this.sessionStore.set(a10.cookies, d10.cookies, b10), e2(d10), d10;
      }, w = async function(a10, b10) {
        let c10;
        await this.ensureDpopValidated();
        let [d10, e10] = await this.discoverAuthorizationServerMetadata();
        if (d10) return [d10, null];
        let f2 = new URLSearchParams();
        b10.scope && f2.append("scope", b10.scope), b10.audience && f2.append("audience", b10.audience);
        let g2 = this.useDPoP && this.dpopKeyPair ? dD.UM(this.clientMetadata, this.dpopKeyPair) : void 0, h2 = async () => dD.ur(e10, this.clientMetadata, await this.getClientAuth(), a10.refreshToken, { ...this.httpOptions(), [dD.A6]: this.fetch, [dD.cm]: this.allowInsecureRequests, additionalParameters: f2, ...g2 && { DPoP: g2 } }), i2 = (a11) => dD.Tv(e10, this.clientMetadata, a11);
        try {
          c10 = await (0, d$.bp)(async () => {
            let a11 = await h2();
            return await i2(a11);
          }, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
        } catch (c11) {
          let a11 = await fa(c11);
          if (c11 && "object" == typeof c11 && ("mfa_required" === c11.error || "mfa_required" === c11.code)) {
            let { mfa_token: d11, error_description: e11, mfa_requirements: f3 } = function(a12) {
              if (!a12 || "object" != typeof a12) return { mfa_token: void 0, error_description: void 0, mfa_requirements: void 0 };
              let b11 = a12.cause;
              return { mfa_token: b11?.mfa_token ?? a12.mfa_token, error_description: a12.error_description, mfa_requirements: b11?.mfa_requirements ?? a12.mfa_requirements };
            }(c11);
            if (d11) return [new bL(e11 ?? "Multi-factor authentication is required.", await e4(d11, b10.audience || "", b10.requestedScope, f3, this.sessionStore.secret, this.mfaTokenTtl), f3, new bn({ code: a11.error ?? "unknown_error", message: a11.error_description })), null];
            return console.error("MFA required but no mfa_token - user needs to re-authenticate"), [new bL(e11 ?? "Multi-factor authentication is required. Please log in again.", "", f3, new bn({ code: a11.error ?? "unknown_error", message: a11.error_description })), null];
          }
          return [new by(j.FAILED_TO_REFRESH_TOKEN, "The access token has expired and there was an error while trying to refresh it.", new bn({ code: a11.error ?? "unknown_error", message: a11.error_description })), null];
        }
        let k2 = dD.ON(c10), l2 = Math.floor(Date.now() / 1e3) + Number(c10.expires_in), m2 = { ...a10, accessToken: c10.access_token, idToken: c10.id_token, scope: c10.scope, requestedScope: b10.requestedScope, expiresAt: l2, audience: a10.audience || b10.audience || void 0, ...c10.token_type && { token_type: c10.token_type } };
        return c10.refresh_token ? m2.refreshToken = c10.refresh_token : m2.refreshToken = a10.refreshToken, [null, { updatedTokenSet: m2, idTokenClaims: k2 }];
      }, fs.MAX_RESPONSE_BODY_SIZE = 1048576;
      let ft = (a10) => {
        let b10 = new TextEncoder().encode(a10), c10 = [];
        for (let a11 = 0; a11 < b10.length; a11 += 32768) c10.push(String.fromCharCode.apply(null, b10.subarray(a11, a11 + 32768)));
        return btoa(c10.join(""));
      };
      async function fu(a10, b10) {
        let c10 = b10 === n.FAILED_TO_INITIATE ? "initiate" : "complete";
        try {
          let d10 = await a10.json();
          return [new bD({ code: b10, message: `The request to ${c10} the connect account flow failed with status ${a10.status}.`, cause: new bC({ type: d10.type, title: d10.title, detail: d10.detail, status: a10.status, validationErrors: d10.validation_errors }) }), null];
        } catch (d10) {
          return [new bD({ code: b10, message: `The request to ${c10} the connect account flow failed with status ${a10.status}.` }), null];
        }
      }
      function fv(a10, b10) {
        return new aj(a10, { status: b10, headers: { "Content-Type": "text/plain" } });
      }
      function fw(a10) {
        try {
          let { iss: b10 } = dC(a10);
          if ("string" != typeof b10 || !b10) return [Error("Missing or invalid 'iss' claim in logout token."), null];
          return [null, ce(b10)];
        } catch (a11) {
          return [a11 instanceof Error ? a11 : Error(String(a11)), null];
        }
      }
      function fx(a10) {
        if (a10 instanceof ae) return a10;
        let b10 = function(a11) {
          let b11;
          try {
            let c11 = a11.nextUrl;
            if (!c11) return;
            "string" == typeof c11.basePath && c11.basePath && (b11 = { basePath: c11.basePath }), ("string" == typeof c11.locale || "string" == typeof c11.defaultLocale) && (b11 = { ...b11 || {}, i18n: { locales: c11.locale ? [c11.locale] : [], defaultLocale: c11.defaultLocale } }), "boolean" == typeof c11.trailingSlash && (b11 = { ...b11 || {}, trailingSlash: c11.trailingSlash });
          } catch {
          }
          return b11 && Object.keys(b11).length ? b11 : void 0;
        }(a10), c10 = { method: a10.method, headers: a10.headers, body: a10.body, duplex: a10.duplex ?? "half" };
        return b10 && (c10.nextConfig = b10), new ae(a10.url, c10);
      }
      function fy(a10) {
        let b10 = new Headers();
        for (let c10 in a10.headers) {
          let d10 = a10.headers[c10];
          if (Array.isArray(d10)) for (let a11 of d10) b10.append(c10, a11);
          else void 0 !== d10 && b10.append(c10, d10);
        }
        return b10;
      }
      class fz {
        constructor(a10) {
          this.provider = a10;
        }
        async getAuthClient(a10) {
          let b10 = a10 ? a10.headers : await (0, bl.headers)(), c10 = a10?.nextUrl;
          return this.provider.forRequest(b10, c10);
        }
        async getAuthenticators(a10) {
          let b10 = await this.getAuthClient();
          return (await b10.mfaGetAuthenticators(a10.mfaToken)).map(d0);
        }
        async challenge(a10) {
          var b10;
          let c10 = await this.getAuthClient();
          return { challengeType: (b10 = await c10.mfaChallenge(a10.mfaToken, a10.challengeType, a10.authenticatorId)).challenge_type, oobCode: b10.oob_code, bindingMethod: b10.binding_method };
        }
        async enroll(a10) {
          let { mfaToken: b10, ...c10 } = function(a11) {
            if ("factorType" in a11) {
              let b11 = d1[a11.factorType];
              if (!b11) throw new bF(`Unknown factorType: ${a11.factorType}`);
              if (("sms" === a11.factorType || "voice" === a11.factorType) && !("phoneNumber" in a11 && a11.phoneNumber)) throw new bF(`phoneNumber is required for factorType: ${a11.factorType}`);
              let c11 = { mfaToken: a11.mfaToken, authenticatorTypes: b11.authenticator_types };
              return b11.oob_channels && (c11.oobChannels = b11.oob_channels), "phoneNumber" in a11 && void 0 !== a11.phoneNumber && (c11.phoneNumber = a11.phoneNumber), "email" in a11 && void 0 !== a11.email && (c11.email = a11.email), c11;
            }
            return a11;
          }(a10), d10 = await this.getAuthClient();
          var e10 = await d10.mfaAssociate(b10, c10);
          let f2 = { authenticatorType: e10.authenticator_type, id: e10.id, recoveryCodes: e10.recovery_codes };
          if ("otp" === e10.authenticator_type) return { ...f2, authenticatorType: "otp", secret: e10.secret, barcodeUri: e10.barcode_uri };
          if ("oob" === e10.authenticator_type) return { ...f2, authenticatorType: "oob", oobChannel: e10.oob_channel, name: e10.name, oobCode: e10.oob_code, bindingMethod: e10.binding_method, barcodeUri: e10.barcode_uri };
          throw Error(`Unknown authenticator type: ${e10.authenticator_type}`);
        }
        async verify(a10, b10, d10) {
          if (a10 instanceof ae) {
            if (!b10 || !d10) throw TypeError("verify(req, res, options): All three arguments required for Pages Router");
            let c10 = await this.getAuthClient(a10), e10 = await c10.mfaVerify(d10);
            return await c10.cacheTokenFromMfaVerify(e10, d10.mfaToken, a10.cookies, b10.cookies), e10;
          }
          {
            if (void 0 !== b10 || void 0 !== d10) throw TypeError("verify(options): Only one argument allowed for App Router");
            let e10 = await this.getAuthClient(), f2 = await e10.mfaVerify(a10), { cookies: g2 } = await Promise.resolve().then(c.bind(c, 982)), h2 = await g2();
            return await e10.cacheTokenFromMfaVerify(f2, a10.mfaToken, h2, h2), f2;
          }
        }
      }
      class fA {
        constructor(a10) {
          this.provider = a10;
        }
        async getAuthClient(a10) {
          let { headers: b10 } = await Promise.resolve().then(c.bind(c, 982)), d10 = a10 ? a10.headers : await b10(), e10 = a10?.nextUrl;
          return this.provider.forRequest(d10, e10);
        }
        async register(a10, b10) {
          return a10 instanceof ae ? (await this.getAuthClient(a10)).passkeyRegister(b10) : (await this.getAuthClient()).passkeyRegister(a10);
        }
        async challenge(a10, b10) {
          return a10 instanceof ae ? (await this.getAuthClient(a10)).passkeyChallenge(b10) : (await this.getAuthClient()).passkeyChallenge(a10);
        }
        async getToken(a10, b10, c10) {
          if (a10 instanceof ae) {
            if (!b10 || !c10) throw TypeError("getToken(req, res, options): All three arguments required for Pages Router");
            let d10 = await this.getAuthClient(a10);
            await d10.passkeyGetToken(c10, a10.cookies, b10.cookies);
          } else {
            if (void 0 !== b10 || void 0 !== c10) throw TypeError("getToken(options): Only one argument allowed for App Router");
            let d10 = await this.getAuthClient(), e10 = await (0, bl.cookies)();
            await d10.passkeyGetToken(a10, e10, e10);
          }
        }
        async enrollmentChallenge(a10, b10) {
          if (a10 instanceof ae) return (await this.getAuthClient(a10)).passkeyEnrollmentChallenge(a10.cookies, b10);
          let c10 = await this.getAuthClient(), d10 = await (0, bl.cookies)();
          return c10.passkeyEnrollmentChallenge(d10, a10);
        }
        async enrollmentVerify(a10, b10) {
          if (a10 instanceof ae) {
            if (!b10) throw TypeError("enrollmentVerify(req, options): Both arguments required for Pages Router");
            return (await this.getAuthClient(a10)).passkeyEnrollmentVerify(b10, a10.cookies);
          }
          let c10 = await this.getAuthClient(), d10 = await (0, bl.cookies)();
          return c10.passkeyEnrollmentVerify(a10, d10);
        }
      }
      class fB {
        constructor(a10) {
          this.provider = a10;
        }
        async getAuthClient(a10) {
          let { headers: b10 } = await Promise.resolve().then(c.bind(c, 982)), d10 = a10 ? a10.headers : await b10(), e10 = a10?.nextUrl;
          return this.provider.forRequest(d10, e10);
        }
        async start(a10, b10, c10) {
          if (a10 instanceof ae) {
            if (!(b10 instanceof aj) || !c10) throw TypeError("start(req, res, options): All three arguments required for Pages Router");
            return (await this.getAuthClient(a10)).passwordlessStart(c10, b10.cookies, a10);
          }
          let d10 = await this.getAuthClient(), e10 = "email" === a10.connection && "link" === a10.send ? await (0, bl.cookies)() : void 0;
          return d10.passwordlessStart(a10, e10);
        }
        async verify(a10, b10, c10) {
          if (a10 instanceof ae) {
            if (!b10 || !c10) throw TypeError("verify(req, res, options): All three arguments required for Pages Router");
            let d10 = await this.getAuthClient(a10), e10 = await d10.passwordlessVerify(c10);
            await d10.createSessionFromPasswordlessVerify(e10, a10.cookies, b10.cookies);
          } else {
            if (void 0 !== b10 || void 0 !== c10) throw TypeError("verify(options): Only one argument allowed for App Router");
            let d10 = await this.getAuthClient(), e10 = await d10.passwordlessVerify(a10), f2 = await (0, bl.cookies)();
            await d10.createSessionFromPasswordlessVerify(e10, f2, f2);
          }
        }
      }
      class fC {
        constructor({ secret: a10, rolling: b10 = true, absoluteDuration: c10 = 259200, inactivityDuration: d10 = 86400, store: e10, cookieOptions: f2 }) {
          this.secret = a10, this.rolling = b10, this.absoluteDuration = c10, this.inactivityDuration = d10, this.store = e10, this.sessionCookieName = f2?.name ?? "__session", this.cookieConfig = { httpOnly: true, sameSite: f2?.sameSite ?? "lax", secure: f2?.secure ?? false, path: f2?.path ?? "/", domain: f2?.domain, transient: f2?.transient };
        }
        get isRolling() {
          return this.rolling;
        }
        epoch() {
          return Date.now() / 1e3 | 0;
        }
        calculateMaxAge(a10) {
          if (!this.rolling) return this.absoluteDuration;
          let b10 = this.epoch(), c10 = Math.min(b10 + this.inactivityDuration, a10 + this.absoluteDuration) - b10;
          return c10 > 0 ? c10 : 0;
        }
      }
      let fD = "appSession";
      function fE(a10, b10) {
        let c10 = b10.user;
        return { user: c10, tokenSet: { idToken: b10.idToken ?? void 0, accessToken: b10.accessToken ?? void 0, scope: b10.accessTokenScope, refreshToken: b10.refreshToken, expiresAt: b10.accessTokenExpiresAt }, internal: { sid: c10.sid, createdAt: a10.iat } };
      }
      let fF = () => {
        let a10 = new Uint8Array(16);
        return crypto.getRandomValues(a10), Array.from(a10).map((a11) => a11.toString(16).padStart(2, "0")).join("");
      };
      class fG extends fC {
        constructor({ secret: a10, store: b10, rolling: c10, absoluteDuration: d10, inactivityDuration: e10, cookieOptions: f2 }) {
          super({ secret: a10, rolling: c10, absoluteDuration: d10, inactivityDuration: e10, cookieOptions: f2 }), this.store = b10;
        }
        async get(a10) {
          let b10 = a10.get(this.sessionCookieName) || a10.get(fD);
          if (!b10 || !b10.value) return null;
          let c10 = null;
          try {
            let a11 = await eW(b10.value, this.secret, void 0, true);
            if (null === a11) return null;
            c10 = a11.payload.id;
          } catch (a11) {
            if ("ERR_JWE_INVALID" === a11.code) {
              let a12 = await eX(b10.name, b10.value, this.secret);
              if (!a12) return null;
              c10 = a12;
            }
          }
          if (!c10) return null;
          let d10 = await this.store.get(c10);
          return d10 ? d10.header?.iat ? fE(d10.header, d10.data) : d10 : null;
        }
        async set(a10, b10, c10, d10 = false) {
          let e10 = null, f2 = a10.get(this.sessionCookieName)?.value;
          if (f2) {
            let a11 = await eW(f2, this.secret);
            a11 && (e10 = a11.payload.id);
          }
          e10 && d10 && (await this.store.delete(e10), e10 = fF());
          let g2 = d10 || null === e10 ? null : e10;
          if (e10 || (e10 = fF()), null !== g2) if ("function" == typeof this.store.update) {
            if (!await this.store.update(g2, c10)) return;
          } else {
            if (!await this.store.get(g2)) return;
            await this.store.set(g2, c10);
          }
          else await this.store.set(e10, c10);
          let h2 = this.calculateMaxAge(c10.internal.createdAt), i2 = this.epoch(), j2 = await eV({ id: e10 }, this.secret, i2 + h2);
          b10.set(this.sessionCookieName, j2.toString(), { ...this.cookieConfig, maxAge: h2 }), a10.set(this.sessionCookieName, j2.toString()), this.sessionCookieName !== fD && a10.has(fD) && e3(b10, fD, { domain: this.cookieConfig.domain, path: this.cookieConfig.path, secure: this.cookieConfig.secure, sameSite: this.cookieConfig.sameSite, httpOnly: this.cookieConfig.httpOnly });
        }
        async delete(a10, b10) {
          let c10 = { domain: this.cookieConfig.domain, path: this.cookieConfig.path, secure: this.cookieConfig.secure, sameSite: this.cookieConfig.sameSite, httpOnly: this.cookieConfig.httpOnly }, d10 = a10.get(this.sessionCookieName)?.value;
          if (e3(b10, this.sessionCookieName, c10), this.sessionCookieName !== fD && a10.has(fD) && e3(b10, fD, c10), !d10) return;
          let e10 = await eW(d10, this.secret);
          e10 && await this.store.delete(e10.payload.id);
        }
      }
      class fH extends fC {
        constructor({ secret: a10, rolling: b10, absoluteDuration: c10, inactivityDuration: d10, cookieOptions: e10 }) {
          super({ secret: a10, rolling: b10, absoluteDuration: c10, inactivityDuration: d10, cookieOptions: e10 }), this.connectionTokenSetsCookieName = "__FC";
        }
        async get(a10) {
          let b10 = e0(this.sessionCookieName, a10) ?? e0(fD, a10, true);
          if (!b10) return null;
          let c10 = await eW(b10, this.secret);
          if (!c10) return null;
          let d10 = c10.protectedHeader.iat ? fE(c10.protectedHeader, c10.payload) : c10.payload, e10 = this.getConnectionTokenSetsCookies(a10), f2 = [];
          for (let a11 of e10) {
            let b11 = await eW(a11.value, this.secret);
            b11 && f2.push(b11.payload);
          }
          return { ...d10, ...f2.length ? { connectionTokenSets: f2 } : {} };
        }
        async set(a10, b10, c10) {
          let { connectionTokenSets: d10, ...e10 } = c10, f2 = this.calculateMaxAge(c10.internal.createdAt), g2 = this.epoch(), h2 = (await eV(e10, this.secret, g2 + f2)).toString(), i2 = { ...this.cookieConfig, maxAge: f2 };
          !function(a11, b11, c11, d11, e11) {
            let { transient: f3, ...g3 } = c11, h3 = { ...g3 };
            if (f3 && delete h3.maxAge, new TextEncoder().encode(b11).length <= 3500) {
              e11.set(a11, b11, h3), d11.set(a11, b11), e_(d11, a11).forEach((a12) => {
                e3(e11, a12.name, { path: h3.path, domain: h3.domain, secure: h3.secure, sameSite: h3.sameSite, httpOnly: h3.httpOnly }), d11.delete(a12.name);
              });
              return;
            }
            let i3 = 0, j2 = 0;
            for (; i3 < b11.length; ) {
              let c12 = b11.slice(i3, i3 + 3500), f4 = `${a11}__${j2}`;
              e11.set(f4, c12, h3), d11.set(f4, c12), i3 += 3500, j2++;
            }
            let k2 = e_(d11, a11).length - j2;
            if (k2 > 0) for (let b12 = 0; b12 < k2; b12++) {
              let c12 = j2 + b12, f4 = `${a11}__${c12}`;
              e3(e11, f4, { path: h3.path, domain: h3.domain, secure: h3.secure, sameSite: h3.sameSite, httpOnly: h3.httpOnly }), d11.delete(f4);
            }
            e3(e11, a11, { path: h3.path, domain: h3.domain, secure: h3.secure, sameSite: h3.sameSite, httpOnly: h3.httpOnly }), d11.delete(a11);
          }(this.sessionCookieName, h2, i2, a10, b10), d10?.length && await Promise.all(d10.map((c11, d11) => this.storeInCookie(a10, b10, c11, `${this.connectionTokenSetsCookieName}_${d11}`, f2))), e0(fD, a10, true) && e1(fD, a10, b10, true, { domain: this.cookieConfig.domain, path: this.cookieConfig.path, secure: this.cookieConfig.secure, sameSite: this.cookieConfig.sameSite, httpOnly: this.cookieConfig.httpOnly });
        }
        async delete(a10, b10) {
          let c10 = { domain: this.cookieConfig.domain, path: this.cookieConfig.path, secure: this.cookieConfig.secure, sameSite: this.cookieConfig.sameSite, httpOnly: this.cookieConfig.httpOnly };
          e1(this.sessionCookieName, a10, b10, false, c10), e0(fD, a10, true) && e1(fD, a10, b10, true, c10), this.getConnectionTokenSetsCookies(a10).forEach((a11) => e3(b10, a11.name, c10));
        }
        async storeInCookie(a10, b10, c10, d10, e10) {
          let f2 = Math.floor(Date.now() / 1e3 + e10), g2 = await eV(c10, this.secret, f2), h2 = g2.toString();
          b10.set(d10, g2.toString(), { ...this.cookieConfig, maxAge: e10 }), a10.set(d10, h2);
          let i2 = new d7(new Headers());
          i2.set(d10, h2, { ...this.cookieConfig, maxAge: e10 }), new TextEncoder().encode(i2.toString()).length >= 4096 && (d10 === this.sessionCookieName ? console.warn(`The ${d10} cookie size exceeds 4096 bytes, which may cause issues in some browsers. Consider removing any unnecessary custom claims from the access token or the user profile. Alternatively, you can use a stateful session implementation to store the session data in a data store.`) : console.warn(`The ${d10} cookie size exceeds 4096 bytes, which may cause issues in some browsers. You can use a stateful session implementation to store the session data in a data store.`));
        }
        getConnectionTokenSetsCookies(a10) {
          return a10.getAll().filter((a11) => a11.name.startsWith(this.connectionTokenSetsCookieName));
        }
      }
      class fI {
        constructor({ secret: a10, cookieOptions: b10, enableParallelTransactions: c10 }) {
          this.secret = a10, this.transactionCookiePrefix = b10?.prefix ?? "__txn_", this.cookieOptions = { httpOnly: true, sameSite: b10?.sameSite ?? "lax", secure: b10?.secure ?? false, path: b10?.path ?? "/", domain: b10?.domain, maxAge: b10?.maxAge || 3600 }, this.enableParallelTransactions = c10 ?? true;
        }
        getTransactionCookieName(a10) {
          return this.enableParallelTransactions ? `${this.transactionCookiePrefix}${a10}` : `${this.transactionCookiePrefix}`;
        }
        getCookiePrefix() {
          return this.transactionCookiePrefix;
        }
        async save(a10, b10, c10) {
          if (!b10.state) throw Error("Transaction state is required");
          if (c10 && !this.enableParallelTransactions) {
            let a11 = this.getTransactionCookieName(b10.state);
            if (c10.get(a11)) return void console.warn("A transaction is already in progress. Only one transaction is allowed when parallel transactions are disabled.");
          }
          let d10 = this.cookieOptions.maxAge, e10 = Math.floor(Date.now() / 1e3 + d10), f2 = await eV(b10, this.secret, e10);
          a10.set(this.getTransactionCookieName(b10.state), f2.toString(), this.cookieOptions);
        }
        async get(a10, b10) {
          let c10 = this.getTransactionCookieName(b10), d10 = a10.get(c10)?.value;
          return d10 ? eW(d10, this.secret) : null;
        }
        async delete(a10, b10) {
          e3(a10, this.getTransactionCookieName(b10), { domain: this.cookieOptions.domain, path: this.cookieOptions.path, secure: this.cookieOptions.secure, sameSite: this.cookieOptions.sameSite, httpOnly: this.cookieOptions.httpOnly });
        }
        async deleteAll(a10, b10) {
          let c10 = this.getCookiePrefix(), d10 = { domain: this.cookieOptions.domain, path: this.cookieOptions.path, secure: this.cookieOptions.secure, sameSite: this.cookieOptions.sameSite, httpOnly: this.cookieOptions.httpOnly };
          a10.getAll().forEach((a11) => {
            a11.name.startsWith(c10) && e3(b10, a11.name, d10);
          });
        }
      }
      var fJ = function(a10, b10, c10, d10, e10) {
        if ("m" === d10) throw TypeError("Private method is not writable");
        if ("a" === d10 && !e10) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof b10 ? a10 !== b10 || !e10 : !b10.has(a10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === d10 ? e10.call(a10, c10) : e10 ? e10.value = c10 : b10.set(a10, c10), c10;
      }, fK = function(a10, b10, c10, d10) {
        if ("a" === c10 && !d10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof b10 ? a10 !== b10 || !d10 : !b10.has(a10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === c10 ? d10 : "a" === c10 ? d10.call(a10) : d10 ? d10.value : b10.get(a10);
      };
      class fL {
        constructor(a10 = {}) {
          x.set(this, void 0), fJ(this, x, a10, "f");
          let { domain: b10, clientId: c10, clientSecret: d10, appBaseUrl: e10, secret: f2, clientAssertionSigningKey: g2 } = this.validateAndExtractRequiredOptions(a10), h2 = a10.clientAssertionSigningAlg || process.env.AUTH0_CLIENT_ASSERTION_SIGNING_ALG;
          if (a10.useDPoP && !a10.dpopKeyPair) {
            let a11 = process.env.AUTH0_DPOP_PRIVATE_KEY, b11 = process.env.AUTH0_DPOP_PUBLIC_KEY;
            a11 && b11 || console.warn("WARNING: useDPoP is set to true but dpopKeyPair is not provided. DPoP will not be used and protected requests will use bearer authentication instead. To enable DPoP, provide a dpopKeyPair in the Auth0Client options or set AUTH0_DPOP_PUBLIC_KEY and AUTH0_DPOP_PRIVATE_KEY environment variables.");
          }
          let i2 = this.resolveMfaTokenTtl(a10.mfaTokenTtl, process.env.AUTH0_MFA_TOKEN_TTL), j2 = a10.tokenRefreshBuffer;
          if (null != j2 && ("number" != typeof j2 || !Number.isFinite(j2) || j2 < 0)) throw TypeError("tokenRefreshBuffer must be a non-negative number of seconds.");
          let k2 = j2 ?? 0, l2 = process.env.NEXT_PUBLIC_BASE_PATH, m2 = process.env.AUTH0_COOKIE_SECURE, n2 = a10.session?.cookie?.secure ?? (void 0 !== m2 ? "true" === m2 : void 0), o2 = { name: a10.session?.cookie?.name ?? "__session", secure: n2 ?? false, sameSite: a10.session?.cookie?.sameSite ?? process.env.AUTH0_COOKIE_SAME_SITE ?? "lax", path: a10.session?.cookie?.path ?? process.env.AUTH0_COOKIE_PATH ?? l2 ?? "/", transient: a10.session?.cookie?.transient ?? "true" === process.env.AUTH0_COOKIE_TRANSIENT, domain: a10.session?.cookie?.domain ?? process.env.AUTH0_COOKIE_DOMAIN }, p2 = a10.transactionCookie?.secure, q2 = { prefix: a10.transactionCookie?.prefix ?? "__txn_", secure: p2 ?? false, sameSite: a10.transactionCookie?.sameSite ?? "lax", path: a10.transactionCookie?.path ?? l2 ?? "/", maxAge: a10.transactionCookie?.maxAge ?? 3600, domain: a10.transactionCookie?.domain ?? process.env.AUTH0_COOKIE_DOMAIN };
          if (e10) (Array.isArray(e10) ? e10.every((a11) => "https:" === new URL(a11).protocol) : "https:" === new URL(e10).protocol) && (o2.secure = true, q2.secure = true);
          else if (1) {
            if (false === n2) throw new br("Session cookies must be marked secure in production when appBaseUrl is not configured. Set AUTH0_COOKIE_SECURE=true or session.cookie.secure=true.");
            if (false === p2) throw new br("Transaction cookies must be marked secure in production when appBaseUrl is not configured. Set transactionCookie.secure=true.");
            o2.secure = true, q2.secure = true;
          }
          this.routes = { login: process.env.NEXT_PUBLIC_LOGIN_ROUTE || "/auth/login", logout: "/auth/logout", callback: "/auth/callback", backChannelLogout: "/auth/backchannel-logout", profile: process.env.NEXT_PUBLIC_PROFILE_ROUTE || "/auth/profile", accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_ROUTE || "/auth/access-token", connectAccount: "/auth/connect", mfaAuthenticators: process.env.NEXT_PUBLIC_MFA_AUTHENTICATORS_ROUTE || "/auth/mfa/authenticators", mfaChallenge: process.env.NEXT_PUBLIC_MFA_CHALLENGE_ROUTE || "/auth/mfa/challenge", mfaVerify: process.env.NEXT_PUBLIC_MFA_VERIFY_ROUTE || "/auth/mfa/verify", mfaAssociate: process.env.NEXT_PUBLIC_MFA_ASSOCIATE_ROUTE || "/auth/mfa/associate", passwordlessStart: process.env.NEXT_PUBLIC_PASSWORDLESS_START_ROUTE || "/auth/passwordless/start", passwordlessVerify: process.env.NEXT_PUBLIC_PASSWORDLESS_VERIFY_ROUTE || "/auth/passwordless/verify", passkeyRegister: process.env.NEXT_PUBLIC_PASSKEY_REGISTER_ROUTE || "/auth/passkey/register", passkeyChallenge: process.env.NEXT_PUBLIC_PASSKEY_CHALLENGE_ROUTE || "/auth/passkey/challenge", passkeyGetToken: process.env.NEXT_PUBLIC_PASSKEY_GET_TOKEN_ROUTE || "/auth/passkey/get-token", passkeyEnrollmentChallenge: process.env.NEXT_PUBLIC_PASSKEY_ENROLLMENT_CHALLENGE_ROUTE || "/auth/passkey/enrollment-challenge", passkeyEnrollmentVerify: process.env.NEXT_PUBLIC_PASSKEY_ENROLLMENT_VERIFY_ROUTE || "/auth/passkey/enrollment-verify", ...a10.routes }, this.transactionStore = new fI({ secret: f2, cookieOptions: q2, enableParallelTransactions: a10.enableParallelTransactions ?? true }), this.sessionStore = a10.sessionStore ? new fG({ ...a10.session, secret: f2, store: a10.sessionStore, cookieOptions: o2 }) : new fH({ ...a10.session, secret: f2, cookieOptions: o2 });
          let r2 = new fn(a10.discoveryCache), s2 = b10 || (() => {
            let a11 = process.env.AUTH0_DOMAIN;
            if (!a11) throw new br("Missing: domain: Set AUTH0_DOMAIN env var or pass domain in options.");
            return a11;
          });
          this.provider = new cf({ domain: s2, allowInsecureRequests: a10.allowInsecureRequests, createAuthClient: (b11, j3) => new fs({ transactionStore: this.transactionStore, sessionStore: this.sessionStore, domain: b11, issuer: j3, clientId: c10, clientSecret: d10, clientAssertionSigningKey: g2, clientAssertionSigningAlg: h2, authorizationParameters: a10.authorizationParameters, pushedAuthorizationRequests: a10.pushedAuthorizationRequests, appBaseUrl: e10, secret: f2, signInReturnToPath: a10.signInReturnToPath, logoutStrategy: a10.logoutStrategy, includeIdTokenHintInOIDCLogoutUrl: a10.includeIdTokenHintInOIDCLogoutUrl, beforeSessionSaved: a10.beforeSessionSaved, onCallback: a10.onCallback, routes: this.routes, allowInsecureRequests: a10.allowInsecureRequests, httpTimeout: a10.httpTimeout, enableTelemetry: a10.enableTelemetry, enableAccessTokenEndpoint: a10.enableAccessTokenEndpoint, noContentProfileResponseWhenUnauthenticated: a10.noContentProfileResponseWhenUnauthenticated, enableConnectAccountEndpoint: a10.enableConnectAccountEndpoint, tokenRefreshBuffer: k2, useDPoP: a10.useDPoP || false, dpopKeyPair: a10.dpopKeyPair, dpopOptions: a10.dpopOptions, mfaTokenTtl: i2, cspNonce: a10.cspNonce, discoveryCache: r2, provider: this.provider }) });
          let t2 = this.provider.getAuthClientForStaticMode();
          t2 && (t2.provider = this.provider);
        }
        async middleware(a10) {
          let b10 = fx(a10), c10 = await this.provider.forRequest(b10.headers, b10.nextUrl);
          return c10.handler.bind(c10)(b10);
        }
        async getSession(a10) {
          let b10, { authClient: c10, normalizedReq: d10 } = await this.resolveRequestContext(a10);
          b10 = d10 ? d10 instanceof ae ? d10.cookies : this.createRequestCookies(d10) : await (0, bl.cookies)();
          let { error: e10, session: f2 } = await c10.getSessionWithDomainCheck(b10);
          if (e10) throw e10;
          return f2;
        }
        async getSessionFromAuthClient(a10, b10) {
          let c10;
          c10 = b10 ? b10 instanceof ae ? b10.cookies : this.createRequestCookies(b10) : await (0, bl.cookies)();
          let { error: d10, session: e10 } = await a10.getSessionWithDomainCheck(c10);
          if (d10) throw d10;
          return e10;
        }
        async getAccessToken(a10, b10, c10) {
          let d10, e10, f2 = { refresh: false }, g2 = {};
          if (a10 && (a10 instanceof Request || "object" == typeof a10.headers)) {
            if (d10 = a10, e10 = b10, g2 = { ...f2, ...c10 ?? {} }, !e10) throw TypeError("getAccessToken(req, res): The 'res' argument is missing. Both 'req' and 'res' must be provided together for Pages Router or middleware usage.");
          } else {
            if (void 0 !== b10 || void 0 !== c10) throw TypeError("getAccessToken: Invalid arguments. Valid signatures are getAccessToken(), getAccessToken(options), or getAccessToken(req, res, options).");
            g2 = { ...f2, ...a10 ?? {} };
          }
          return this.executeGetAccessToken(d10, e10, g2);
        }
        async executeGetAccessToken(a10, b10, c10) {
          let { authClient: d10, normalizedReq: e10 } = await this.resolveRequestContext(a10), f2 = await this.getSessionFromAuthClient(d10, e10);
          if (!f2) throw new by(j.MISSING_SESSION, "The user does not have an active session.");
          let [g2, h2] = await d10.getTokenSet(f2, c10);
          if (g2) throw g2 instanceof bL && await this.saveToSession(f2, a10, b10), g2;
          let { tokenSet: i2, idTokenClaims: k2 } = h2, l2 = cb(f2, i2, { scope: fK(this, x, "f").authorizationParameters?.scope ?? b_.m1, audience: fK(this, x, "f").authorizationParameters?.audience });
          if (l2) {
            k2 && (f2.user = k2);
            let c11 = await d10.finalizeSession({ ...f2, ...l2 }, i2.idToken);
            await this.saveToSession(c11, a10, b10);
          }
          return { token: i2.accessToken, scope: i2.scope, expiresAt: i2.expiresAt, token_type: i2.token_type, audience: i2.audience };
        }
        async getAccessTokenForConnection(a10, b10, c10) {
          let { authClient: d10, normalizedReq: e10 } = await this.resolveRequestContext(b10), f2 = await this.getSessionFromAuthClient(d10, e10);
          if (!f2) throw new bz(k.MISSING_SESSION, "The user does not have an active session.");
          let g2 = f2.connectionTokenSets?.find((b11) => b11.connection === a10.connection), [h2, i2] = await d10.getConnectionTokenSet(f2.tokenSet, g2, a10);
          if (null !== h2) throw h2;
          if (i2 && (!g2 || i2.accessToken !== g2.accessToken || i2.expiresAt !== g2.expiresAt || i2.scope !== g2.scope)) {
            let b11;
            b11 = g2 ? f2.connectionTokenSets?.map((b12) => b12.connection === a10.connection ? i2 : b12) : [...f2.connectionTokenSets || [], i2], await this.saveToSession({ ...f2, connectionTokenSets: b11 }, e10, c10);
          }
          return { token: i2.accessToken, scope: i2.scope, expiresAt: i2.expiresAt };
        }
        async customTokenExchange(a10) {
          let b10 = await (0, bl.headers)(), c10 = await this.provider.forRequest(b10, void 0), [d10, e10] = await c10.customTokenExchange(a10);
          if (null !== d10) throw d10;
          return e10;
        }
        get mfa() {
          return this._mfa || (this._mfa = new fz(this.provider)), this._mfa;
        }
        get passwordless() {
          return this._passwordless || (this._passwordless = new fB(this.provider)), this._passwordless;
        }
        get passkey() {
          return this._passkey || (this._passkey = new fA(this.provider)), this._passkey;
        }
        async updateSession(a10, b10, c10) {
          if (a10 instanceof Request && !(a10 instanceof ae) && (a10 = fx(a10)), b10 && b10 instanceof Response && !(b10 instanceof aj) && (b10 = function(a11) {
            if (a11 instanceof aj) return a11;
            let b11 = new Headers(a11.headers), c11 = new aj(a11.body, { status: a11.status, statusText: a11.statusText, headers: b11 });
            try {
              "url" in a11 && a11.url && (c11.url = a11.url);
            } catch {
            }
            return c11;
          }(b10)), b10) {
            let d10 = a10;
            if (!c10) throw Error("The session data is missing.");
            if (d10 instanceof ae && b10 instanceof aj) {
              let a11 = await this.getSession(d10);
              if (!a11) throw Error("The user is not authenticated.");
              await this.sessionStore.set(d10.cookies, b10.cookies, { ...c10, internal: { ...a11.internal } });
            } else {
              let a11 = await this.getSession(d10);
              if (!a11) throw Error("The user is not authenticated.");
              let e10 = new Headers(), f2 = new d7(e10), g2 = this.createRequestCookies(d10), h2 = b10;
              await this.sessionStore.set(g2, f2, { ...c10, internal: { ...a11.internal } });
              let i2 = [], j2 = {};
              for (let [a12, b11] of e10.entries()) "set-cookie" === a12.toLowerCase() ? i2.push(b11) : j2[a12] = b11;
              for (let [a12, b11] of (i2.length > 0 && h2.setHeader("set-cookie", i2), Object.entries(j2))) h2.setHeader(a12, b11);
            }
          } else {
            let b11 = await this.getSession();
            if (!b11) throw Error("The user is not authenticated.");
            let c11 = a10;
            if (!c11) throw Error("The session data is missing.");
            await this.sessionStore.set(await (0, bl.cookies)(), await (0, bl.cookies)(), { ...c11, internal: { ...b11.internal } });
          }
        }
        createRequestCookies(a10) {
          return new d6(fy(a10));
        }
        async resolveRequestContext(a10) {
          if (a10) {
            if (a10 instanceof Request) {
              let b12 = fx(a10);
              return { authClient: await this.provider.forRequest(b12.headers, b12.nextUrl), normalizedReq: b12 };
            }
            let b11 = fy(a10), c10 = function(a11) {
              try {
                let b12 = Array.isArray(a11.headers.host) ? a11.headers.host[0] : a11.headers.host;
                if (!b12) return;
                let c11 = Array.isArray(a11.headers["x-forwarded-proto"]) ? a11.headers["x-forwarded-proto"][0] : a11.headers["x-forwarded-proto"];
                return new URL(a11.url ?? "/", `${c11 || "https"}://${b12}`);
              } catch {
                return;
              }
            }(a10);
            return { authClient: await this.provider.forRequest(b11, c10), normalizedReq: a10 };
          }
          let b10 = await (0, bl.headers)();
          return { authClient: await this.provider.forRequest(b10, void 0) };
        }
        async startInteractiveLogin(a10 = {}) {
          let b10 = await (0, bl.headers)();
          return (await this.provider.forRequest(b10, void 0)).startInteractiveLogin(a10);
        }
        async getTokenByBackchannelAuth(a10) {
          let b10 = await (0, bl.headers)(), c10 = await this.provider.forRequest(b10, void 0), [d10, e10] = await c10.backchannelAuthentication(a10);
          if (d10) throw d10;
          return e10;
        }
        async connectAccount(a10) {
          let b10 = await (0, bl.headers)(), c10 = await this.provider.forRequest(b10, void 0);
          if (!await this.getSession()) throw new bD({ code: n.MISSING_SESSION, message: "The user does not have an active session." });
          let d10 = { audience: `${c10.issuer}me/`, scope: "create:me:connected_accounts" }, e10 = await this.getAccessToken(d10), [f2, g2] = await c10.connectAccount({ ...a10, tokenSet: { accessToken: e10.token, expiresAt: e10.expiresAt, scope: d10.scope, audience: e10.audience } });
          if (f2) throw f2;
          return g2;
        }
        withPageAuthRequired(a10, b10) {
          let d10, e10, f2 = { loginUrl: this.routes.login }, g2 = (d10 = this, (a11, b11 = {}) => async (e11) => {
            let g3 = await d10.getSession();
            if (!g3?.user) {
              let a12 = "function" == typeof b11.returnTo ? await b11.returnTo(e11) : b11.returnTo, { redirect: d11 } = await Promise.resolve().then(c.bind(c, 349));
              d11(`${f2.loginUrl}${a12 ? `?returnTo=${encodeURIComponent(a12)}` : ""}`);
            }
            return a11(e11);
          }), h2 = (e10 = this, ({ getServerSideProps: a11, returnTo: b11 } = {}) => async (c10) => {
            let d11 = await e10.getSession(c10.req);
            if (!d11?.user) return { redirect: { destination: `${f2.loginUrl}?returnTo=${encodeURIComponent(b11 || c10.resolvedUrl)}`, permanent: false } };
            let g3 = { props: {} };
            if (a11 && (g3 = await a11(c10)), g3.props instanceof Promise) {
              let a12 = await g3.props;
              return { ...g3, props: { user: d11.user, ...a12 } };
            }
            return { ...g3, props: { user: d11.user, ...g3.props } };
          });
          return "function" == typeof a10 ? g2(a10, b10) : h2(a10);
        }
        withApiAuthRequired(a10) {
          let b10, c10, d10 = (b10 = this, (a11) => async (c11, d11) => {
            let e11 = await b10.getSession(c11);
            if (!e11 || !e11.user) return void d11.status(401).json({ error: "not_authenticated", description: "The user does not have an active session or is not authenticated" });
            await a11(c11, d11);
          }), e10 = (c10 = this, (a11) => async (b11, d11) => {
            let e11 = b11 instanceof Request ? fx(b11) : b11, f2 = await c10.getSession();
            if (!f2 || !f2.user) return aj.json({ error: "not_authenticated", description: "The user does not have an active session or is not authenticated" }, { status: 401 });
            let g2 = await a11(e11, d11);
            return g2 instanceof aj ? g2 : new aj(g2.body, g2);
          });
          return (b11, c11) => b0(b11) ? e10(a10)(b11, c11) : d10(a10)(b11, c11);
        }
        async saveToSession(a10, b10, c10) {
          if (b10 && c10) if (b0(b10) && c10 instanceof aj) {
            let d10 = fx(b10);
            await this.sessionStore.set(d10.cookies, c10.cookies, a10);
          } else {
            let d10 = new Headers(), e10 = new d7(d10);
            for (let f2 of (await this.sessionStore.set(this.createRequestCookies(b10), e10, a10), d10.getSetCookie())) c10.appendHeader("set-cookie", f2);
            for (let [a11, b11] of d10.entries()) "set-cookie" !== a11.toLowerCase() && c10.setHeader(a11, b11);
          }
          else try {
            await this.sessionStore.set(await (0, bl.cookies)(), await (0, bl.cookies)(), a10);
          } catch (a11) {
          }
        }
        validateAndExtractRequiredOptions(a10) {
          let b10 = { domain: a10.domain ?? process.env.AUTH0_DOMAIN, clientId: a10.clientId ?? process.env.AUTH0_CLIENT_ID, secret: a10.secret ?? process.env.AUTH0_SECRET }, c10 = process.env.APP_BASE_URL?.includes(",") ? process.env.APP_BASE_URL.split(",").map((a11) => a11.trim()).filter(Boolean) : process.env.APP_BASE_URL, d10 = a10.appBaseUrl ?? c10, e10 = a10.clientSecret ?? process.env.AUTH0_CLIENT_SECRET, f2 = a10.clientAssertionSigningKey ?? process.env.AUTH0_CLIENT_ASSERTION_SIGNING_KEY, g2 = Object.entries(b10).filter(([, a11]) => !a11).map(([a11]) => a11);
          if (e10 || f2 || g2.push("clientAuthentication"), g2.length) {
            let a11 = { domain: "AUTH0_DOMAIN", clientId: "AUTH0_CLIENT_ID", secret: "AUTH0_SECRET" }, b11 = "WARNING: Not all required options were provided when creating an instance of Auth0Client. Ensure to provide all missing options, either by passing it to the Auth0Client constructor, or by setting the corresponding environment variable.\n";
            g2.forEach((c11) => {
              "clientAuthentication" === c11 ? b11 += `Missing: clientAuthentication: Set either AUTH0_CLIENT_SECRET env var or AUTH0_CLIENT_ASSERTION_SIGNING_KEY env var, or pass clientSecret or clientAssertionSigningKey in options
` : a11[c11] ? b11 += `Missing: ${c11}: Set ${a11[c11]} env var or pass ${c11} in options
` : b11 += `Missing: ${c11}
`;
            }), console.error(b11.trim());
          }
          return { ...b10, appBaseUrl: d10, clientSecret: e10, clientAssertionSigningKey: f2 };
        }
        async createFetcher(a10, b10) {
          let { authClient: c10, normalizedReq: d10 } = await this.resolveRequestContext(a10), e10 = d10 ? await this.getSession(d10) : await this.getSession();
          if (!e10) throw new by(j.MISSING_SESSION, "The user does not have an active session.");
          let f2 = async (a11) => {
            let [b11, d11] = await c10.getTokenSet(e10, a11 || {});
            if (b11) throw b11;
            return d11.tokenSet;
          };
          return await c10.fetcherFactory({ ...b10, getAccessToken: f2 });
        }
        resolveMfaTokenTtl(a10, b10) {
          let c10 = b_.I2;
          if (void 0 !== a10) return Number.isFinite(a10) && a10 > 0 ? a10 : (console.warn(`[auth0-nextjs] Invalid mfaTokenTtl option value: ${a10}. Using default: ${c10} seconds.`), c10);
          if (void 0 !== b10) {
            let a11 = parseInt(b10, 10);
            if (Number.isFinite(a11) && a11 > 0) return a11;
            console.warn(`[auth0-nextjs] Invalid AUTH0_MFA_TOKEN_TTL environment variable: ${b10}. Using default: ${c10} seconds.`);
          }
          return c10;
        }
      }
      x = /* @__PURE__ */ new WeakMap();
      let fM = new fL({ authorizationParameters: { scope: process.env.AUTH0_SCOPE, audience: process.env.AUTH0_AUDIENCE } });
      async function fN(a10) {
        return await fM.middleware(a10);
      }
      let fO = { matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"] };
      c(667);
      let fP = { ...y }, fQ = fP.middleware || fP.default, fR = "/middleware";
      if ("function" != typeof fQ) throw Object.defineProperty(Error(`The Middleware "${fR}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", { value: "E120", enumerable: false, configurable: true });
      function fS(a10) {
        return bk({ ...a10, page: fR, handler: async (...a11) => {
          try {
            return await fQ(...a11);
          } catch (e10) {
            let b10 = a11[0], c10 = new URL(b10.url), d10 = c10.pathname + c10.search;
            throw await C(e10, { path: d10, method: b10.method, headers: Object.fromEntries(b10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), e10;
          }
        } });
      }
    }, 704: (a, b, c) => {
      "use strict";
      c.d(b, { l: () => d });
      class d {
        static get(a2, b2, c2) {
          let d2 = Reflect.get(a2, b2, c2);
          return "function" == typeof d2 ? d2.bind(a2) : d2;
        }
        static set(a2, b2, c2, d2) {
          return Reflect.set(a2, b2, c2, d2);
        }
        static has(a2, b2) {
          return Reflect.has(a2, b2);
        }
        static deleteProperty(a2, b2) {
          return Reflect.deleteProperty(a2, b2);
        }
      }
    }, 718: (a, b, c) => {
      "use strict";
      c.d(b, { Ck: () => i, K8: () => k, Xj: () => m, hm: () => l });
      var d = c(249), e = c(704), f = c(172), g = c(298);
      class h extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new h();
        }
      }
      class i {
        static seal(a2) {
          return new Proxy(a2, { get(a3, b2, c2) {
            switch (b2) {
              case "clear":
              case "delete":
              case "set":
                return h.callable;
              default:
                return e.l.get(a3, b2, c2);
            }
          } });
        }
      }
      let j = Symbol.for("next.mutated.cookies");
      class k {
        static wrap(a2, b2) {
          let c2 = new d.VO(new Headers());
          for (let b3 of a2.getAll()) c2.set(b3);
          let g2 = [], h2 = /* @__PURE__ */ new Set(), i2 = () => {
            let a3 = f.J.getStore();
            if (a3 && (a3.pathWasRevalidated = true), g2 = c2.getAll().filter((a4) => h2.has(a4.name)), b2) {
              let a4 = [];
              for (let b3 of g2) {
                let c3 = new d.VO(new Headers());
                c3.set(b3), a4.push(c3.toString());
              }
              b2(a4);
            }
          }, k2 = new Proxy(c2, { get(a3, b3, c3) {
            switch (b3) {
              case j:
                return g2;
              case "delete":
                return function(...b4) {
                  h2.add("string" == typeof b4[0] ? b4[0] : b4[0].name);
                  try {
                    return a3.delete(...b4), k2;
                  } finally {
                    i2();
                  }
                };
              case "set":
                return function(...b4) {
                  h2.add("string" == typeof b4[0] ? b4[0] : b4[0].name);
                  try {
                    return a3.set(...b4), k2;
                  } finally {
                    i2();
                  }
                };
              default:
                return e.l.get(a3, b3, c3);
            }
          } });
          return k2;
        }
      }
      function l(a2) {
        let b2 = new Proxy(a2, { get(a3, c2, d2) {
          switch (c2) {
            case "delete":
              return function(...c3) {
                return n("cookies().delete"), a3.delete(...c3), b2;
              };
            case "set":
              return function(...c3) {
                return n("cookies().set"), a3.set(...c3), b2;
              };
            default:
              return e.l.get(a3, c2, d2);
          }
        } });
        return b2;
      }
      function m(a2) {
        return "action" === a2.phase;
      }
      function n(a2) {
        if (!m((0, g.XN)(a2))) throw new h();
      }
    }, 726: (a, b, c) => {
      "use strict";
      c.d(b, { z: () => d });
      class d extends Error {
        constructor(a2, b2) {
          super("Invariant: " + (a2.endsWith(".") ? a2 : a2 + ".") + " This is a bug in Next.js.", b2), this.name = "InvariantError";
        }
      }
    }, 734: (a, b, c) => {
      "use strict";
      let d, e, f, g;
      function h(a10, b2) {
        if (null == a10) return false;
        try {
          return a10 instanceof b2 || Object.getPrototypeOf(a10)[Symbol.toStringTag] === b2.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      c.d(b, { A6: () => o, AH: () => n, AW: () => aU, B9: () => aJ, CN: () => G, GR: () => bf, Gl: () => aX, Hx: () => w, IX: () => X, LB: () => p, NV: () => Y, Nb: () => a5, ON: () => aC, Ot: () => N, Qx: () => aY, Tv: () => aF, U$: () => aZ, UM: () => ah, Uc: () => bh, Vw: () => bl, YI: () => M, YM: () => ae, Yv: () => P, Z5: () => bg, ZC: () => bc, c6: () => av, ck: () => a0, cm: () => l, d_: () => aP, fN: () => a$, kO: () => be, kU: () => a6, lp: () => a1, m: () => aK, m4: () => ak, nW: () => m, nZ: () => a_, ng: () => aq, oM: () => q, pG: () => aj, pe: () => bi, q4: () => O, qm: () => W, r5: () => ag, to: () => aW, uK: () => ai, un: () => aw, ur: () => az, vA: () => J, vR: () => v, wh: () => a2 }), "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (d = "oauth4webapi/v3.8.6");
      let i = "ERR_INVALID_ARG_VALUE", j = "ERR_INVALID_ARG_TYPE";
      function k(a10, b2, c2) {
        let d2 = TypeError(a10, { cause: c2 });
        return Object.assign(d2, { code: b2 }), d2;
      }
      let l = Symbol(), m = Symbol(), n = Symbol(), o = Symbol(), p = Symbol(), q = Symbol();
      Symbol();
      let r = new TextEncoder(), s = new TextDecoder();
      function t(a10) {
        return "string" == typeof a10 ? r.encode(a10) : s.decode(a10);
      }
      function u(a10) {
        return "string" == typeof a10 ? f(a10) : e(a10);
      }
      e = Uint8Array.prototype.toBase64 ? (a10) => (a10 instanceof ArrayBuffer && (a10 = new Uint8Array(a10)), a10.toBase64({ alphabet: "base64url", omitPadding: true })) : (a10) => {
        a10 instanceof ArrayBuffer && (a10 = new Uint8Array(a10));
        let b2 = [];
        for (let c2 = 0; c2 < a10.byteLength; c2 += 32768) b2.push(String.fromCharCode.apply(null, a10.subarray(c2, c2 + 32768)));
        return btoa(b2.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }, f = Uint8Array.fromBase64 ? (a10) => {
        try {
          return Uint8Array.fromBase64(a10, { alphabet: "base64url" });
        } catch (a11) {
          throw k("The input to be decoded is not correctly encoded.", i, a11);
        }
      } : (a10) => {
        try {
          let b2 = atob(a10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), c2 = new Uint8Array(b2.length);
          for (let a11 = 0; a11 < b2.length; a11++) c2[a11] = b2.charCodeAt(a11);
          return c2;
        } catch (a11) {
          throw k("The input to be decoded is not correctly encoded.", i, a11);
        }
      };
      class v extends Error {
        code;
        constructor(a10, b2) {
          super(a10, b2), this.name = this.constructor.name, this.code = aU, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class w extends Error {
        code;
        constructor(a10, b2) {
          super(a10, b2), this.name = this.constructor.name, b2?.code && (this.code = b2?.code), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function x(a10, b2, c2) {
        return new w(a10, { code: b2, cause: c2 });
      }
      async function y(a10) {
        let b2;
        switch (a10.kty) {
          case "EC":
            b2 = { crv: a10.crv, kty: a10.kty, x: a10.x, y: a10.y };
            break;
          case "OKP":
            b2 = { crv: a10.crv, kty: a10.kty, x: a10.x };
            break;
          case "AKP":
            b2 = { alg: a10.alg, kty: a10.kty, pub: a10.pub };
            break;
          case "RSA":
            b2 = { e: a10.e, kty: a10.kty, n: a10.n };
            break;
          default:
            throw new v("unsupported JWK key type", { cause: a10 });
        }
        return u(await crypto.subtle.digest("SHA-256", t(JSON.stringify(b2))));
      }
      function z(a10, b2) {
        if (!(a10 instanceof CryptoKey)) throw k(`${b2} must be a CryptoKey`, j);
      }
      function A(a10, b2) {
        if (z(a10, b2), "private" !== a10.type) throw k(`${b2} must be a private CryptoKey`, i);
      }
      function B(a10) {
        return !(null === a10 || "object" != typeof a10 || Array.isArray(a10));
      }
      function C(a10) {
        h(a10, Headers) && (a10 = Object.fromEntries(a10.entries()));
        let b2 = new Headers(a10 ?? {});
        if (d && !b2.has("user-agent") && b2.set("user-agent", d), b2.has("authorization")) throw k('"options.headers" must not include the "authorization" header name', i);
        return b2;
      }
      function D(a10, b2) {
        if (void 0 !== b2) {
          if ("function" == typeof b2 && (b2 = b2(a10.href)), !(b2 instanceof AbortSignal)) throw k('"options.signal" must return or be an instance of AbortSignal', j);
          return b2;
        }
      }
      function E(a10) {
        return a10.includes("//") ? a10.replace("//", "/") : a10;
      }
      async function F(a10, b2, c2, d2) {
        if (!(a10 instanceof URL)) throw k(`"${b2}" must be an instance of URL`, j);
        ab(a10, d2?.[l] !== true);
        let e2 = c2(new URL(a10.href)), f2 = C(d2?.headers);
        return f2.set("accept", "application/json"), (d2?.[o] || fetch)(e2.href, { body: void 0, headers: Object.fromEntries(f2.entries()), method: "GET", redirect: "manual", signal: D(e2, d2?.signal) });
      }
      async function G(a10, b2) {
        return F(a10, "issuerIdentifier", (a11) => {
          switch (b2?.algorithm) {
            case void 0:
            case "oidc":
              a11.pathname = E(`${a11.pathname}/.well-known/openid-configuration`);
              break;
            case "oauth2":
              !function(a12, b3, c2 = false) {
                "/" === a12.pathname ? a12.pathname = b3 : a12.pathname = E(`${b3}/${c2 ? a12.pathname : a12.pathname.replace(/(\/)$/, "")}`);
              }(a11, ".well-known/oauth-authorization-server");
              break;
            default:
              throw k('"options.algorithm" must be "oidc" (default), or "oauth2"', i);
          }
          return a11;
        }, b2);
      }
      function H(a10, b2, c2, d2, e2) {
        try {
          if ("number" != typeof a10 || !Number.isFinite(a10)) throw k(`${c2} must be a number`, j, e2);
          if (a10 > 0) return;
          if (b2) {
            if (0 !== a10) throw k(`${c2} must be a non-negative number`, i, e2);
            return;
          }
          throw k(`${c2} must be a positive number`, i, e2);
        } catch (a11) {
          if (d2) throw x(a11.message, d2, e2);
          throw a11;
        }
      }
      function I(a10, b2, c2, d2) {
        try {
          if ("string" != typeof a10) throw k(`${b2} must be a string`, j, d2);
          if (0 === a10.length) throw k(`${b2} must not be empty`, i, d2);
        } catch (a11) {
          if (c2) throw x(a11.message, c2, d2);
          throw a11;
        }
      }
      async function J(a10, b2) {
        if (!(a10 instanceof URL) && a10 !== bk) throw k('"expectedIssuerIdentifier" must be an instance of URL', j);
        if (!h(b2, Response)) throw k('"response" must be an instance of Response', j);
        if (200 !== b2.status) throw x('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', aZ, b2);
        a7(b2);
        let c2 = await bj(b2);
        if (I(c2.issuer, '"response" body "issuer" property', aX, { body: c2 }), a10 !== bk && new URL(c2.issuer).href !== a10.href) throw x('"response" body "issuer" property does not match the expected value', a2, { expected: a10.href, body: c2, attribute: "issuer" });
        return c2;
      }
      function K(a10) {
        var b2, c2 = a10, d2 = "application/json";
        if (b2 = c2, b2.headers.get("content-type")?.split(";")[0] !== d2) throw function(a11, ...b3) {
          let c3 = '"response" content-type must be ';
          if (b3.length > 2) {
            let a12 = b3.pop();
            c3 += `${b3.join(", ")}, or ${a12}`;
          } else 2 === b3.length ? c3 += `${b3[0]} or ${b3[1]}` : c3 += b3[0];
          return x(c3, aY, a11);
        }(c2, d2);
      }
      function L() {
        return u(crypto.getRandomValues(new Uint8Array(32)));
      }
      function M() {
        return L();
      }
      function N() {
        return L();
      }
      function O() {
        return L();
      }
      async function P(a10) {
        return I(a10, "codeVerifier"), u(await crypto.subtle.digest("SHA-256", t(a10)));
      }
      function Q(a10) {
        switch (a10.algorithm.name) {
          case "RSA-PSS":
            switch (a10.algorithm.hash.name) {
              case "SHA-256":
                return "PS256";
              case "SHA-384":
                return "PS384";
              case "SHA-512":
                return "PS512";
              default:
                throw new v("unsupported RsaHashedKeyAlgorithm hash name", { cause: a10 });
            }
          case "RSASSA-PKCS1-v1_5":
            switch (a10.algorithm.hash.name) {
              case "SHA-256":
                return "RS256";
              case "SHA-384":
                return "RS384";
              case "SHA-512":
                return "RS512";
              default:
                throw new v("unsupported RsaHashedKeyAlgorithm hash name", { cause: a10 });
            }
          case "ECDSA":
            switch (a10.algorithm.namedCurve) {
              case "P-256":
                return "ES256";
              case "P-384":
                return "ES384";
              case "P-521":
                return "ES512";
              default:
                throw new v("unsupported EcKeyAlgorithm namedCurve", { cause: a10 });
            }
          case "Ed25519":
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            return a10.algorithm.name;
          case "EdDSA":
            return "Ed25519";
          default:
            throw new v("unsupported CryptoKey algorithm name", { cause: a10 });
        }
      }
      function R(a10) {
        let b2 = a10?.[m];
        return "number" == typeof b2 && Number.isFinite(b2) ? b2 : 0;
      }
      function S(a10) {
        let b2 = a10?.[n];
        return "number" == typeof b2 && Number.isFinite(b2) && -1 !== Math.sign(b2) ? b2 : 30;
      }
      function T() {
        return Math.floor(Date.now() / 1e3);
      }
      function U(a10) {
        if ("object" != typeof a10 || null === a10) throw k('"as" must be an object', j);
        I(a10.issuer, '"as.issuer"');
      }
      function V(a10) {
        if ("object" != typeof a10 || null === a10) throw k('"client" must be an object', j);
        I(a10.client_id, '"client.client_id"');
      }
      function W(a10) {
        return I(a10, '"clientSecret"'), (b2, c2, d2, e2) => {
          d2.set("client_id", c2.client_id), d2.set("client_secret", a10);
        };
      }
      function X(a10, b2) {
        let { key: c2, kid: d2 } = a10 instanceof CryptoKey ? { key: a10 } : a10?.key instanceof CryptoKey ? (void 0 !== a10.kid && I(a10.kid, '"kid"'), { key: a10.key, kid: a10.kid }) : {};
        return A(c2, '"clientPrivateKey.key"'), async (a11, e2, f2, g2) => {
          let h2 = { alg: Q(c2), kid: d2 }, i2 = function(a12, b3) {
            let c3 = T() + R(b3);
            return { jti: L(), aud: a12.issuer, exp: c3 + 60, iat: c3, nbf: c3, iss: b3.client_id, sub: b3.client_id };
          }(a11, e2);
          b2?.[p]?.(h2, i2), f2.set("client_id", e2.client_id), f2.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), f2.set("client_assertion", await Z(h2, i2, c2));
        };
      }
      function Y() {
        return (a10, b2, c2, d2) => {
          c2.set("client_id", b2.client_id);
        };
      }
      async function Z(a10, b2, c2) {
        if (!c2.usages.includes("sign")) throw k('CryptoKey instances used for signing assertions must include "sign" in their "usages"', i);
        let d2 = `${u(t(JSON.stringify(a10)))}.${u(t(JSON.stringify(b2)))}`, e2 = u(await crypto.subtle.sign(function(a11) {
          switch (a11.algorithm.name) {
            case "ECDSA":
              return { name: a11.algorithm.name, hash: function(a12) {
                let { algorithm: b3 } = a12;
                switch (b3.namedCurve) {
                  case "P-256":
                    return "SHA-256";
                  case "P-384":
                    return "SHA-384";
                  case "P-521":
                    return "SHA-512";
                  default:
                    throw new v("unsupported ECDSA namedCurve", { cause: a12 });
                }
              }(a11) };
            case "RSA-PSS":
              switch (a8(a11), a11.algorithm.hash.name) {
                case "SHA-256":
                case "SHA-384":
                case "SHA-512":
                  return { name: a11.algorithm.name, saltLength: parseInt(a11.algorithm.hash.name.slice(-3), 10) >> 3 };
                default:
                  throw new v("unsupported RSA-PSS hash name", { cause: a11 });
              }
            case "RSASSA-PKCS1-v1_5":
              return a8(a11), a11.algorithm.name;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
            case "Ed25519":
              return a11.algorithm.name;
          }
          throw new v("unsupported CryptoKey algorithm name", { cause: a11 });
        }(c2), c2, t(d2)));
        return `${d2}.${e2}`;
      }
      async function $(a10, b2) {
        let { kty: c2, e: d2, n: e2, x: f2, y: h2, crv: i2, pub: j2 } = await crypto.subtle.exportKey("jwk", a10), k2 = { kty: c2, e: d2, n: e2, x: f2, y: h2, crv: i2, pub: j2 };
        return "AKP" === c2 && (k2.alg = b2), g.set(a10, k2), k2;
      }
      async function _(a10, b2) {
        return (g ||= /* @__PURE__ */ new WeakMap()).get(a10) || $(a10, b2);
      }
      let aa = URL.parse ? (a10, b2) => URL.parse(a10, b2) : (a10, b2) => {
        try {
          return new URL(a10, b2);
        } catch {
          return null;
        }
      };
      function ab(a10, b2) {
        if (b2 && "https:" !== a10.protocol) throw x("only requests to HTTPS are allowed", a$, a10);
        if ("https:" !== a10.protocol && "http:" !== a10.protocol) throw x("only HTTP and HTTPS requests are allowed", a_, a10);
      }
      function ac(a10, b2, c2, d2) {
        let e2;
        if ("string" != typeof a10 || !(e2 = aa(a10))) throw x(`authorization server metadata does not contain a valid ${c2 ? `"as.mtls_endpoint_aliases.${b2}"` : `"as.${b2}"`}`, void 0 === a10 ? a3 : a4, { attribute: c2 ? `mtls_endpoint_aliases.${b2}` : b2 });
        return ab(e2, d2), e2;
      }
      function ad(a10, b2, c2, d2) {
        return c2 && a10.mtls_endpoint_aliases && b2 in a10.mtls_endpoint_aliases ? ac(a10.mtls_endpoint_aliases[b2], b2, c2, d2) : ac(a10[b2], b2, c2, d2);
      }
      async function ae(a10, b2, c2, d2, e2) {
        U(a10), V(b2);
        let f2 = ad(a10, "pushed_authorization_request_endpoint", b2.use_mtls_endpoint_aliases, e2?.[l] !== true), g2 = new URLSearchParams(d2);
        g2.set("client_id", b2.client_id);
        let h2 = C(e2?.headers);
        h2.set("accept", "application/json"), e2?.DPoP !== void 0 && (at(e2.DPoP), await e2.DPoP.addProof(f2, h2, "POST"));
        let i2 = await ax(a10, b2, c2, f2, g2, h2, e2);
        return e2?.DPoP?.cacheNonce(i2, f2), i2;
      }
      class af {
        #A;
        #B;
        #C;
        #D;
        #E;
        #F;
        #G;
        constructor(a10, b2, c2) {
          if (A(b2?.privateKey, '"DPoP.privateKey"'), !function(a11, b3) {
            if (z(a11, b3), "public" !== a11.type) throw k(`${b3} must be a public CryptoKey`, i);
          }(b2?.publicKey, '"DPoP.publicKey"'), !b2.publicKey.extractable) throw k('"DPoP.publicKey.extractable" must be true', i);
          this.#E = c2?.[p], this.#D = R(a10), this.#B = b2.privateKey, this.#C = b2.publicKey, aI.add(this);
        }
        #H(a10) {
          this.#F ||= /* @__PURE__ */ new Map();
          let b2 = this.#F.get(a10);
          return b2 && (this.#F.delete(a10), this.#F.set(a10, b2)), b2;
        }
        #I(a10, b2) {
          this.#F ||= /* @__PURE__ */ new Map(), this.#F.delete(a10), 100 === this.#F.size && this.#F.delete(this.#F.keys().next().value), this.#F.set(a10, b2);
        }
        async calculateThumbprint() {
          if (!this.#G) {
            let a10 = await crypto.subtle.exportKey("jwk", this.#C);
            this.#G ||= await y(a10);
          }
          return this.#G;
        }
        async addProof(a10, b2, c2, d2) {
          let e2 = Q(this.#B);
          this.#A ||= { alg: e2, typ: "dpop+jwt", jwk: await _(this.#C, e2) };
          let f2 = this.#H(a10.origin), g2 = { iat: T() + this.#D, jti: L(), htm: c2, nonce: f2, htu: `${a10.origin}${a10.pathname}`, ath: d2 ? u(await crypto.subtle.digest("SHA-256", t(d2))) : void 0 };
          this.#E?.(this.#A, g2), b2.set("dpop", await Z(this.#A, g2, this.#B));
        }
        cacheNonce(a10, b2) {
          try {
            let c2 = a10.headers.get("dpop-nonce");
            c2 && this.#I(b2.origin, c2);
          } catch {
          }
        }
      }
      function ag(a10) {
        if (a10 instanceof ak) {
          let { 0: b2, length: c2 } = a10.cause;
          return 1 === c2 && "dpop" === b2.scheme && "use_dpop_nonce" === b2.parameters.error;
        }
        return a10 instanceof ai && "use_dpop_nonce" === a10.error;
      }
      function ah(a10, b2, c2) {
        return new af(a10, b2, c2);
      }
      class ai extends Error {
        cause;
        code;
        error;
        status;
        error_description;
        response;
        constructor(a10, b2) {
          super(a10, b2), this.name = this.constructor.name, this.code = aT, this.cause = b2.cause, this.error = b2.cause.error, this.status = b2.response.status, this.error_description = b2.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: b2.response }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class aj extends Error {
        cause;
        code;
        error;
        error_description;
        constructor(a10, b2) {
          super(a10, b2), this.name = this.constructor.name, this.code = aV, this.cause = b2.cause, this.error = b2.cause.get("error"), this.error_description = b2.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class ak extends Error {
        cause;
        code;
        response;
        status;
        constructor(a10, b2) {
          super(a10, b2), this.name = this.constructor.name, this.code = aS, this.cause = b2.cause, this.status = b2.response.status, this.response = b2.response, Object.defineProperty(this, "response", { enumerable: false }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      let al = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", am = RegExp("^[,\\s]*(" + al + ")"), an = RegExp("^[,\\s]*(" + al + ')\\s*=\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"[,\\s]*(.*)'), ao = RegExp("^[,\\s]*" + ("(" + al + ")\\s*=\\s*(") + al + ")[,\\s]*(.*)"), ap = RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2})(?:$|[,\\s])(.*)");
      async function aq(a10, b2, c2) {
        if (U(a10), V(b2), !h(c2, Response)) throw k('"response" must be an instance of Response', j);
        await as(c2, 201, "Pushed Authorization Request Endpoint"), a7(c2);
        let d2 = await bj(c2);
        I(d2.request_uri, '"response" body "request_uri" property', aX, { body: d2 });
        let e2 = "number" != typeof d2.expires_in ? parseFloat(d2.expires_in) : d2.expires_in;
        return H(e2, true, '"response" body "expires_in" property', aX, { body: d2 }), d2.expires_in = e2, d2;
      }
      async function ar(a10) {
        if (a10.status > 399 && a10.status < 500) {
          a7(a10), K(a10);
          try {
            let b2 = await a10.clone().json();
            if (B(b2) && "string" == typeof b2.error && b2.error.length) return b2;
          } catch {
          }
        }
      }
      async function as(a10, b2, c2) {
        if (a10.status !== b2) {
          let b3;
          if (aE(a10), b3 = await ar(a10)) throw await a10.body?.cancel(), new ai("server responded with an error in the response body", { cause: b3, response: a10 });
          throw x(`"response" is not a conform ${c2} response (unexpected HTTP status code)`, aZ, a10);
        }
      }
      function at(a10) {
        if (!aI.has(a10)) throw k('"options.DPoP" is not a valid DPoPHandle', i);
      }
      async function au(a10, b2, c2, d2, e2, f2) {
        if (I(a10, '"accessToken"'), !(c2 instanceof URL)) throw k('"url" must be an instance of URL', j);
        ab(c2, f2?.[l] !== true), d2 = C(d2), f2?.DPoP && (at(f2.DPoP), await f2.DPoP.addProof(c2, d2, b2.toUpperCase(), a10)), d2.set("authorization", `${d2.has("dpop") ? "DPoP" : "Bearer"} ${a10}`);
        let g2 = await (f2?.[o] || fetch)(c2.href, { duplex: h(e2, ReadableStream) ? "half" : void 0, body: e2, headers: Object.fromEntries(d2.entries()), method: b2, redirect: "manual", signal: D(c2, f2?.signal) });
        return f2?.DPoP?.cacheNonce(g2, c2), g2;
      }
      async function av(a10, b2, c2, d2, e2, f2) {
        let g2 = await au(a10, b2, c2, d2, e2, f2);
        return aE(g2), g2;
      }
      let aw = Symbol();
      async function ax(a10, b2, c2, d2, e2, f2, g2) {
        return await c2(a10, b2, e2, f2), f2.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (g2?.[o] || fetch)(d2.href, { body: e2, headers: Object.fromEntries(f2.entries()), method: "POST", redirect: "manual", signal: D(d2, g2?.signal) });
      }
      async function ay(a10, b2, c2, d2, e2, f2) {
        let g2 = ad(a10, "token_endpoint", b2.use_mtls_endpoint_aliases, f2?.[l] !== true);
        e2.set("grant_type", d2);
        let h2 = C(f2?.headers);
        h2.set("accept", "application/json"), f2?.DPoP !== void 0 && (at(f2.DPoP), await f2.DPoP.addProof(g2, h2, "POST"));
        let i2 = await ax(a10, b2, c2, g2, e2, h2, f2);
        return f2?.DPoP?.cacheNonce(i2, g2), i2;
      }
      async function az(a10, b2, c2, d2, e2) {
        U(a10), V(b2), I(d2, '"refreshToken"');
        let f2 = new URLSearchParams(e2?.additionalParameters);
        return f2.set("refresh_token", d2), ay(a10, b2, c2, "refresh_token", f2, e2);
      }
      let aA = /* @__PURE__ */ new WeakMap(), aB = /* @__PURE__ */ new WeakMap();
      function aC(a10) {
        if (!a10.id_token) return;
        let b2 = aA.get(a10);
        if (!b2) throw k('"ref" was already garbage collected or did not resolve from the proper sources', i);
        return b2;
      }
      async function aD(a10, b2, c2, d2, e2, f2) {
        if (U(a10), V(b2), !h(c2, Response)) throw k('"response" must be an instance of Response', j);
        await as(c2, 200, "Token Endpoint"), a7(c2);
        let g2 = await bj(c2);
        if (I(g2.access_token, '"response" body "access_token" property', aX, { body: g2 }), I(g2.token_type, '"response" body "token_type" property', aX, { body: g2 }), g2.token_type = g2.token_type.toLowerCase(), void 0 !== g2.expires_in) {
          let a11 = "number" != typeof g2.expires_in ? parseFloat(g2.expires_in) : g2.expires_in;
          H(a11, true, '"response" body "expires_in" property', aX, { body: g2 }), g2.expires_in = a11;
        }
        if (void 0 !== g2.refresh_token && I(g2.refresh_token, '"response" body "refresh_token" property', aX, { body: g2 }), void 0 !== g2.scope && "string" != typeof g2.scope) throw x('"response" body "scope" property must be a string', aX, { body: g2 });
        if (void 0 !== g2.id_token) {
          I(g2.id_token, '"response" body "id_token" property', aX, { body: g2 });
          let f3 = ["aud", "exp", "iat", "iss", "sub"];
          true === b2.require_auth_time && f3.push("auth_time"), void 0 !== b2.default_max_age && (H(b2.default_max_age, true, '"client.default_max_age"'), f3.push("auth_time")), d2?.length && f3.push(...d2);
          let { claims: h2, jwt: i2 } = await a9(g2.id_token, ba.bind(void 0, b2.id_token_signed_response_alg, a10.id_token_signing_alg_values_supported, "RS256"), R(b2), S(b2), e2).then(aM.bind(void 0, f3)).then(aH.bind(void 0, a10)).then(aG.bind(void 0, b2.client_id));
          if (Array.isArray(h2.aud) && 1 !== h2.aud.length) {
            if (void 0 === h2.azp) throw x('ID Token "aud" (audience) claim includes additional untrusted audiences', a1, { claims: h2, claim: "aud" });
            if (h2.azp !== b2.client_id) throw x('unexpected ID Token "azp" (authorized party) claim value', a1, { expected: b2.client_id, claims: h2, claim: "azp" });
          }
          void 0 !== h2.auth_time && H(h2.auth_time, true, 'ID Token "auth_time" (authentication time)', aX, { claims: h2 }), aB.set(c2, i2), aA.set(g2, h2);
        }
        if (f2?.[g2.token_type] !== void 0) f2[g2.token_type](c2, g2);
        else if ("dpop" !== g2.token_type && "bearer" !== g2.token_type) throw new v("unsupported `token_type` value", { cause: { body: g2 } });
        return g2;
      }
      function aE(a10) {
        let b2;
        if (b2 = function(a11) {
          if (!h(a11, Response)) throw k('"response" must be an instance of Response', j);
          let b3 = a11.headers.get("www-authenticate");
          if (null === b3) return;
          let c2 = [], d2 = b3;
          for (; d2; ) {
            let a12, b4 = d2.match(am), e2 = b4?.["1"].toLowerCase();
            if (!e2) return;
            let f2 = d2.substring(b4[0].length);
            if (f2 && !f2.match(/^[\s,]/)) return;
            let g2 = f2.match(/^\s+(.*)$/), h2 = !!g2;
            d2 = g2 ? g2[1] : void 0;
            let i2 = {};
            if (h2) for (; d2; ) {
              let c3, e3;
              if (b4 = d2.match(an)) {
                if ([, c3, e3, d2] = b4, e3.includes("\\")) try {
                  e3 = JSON.parse(`"${e3}"`);
                } catch {
                }
                i2[c3.toLowerCase()] = e3;
                continue;
              }
              if (b4 = d2.match(ao)) {
                [, c3, e3, d2] = b4, i2[c3.toLowerCase()] = e3;
                continue;
              }
              if (b4 = d2.match(ap)) {
                if (Object.keys(i2).length) break;
                [, a12, d2] = b4;
                break;
              }
              return;
            }
            else d2 = f2 || void 0;
            let j2 = { scheme: e2, parameters: i2 };
            a12 && (j2.token68 = a12), c2.push(j2);
          }
          if (c2.length) return c2;
        }(a10)) throw new ak("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: b2, response: a10 });
      }
      async function aF(a10, b2, c2, d2) {
        return aD(a10, b2, c2, void 0, d2?.[q], d2?.recognizedTokenTypes);
      }
      function aG(a10, b2) {
        if (Array.isArray(b2.claims.aud)) {
          if (!b2.claims.aud.includes(a10)) throw x('unexpected JWT "aud" (audience) claim value', a1, { expected: a10, claims: b2.claims, claim: "aud" });
        } else if (b2.claims.aud !== a10) throw x('unexpected JWT "aud" (audience) claim value', a1, { expected: a10, claims: b2.claims, claim: "aud" });
        return b2;
      }
      function aH(a10, b2) {
        let c2 = a10[bl]?.(b2) ?? a10.issuer;
        if (b2.claims.iss !== c2) throw x('unexpected JWT "iss" (issuer) claim value', a1, { expected: c2, claims: b2.claims, claim: "iss" });
        return b2;
      }
      let aI = /* @__PURE__ */ new WeakSet(), aJ = Symbol();
      async function aK(a10, b2, c2, d2, e2, f2, g2) {
        if (U(a10), V(b2), !aI.has(d2)) throw k('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', i);
        I(e2, '"redirectUri"');
        let h2 = bb(d2, "code");
        if (!h2) throw x('no authorization code in "callbackParameters"', aX);
        let j2 = new URLSearchParams(g2?.additionalParameters);
        return j2.set("redirect_uri", e2), j2.set("code", h2), f2 !== aJ && (I(f2, '"codeVerifier"'), j2.set("code_verifier", f2)), ay(a10, b2, c2, "authorization_code", j2, g2);
      }
      let aL = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
      function aM(a10, b2) {
        for (let c2 of a10) if (void 0 === b2.claims[c2]) throw x(`JWT "${c2}" (${aL[c2]}) claim missing`, aX, { claims: b2.claims });
        return b2;
      }
      let aN = Symbol(), aO = Symbol();
      async function aP(a10, b2, c2, d2) {
        return "string" == typeof d2?.expectedNonce || "number" == typeof d2?.maxAge || d2?.requireIdToken ? aQ(a10, b2, c2, d2.expectedNonce, d2.maxAge, d2[q], d2.recognizedTokenTypes) : aR(a10, b2, c2, d2?.[q], d2?.recognizedTokenTypes);
      }
      async function aQ(a10, b2, c2, d2, e2, f2, g2) {
        let h2 = [];
        switch (d2) {
          case void 0:
            d2 = aN;
            break;
          case aN:
            break;
          default:
            I(d2, '"expectedNonce" argument'), h2.push("nonce");
        }
        switch (e2 ??= b2.default_max_age) {
          case void 0:
            e2 = aO;
            break;
          case aO:
            break;
          default:
            H(e2, true, '"maxAge" argument'), h2.push("auth_time");
        }
        let i2 = await aD(a10, b2, c2, h2, f2, g2);
        I(i2.id_token, '"response" body "id_token" property', aX, { body: i2 });
        let j2 = aC(i2);
        if (e2 !== aO) {
          let a11 = T() + R(b2), c3 = S(b2);
          if (j2.auth_time + e2 < a11 - c3) throw x("too much time has elapsed since the last End-User authentication", a0, { claims: j2, now: a11, tolerance: c3, claim: "auth_time" });
        }
        if (d2 === aN) {
          if (void 0 !== j2.nonce) throw x('unexpected ID Token "nonce" claim value', a1, { expected: void 0, claims: j2, claim: "nonce" });
        } else if (j2.nonce !== d2) throw x('unexpected ID Token "nonce" claim value', a1, { expected: d2, claims: j2, claim: "nonce" });
        return i2;
      }
      async function aR(a10, b2, c2, d2, e2) {
        let f2 = await aD(a10, b2, c2, void 0, d2, e2), g2 = aC(f2);
        if (g2) {
          if (void 0 !== b2.default_max_age) {
            H(b2.default_max_age, true, '"client.default_max_age"');
            let a11 = T() + R(b2), c3 = S(b2);
            if (g2.auth_time + b2.default_max_age < a11 - c3) throw x("too much time has elapsed since the last End-User authentication", a0, { claims: g2, now: a11, tolerance: c3, claim: "auth_time" });
          }
          if (void 0 !== g2.nonce) throw x('unexpected ID Token "nonce" claim value', a1, { expected: void 0, claims: g2, claim: "nonce" });
        }
        return f2;
      }
      let aS = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", aT = "OAUTH_RESPONSE_BODY_ERROR", aU = "OAUTH_UNSUPPORTED_OPERATION", aV = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", aW = "OAUTH_PARSE_ERROR", aX = "OAUTH_INVALID_RESPONSE", aY = "OAUTH_RESPONSE_IS_NOT_JSON", aZ = "OAUTH_RESPONSE_IS_NOT_CONFORM", a$ = "OAUTH_HTTP_REQUEST_FORBIDDEN", a_ = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", a0 = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", a1 = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", a2 = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", a3 = "OAUTH_MISSING_SERVER_METADATA", a4 = "OAUTH_INVALID_SERVER_METADATA";
      async function a5(a10, b2, c2, d2, e2, f2) {
        return U(a10), V(b2), I(d2, '"grantType"'), ay(a10, b2, c2, d2, new URLSearchParams(e2), f2);
      }
      async function a6(a10, b2, c2, d2) {
        return aD(a10, b2, c2, void 0, d2?.[q], d2?.recognizedTokenTypes);
      }
      function a7(a10) {
        if (a10.bodyUsed) throw k('"response" body has been used already', i);
      }
      function a8(a10) {
        let { algorithm: b2 } = a10;
        if ("number" != typeof b2.modulusLength || b2.modulusLength < 2048) throw new v(`unsupported ${b2.name} modulusLength`, { cause: a10 });
      }
      async function a9(a10, b2, c2, d2, e2) {
        let f2, g2, { 0: h2, 1: i2, length: j2 } = a10.split(".");
        if (5 === j2) if (void 0 !== e2) a10 = await e2(a10), { 0: h2, 1: i2, length: j2 } = a10.split(".");
        else throw new v("JWE decryption is not configured", { cause: a10 });
        if (3 !== j2) throw x("Invalid JWT", aX, a10);
        try {
          f2 = JSON.parse(t(u(h2)));
        } catch (a11) {
          throw x("failed to parse JWT Header body as base64url encoded JSON", aW, a11);
        }
        if (!B(f2)) throw x("JWT Header must be a top level object", aX, a10);
        if (b2(f2), void 0 !== f2.crit) throw new v('no JWT "crit" header parameter extensions are supported', { cause: { header: f2 } });
        try {
          g2 = JSON.parse(t(u(i2)));
        } catch (a11) {
          throw x("failed to parse JWT Payload body as base64url encoded JSON", aW, a11);
        }
        if (!B(g2)) throw x("JWT Payload must be a top level object", aX, a10);
        let k2 = T() + c2;
        if (void 0 !== g2.exp) {
          if ("number" != typeof g2.exp) throw x('unexpected JWT "exp" (expiration time) claim type', aX, { claims: g2 });
          if (g2.exp <= k2 - d2) throw x('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', a0, { claims: g2, now: k2, tolerance: d2, claim: "exp" });
        }
        if (void 0 !== g2.iat && "number" != typeof g2.iat) throw x('unexpected JWT "iat" (issued at) claim type', aX, { claims: g2 });
        if (void 0 !== g2.iss && "string" != typeof g2.iss) throw x('unexpected JWT "iss" (issuer) claim type', aX, { claims: g2 });
        if (void 0 !== g2.nbf) {
          if ("number" != typeof g2.nbf) throw x('unexpected JWT "nbf" (not before) claim type', aX, { claims: g2 });
          if (g2.nbf > k2 + d2) throw x('unexpected JWT "nbf" (not before) claim value', a0, { claims: g2, now: k2, tolerance: d2, claim: "nbf" });
        }
        if (void 0 !== g2.aud && "string" != typeof g2.aud && !Array.isArray(g2.aud)) throw x('unexpected JWT "aud" (audience) claim type', aX, { claims: g2 });
        return { header: f2, claims: g2, jwt: a10 };
      }
      function ba(a10, b2, c2, d2) {
        if (void 0 !== a10) {
          if ("string" == typeof a10 ? d2.alg !== a10 : !a10.includes(d2.alg)) throw x('unexpected JWT "alg" header parameter', aX, { header: d2, expected: a10, reason: "client configuration" });
          return;
        }
        if (Array.isArray(b2)) {
          if (!b2.includes(d2.alg)) throw x('unexpected JWT "alg" header parameter', aX, { header: d2, expected: b2, reason: "authorization server metadata" });
          return;
        }
        if (void 0 !== c2) {
          if ("string" == typeof c2 ? d2.alg !== c2 : "function" == typeof c2 ? !c2(d2.alg) : !c2.includes(d2.alg)) throw x('unexpected JWT "alg" header parameter', aX, { header: d2, expected: c2, reason: "default value" });
          return;
        }
        throw x('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: a10, issuer: b2, fallback: c2 });
      }
      function bb(a10, b2) {
        let { 0: c2, length: d2 } = a10.getAll(b2);
        if (d2 > 1) throw x(`"${b2}" parameter must be provided only once`, aX);
        return c2;
      }
      let bc = Symbol(), bd = Symbol();
      function be(a10, b2, c2, d2) {
        var e2;
        if (U(a10), V(b2), c2 instanceof URL && (c2 = c2.searchParams), !(c2 instanceof URLSearchParams)) throw k('"parameters" must be an instance of URLSearchParams, or URL', j);
        if (bb(c2, "response")) throw x('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', aX, { parameters: c2 });
        let f2 = bb(c2, "iss"), g2 = bb(c2, "state");
        if (!f2 && a10.authorization_response_iss_parameter_supported) throw x('response parameter "iss" (issuer) missing', aX, { parameters: c2 });
        if (f2 && f2 !== a10.issuer) throw x('unexpected "iss" (issuer) response parameter value', aX, { expected: a10.issuer, parameters: c2 });
        switch (d2) {
          case void 0:
          case bd:
            if (void 0 !== g2) throw x('unexpected "state" response parameter encountered', aX, { expected: void 0, parameters: c2 });
            break;
          case bc:
            break;
          default:
            if (I(d2, '"expectedState" argument'), g2 !== d2) throw x(void 0 === g2 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', aX, { expected: d2, parameters: c2 });
        }
        if (bb(c2, "error")) throw new aj("authorization response from the server is an error", { cause: c2 });
        let h2 = bb(c2, "id_token"), i2 = bb(c2, "token");
        if (void 0 !== h2 || void 0 !== i2) throw new v("implicit and hybrid flows are not supported");
        return e2 = new URLSearchParams(c2), aI.add(e2), e2;
      }
      async function bf(a10, b2, c2, d2, e2) {
        U(a10), V(b2);
        let f2 = ad(a10, "backchannel_authentication_endpoint", b2.use_mtls_endpoint_aliases, e2?.[l] !== true), g2 = new URLSearchParams(d2);
        g2.set("client_id", b2.client_id);
        let h2 = C(e2?.headers);
        return h2.set("accept", "application/json"), ax(a10, b2, c2, f2, g2, h2, e2);
      }
      async function bg(a10, b2, c2) {
        if (U(a10), V(b2), !h(c2, Response)) throw k('"response" must be an instance of Response', j);
        await as(c2, 200, "Backchannel Authentication Endpoint"), a7(c2);
        let d2 = await bj(c2);
        I(d2.auth_req_id, '"response" body "auth_req_id" property', aX, { body: d2 });
        let e2 = "number" != typeof d2.expires_in ? parseFloat(d2.expires_in) : d2.expires_in;
        return H(e2, true, '"response" body "expires_in" property', aX, { body: d2 }), d2.expires_in = e2, void 0 !== d2.interval && H(d2.interval, false, '"response" body "interval" property', aX, { body: d2 }), d2;
      }
      async function bh(a10, b2, c2, d2, e2) {
        U(a10), V(b2), I(d2, '"authReqId"');
        let f2 = new URLSearchParams(e2?.additionalParameters);
        return f2.set("auth_req_id", d2), ay(a10, b2, c2, "urn:openid:params:grant-type:ciba", f2, e2);
      }
      async function bi(a10, b2, c2, d2) {
        return aD(a10, b2, c2, void 0, d2?.[q], d2?.recognizedTokenTypes);
      }
      async function bj(a10, b2 = K) {
        let c2;
        try {
          c2 = await a10.json();
        } catch (c3) {
          throw b2(a10), x('failed to parse "response" body as JSON', aW, c3);
        }
        if (!B(c2)) throw x('"response" body must be a top level object', aX, { body: c2 });
        return c2;
      }
      let bk = Symbol(), bl = Symbol();
    }, 744: (a, b, c) => {
      "use strict";
      c.d(b, { iC: () => e }), c(622);
      var d = c(303);
      function e() {
        let a2 = d.Z.getStore();
        return (null == a2 ? void 0 : a2.rootTaskSpawnPhase) === "action";
      }
    }, 799: (a) => {
      function b(a2) {
        return Promise.resolve().then(() => {
          var b2 = Error("Cannot find module '" + a2 + "'");
          throw b2.code = "MODULE_NOT_FOUND", b2;
        });
      }
      b.keys = () => [], b.resolve = b, b.id = 799, a.exports = b;
    }, 800: (a) => {
      "use strict";
      var b = Object.defineProperty, c = Object.getOwnPropertyDescriptor, d = Object.getOwnPropertyNames, e = Object.prototype.hasOwnProperty, f = {};
      function g(a2) {
        var b2;
        let c2 = ["path" in a2 && a2.path && `Path=${a2.path}`, "expires" in a2 && (a2.expires || 0 === a2.expires) && `Expires=${("number" == typeof a2.expires ? new Date(a2.expires) : a2.expires).toUTCString()}`, "maxAge" in a2 && "number" == typeof a2.maxAge && `Max-Age=${a2.maxAge}`, "domain" in a2 && a2.domain && `Domain=${a2.domain}`, "secure" in a2 && a2.secure && "Secure", "httpOnly" in a2 && a2.httpOnly && "HttpOnly", "sameSite" in a2 && a2.sameSite && `SameSite=${a2.sameSite}`, "partitioned" in a2 && a2.partitioned && "Partitioned", "priority" in a2 && a2.priority && `Priority=${a2.priority}`].filter(Boolean), d2 = `${a2.name}=${encodeURIComponent(null != (b2 = a2.value) ? b2 : "")}`;
        return 0 === c2.length ? d2 : `${d2}; ${c2.join("; ")}`;
      }
      function h(a2) {
        let b2 = /* @__PURE__ */ new Map();
        for (let c2 of a2.split(/; */)) {
          if (!c2) continue;
          let a3 = c2.indexOf("=");
          if (-1 === a3) {
            b2.set(c2, "true");
            continue;
          }
          let [d2, e2] = [c2.slice(0, a3), c2.slice(a3 + 1)];
          try {
            b2.set(d2, decodeURIComponent(null != e2 ? e2 : "true"));
          } catch {
          }
        }
        return b2;
      }
      function i(a2) {
        if (!a2) return;
        let [[b2, c2], ...d2] = h(a2), { domain: e2, expires: f2, httponly: g2, maxage: i2, path: l2, samesite: m2, secure: n, partitioned: o, priority: p } = Object.fromEntries(d2.map(([a3, b3]) => [a3.toLowerCase().replace(/-/g, ""), b3]));
        {
          var q, r, s = { name: b2, value: decodeURIComponent(c2), domain: e2, ...f2 && { expires: new Date(f2) }, ...g2 && { httpOnly: true }, ..."string" == typeof i2 && { maxAge: Number(i2) }, path: l2, ...m2 && { sameSite: j.includes(q = (q = m2).toLowerCase()) ? q : void 0 }, ...n && { secure: true }, ...p && { priority: k.includes(r = (r = p).toLowerCase()) ? r : void 0 }, ...o && { partitioned: true } };
          let a3 = {};
          for (let b3 in s) s[b3] && (a3[b3] = s[b3]);
          return a3;
        }
      }
      ((a2, c2) => {
        for (var d2 in c2) b(a2, d2, { get: c2[d2], enumerable: true });
      })(f, { RequestCookies: () => l, ResponseCookies: () => m, parseCookie: () => h, parseSetCookie: () => i, stringifyCookie: () => g }), a.exports = ((a2, f2, g2, h2) => {
        if (f2 && "object" == typeof f2 || "function" == typeof f2) for (let i2 of d(f2)) e.call(a2, i2) || i2 === g2 || b(a2, i2, { get: () => f2[i2], enumerable: !(h2 = c(f2, i2)) || h2.enumerable });
        return a2;
      })(b({}, "__esModule", { value: true }), f);
      var j = ["strict", "lax", "none"], k = ["low", "medium", "high"], l = class {
        constructor(a2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = a2;
          let b2 = a2.get("cookie");
          if (b2) for (let [a3, c2] of h(b2)) this._parsed.set(a3, { name: a3, value: c2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...a2) {
          let b2 = "string" == typeof a2[0] ? a2[0] : a2[0].name;
          return this._parsed.get(b2);
        }
        getAll(...a2) {
          var b2;
          let c2 = Array.from(this._parsed);
          if (!a2.length) return c2.map(([a3, b3]) => b3);
          let d2 = "string" == typeof a2[0] ? a2[0] : null == (b2 = a2[0]) ? void 0 : b2.name;
          return c2.filter(([a3]) => a3 === d2).map(([a3, b3]) => b3);
        }
        has(a2) {
          return this._parsed.has(a2);
        }
        set(...a2) {
          let [b2, c2] = 1 === a2.length ? [a2[0].name, a2[0].value] : a2, d2 = this._parsed;
          return d2.set(b2, { name: b2, value: c2 }), this._headers.set("cookie", Array.from(d2).map(([a3, b3]) => g(b3)).join("; ")), this;
        }
        delete(a2) {
          let b2 = this._parsed, c2 = Array.isArray(a2) ? a2.map((a3) => b2.delete(a3)) : b2.delete(a2);
          return this._headers.set("cookie", Array.from(b2).map(([a3, b3]) => g(b3)).join("; ")), c2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((a2) => `${a2.name}=${encodeURIComponent(a2.value)}`).join("; ");
        }
      }, m = class {
        constructor(a2) {
          var b2, c2, d2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = a2;
          let e2 = null != (d2 = null != (c2 = null == (b2 = a2.getSetCookie) ? void 0 : b2.call(a2)) ? c2 : a2.get("set-cookie")) ? d2 : [];
          for (let a3 of Array.isArray(e2) ? e2 : function(a4) {
            if (!a4) return [];
            var b3, c3, d3, e3, f2, g2 = [], h2 = 0;
            function i2() {
              for (; h2 < a4.length && /\s/.test(a4.charAt(h2)); ) h2 += 1;
              return h2 < a4.length;
            }
            for (; h2 < a4.length; ) {
              for (b3 = h2, f2 = false; i2(); ) if ("," === (c3 = a4.charAt(h2))) {
                for (d3 = h2, h2 += 1, i2(), e3 = h2; h2 < a4.length && "=" !== (c3 = a4.charAt(h2)) && ";" !== c3 && "," !== c3; ) h2 += 1;
                h2 < a4.length && "=" === a4.charAt(h2) ? (f2 = true, h2 = e3, g2.push(a4.substring(b3, d3)), b3 = h2) : h2 = d3 + 1;
              } else h2 += 1;
              (!f2 || h2 >= a4.length) && g2.push(a4.substring(b3, a4.length));
            }
            return g2;
          }(e2)) {
            let b3 = i(a3);
            b3 && this._parsed.set(b3.name, b3);
          }
        }
        get(...a2) {
          let b2 = "string" == typeof a2[0] ? a2[0] : a2[0].name;
          return this._parsed.get(b2);
        }
        getAll(...a2) {
          var b2;
          let c2 = Array.from(this._parsed.values());
          if (!a2.length) return c2;
          let d2 = "string" == typeof a2[0] ? a2[0] : null == (b2 = a2[0]) ? void 0 : b2.name;
          return c2.filter((a3) => a3.name === d2);
        }
        has(a2) {
          return this._parsed.has(a2);
        }
        set(...a2) {
          let [b2, c2, d2] = 1 === a2.length ? [a2[0].name, a2[0].value, a2[0]] : a2, e2 = this._parsed;
          return e2.set(b2, function(a3 = { name: "", value: "" }) {
            return "number" == typeof a3.expires && (a3.expires = new Date(a3.expires)), a3.maxAge && (a3.expires = new Date(Date.now() + 1e3 * a3.maxAge)), (null === a3.path || void 0 === a3.path) && (a3.path = "/"), a3;
          }({ name: b2, value: c2, ...d2 })), function(a3, b3) {
            for (let [, c3] of (b3.delete("set-cookie"), a3)) {
              let a4 = g(c3);
              b3.append("set-cookie", a4);
            }
          }(e2, this._headers), this;
        }
        delete(...a2) {
          let [b2, c2] = "string" == typeof a2[0] ? [a2[0]] : [a2[0].name, a2[0]];
          return this.set({ ...c2, name: b2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(g).join("; ");
        }
      };
    }, 814: (a) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var b = {};
        (() => {
          b.parse = function(b2, c2) {
            if ("string" != typeof b2) throw TypeError("argument str must be a string");
            for (var e2 = {}, f = b2.split(d), g = (c2 || {}).decode || a2, h = 0; h < f.length; h++) {
              var i = f[h], j = i.indexOf("=");
              if (!(j < 0)) {
                var k = i.substr(0, j).trim(), l = i.substr(++j, i.length).trim();
                '"' == l[0] && (l = l.slice(1, -1)), void 0 == e2[k] && (e2[k] = function(a3, b3) {
                  try {
                    return b3(a3);
                  } catch (b4) {
                    return a3;
                  }
                }(l, g));
              }
            }
            return e2;
          }, b.serialize = function(a3, b2, d2) {
            var f = d2 || {}, g = f.encode || c;
            if ("function" != typeof g) throw TypeError("option encode is invalid");
            if (!e.test(a3)) throw TypeError("argument name is invalid");
            var h = g(b2);
            if (h && !e.test(h)) throw TypeError("argument val is invalid");
            var i = a3 + "=" + h;
            if (null != f.maxAge) {
              var j = f.maxAge - 0;
              if (isNaN(j) || !isFinite(j)) throw TypeError("option maxAge is invalid");
              i += "; Max-Age=" + Math.floor(j);
            }
            if (f.domain) {
              if (!e.test(f.domain)) throw TypeError("option domain is invalid");
              i += "; Domain=" + f.domain;
            }
            if (f.path) {
              if (!e.test(f.path)) throw TypeError("option path is invalid");
              i += "; Path=" + f.path;
            }
            if (f.expires) {
              if ("function" != typeof f.expires.toUTCString) throw TypeError("option expires is invalid");
              i += "; Expires=" + f.expires.toUTCString();
            }
            if (f.httpOnly && (i += "; HttpOnly"), f.secure && (i += "; Secure"), f.sameSite) switch ("string" == typeof f.sameSite ? f.sameSite.toLowerCase() : f.sameSite) {
              case true:
              case "strict":
                i += "; SameSite=Strict";
                break;
              case "lax":
                i += "; SameSite=Lax";
                break;
              case "none":
                i += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return i;
          };
          var a2 = decodeURIComponent, c = encodeURIComponent, d = /; */, e = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), a.exports = b;
      })();
    }, 915: (a, b, c) => {
      "use strict";
      a.exports = c(543);
    }, 921: (a, b, c) => {
      "use strict";
      c.d(b, { o: () => f });
      var d = c(704);
      class e extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new e();
        }
      }
      class f extends Headers {
        constructor(a2) {
          super(), this.headers = new Proxy(a2, { get(b2, c2, e2) {
            if ("symbol" == typeof c2) return d.l.get(b2, c2, e2);
            let f2 = c2.toLowerCase(), g = Object.keys(a2).find((a3) => a3.toLowerCase() === f2);
            if (void 0 !== g) return d.l.get(b2, g, e2);
          }, set(b2, c2, e2, f2) {
            if ("symbol" == typeof c2) return d.l.set(b2, c2, e2, f2);
            let g = c2.toLowerCase(), h = Object.keys(a2).find((a3) => a3.toLowerCase() === g);
            return d.l.set(b2, h ?? c2, e2, f2);
          }, has(b2, c2) {
            if ("symbol" == typeof c2) return d.l.has(b2, c2);
            let e2 = c2.toLowerCase(), f2 = Object.keys(a2).find((a3) => a3.toLowerCase() === e2);
            return void 0 !== f2 && d.l.has(b2, f2);
          }, deleteProperty(b2, c2) {
            if ("symbol" == typeof c2) return d.l.deleteProperty(b2, c2);
            let e2 = c2.toLowerCase(), f2 = Object.keys(a2).find((a3) => a3.toLowerCase() === e2);
            return void 0 === f2 || d.l.deleteProperty(b2, f2);
          } });
        }
        static seal(a2) {
          return new Proxy(a2, { get(a3, b2, c2) {
            switch (b2) {
              case "append":
              case "delete":
              case "set":
                return e.callable;
              default:
                return d.l.get(a3, b2, c2);
            }
          } });
        }
        merge(a2) {
          return Array.isArray(a2) ? a2.join(", ") : a2;
        }
        static from(a2) {
          return a2 instanceof Headers ? a2 : new f(a2);
        }
        append(a2, b2) {
          let c2 = this.headers[a2];
          "string" == typeof c2 ? this.headers[a2] = [c2, b2] : Array.isArray(c2) ? c2.push(b2) : this.headers[a2] = b2;
        }
        delete(a2) {
          delete this.headers[a2];
        }
        get(a2) {
          let b2 = this.headers[a2];
          return void 0 !== b2 ? this.merge(b2) : null;
        }
        has(a2) {
          return void 0 !== this.headers[a2];
        }
        set(a2, b2) {
          this.headers[a2] = b2;
        }
        forEach(a2, b2) {
          for (let [c2, d2] of this.entries()) a2.call(b2, d2, c2, this);
        }
        *entries() {
          for (let a2 of Object.keys(this.headers)) {
            let b2 = a2.toLowerCase(), c2 = this.get(b2);
            yield [b2, c2];
          }
        }
        *keys() {
          for (let a2 of Object.keys(this.headers)) {
            let b2 = a2.toLowerCase();
            yield b2;
          }
        }
        *values() {
          for (let a2 of Object.keys(this.headers)) {
            let b2 = this.get(a2);
            yield b2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
    }, 941: (a, b, c) => {
      "use strict";
      Object.defineProperty(b, "__esModule", { value: true }), !function(a2, b2) {
        for (var c2 in b2) Object.defineProperty(a2, c2, { enumerable: true, get: b2[c2] });
      }(b, { getTestReqInfo: function() {
        return g;
      }, withRequest: function() {
        return f;
      } });
      let d = new (c(521)).AsyncLocalStorage();
      function e(a2, b2) {
        let c2 = b2.header(a2, "next-test-proxy-port");
        if (!c2) return;
        let d2 = b2.url(a2);
        return { url: d2, proxyPort: Number(c2), testData: b2.header(a2, "next-test-data") || "" };
      }
      function f(a2, b2, c2) {
        let f2 = e(a2, b2);
        return f2 ? d.run(f2, c2) : c2();
      }
      function g(a2, b2) {
        let c2 = d.getStore();
        return c2 || (a2 && b2 ? e(a2, b2) : void 0);
      }
    }, 960: (a, b, c) => {
      "use strict";
      c.d(b, { $p: () => i, cg: () => h, xl: () => g });
      let d = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class e {
        disable() {
          throw d;
        }
        getStore() {
        }
        run() {
          throw d;
        }
        exit() {
          throw d;
        }
        enterWith() {
          throw d;
        }
        static bind(a2) {
          return a2;
        }
      }
      let f = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function g() {
        return f ? new f() : new e();
      }
      function h(a2) {
        return f ? f.bind(a2) : e.bind(a2);
      }
      function i() {
        return f ? f.snapshot() : function(a2, ...b2) {
          return a2(...b2);
        };
      }
    }, 981: (a, b, c) => {
      "use strict";
      c.d(b, { xl: () => g });
      let d = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class e {
        disable() {
          throw d;
        }
        getStore() {
        }
        run() {
          throw d;
        }
        exit() {
          throw d;
        }
        enterWith() {
          throw d;
        }
        static bind(a2) {
          return a2;
        }
      }
      let f = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function g() {
        return f ? new f() : new e();
      }
    }, 982: (a, b, c) => {
      "use strict";
      c.d(b, { cookies: () => r, headers: () => x });
      var d = c(718), e = c(249), f = c(172), g = c(298), h = c(593), i = c(622), j = c(565), k = c(915);
      let l = { current: null }, m = "function" == typeof k.cache ? k.cache : (a2) => a2, n = console.warn;
      function o(a2) {
        return function(...b2) {
          n(a2(...b2));
        };
      }
      m((a2) => {
        try {
          n(l.current);
        } finally {
          l.current = null;
        }
      });
      var p = c(744), q = c(726);
      function r() {
        let a2 = "cookies", b2 = f.J.getStore(), c2 = g.FP.getStore();
        if (b2) {
          if (c2 && "after" === c2.phase && !(0, p.iC)()) throw Object.defineProperty(Error(`Route ${b2.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E88", enumerable: false, configurable: true });
          if (b2.forceStatic) return t(d.Ck.seal(new e.tm(new Headers({}))));
          if (c2) {
            if ("cache" === c2.type) throw Object.defineProperty(Error(`Route ${b2.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E398", enumerable: false, configurable: true });
            else if ("unstable-cache" === c2.type) throw Object.defineProperty(Error(`Route ${b2.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E157", enumerable: false, configurable: true });
          }
          if (b2.dynamicShouldError) throw Object.defineProperty(new i.f(`Route ${b2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E549", enumerable: false, configurable: true });
          if (c2) switch (c2.type) {
            case "prerender":
              var k2 = c2;
              let f2 = s.get(k2);
              if (f2) return f2;
              let g2 = (0, j.W)(k2.renderSignal, "`cookies()`");
              return s.set(k2, g2), g2;
            case "prerender-client":
              let l3 = "`cookies`";
              throw Object.defineProperty(new q.z(`${l3} must not be used within a client component. Next.js should be preventing ${l3} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              (0, h.Ui)(b2.route, a2, c2.dynamicTracking);
              break;
            case "prerender-legacy":
              (0, h.xI)(a2, b2, c2);
          }
          (0, h.Pk)(b2, c2);
        }
        let l2 = (0, g.XN)(a2);
        return t((0, d.Xj)(l2) ? l2.userspaceMutableCookies : l2.cookies);
      }
      let s = /* @__PURE__ */ new WeakMap();
      function t(a2) {
        let b2 = s.get(a2);
        if (b2) return b2;
        let c2 = Promise.resolve(a2);
        return s.set(a2, c2), Object.defineProperties(c2, { [Symbol.iterator]: { value: a2[Symbol.iterator] ? a2[Symbol.iterator].bind(a2) : u.bind(a2) }, size: { get: () => a2.size }, get: { value: a2.get.bind(a2) }, getAll: { value: a2.getAll.bind(a2) }, has: { value: a2.has.bind(a2) }, set: { value: a2.set.bind(a2) }, delete: { value: a2.delete.bind(a2) }, clear: { value: "function" == typeof a2.clear ? a2.clear.bind(a2) : v.bind(a2, c2) }, toString: { value: a2.toString.bind(a2) } }), c2;
      }
      function u() {
        return this.getAll().map((a2) => [a2.name, a2]).values();
      }
      function v(a2) {
        for (let a3 of this.getAll()) this.delete(a3.name);
        return a2;
      }
      o(function(a2, b2) {
        let c2 = a2 ? `Route "${a2}" ` : "This route ";
        return Object.defineProperty(Error(`${c2}used ${b2}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E223", enumerable: false, configurable: true });
      });
      var w = c(921);
      function x() {
        let a2 = f.J.getStore(), b2 = g.FP.getStore();
        if (a2) {
          if (b2 && "after" === b2.phase && !(0, p.iC)()) throw Object.defineProperty(Error(`Route ${a2.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E367", enumerable: false, configurable: true });
          if (a2.forceStatic) return z(w.o.seal(new Headers({})));
          if (b2) {
            if ("cache" === b2.type) throw Object.defineProperty(Error(`Route ${a2.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E304", enumerable: false, configurable: true });
            else if ("unstable-cache" === b2.type) throw Object.defineProperty(Error(`Route ${a2.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E127", enumerable: false, configurable: true });
          }
          if (a2.dynamicShouldError) throw Object.defineProperty(new i.f(`Route ${a2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E525", enumerable: false, configurable: true });
          if (b2) switch (b2.type) {
            case "prerender":
              var c2 = b2;
              let d2 = y.get(c2);
              if (d2) return d2;
              let e2 = (0, j.W)(c2.renderSignal, "`headers()`");
              return y.set(c2, e2), e2;
            case "prerender-client":
              let f2 = "`headers`";
              throw Object.defineProperty(new q.z(`${f2} must not be used within a client component. Next.js should be preventing ${f2} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              (0, h.Ui)(a2.route, "headers", b2.dynamicTracking);
              break;
            case "prerender-legacy":
              (0, h.xI)("headers", a2, b2);
          }
          (0, h.Pk)(a2, b2);
        }
        return z((0, g.XN)("headers").headers);
      }
      let y = /* @__PURE__ */ new WeakMap();
      function z(a2) {
        let b2 = y.get(a2);
        if (b2) return b2;
        let c2 = Promise.resolve(a2);
        return y.set(a2, c2), Object.defineProperties(c2, { append: { value: a2.append.bind(a2) }, delete: { value: a2.delete.bind(a2) }, get: { value: a2.get.bind(a2) }, has: { value: a2.has.bind(a2) }, set: { value: a2.set.bind(a2) }, getSetCookie: { value: a2.getSetCookie.bind(a2) }, forEach: { value: a2.forEach.bind(a2) }, keys: { value: a2.keys.bind(a2) }, values: { value: a2.values.bind(a2) }, entries: { value: a2.entries.bind(a2) }, [Symbol.iterator]: { value: a2[Symbol.iterator].bind(a2) } }), c2;
      }
      o(function(a2, b2) {
        let c2 = a2 ? `Route "${a2}" ` : "This route ";
        return Object.defineProperty(Error(`${c2}used ${b2}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E277", enumerable: false, configurable: true });
      }), c(484), /* @__PURE__ */ new WeakMap(), o(function(a2, b2) {
        let c2 = a2 ? `Route "${a2}" ` : "This route ";
        return Object.defineProperty(Error(`${c2}used ${b2}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E377", enumerable: false, configurable: true });
      });
    } }, (a) => {
      var b = a(a.s = 689);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES).middleware_middleware = b;
    }]);
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|sitemap.xml|robots.txt).*))(\\.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": true }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": ["api.microlink.io"], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/tmp/loopaas", "experimental": { "useSkewCookie": false, "nodeMiddleware": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 15, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "routerBFCache": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "devtoolNewPanelUI": false, "devtoolSegmentExplorer": false, "browserDebugInfoInTerminal": false, "optimizeRouterScrolling": false, "strictNextHead": true, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "Mediapartners-Google|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti", "bundlePagesRouterDependencies": false, "configFileName": "next.config.js", "turbopack": { "root": "/tmp/loopaas" } };
var BuildId = "_GoNR2LbRiB9YKc8Y5ZV1";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/cursos", "regex": "^/cursos(?:/)?$", "routeKeys": {}, "namedRegex": "^/cursos(?:/)?$" }, { "page": "/cursos/nuevo", "regex": "^/cursos/nuevo(?:/)?$", "routeKeys": {}, "namedRegex": "^/cursos/nuevo(?:/)?$" }, { "page": "/demo/plugins", "regex": "^/demo/plugins(?:/)?$", "routeKeys": {}, "namedRegex": "^/demo/plugins(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/instrucciones", "regex": "^/instrucciones(?:/)?$", "routeKeys": {}, "namedRegex": "^/instrucciones(?:/)?$" }, { "page": "/instrucciones/estudiante", "regex": "^/instrucciones/estudiante(?:/)?$", "routeKeys": {}, "namedRegex": "^/instrucciones/estudiante(?:/)?$" }, { "page": "/instrucciones/profesor", "regex": "^/instrucciones/profesor(?:/)?$", "routeKeys": {}, "namedRegex": "^/instrucciones/profesor(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/login/magic-link", "regex": "^/login/magic\\-link(?:/)?$", "routeKeys": {}, "namedRegex": "^/login/magic\\-link(?:/)?$" }, { "page": "/opengraph-image.png", "regex": "^/opengraph\\-image\\.png(?:/)?$", "routeKeys": {}, "namedRegex": "^/opengraph\\-image\\.png(?:/)?$" }, { "page": "/organizacion", "regex": "^/organizacion(?:/)?$", "routeKeys": {}, "namedRegex": "^/organizacion(?:/)?$" }, { "page": "/organizacion/nueva", "regex": "^/organizacion/nueva(?:/)?$", "routeKeys": {}, "namedRegex": "^/organizacion/nueva(?:/)?$" }, { "page": "/organizaciones", "regex": "^/organizaciones(?:/)?$", "routeKeys": {}, "namedRegex": "^/organizaciones(?:/)?$" }, { "page": "/organizaciones/nueva", "regex": "^/organizaciones/nueva(?:/)?$", "routeKeys": {}, "namedRegex": "^/organizaciones/nueva(?:/)?$" }, { "page": "/perfil", "regex": "^/perfil(?:/)?$", "routeKeys": {}, "namedRegex": "^/perfil(?:/)?$" }, { "page": "/ping", "regex": "^/ping(?:/)?$", "routeKeys": {}, "namedRegex": "^/ping(?:/)?$" }, { "page": "/plugins", "regex": "^/plugins(?:/)?$", "routeKeys": {}, "namedRegex": "^/plugins(?:/)?$" }, { "page": "/plugins-manager", "regex": "^/plugins\\-manager(?:/)?$", "routeKeys": {}, "namedRegex": "^/plugins\\-manager(?:/)?$" }, { "page": "/pricing", "regex": "^/pricing(?:/)?$", "routeKeys": {}, "namedRegex": "^/pricing(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }, { "page": "/supabase/auth/callback", "regex": "^/supabase/auth/callback(?:/)?$", "routeKeys": {}, "namedRegex": "^/supabase/auth/callback(?:/)?$" }, { "page": "/twitter-image.png", "regex": "^/twitter\\-image\\.png(?:/)?$", "routeKeys": {}, "namedRegex": "^/twitter\\-image\\.png(?:/)?$" }], "dynamic": [{ "page": "/api/canvas/course/[id]", "regex": "^/api/canvas/course/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/canvas/course/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/courses/[courseId]/students", "regex": "^/api/courses/([^/]+?)/students(?:/)?$", "routeKeys": { "nxtPcourseId": "nxtPcourseId" }, "namedRegex": "^/api/courses/(?<nxtPcourseId>[^/]+?)/students(?:/)?$" }, { "page": "/api/evaluations/[id]", "regex": "^/api/evaluations/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/evaluations/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/evaluations/[id]/check-grades", "regex": "^/api/evaluations/([^/]+?)/check\\-grades(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/evaluations/(?<nxtPid>[^/]+?)/check\\-grades(?:/)?$" }, { "page": "/api/evaluations/[id]/responses", "regex": "^/api/evaluations/([^/]+?)/responses(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/evaluations/(?<nxtPid>[^/]+?)/responses(?:/)?$" }, { "page": "/api/plugins/students/[courseId]", "regex": "^/api/plugins/students/([^/]+?)(?:/)?$", "routeKeys": { "nxtPcourseId": "nxtPcourseId" }, "namedRegex": "^/api/plugins/students/(?<nxtPcourseId>[^/]+?)(?:/)?$" }, { "page": "/compartir/cursos/[abbreviature]/[semester]/evaluaciones/[id]/estadisticas", "regex": "^/compartir/cursos/([^/]+?)/([^/]+?)/evaluaciones/([^/]+?)/estadisticas(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester", "nxtPid": "nxtPid" }, "namedRegex": "^/compartir/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/evaluaciones/(?<nxtPid>[^/]+?)/estadisticas(?:/)?$" }, { "page": "/compartir/cursos/[abbreviature]/[semester]/evaluaciones/[id]/estadisticas/opengraph-image", "regex": "^/compartir/cursos/([^/]+?)/([^/]+?)/evaluaciones/([^/]+?)/estadisticas/opengraph\\-image(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester", "nxtPid": "nxtPid" }, "namedRegex": "^/compartir/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/evaluaciones/(?<nxtPid>[^/]+?)/estadisticas/opengraph\\-image(?:/)?$" }, { "page": "/cursos/[abbreviature]", "regex": "^/cursos/([^/]+?)(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]", "regex": "^/cursos/([^/]+?)/([^/]+?)(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/configuracion", "regex": "^/cursos/([^/]+?)/([^/]+?)/configuracion(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/configuracion(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/estudiantes", "regex": "^/cursos/([^/]+?)/([^/]+?)/estudiantes(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/estudiantes(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/evaluaciones", "regex": "^/cursos/([^/]+?)/([^/]+?)/evaluaciones(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/evaluaciones(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/evaluaciones/nuevo", "regex": "^/cursos/([^/]+?)/([^/]+?)/evaluaciones/nuevo(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/evaluaciones/nuevo(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]", "regex": "^/cursos/([^/]+?)/([^/]+?)/evaluaciones/([^/]+?)(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester", "nxtPid": "nxtPid" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/evaluaciones/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/configuracion", "regex": "^/cursos/([^/]+?)/([^/]+?)/evaluaciones/([^/]+?)/configuracion(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester", "nxtPid": "nxtPid" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/evaluaciones/(?<nxtPid>[^/]+?)/configuracion(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/estadisticas", "regex": "^/cursos/([^/]+?)/([^/]+?)/evaluaciones/([^/]+?)/estadisticas(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester", "nxtPid": "nxtPid" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/evaluaciones/(?<nxtPid>[^/]+?)/estadisticas(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/respuestas", "regex": "^/cursos/([^/]+?)/([^/]+?)/evaluaciones/([^/]+?)/respuestas(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester", "nxtPid": "nxtPid" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/evaluaciones/(?<nxtPid>[^/]+?)/respuestas(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/resultados", "regex": "^/cursos/([^/]+?)/([^/]+?)/evaluaciones/([^/]+?)/resultados(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester", "nxtPid": "nxtPid" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/evaluaciones/(?<nxtPid>[^/]+?)/resultados(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/grupos", "regex": "^/cursos/([^/]+?)/([^/]+?)/grupos(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/grupos(?:/)?$" }, { "page": "/cursos/[abbreviature]/[semester]/profesores", "regex": "^/cursos/([^/]+?)/([^/]+?)/profesores(?:/)?$", "routeKeys": { "nxtPabbreviature": "nxtPabbreviature", "nxtPsemester": "nxtPsemester" }, "namedRegex": "^/cursos/(?<nxtPabbreviature>[^/]+?)/(?<nxtPsemester>[^/]+?)/profesores(?:/)?$" }, { "page": "/organizacion/[id]", "regex": "^/organizacion/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/organizacion/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/organizaciones/[id]", "regex": "^/organizaciones/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/organizaciones/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/organizaciones/[id]/analytics", "regex": "^/organizaciones/([^/]+?)/analytics(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/organizaciones/(?<nxtPid>[^/]+?)/analytics(?:/)?$" }, { "page": "/organizaciones/[id]/configuracion", "regex": "^/organizaciones/([^/]+?)/configuracion(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/organizaciones/(?<nxtPid>[^/]+?)/configuracion(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/twitter-image.png": { "initialHeaders": { "cache-control": "public, immutable, no-transform, max-age=31536000", "content-type": "image/png", "x-next-cache-tags": "_N_T_/layout,_N_T_/twitter-image.png/layout,_N_T_/twitter-image.png/route,_N_T_/twitter-image.png" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/twitter-image.png", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/opengraph-image.png": { "initialHeaders": { "cache-control": "public, immutable, no-transform, max-age=31536000", "content-type": "image/png", "x-next-cache-tags": "_N_T_/layout,_N_T_/opengraph-image.png/layout,_N_T_/opengraph-image.png/route,_N_T_/opengraph-image.png" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/opengraph-image.png", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/instrucciones/profesor": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/instrucciones/profesor", "dataRoute": "/instrucciones/profesor.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/instrucciones/estudiante": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/instrucciones/estudiante", "dataRoute": "/instrucciones/estudiante.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/login/magic-link": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/login/magic-link", "dataRoute": "/login/magic-link.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/login": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/login", "dataRoute": "/login.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/demo/plugins": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/demo/plugins", "dataRoute": "/demo/plugins.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/organizacion": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/organizacion", "dataRoute": "/organizacion.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/organizacion/nueva": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/organizacion/nueva", "dataRoute": "/organizacion/nueva.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/organizaciones": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/organizaciones", "dataRoute": "/organizaciones.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/instrucciones": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/instrucciones", "dataRoute": "/instrucciones.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/organizaciones/nueva": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/organizaciones/nueva", "dataRoute": "/organizaciones/nueva.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/pricing": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/pricing", "dataRoute": "/pricing.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/plugins": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/plugins", "dataRoute": "/plugins.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/plugins-manager": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/plugins-manager", "dataRoute": "/plugins-manager.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "db34dccb0b8a4b4974fb0783a89c6e86", "previewModeSigningKey": "ac1c2b1a902dd73b6db489f8b9a4bfe2f2c74c34dccc4b9548fef1cf07ff7494", "previewModeEncryptionKey": "1d8498dec149ae18444c696749c9f02009d223782e8db355f50cc391fee45f60" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/middleware.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|sitemap.xml|robots.txt).*))(\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "_GoNR2LbRiB9YKc8Y5ZV1", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "A4dJ7vSRQ0yiVFvf3kLdDc9YB/0Xv9hsa6YnsSwE+Z8=", "__NEXT_PREVIEW_MODE_ID": "db34dccb0b8a4b4974fb0783a89c6e86", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "ac1c2b1a902dd73b6db489f8b9a4bfe2f2c74c34dccc4b9548fef1cf07ff7494", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "1d8498dec149ae18444c696749c9f02009d223782e8db355f50cc391fee45f60" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/api/add-professor/route": "/api/add-professor", "/api/auth/callback/route": "/api/auth/callback", "/api/auto-login/route": "/api/auto-login", "/api/canvas/course/[id]/route": "/api/canvas/course/[id]", "/api/canvas/token-status/route": "/api/canvas/token-status", "/api/clear-cache/route": "/api/clear-cache", "/api/course-info/route": "/api/course-info", "/api/courses/[courseId]/students/route": "/api/courses/[courseId]/students", "/api/create-organization/route": "/api/create-organization", "/api/create-user-info/route": "/api/create-user-info", "/api/delete-course/route": "/api/delete-course", "/api/delete-student/route": "/api/delete-student", "/api/evaluations/[id]/check-grades/route": "/api/evaluations/[id]/check-grades", "/api/evaluations/[id]/responses/route": "/api/evaluations/[id]/responses", "/api/get-peer-evaluation-scores/route": "/api/get-peer-evaluation-scores", "/api/evaluations/[id]/route": "/api/evaluations/[id]", "/api/get-students-with-grades/route": "/api/get-students-with-grades", "/api/is-professor/route": "/api/is-professor", "/api/organization-courses/route": "/api/organization-courses", "/api/organizations/route": "/api/organizations", "/api/plan-usage/route": "/api/plan-usage", "/api/plugins/attendance/download/route": "/api/plugins/attendance/download", "/api/plugins/attendance/route": "/api/plugins/attendance", "/api/plugins/courses/route": "/api/plugins/courses", "/api/save-grade/route": "/api/save-grade", "/api/plugins/students/[courseId]/route": "/api/plugins/students/[courseId]", "/api/save-grades/route": "/api/save-grades", "/api/save-students/route": "/api/save-students", "/api/signup-user/route": "/api/signup-user", "/api/stripe/checkout/route": "/api/stripe/checkout", "/api/sync-user-info/route": "/api/sync-user-info", "/api/transpile-plugin/route": "/api/transpile-plugin", "/api/update-course/route": "/api/update-course", "/api/update-student/route": "/api/update-student", "/api/user-info/route": "/api/user-info", "/favicon.ico/route": "/favicon.ico", "/supabase/auth/callback/route": "/supabase/auth/callback", "/sitemap.xml/route": "/sitemap.xml", "/compartir/cursos/[abbreviature]/[semester]/evaluaciones/[id]/estadisticas/opengraph-image/route": "/compartir/cursos/[abbreviature]/[semester]/evaluaciones/[id]/estadisticas/opengraph-image", "/opengraph-image.png/route": "/opengraph-image.png", "/twitter-image.png/route": "/twitter-image.png", "/_not-found/page": "/_not-found", "/cursos/[abbreviature]/[semester]/configuracion/page": "/cursos/[abbreviature]/[semester]/configuracion", "/cursos/[abbreviature]/[semester]/estudiantes/page": "/cursos/[abbreviature]/[semester]/estudiantes", "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/configuracion/page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/configuracion", "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/estadisticas/page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/estadisticas", "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/respuestas/page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/respuestas", "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]", "/cursos/[abbreviature]/[semester]/evaluaciones/nuevo/page": "/cursos/[abbreviature]/[semester]/evaluaciones/nuevo", "/cursos/[abbreviature]/[semester]/evaluaciones/page": "/cursos/[abbreviature]/[semester]/evaluaciones", "/cursos/[abbreviature]/[semester]/grupos/page": "/cursos/[abbreviature]/[semester]/grupos", "/cursos/[abbreviature]/[semester]/page": "/cursos/[abbreviature]/[semester]", "/cursos/[abbreviature]/[semester]/profesores/page": "/cursos/[abbreviature]/[semester]/profesores", "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/resultados/page": "/cursos/[abbreviature]/[semester]/evaluaciones/[id]/resultados", "/cursos/nuevo/page": "/cursos/nuevo", "/cursos/[abbreviature]/page": "/cursos/[abbreviature]", "/cursos/page": "/cursos", "/demo/plugins/page": "/demo/plugins", "/instrucciones/page": "/instrucciones", "/instrucciones/estudiante/page": "/instrucciones/estudiante", "/instrucciones/profesor/page": "/instrucciones/profesor", "/login/magic-link/page": "/login/magic-link", "/login/page": "/login", "/organizacion/[id]/page": "/organizacion/[id]", "/organizacion/nueva/page": "/organizacion/nueva", "/organizacion/page": "/organizacion", "/organizaciones/[id]/analytics/page": "/organizaciones/[id]/analytics", "/organizaciones/[id]/configuracion/page": "/organizaciones/[id]/configuracion", "/organizaciones/nueva/page": "/organizaciones/nueva", "/organizaciones/[id]/page": "/organizaciones/[id]", "/organizaciones/page": "/organizaciones", "/page": "/", "/perfil/page": "/perfil", "/ping/page": "/ping", "/plugins-manager/page": "/plugins-manager", "/plugins/page": "/plugins", "/pricing/page": "/pricing", "/compartir/cursos/[abbreviature]/[semester]/evaluaciones/[id]/estadisticas/page": "/compartir/cursos/[abbreviature]/[semester]/evaluaciones/[id]/estadisticas" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(localizedPath, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/.pnpm/@opennextjs+aws@4.0.2_next@15.4.6_react-dom@19.1.1_react@19.1.1__react@19.1.1_/node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};

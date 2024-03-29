// i18next, v1.6.3
// Copyright (c)2013 Jan Mühlemann (jamuhl).
// Distributed under MIT license
// http://i18next.com
(function() {
    function n(n, e) { if (!e || "function" == typeof e) return n; for (var r in e) n[r] = e[r]; return n }

    function e(n, e, r) {
        var t, u = 0,
            a = n.length,
            s = void 0 === a || "function" == typeof n;
        if (r)
            if (s) {
                for (t in n)
                    if (e.apply(n[t], r) === !1) break
            } else
                for (; a > u && e.apply(n[u++], r) !== !1;);
        else if (s) {
            for (t in n)
                if (e.call(n[t], t, n[t]) === !1) break
        } else
            for (; a > u && e.call(n[u], u, n[u++]) !== !1;);
        return n
    }

    function r(n) { return "string" == typeof n ? n.replace(/[&<>"'\/]/g, function(n) { return C[n] }) : n }

    function t(n) {
        var e = function(n) {
                if (window.XMLHttpRequest) return n(null, new XMLHttpRequest);
                if (window.ActiveXObject) try { return n(null, new ActiveXObject("Msxml2.XMLHTTP")) } catch (e) { return n(null, new ActiveXObject("Microsoft.XMLHTTP")) }
                return n(Error())
            },
            r = function(n) { if ("string" == typeof n) return n; var e = []; for (var r in n) n.hasOwnProperty(r) && e.push(encodeURIComponent(r) + "=" + encodeURIComponent(n[r])); return e.join("&") },
            t = function(n) {
                n = n.replace(/\r\n/g, "\n");
                for (var e = "", r = 0; n.length > r; r++) {
                    var t = n.charCodeAt(r);
                    128 > t ? e += String.fromCharCode(t) : t > 127 && 2048 > t ? (e += String.fromCharCode(192 | t >> 6), e += String.fromCharCode(128 | 63 & t)) : (e += String.fromCharCode(224 | t >> 12), e += String.fromCharCode(128 | 63 & t >> 6), e += String.fromCharCode(128 | 63 & t))
                }
                return e
            },
            u = function(n) {
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                n = t(n);
                var r, u, a, s, o, i, l, c = "",
                    f = 0;
                do r = n.charCodeAt(f++), u = n.charCodeAt(f++), a = n.charCodeAt(f++), s = r >> 2, o = (3 & r) << 4 | u >> 4, i = (15 & u) << 2 | a >> 6, l = 63 & a, isNaN(u) ? i = l = 64 : isNaN(a) && (l = 64), c += e.charAt(s) + e.charAt(o) + e.charAt(i) + e.charAt(l), r = u = a = "", s = o = i = l = ""; while (n.length > f);
                return c
            },
            a = function() { for (var n = arguments[0], e = 1; arguments.length > e; e++) { var r = arguments[e]; for (var t in r) r.hasOwnProperty(t) && (n[t] = r[t]) } return n },
            s = function(n, t, u, o) {
                "function" == typeof u && (o = u, u = {}), u.cache = u.cache || !1, u.data = u.data || {}, u.headers = u.headers || {}, u.jsonp = u.jsonp || !1, u.async = void 0 === u.async ? !0 : u.async;
                var i, l = a({ accept: "*/*", "content-type": "application/x-www-form-urlencoded;charset=UTF-8" }, s.headers, u.headers);
                if (i = "application/json" === l["content-type"] ? JSON.stringify(u.data) : r(u.data), "GET" === n) {
                    var c = [];
                    if (i && (c.push(i), i = null), u.cache || c.push("_=" + (new Date).getTime()), u.jsonp && (c.push("callback=" + u.jsonp), c.push("jsonp=" + u.jsonp)), c = c.join("&"), c.length > 1 && (t += t.indexOf("?") > -1 ? "&" + c : "?" + c), u.jsonp) {
                        var f = document.getElementsByTagName("head")[0],
                            m = document.createElement("script");
                        return m.type = "text/javascript", m.src = t, f.appendChild(m), void 0
                    }
                }
                e(function(e, r) {
                    if (e) return o(e);
                    r.open(n, t, u.async);
                    for (var a in l) l.hasOwnProperty(a) && r.setRequestHeader(a, l[a]);
                    r.onreadystatechange = function() {
                        if (4 === r.readyState) {
                            var n = r.responseText || "";
                            if (!o) return;
                            o(r.status, { text: function() { return n }, json: function() { return JSON.parse(n) } })
                        }
                    }, r.send(i)
                })
            },
            o = { authBasic: function(n, e) { s.headers.Authorization = "Basic " + u(n + ":" + e) }, connect: function(n, e, r) { return s("CONNECT", n, e, r) }, del: function(n, e, r) { return s("DELETE", n, e, r) }, get: function(n, e, r) { return s("GET", n, e, r) }, head: function(n, e, r) { return s("HEAD", n, e, r) }, headers: function(n) { s.headers = n || {} }, isAllowed: function(n, e, r) { this.options(n, function(n, t) { r(-1 !== t.text().indexOf(e)) }) }, options: function(n, e, r) { return s("OPTIONS", n, e, r) }, patch: function(n, e, r) { return s("PATCH", n, e, r) }, post: function(n, e, r) { return s("POST", n, e, r) }, put: function(n, e, r) { return s("PUT", n, e, r) }, trace: function(n, e, r) { return s("TRACE", n, e, r) } },
            i = n.type ? n.type.toLowerCase() : "get";
        o[i](n.url, n, function(e, r) { 200 === e ? n.success(r.json(), e, null) : n.error(r.text(), e, null) })
    }

    function u(n, e) {
        "function" == typeof n && (e = n, n = {}), n = n || {}, E.extend(A, n), "string" == typeof A.ns && (A.ns = { namespaces: [A.ns], defaultNs: A.ns }), "string" == typeof A.fallbackNS && (A.fallbackNS = [A.fallbackNS]), A.interpolationPrefixEscaped = E.regexEscape(A.interpolationPrefix), A.interpolationSuffixEscaped = E.regexEscape(A.interpolationSuffix), A.lng || (A.lng = E.detectLanguage()), A.lng ? A.useCookie && E.cookie.create(A.cookieName, A.lng, A.cookieExpirationTime) : (A.lng = A.fallbackLng, A.useCookie && E.cookie.remove(A.cookieName)), P = E.toLanguages(A.lng), S = P[0], E.log("currentLng set to: " + S), R.setCurrentLng(S), L && A.setJqueryExt && m();
        var r;
        if (L && L.Deferred && (r = L.Deferred()), !A.resStore) {
            var t = E.toLanguages(A.lng);
            "string" == typeof A.preload && (A.preload = [A.preload]);
            for (var u = 0, a = A.preload.length; a > u; u++)
                for (var s = E.toLanguages(A.preload[u]), o = 0, i = s.length; i > o; o++) 0 > t.indexOf(s[o]) && t.push(s[o]);
            return w.sync.load(t, A, function(n, t) { j = t, e && e(N), r && r.resolve() }), r ? r.promise() : void 0
        }
        return j = A.resStore, e && e(N), r && r.resolve(), r ? r.promise() : void 0
    }

    function a(n, e) { "string" == typeof n && (n = [n]); for (var r = 0, t = n.length; t > r; r++) 0 > A.preload.indexOf(n[r]) && A.preload.push(n[r]); return u(e) }

    function s(n, e, r) { "string" != typeof e ? (r = e, e = A.ns.defaultNs) : 0 > A.ns.namespaces.indexOf(e) && A.ns.namespaces.push(e), j[n] = j[n] || {}, j[n][e] = j[n][e] || {}, E.extend(j[n][e], r) }

    function o(n) { A.ns.defaultNs = n }

    function i(n, e) { l([n], e) }

    function l(n, e) {
        var r = { dynamicLoad: A.dynamicLoad, resGetPath: A.resGetPath, getAsync: A.getAsync, customLoad: A.customLoad, ns: { namespaces: n, defaultNs: "" } },
            t = E.toLanguages(A.lng);
        "string" == typeof A.preload && (A.preload = [A.preload]);
        for (var u = 0, a = A.preload.length; a > u; u++)
            for (var s = E.toLanguages(A.preload[u]), o = 0, i = s.length; i > o; o++) 0 > t.indexOf(s[o]) && t.push(s[o]);
        for (var l = [], c = 0, f = t.length; f > c; c++) {
            var m = !1,
                p = j[t[c]];
            if (p)
                for (var b = 0, g = n.length; g > b; b++) p[n[b]] || (m = !0);
            else m = !0;
            m && l.push(t[c])
        }
        l.length ? w.sync._fetch(l, r, function(r, t) {
            var u = n.length * l.length;
            E.each(n, function(n, r) { 0 > A.ns.namespaces.indexOf(r) && A.ns.namespaces.push(r), E.each(l, function(n, a) { j[a] = j[a] || {}, j[a][r] = t[a][r], u--, 0 === u && e && (A.useLocalStorage && w.sync._storeLocal(j), e()) }) })
        }) : e && e()
    }

    function c(n, e) { return u({ lng: n }, e) }

    function f() { return S }

    function m() {
        function n(n, e, r) {
            if (0 !== e.length) {
                var t = "text";
                if (0 === e.indexOf("[")) {
                    var u = e.split("]");
                    e = u[1], t = u[0].substr(1, u[0].length - 1)
                }
                e.indexOf(";") === e.length - 1 && (e = e.substr(0, e.length - 2));
                var a;
                "html" === t ? (a = A.defaultValueFromContent ? L.extend({ defaultValue: n.html() }, r) : r, n.html(L.t(e, a))) : "text" === t ? (a = A.defaultValueFromContent ? L.extend({ defaultValue: n.text() }, r) : r, n.text(L.t(e, a))) : (a = A.defaultValueFromContent ? L.extend({ defaultValue: n.attr(t) }, r) : r, n.attr(t, L.t(e, a)))
            }
        }

        function e(e, r) {
            var t = e.attr(A.selectorAttr);
            if (t) {
                var u = e,
                    a = e.data("i18n-target");
                if (a && (u = e.find(a) || e), r || A.useDataAttrOptions !== !0 || (r = e.data("i18n-options")), r = r || {}, t.indexOf(";") >= 0) {
                    var s = t.split(";");
                    L.each(s, function(e, t) { "" !== t && n(u, t, r) })
                } else n(u, t, r);
                A.useDataAttrOptions === !0 && e.data("i18n-options", r)
            }
        }
        L.t = L.t || N, L.fn.i18n = function(n) {
            return this.each(function() {
                e(L(this), n);
                var r = L(this).find("[" + A.selectorAttr + "]");
                r.each(function() { e(L(this), n) })
            })
        }
    }

    function p(n, e, r, t) {
        if (!n) return n;
        if (t = t || e, 0 > n.indexOf(t.interpolationPrefix || A.interpolationPrefix)) return n;
        var u = t.interpolationPrefix ? E.regexEscape(t.interpolationPrefix) : A.interpolationPrefixEscaped,
            a = t.interpolationSuffix ? E.regexEscape(t.interpolationSuffix) : A.interpolationSuffixEscaped,
            s = "HTML" + a;
        return E.each(e, function(e, o) { var i = r ? r + A.keyseparator + e : e; "object" == typeof o && null !== o ? n = p(n, o, i, t) : t.escapeInterpolation || A.escapeInterpolation ? (n = n.replace(RegExp([u, i, s].join(""), "g"), o), n = n.replace(RegExp([u, i, a].join(""), "g"), E.escape(o))) : n = n.replace(RegExp([u, i, a].join(""), "g"), o) }), n
    }

    function b(n, e) {
        var r = ",",
            t = "{",
            u = "}",
            a = E.extend({}, e);
        for (delete a.postProcess; - 1 != n.indexOf(A.reusePrefix) && (T++, !(T > A.maxRecursion));) {
            var s = n.lastIndexOf(A.reusePrefix),
                o = n.indexOf(A.reuseSuffix, s) + A.reuseSuffix.length,
                i = n.substring(s, o),
                l = i.replace(A.reusePrefix, "").replace(A.reuseSuffix, "");
            if (-1 != l.indexOf(r)) {
                var c = l.indexOf(r);
                if (-1 != l.indexOf(t, c) && -1 != l.indexOf(u, c)) {
                    var f = l.indexOf(t, c),
                        m = l.indexOf(u, f) + u.length;
                    try { a = E.extend(a, JSON.parse(l.substring(f, m))), l = l.substring(0, c) } catch (p) {}
                }
            }
            var b = x(l, a);
            n = n.replace(i, b)
        }
        return n
    }

    function g(n) { return n.context && "string" == typeof n.context }

    function d(n) { return void 0 !== n.count && "string" != typeof n.count && 1 !== n.count }

    function h(n, e) {
        e = e || {};
        var r = e.defaultValue || n,
            t = y(n, e);
        return void 0 !== t || t === r
    }

    function N() { return T = 0, x.apply(null, arguments) }

    function v() { for (var n = [], e = 1; arguments.length > e; e++) n.push(arguments[e]); return { postProcess: "sprintf", sprintf: n } }

    function x(n, e) {
        e = "string" == typeof e ? v.apply(null, arguments) : e || {};
        var r, t = e.defaultValue || n,
            u = y(n, e),
            a = e.lng ? E.toLanguages(e.lng) : P,
            s = e.ns || A.ns.defaultNs;
        n.indexOf(A.nsseparator) > -1 && (r = n.split(A.nsseparator), s = r[0], n = r[1]), void 0 === u && A.sendMissing && (e.lng ? F.postMissing(a[0], s, n, t, a) : F.postMissing(A.lng, s, n, t, a));
        var o = e.postProcess || A.postProcess;
        void 0 !== u && o && z[o] && (u = z[o](u, n, e));
        var i = t;
        if (t.indexOf(A.nsseparator) > -1 && (r = t.split(A.nsseparator), i = r[1]), i === n && A.parseMissingKey && (t = A.parseMissingKey(t)), void 0 === u && (t = p(t, e), t = b(t, e), o && z[o])) {
            var l = e.defaultValue || n;
            u = z[o](l, n, e)
        }
        return void 0 !== u ? u : t
    }

    function y(n, e) {
        e = e || {};
        var r, t, u = e.defaultValue || n,
            a = P;
        if (!j) return u;
        if (e.lng && (a = E.toLanguages(e.lng), !j[a[0]])) {
            var s = A.getAsync;
            A.getAsync = !1, w.sync.load(a, A, function(n, e) { E.extend(j, e), A.getAsync = s })
        }
        var o = e.ns || A.ns.defaultNs;
        if (n.indexOf(A.nsseparator) > -1) {
            var i = n.split(A.nsseparator);
            o = i[0], n = i[1]
        }
        if (g(e)) { r = E.extend({}, e), delete r.context, r.defaultValue = A.contextNotFound; var l = o + A.nsseparator + n + "_" + e.context; if (t = N(l, r), t != A.contextNotFound) return p(t, { context: e.context }) }
        if (d(e)) {
            r = E.extend({}, e), delete r.count, r.defaultValue = A.pluralNotFound;
            var c = o + A.nsseparator + n + A.pluralSuffix,
                f = R.get(a[0], e.count);
            if (f >= 0 ? c = c + "_" + f : 1 === f && (c = o + A.nsseparator + n), t = N(c, r), t != A.pluralNotFound) return p(t, { count: e.count, interpolationPrefix: e.interpolationPrefix, interpolationSuffix: e.interpolationSuffix })
        }
        for (var m, h = n.split(A.keyseparator), v = 0, k = a.length; k > v && void 0 === m; v++) {
            for (var S = a[v], O = 0, L = j[S] && j[S][o]; h[O];) L = L && L[h[O]], O++;
            if (void 0 !== L) {
                if ("string" == typeof L) L = p(L, e), L = b(L, e);
                else if ("[object Array]" !== Object.prototype.toString.apply(L) || A.returnObjectTrees || e.returnObjectTrees) {
                    if (null === L && A.fallbackOnNull === !0) L = void 0;
                    else if (null !== L)
                        if (A.returnObjectTrees || e.returnObjectTrees) {
                            var T = {};
                            for (var C in L) T[C] = x(o + A.nsseparator + n + A.keyseparator + C, e);
                            L = T
                        } else L = "key '" + o + ":" + n + " (" + S + ")' " + "returned a object instead of string.", E.log(L)
                } else L = L.join("\n"), L = p(L, e), L = b(L, e);
                m = L
            }
        }
        if (void 0 === m && !e.isFallbackLookup && (A.fallbackToDefaultNS === !0 || A.fallbackNS && A.fallbackNS.length > 0))
            if (e.isFallbackLookup = !0, A.fallbackNS.length) {
                for (var _ = 0, M = A.fallbackNS.length; M > _; _++)
                    if (m = y(A.fallbackNS[_] + A.nsseparator + n, e)) {
                        var F = m.indexOf(A.nsseparator) > -1 ? m.split(A.nsseparator)[1] : m,
                            z = u.indexOf(A.nsseparator) > -1 ? u.split(A.nsseparator)[1] : u;
                        if (F !== z) break
                    }
            } else m = y(n, e);
        return m
    }

    function k() {
        var n, e = [];
        if ("undefined" != typeof window && (function() {
                for (var n = window.location.search.substring(1), r = n.split("&"), t = 0; r.length > t; t++) {
                    var u = r[t].indexOf("=");
                    if (u > 0) {
                        var a = r[t].substring(0, u),
                            s = r[t].substring(u + 1);
                        e[a] = s
                    }
                }
            }(), e[A.detectLngQS] && (n = e[A.detectLngQS])), !n && "undefined" != typeof document && A.useCookie) {
            var r = E.cookie.read(A.cookieName);
            r && (n = r)
        }
        return n || "undefined" == typeof navigator || (n = navigator.language ? navigator.language : navigator.userLanguage), n
    }
    Array.prototype.indexOf || (Array.prototype.indexOf = function(n) {
        "use strict";
        if (null == this) throw new TypeError;
        var e = Object(this),
            r = e.length >>> 0;
        if (0 === r) return -1;
        var t = 0;
        if (arguments.length > 0 && (t = Number(arguments[1]), t != t ? t = 0 : 0 != t && 1 / 0 != t && t != -1 / 0 && (t = (t > 0 || -1) * Math.floor(Math.abs(t)))), t >= r) return -1;
        for (var u = t >= 0 ? t : Math.max(r - Math.abs(t), 0); r > u; u++)
            if (u in e && e[u] === n) return u;
        return -1
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(n) {
        "use strict";
        if (null == this) throw new TypeError;
        var e = Object(this),
            r = e.length >>> 0;
        if (0 === r) return -1;
        var t = r;
        arguments.length > 1 && (t = Number(arguments[1]), t != t ? t = 0 : 0 != t && t != 1 / 0 && t != -(1 / 0) && (t = (t > 0 || -1) * Math.floor(Math.abs(t))));
        for (var u = t >= 0 ? Math.min(t, r - 1) : r - Math.abs(t); u >= 0; u--)
            if (u in e && e[u] === n) return u;
        return -1
    });
    var S, O = this,
        L = O.jQuery || O.Zepto,
        w = {},
        j = {},
        T = 0,
        P = [];
    "undefined" != typeof module && module.exports ? module.exports = w : (L && (L.i18n = L.i18n || w), O.i18n = O.i18n || w);
    var A = { lng: void 0, load: "all", preload: [], lowerCaseLng: !1, returnObjectTrees: !1, fallbackLng: "dev", fallbackNS: [], detectLngQS: "setLng", ns: "translation", fallbackOnNull: !0, fallbackToDefaultNS: !1, nsseparator: ":", keyseparator: ".", selectorAttr: "data-i18n", debug: !1, resGetPath: "locales/__lng__/__ns__.json", resPostPath: "locales/add/__lng__/__ns__", getAsync: !0, postAsync: !0, resStore: void 0, useLocalStorage: !1, localStorageExpirationTime: 6048e5, dynamicLoad: !1, sendMissing: !1, sendMissingTo: "fallback", sendType: "POST", interpolationPrefix: "__", interpolationSuffix: "__", reusePrefix: "$t(", reuseSuffix: ")", pluralSuffix: "_plural", pluralNotFound: ["plural_not_found", Math.random()].join(""), contextNotFound: ["context_not_found", Math.random()].join(""), escapeInterpolation: !1, setJqueryExt: !0, defaultValueFromContent: !0, useDataAttrOptions: !1, cookieExpirationTime: void 0, useCookie: !0, cookieName: "i18next", postProcess: void 0, parseMissingKey: void 0 },
        C = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" },
        _ = {
            create: function(n, e, r) {
                var t;
                if (r) {
                    var u = new Date;
                    u.setTime(u.getTime() + 1e3 * 60 * r), t = "; expires=" + u.toGMTString()
                } else t = "";
                document.cookie = n + "=" + e + t + "; path=/"
            },
            read: function(n) {
                for (var e = n + "=", r = document.cookie.split(";"), t = 0; r.length > t; t++) {
                    for (var u = r[t];
                        " " == u.charAt(0);) u = u.substring(1, u.length);
                    if (0 === u.indexOf(e)) return u.substring(e.length, u.length)
                }
                return null
            },
            remove: function(n) { this.create(n, "", -1) }
        },
        M = { create: function() {}, read: function() { return null }, remove: function() {} },
        E = {
            extend: L ? L.extend : n,
            each: L ? L.each : e,
            ajax: L ? L.ajax : t,
            cookie: "undefined" != typeof document ? _ : M,
            detectLanguage: k,
            escape: r,
            log: function(n) { A.debug && "undefined" != typeof console && console.log(n) },
            toLanguages: function(n) {
                var e = [];
                if ("string" == typeof n && n.indexOf("-") > -1) {
                    var r = n.split("-");
                    n = A.lowerCaseLng ? r[0].toLowerCase() + "-" + r[1].toLowerCase() : r[0].toLowerCase() + "-" + r[1].toUpperCase(), "unspecific" !== A.load && e.push(n), "current" !== A.load && e.push(r[0])
                } else e.push(n);
                return -1 === e.indexOf(A.fallbackLng) && A.fallbackLng && e.push(A.fallbackLng), e
            },
            regexEscape: function(n) { return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") }
        };
    E.applyReplacement = p;
    var F = {
            load: function(n, e, r) {
                e.useLocalStorage ? F._loadLocal(n, e, function(t, u) {
                    for (var a = [], s = 0, o = n.length; o > s; s++) u[n[s]] || a.push(n[s]);
                    a.length > 0 ? F._fetch(a, e, function(n, e) { E.extend(u, e), F._storeLocal(e), r(null, u) }) : r(null, u)
                }) : F._fetch(n, e, function(n, e) { r(null, e) })
            },
            _loadLocal: function(n, e, r) {
                var t = {},
                    u = (new Date).getTime();
                if (window.localStorage) {
                    var a = n.length;
                    E.each(n, function(n, s) {
                        var o = window.localStorage.getItem("res_" + s);
                        o && (o = JSON.parse(o), o.i18nStamp && o.i18nStamp + e.localStorageExpirationTime > u && (t[s] = o)), a--, 0 === a && r(null, t)
                    })
                }
            },
            _storeLocal: function(n) {
                if (window.localStorage)
                    for (var e in n) n[e].i18nStamp = (new Date).getTime(), window.localStorage.setItem("res_" + e, JSON.stringify(n[e]))
            },
            _fetch: function(n, e, r) {
                var t = e.ns,
                    u = {};
                if (e.dynamicLoad) {
                    var a = function(n, e) { r(null, e) };
                    if ("function" == typeof e.customLoad) e.customLoad(n, t.namespaces, e, a);
                    else {
                        var s = p(e.resGetPath, { lng: n.join("+"), ns: t.namespaces.join("+") });
                        E.ajax({ url: s, success: function(n) { E.log("loaded: " + s), a(null, n) }, error: function(n, e, r) { E.log("failed loading: " + s), a("failed loading resource.json error: " + r) }, dataType: "json", async: e.getAsync })
                    }
                } else {
                    var o, i = t.namespaces.length * n.length;
                    E.each(t.namespaces, function(t, a) { E.each(n, function(n, t) { var s = function(n, e) { n && (o = o || [], o.push(n)), u[t] = u[t] || {}, u[t][a] = e, i--, 0 === i && r(o, u) }; "function" == typeof e.customLoad ? e.customLoad(t, a, e, s) : F._fetchOne(t, a, e, s) }) })
                }
            },
            _fetchOne: function(n, e, r, t) {
                var u = p(r.resGetPath, { lng: n, ns: e });
                E.ajax({ url: u, success: function(n) { E.log("loaded: " + u), t(null, n) }, error: function(n, e, r) { E.log("failed loading: " + u), t(r, {}) }, dataType: "json", async: r.getAsync })
            },
            postMissing: function(n, e, r, t, u) {
                var a = {};
                a[r] = t;
                var s = [];
                if ("fallback" === A.sendMissingTo && A.fallbackLng !== !1) s.push({ lng: A.fallbackLng, url: p(A.resPostPath, { lng: A.fallbackLng, ns: e }) });
                else if ("current" === A.sendMissingTo || "fallback" === A.sendMissingTo && A.fallbackLng === !1) s.push({ lng: n, url: p(A.resPostPath, { lng: n, ns: e }) });
                else if ("all" === A.sendMissingTo)
                    for (var o = 0, i = u.length; i > o; o++) s.push({ lng: u[o], url: p(A.resPostPath, { lng: u[o], ns: e }) });
                for (var l = 0, c = s.length; c > l; l++) {
                    var f = s[l];
                    E.ajax({ url: f.url, type: A.sendType, data: a, success: function() { E.log("posted missing key '" + r + "' to: " + f.url); for (var n = r.split("."), u = 0, a = j[f.lng][e]; n[u];) a = a[n[u]] = u === n.length - 1 ? t : a[n[u]] || {}, u++ }, error: function() { E.log("failed posting missing key '" + r + "' to: " + f.url) }, dataType: "json", async: A.postAsync })
                }
            }
        },
        R = {
            rules: { ach: { name: "Acholi", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, af: { name: "Afrikaans", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ak: { name: "Akan", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, am: { name: "Amharic", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, an: { name: "Aragonese", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ar: { name: "Arabic", numbers: [0, 1, 2, 3, 11, 100], plurals: function(n) { return Number(0 === n ? 0 : 1 == n ? 1 : 2 == n ? 2 : n % 100 >= 3 && 10 >= n % 100 ? 3 : n % 100 >= 11 ? 4 : 5) } }, arn: { name: "Mapudungun", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, ast: { name: "Asturian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ay: { name: "Aymará", numbers: [1], plurals: function() { return 0 } }, az: { name: "Azerbaijani", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, be: { name: "Belarusian", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n % 10 && 11 != n % 100 ? 0 : n % 10 >= 2 && 4 >= n % 10 && (10 > n % 100 || n % 100 >= 20) ? 1 : 2) } }, bg: { name: "Bulgarian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, bn: { name: "Bengali", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, bo: { name: "Tibetan", numbers: [1], plurals: function() { return 0 } }, br: { name: "Breton", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, bs: { name: "Bosnian", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n % 10 && 11 != n % 100 ? 0 : n % 10 >= 2 && 4 >= n % 10 && (10 > n % 100 || n % 100 >= 20) ? 1 : 2) } }, ca: { name: "Catalan", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, cgg: { name: "Chiga", numbers: [1], plurals: function() { return 0 } }, cs: { name: "Czech", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n ? 0 : n >= 2 && 4 >= n ? 1 : 2) } }, csb: { name: "Kashubian", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n ? 0 : n % 10 >= 2 && 4 >= n % 10 && (10 > n % 100 || n % 100 >= 20) ? 1 : 2) } }, cy: { name: "Welsh", numbers: [1, 2, 3, 8], plurals: function(n) { return Number(1 == n ? 0 : 2 == n ? 1 : 8 != n && 11 != n ? 2 : 3) } }, da: { name: "Danish", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, de: { name: "German", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, dz: { name: "Dzongkha", numbers: [1], plurals: function() { return 0 } }, el: { name: "Greek", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, en: { name: "English", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, eo: { name: "Esperanto", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, es: { name: "Spanish", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, es_ar: { name: "Argentinean Spanish", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, et: { name: "Estonian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, eu: { name: "Basque", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, fa: { name: "Persian", numbers: [1], plurals: function() { return 0 } }, fi: { name: "Finnish", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, fil: { name: "Filipino", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, fo: { name: "Faroese", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, fr: { name: "French", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, fur: { name: "Friulian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, fy: { name: "Frisian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ga: { name: "Irish", numbers: [1, 2, 3, 7, 11], plurals: function(n) { return Number(1 == n ? 0 : 2 == n ? 1 : 7 > n ? 2 : 11 > n ? 3 : 4) } }, gd: { name: "Scottish Gaelic", numbers: [1, 2, 3, 20], plurals: function(n) { return Number(1 == n || 11 == n ? 0 : 2 == n || 12 == n ? 1 : n > 2 && 20 > n ? 2 : 3) } }, gl: { name: "Galician", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, gu: { name: "Gujarati", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, gun: { name: "Gun", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, ha: { name: "Hausa", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, he: { name: "Hebrew", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, hi: { name: "Hindi", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, hr: { name: "Croatian", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n % 10 && 11 != n % 100 ? 0 : n % 10 >= 2 && 4 >= n % 10 && (10 > n % 100 || n % 100 >= 20) ? 1 : 2) } }, hu: { name: "Hungarian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, hy: { name: "Armenian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ia: { name: "Interlingua", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, id: { name: "Indonesian", numbers: [1], plurals: function() { return 0 } }, is: { name: "Icelandic", numbers: [1, 2], plurals: function(n) { return Number(1 != n % 10 || 11 == n % 100) } }, it: { name: "Italian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ja: { name: "Japanese", numbers: [1], plurals: function() { return 0 } }, jbo: { name: "Lojban", numbers: [1], plurals: function() { return 0 } }, jv: { name: "Javanese", numbers: [0, 1], plurals: function(n) { return Number(0 !== n) } }, ka: { name: "Georgian", numbers: [1], plurals: function() { return 0 } }, kk: { name: "Kazakh", numbers: [1], plurals: function() { return 0 } }, km: { name: "Khmer", numbers: [1], plurals: function() { return 0 } }, kn: { name: "Kannada", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ko: { name: "Korean", numbers: [1], plurals: function() { return 0 } }, ku: { name: "Kurdish", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, kw: { name: "Cornish", numbers: [1, 2, 3, 4], plurals: function(n) { return Number(1 == n ? 0 : 2 == n ? 1 : 3 == n ? 2 : 3) } }, ky: { name: "Kyrgyz", numbers: [1], plurals: function() { return 0 } }, lb: { name: "Letzeburgesch", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ln: { name: "Lingala", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, lo: { name: "Lao", numbers: [1], plurals: function() { return 0 } }, lt: { name: "Lithuanian", numbers: [1, 2, 10], plurals: function(n) { return Number(1 == n % 10 && 11 != n % 100 ? 0 : n % 10 >= 2 && (10 > n % 100 || n % 100 >= 20) ? 1 : 2) } }, lv: { name: "Latvian", numbers: [0, 1, 2], plurals: function(n) { return Number(1 == n % 10 && 11 != n % 100 ? 0 : 0 !== n ? 1 : 2) } }, mai: { name: "Maithili", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, mfe: { name: "Mauritian Creole", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, mg: { name: "Malagasy", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, mi: { name: "Maori", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, mk: { name: "Macedonian", numbers: [1, 2], plurals: function(n) { return Number(1 == n || 1 == n % 10 ? 0 : 1) } }, ml: { name: "Malayalam", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, mn: { name: "Mongolian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, mnk: { name: "Mandinka", numbers: [0, 1, 2], plurals: function(n) { return Number(1 == n ? 1 : 2) } }, mr: { name: "Marathi", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ms: { name: "Malay", numbers: [1], plurals: function() { return 0 } }, mt: { name: "Maltese", numbers: [1, 2, 11, 20], plurals: function(n) { return Number(1 == n ? 0 : 0 === n || n % 100 > 1 && 11 > n % 100 ? 1 : n % 100 > 10 && 20 > n % 100 ? 2 : 3) } }, nah: { name: "Nahuatl", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, nap: { name: "Neapolitan", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, nb: { name: "Norwegian Bokmal", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ne: { name: "Nepali", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, nl: { name: "Dutch", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, nn: { name: "Norwegian Nynorsk", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, no: { name: "Norwegian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, nso: { name: "Northern Sotho", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, oc: { name: "Occitan", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, or: { name: "Oriya", numbers: [2, 1], plurals: function(n) { return Number(1 != n) } }, pa: { name: "Punjabi", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, pap: { name: "Papiamento", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, pl: { name: "Polish", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n ? 0 : n % 10 >= 2 && 4 >= n % 10 && (10 > n % 100 || n % 100 >= 20) ? 1 : 2) } }, pms: { name: "Piemontese", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ps: { name: "Pashto", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, pt: { name: "Portuguese", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, pt_br: { name: "Brazilian Portuguese", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, rm: { name: "Romansh", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ro: { name: "Romanian", numbers: [1, 2, 20], plurals: function(n) { return Number(1 == n ? 0 : 0 === n || n % 100 > 0 && 20 > n % 100 ? 1 : 2) } }, ru: { name: "Russian", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n % 10 && 11 != n % 100 ? 0 : n % 10 >= 2 && 4 >= n % 10 && (10 > n % 100 || n % 100 >= 20) ? 1 : 2) } }, sah: { name: "Yakut", numbers: [1], plurals: function() { return 0 } }, sco: { name: "Scots", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, se: { name: "Northern Sami", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, si: { name: "Sinhala", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, sk: { name: "Slovak", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n ? 0 : n >= 2 && 4 >= n ? 1 : 2) } }, sl: { name: "Slovenian", numbers: [5, 1, 2, 3], plurals: function(n) { return Number(1 == n % 100 ? 1 : 2 == n % 100 ? 2 : 3 == n % 100 || 4 == n % 100 ? 3 : 0) } }, so: { name: "Somali", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, son: { name: "Songhay", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, sq: { name: "Albanian", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, sr: { name: "Serbian", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n % 10 && 11 != n % 100 ? 0 : n % 10 >= 2 && 4 >= n % 10 && (10 > n % 100 || n % 100 >= 20) ? 1 : 2) } }, su: { name: "Sundanese", numbers: [1], plurals: function() { return 0 } }, sv: { name: "Swedish", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, sw: { name: "Swahili", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, ta: { name: "Tamil", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, te: { name: "Telugu", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, tg: { name: "Tajik", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, th: { name: "Thai", numbers: [1], plurals: function() { return 0 } }, ti: { name: "Tigrinya", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, tk: { name: "Turkmen", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, tr: { name: "Turkish", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, tt: { name: "Tatar", numbers: [1], plurals: function() { return 0 } }, ug: { name: "Uyghur", numbers: [1], plurals: function() { return 0 } }, uk: { name: "Ukrainian", numbers: [1, 2, 5], plurals: function(n) { return Number(1 == n % 10 && 11 != n % 100 ? 0 : n % 10 >= 2 && 4 >= n % 10 && (10 > n % 100 || n % 100 >= 20) ? 1 : 2) } }, ur: { name: "Urdu", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, uz: { name: "Uzbek", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, vi: { name: "Vietnamese", numbers: [1], plurals: function() { return 0 } }, wa: { name: "Walloon", numbers: [1, 2], plurals: function(n) { return Number(n > 1) } }, wo: { name: "Wolof", numbers: [1], plurals: function() { return 0 } }, yo: { name: "Yoruba", numbers: [1, 2], plurals: function(n) { return Number(1 != n) } }, zh: { name: "Chinese", numbers: [1], plurals: function() { return 0 } } },
            addRule: function(n, e) { R.rules[n] = e },
            setCurrentLng: function(n) {
                if (!R.currentRule || R.currentRule.lng !== n) {
                    var e = n.split("-");
                    R.currentRule = { lng: n, rule: R.rules[e[0]] }
                }
            },
            get: function(n, e) {
                function r(e, r) {
                    var t;
                    if (t = R.currentRule && R.currentRule.lng === n ? R.currentRule.rule : R.rules[e]) {
                        var u = t.plurals(r),
                            a = t.numbers[u];
                        return 2 === t.numbers.length && 1 === t.numbers[0] && (2 === a ? a = -1 : 1 === a && (a = 1)), a
                    }
                    return 1 === r ? "1" : "-1"
                }
                var t = n.split("-");
                return r(t[0], e)
            }
        },
        z = {},
        D = function(n, e) { z[n] = e },
        I = function() {
            function n(n) { return Object.prototype.toString.call(n).slice(8, -1).toLowerCase() }

            function e(n, e) { for (var r = []; e > 0; r[--e] = n); return r.join("") }
            var r = function() { return r.cache.hasOwnProperty(arguments[0]) || (r.cache[arguments[0]] = r.parse(arguments[0])), r.format.call(null, r.cache[arguments[0]], arguments) };
            return r.format = function(r, t) {
                var u, a, s, o, i, l, c, f = 1,
                    m = r.length,
                    p = "",
                    b = [];
                for (a = 0; m > a; a++)
                    if (p = n(r[a]), "string" === p) b.push(r[a]);
                    else if ("array" === p) {
                    if (o = r[a], o[2])
                        for (u = t[f], s = 0; o[2].length > s; s++) {
                            if (!u.hasOwnProperty(o[2][s])) throw I('[sprintf] property "%s" does not exist', o[2][s]);
                            u = u[o[2][s]]
                        } else u = o[1] ? t[o[1]] : t[f++];
                    if (/[^s]/.test(o[8]) && "number" != n(u)) throw I("[sprintf] expecting number but found %s", n(u));
                    switch (o[8]) {
                        case "b":
                            u = u.toString(2);
                            break;
                        case "c":
                            u = String.fromCharCode(u);
                            break;
                        case "d":
                            u = parseInt(u, 10);
                            break;
                        case "e":
                            u = o[7] ? u.toExponential(o[7]) : u.toExponential();
                            break;
                        case "f":
                            u = o[7] ? parseFloat(u).toFixed(o[7]) : parseFloat(u);
                            break;
                        case "o":
                            u = u.toString(8);
                            break;
                        case "s":
                            u = (u += "") && o[7] ? u.substring(0, o[7]) : u;
                            break;
                        case "u":
                            u = Math.abs(u);
                            break;
                        case "x":
                            u = u.toString(16);
                            break;
                        case "X":
                            u = u.toString(16).toUpperCase()
                    }
                    u = /[def]/.test(o[8]) && o[3] && u >= 0 ? "+" + u : u, l = o[4] ? "0" == o[4] ? "0" : o[4].charAt(1) : " ", c = o[6] - (u + "").length, i = o[6] ? e(l, c) : "", b.push(o[5] ? u + i : i + u)
                }
                return b.join("")
            }, r.cache = {}, r.parse = function(n) {
                for (var e = n, r = [], t = [], u = 0; e;) {
                    if (null !== (r = /^[^\x25]+/.exec(e))) t.push(r[0]);
                    else if (null !== (r = /^\x25{2}/.exec(e))) t.push("%");
                    else {
                        if (null === (r = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(e))) throw "[sprintf] huh?";
                        if (r[2]) {
                            u |= 1;
                            var a = [],
                                s = r[2],
                                o = [];
                            if (null === (o = /^([a-z_][a-z_\d]*)/i.exec(s))) throw "[sprintf] huh?";
                            for (a.push(o[1]);
                                "" !== (s = s.substring(o[0].length));)
                                if (null !== (o = /^\.([a-z_][a-z_\d]*)/i.exec(s))) a.push(o[1]);
                                else {
                                    if (null === (o = /^\[(\d+)\]/.exec(s))) throw "[sprintf] huh?";
                                    a.push(o[1])
                                }
                            r[2] = a
                        } else u |= 2;
                        if (3 === u) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                        t.push(r)
                    }
                    e = e.substring(r[0].length)
                }
                return t
            }, r
        }(),
        G = function(n, e) { return e.unshift(n), I.apply(null, e) };
    D("sprintf", function(n, e, r) { return r.sprintf ? "[object Array]" === Object.prototype.toString.apply(r.sprintf) ? G(n, r.sprintf) : "object" == typeof r.sprintf ? I(n, r.sprintf) : n : n }), w.init = u, w.setLng = c, w.preload = a, w.addResourceBundle = s, w.loadNamespace = i, w.loadNamespaces = l, w.setDefaultNamespace = o, w.t = N, w.translate = N, w.exists = h, w.detectLanguage = E.detectLanguage, w.pluralExtensions = R, w.sync = F, w.functions = E, w.lng = f, w.addPostProcessor = D, w.options = A
})();
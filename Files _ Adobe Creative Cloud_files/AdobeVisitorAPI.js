var VISITOR_DEBUG = !1,
    Visitor = (function() {
        'use strict';
        var e =
            'undefined' != typeof globalThis
                ? globalThis
                : 'undefined' != typeof window
                ? window
                : 'undefined' != typeof global
                ? global
                : 'undefined' != typeof self
                ? self
                : {};
        Object.assign =
            Object.assign ||
            function(e) {
                for (var t, n, i = 1; i < arguments.length; ++i)
                    for (t in (n = arguments[i]))
                        Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
                return e;
            };
        var t = {
                MESSAGES: {
                    HANDSHAKE: 'HANDSHAKE',
                    GETSTATE: 'GETSTATE',
                    PARENTSTATE: 'PARENTSTATE',
                },
                STATE_KEYS_MAP: {
                    MCMID: 'MCMID',
                    MCAID: 'MCAID',
                    MCAAMB: 'MCAAMB',
                    MCAAMLH: 'MCAAMLH',
                    MCOPTOUT: 'MCOPTOUT',
                    CUSTOMERIDS: 'CUSTOMERIDS',
                },
                ASYNC_API_MAP: {
                    MCMID: 'getMarketingCloudVisitorID',
                    MCAID: 'getAnalyticsVisitorID',
                    MCAAMB: 'getAudienceManagerBlob',
                    MCAAMLH: 'getAudienceManagerLocationHint',
                    MCOPTOUT: 'isOptedOut',
                    ALLFIELDS: 'getVisitorValues',
                },
                SYNC_API_MAP: {
                    CUSTOMERIDS: 'getCustomerIDs',
                },
                ALL_APIS: {
                    MCMID: 'getMarketingCloudVisitorID',
                    MCAAMB: 'getAudienceManagerBlob',
                    MCAAMLH: 'getAudienceManagerLocationHint',
                    MCOPTOUT: 'isOptedOut',
                    MCAID: 'getAnalyticsVisitorID',
                    CUSTOMERIDS: 'getCustomerIDs',
                    ALLFIELDS: 'getVisitorValues',
                },
                FIELDGROUP_TO_FIELD: {
                    MC: 'MCMID',
                    A: 'MCAID',
                    AAM: 'MCAAMB',
                },
                FIELDS: {
                    MCMID: 'MCMID',
                    MCOPTOUT: 'MCOPTOUT',
                    MCAID: 'MCAID',
                    MCAAMLH: 'MCAAMLH',
                    MCAAMB: 'MCAAMB',
                },
                AUTH_STATE: {
                    UNKNOWN: 0,
                    AUTHENTICATED: 1,
                    LOGGED_OUT: 2,
                },
                OPT_OUT: {
                    GLOBAL: 'global',
                },
                SAME_SITE_VALUES: {
                    LAX: 'Lax',
                    STRICT: 'Strict',
                    NONE: 'None',
                },
            },
            n = t.STATE_KEYS_MAP,
            i = function(e) {
                function t() {}
                (this.getMarketingCloudVisitorID = function(i) {
                    i = i || t;
                    var r = this.findField(n.MCMID, i),
                        a = function(t, n) {
                            var i = this;
                            return function() {
                                var r = e(0, t),
                                    a = {};
                                return (a[t] = r), i.setStateAndPublish(a), n(r), r;
                            };
                        }.call(this, n.MCMID, i);
                    return void 0 !== r ? r : a();
                }),
                    (this.getVisitorValues = function(e) {
                        this.getMarketingCloudVisitorID(function(t) {
                            e({
                                MCMID: t,
                            });
                        });
                    });
            },
            r = t.MESSAGES,
            a = t.ASYNC_API_MAP,
            o = t.SYNC_API_MAP,
            s = function() {
                function e() {}
                Object.keys(a).forEach(function(t) {
                    this[a[t]] = function(n) {
                        n = n || e;
                        var i = this.findField(t, n),
                            a = function(e, t) {
                                var n = this;
                                return function() {
                                    return (
                                        n.callbackRegistry.add(e, t),
                                        n.messageParent(r.GETSTATE),
                                        ''
                                    );
                                };
                            }.call(this, t, n);
                        return void 0 !== i ? i : a();
                    };
                }, this),
                    Object.keys(o).forEach(function(t) {
                        this[o[t]] = function() {
                            return this.findField(t, e) || {};
                        };
                    }, this);
            },
            c = t.ASYNC_API_MAP,
            u = function() {
                Object.keys(c).forEach(function(e) {
                    this[c[e]] = function(t) {
                        this.callbackRegistry.add(e, t);
                    };
                }, this);
            };

        function l(e) {
            return (l =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(e) {
                          return typeof e;
                      }
                    : function(e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e;
                      })(e);
        }

        function d(e, t, n) {
            return (
                t in e
                    ? Object.defineProperty(e, t, {
                          value: n,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                      })
                    : (e[t] = n),
                e
            );
        }
        var f,
            p =
                ((function(e, t) {
                    (t.isObjectEmpty = function(e) {
                        return e === Object(e) && 0 === Object.keys(e).length;
                    }),
                        (t.isValueEmpty = function(e) {
                            return '' === e || t.isObjectEmpty(e);
                        }),
                        (t.getIeVersion = function() {
                            return document.documentMode
                                ? document.documentMode
                                : ((e = navigator.appName),
                                  (t = navigator.userAgent),
                                  'Microsoft Internet Explorer' === e ||
                                  t.indexOf('MSIE ') >= 0 ||
                                  (t.indexOf('Trident/') >= 0 && t.indexOf('Windows NT 6') >= 0)
                                      ? 7
                                      : null);
                            var e, t;
                        }),
                        (t.encodeAndBuildRequest = function(e, t) {
                            return e.map(encodeURIComponent).join(t);
                        }),
                        (t.isObject = function(e) {
                            return null !== e && 'object' === l(e) && !1 === Array.isArray(e);
                        }),
                        (t.defineGlobalNamespace = function() {
                            return (
                                (window.adobe = t.isObject(window.adobe) ? window.adobe : {}),
                                window.adobe
                            );
                        }),
                        (t.pluck = function(e, t) {
                            return t.reduce(function(t, n) {
                                return e[n] && (t[n] = e[n]), t;
                            }, Object.create(null));
                        }),
                        (t.parseOptOut = function(e, t, n) {
                            t ||
                                ((t = n),
                                e.d_optout &&
                                    e.d_optout instanceof Array &&
                                    (t = e.d_optout.join(',')));
                            var i = parseInt(e.d_ottl, 10);
                            return (
                                isNaN(i) && (i = 7200),
                                {
                                    optOut: t,
                                    d_ottl: i,
                                }
                            );
                        }),
                        (t.normalizeBoolean = function(e) {
                            var t = e;
                            return 'true' === e ? (t = !0) : 'false' === e && (t = !1), t;
                        });
                })(
                    (f = {
                        exports: {},
                    }),
                    f.exports
                ),
                f.exports);
        p.isObjectEmpty,
            p.isValueEmpty,
            p.getIeVersion,
            p.encodeAndBuildRequest,
            p.isObject,
            p.defineGlobalNamespace,
            p.pluck,
            p.parseOptOut,
            p.normalizeBoolean;
        var g = function() {
                return {
                    callbacks: {},
                    add: function(e, t) {
                        this.callbacks[e] = this.callbacks[e] || [];
                        var n = this.callbacks[e].push(t) - 1,
                            i = this;
                        return function() {
                            i.callbacks[e].splice(n, 1);
                        };
                    },
                    execute: function(e, t) {
                        if (this.callbacks[e]) {
                            t = (t = void 0 === t ? [] : t) instanceof Array ? t : [t];
                            try {
                                for (; this.callbacks[e].length; ) {
                                    var n = this.callbacks[e].shift();
                                    'function' == typeof n
                                        ? n.apply(null, t)
                                        : n instanceof Array && n[1].apply(n[0], t);
                                }
                                delete this.callbacks[e];
                            } catch (e) {}
                        }
                    },
                    executeAll: function(e, t) {
                        (t || (e && !p.isObjectEmpty(e))) &&
                            Object.keys(this.callbacks).forEach(function(t) {
                                var n = void 0 !== e[t] ? e[t] : '';
                                this.execute(t, n);
                            }, this);
                    },
                    hasCallbacks: function() {
                        return Boolean(Object.keys(this.callbacks).length);
                    },
                };
            },
            m = t.MESSAGES,
            h = {
                0: 'prefix',
                1: 'orgID',
                2: 'state',
            },
            _ = function(e, t) {
                (this.parse = function(e) {
                    try {
                        var t = {};
                        return (
                            e.data.split('|').forEach(function(e, n) {
                                void 0 !== e && (t[h[n]] = 2 !== n ? e : JSON.parse(e));
                            }),
                            t
                        );
                    } catch (e) {}
                }),
                    (this.isInvalid = function(n) {
                        var i = this.parse(n);
                        if (!i || Object.keys(i).length < 2) return !0;
                        var r = e !== i.orgID,
                            a = !t || n.origin !== t,
                            o = -1 === Object.keys(m).indexOf(i.prefix);
                        return r || a || o;
                    }),
                    (this.send = function(n, i, r) {
                        var a = i + '|' + e;
                        r && r === Object(r) && (a += '|' + JSON.stringify(r));
                        try {
                            n.postMessage(a, t);
                        } catch (e) {}
                    });
            },
            C = t.MESSAGES,
            S = function(t, n, r, a) {
                var o = this,
                    c = n.whitelistParentDomain;
                (o.state = {
                    ALLFIELDS: {},
                }),
                    (o.version = r.version),
                    (o.marketingCloudOrgID = t),
                    (o.cookieDomain = r.cookieDomain || ''),
                    (o._instanceType = 'child');
                var l = !1,
                    d = new _(t, c);

                function f(e) {
                    Object.assign(o, e);
                }

                function p(e) {
                    if (!d.isInvalid(e)) {
                        l = !1;
                        var t = d.parse(e);
                        o.setStateAndPublish(t.state);
                    }
                }

                function m(e) {
                    !l && c && ((l = !0), d.send(a, e));
                }

                function h() {
                    f(new i(r._generateID)),
                        o.getMarketingCloudVisitorID(),
                        o.callbackRegistry.executeAll(o.state, !0),
                        e.removeEventListener('message', S);
                }

                function S(t) {
                    if (!d.isInvalid(t)) {
                        var n = d.parse(t);
                        (l = !1),
                            e.clearTimeout(o._handshakeTimeout),
                            e.removeEventListener('message', S),
                            f(new s(o)),
                            e.addEventListener('message', p),
                            o.setStateAndPublish(n.state),
                            o.callbackRegistry.hasCallbacks() && m(C.GETSTATE);
                    }
                }
                (o.callbackRegistry = g()),
                    (o.init = function() {
                        e.s_c_in || ((e.s_c_il = []), (e.s_c_in = 0)),
                            (o._c = 'Visitor'),
                            (o._il = e.s_c_il),
                            (o._in = e.s_c_in),
                            (o._il[o._in] = o),
                            e.s_c_in++,
                            Object.keys(r).forEach(function(e) {
                                0 !== e.indexOf('_') &&
                                    'function' == typeof r[e] &&
                                    (o[e] = function() {});
                            }),
                            (o.getSupplementalDataID = r.getSupplementalDataID),
                            (o.isAllowed = function() {
                                return !0;
                            }),
                            f(new u(o)),
                            c && postMessage
                                ? (e.addEventListener('message', S),
                                  m(C.HANDSHAKE),
                                  (o._handshakeTimeout = setTimeout(h, 250)))
                                : h();
                    }),
                    (o.findField = function(e, t) {
                        if (void 0 !== o.state[e]) return t(o.state[e]), o.state[e];
                    }),
                    (o.messageParent = m),
                    (o.setStateAndPublish = function(e) {
                        Object.assign(o.state, e),
                            Object.assign(o.state.ALLFIELDS, e),
                            o.callbackRegistry.executeAll(o.state);
                    });
            },
            I = t.MESSAGES,
            v = t.ALL_APIS,
            D = t.ASYNC_API_MAP,
            y = t.FIELDGROUP_TO_FIELD,
            A = function(e, t) {
                function n(t) {
                    return function n(i) {
                        var r = (function() {
                            var t = [];
                            return (
                                e._loading &&
                                    Object.keys(e._loading).forEach(function(n) {
                                        if (e._loading[n]) {
                                            var i = y[n];
                                            t.push(i);
                                        }
                                    }),
                                t.length ? t : null
                            );
                        })();
                        if (r) {
                            var a = D[r[0]];
                            e[a](n, !0);
                        } else t();
                    };
                }

                function i(n, i) {
                    var r = (function() {
                        var t = {};
                        return (
                            Object.keys(v).forEach(function(n) {
                                var i = v[n],
                                    r = e[i]();
                                p.isValueEmpty(r) || (t[n] = r);
                            }),
                            t
                        );
                    })();
                    t.send(n, i, r);
                }

                function r(n) {
                    !(function(n) {
                        var i = e.setCustomerIDs;
                        e.setCustomerIDs = function(r) {
                            i.call(e, r),
                                t.send(n, I.PARENTSTATE, {
                                    CUSTOMERIDS: e.getCustomerIDs(),
                                });
                        };
                    })(n),
                        i(n, I.HANDSHAKE);
                }

                function a(e) {
                    n(function() {
                        i(e, I.PARENTSTATE);
                    })();
                }
                return function(e) {
                    t.isInvalid(e) || (t.parse(e).prefix === I.HANDSHAKE ? r : a)(e.source);
                };
            },
            b = function(e, t) {
                var n = {},
                    i = 0,
                    r = Object.keys(e).length;
                Object.keys(e).forEach(function(a) {
                    var o,
                        s = e[a];
                    if (s.fn) {
                        var c = s.args || [];
                        c.unshift(
                            ((o = a),
                            function(e) {
                                (n[o] = e), ++i === r && t(n);
                            })
                        ),
                            s.fn.apply(s.context || null, c);
                    }
                });
            };

        function O(e, t, n) {
            var i = null == e ? void 0 : e[t];
            return void 0 === i ? n : i;
        }
        var M = {
                get: function(e) {
                    e = encodeURIComponent(e);
                    var t = (';' + document.cookie).split(' ').join(';'),
                        n = t.indexOf(';' + e + '='),
                        i = n < 0 ? n : t.indexOf(';', n + 1);
                    return n < 0
                        ? ''
                        : decodeURIComponent(t.substring(n + 2 + e.length, i < 0 ? t.length : i));
                },
                set: function(e, t, n) {
                    var i = O(n, 'cookieLifetime'),
                        r = O(n, 'expires'),
                        a = O(n, 'domain'),
                        o = O(n, 'secure'),
                        s = O(n, 'sameSite'),
                        c = o ? 'Secure' : '',
                        u = s ? 'SameSite=' + s + ';' : '';
                    if (r && 'SESSION' !== i && 'NONE' !== i) {
                        var l = '' !== t ? parseInt(i || 0, 10) : -60;
                        if (l) (r = new Date()).setTime(r.getTime() + 1e3 * l);
                        else if (1 === r) {
                            var d = (r = new Date()).getYear();
                            r.setYear(d + 2 + (d < 1900 ? 1900 : 0));
                        }
                    } else r = 0;
                    return e && 'NONE' !== i
                        ? ((document.cookie =
                              encodeURIComponent(e) +
                              '=' +
                              encodeURIComponent(t) +
                              '; path=/;' +
                              (r ? ' expires=' + r.toGMTString() + ';' : '') +
                              (a ? ' domain=' + a + ';' : '') +
                              u +
                              c),
                          this.get(e) === t)
                        : 0;
                },
                remove: function(e, t) {
                    var n = O(t, 'domain');
                    n = n ? ' domain=' + n + ';' : '';
                    var i = O(t, 'secure'),
                        r = O(t, 'sameSite'),
                        a = i ? 'Secure' : '',
                        o = r ? 'SameSite=' + r + ';' : '';
                    document.cookie =
                        encodeURIComponent(e) +
                        '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;' +
                        n +
                        o +
                        a;
                },
            },
            k = function(t, n) {
                !t && e.location && (t = e.location.hostname);
                var i,
                    r = t.split('.'),
                    a = n || {};
                for (i = r.length - 2; i >= 0; i--)
                    if (((a.domain = r.slice(i).join('.')), M.set('test', 'cookie', a)))
                        return M.remove('test', a), a.domain;
                return '';
            };

        function E(e, t) {
            if (e === t) return 0;
            var n = e.toString().split('.'),
                i = t.toString().split('.');
            return (function(e) {
                for (var t = /^\d+$/, n = 0, i = e.length; n < i; n++) if (!t.test(e[n])) return !1;
                return !0;
            })(n.concat(i))
                ? ((function(e, t) {
                      for (; e.length < t.length; ) e.push('0');
                      for (; t.length < e.length; ) t.push('0');
                  })(n, i),
                  (function(e, t) {
                      for (var n = 0; n < e.length; n++) {
                          var i = parseInt(e[n], 10),
                              r = parseInt(t[n], 10);
                          if (i > r) return 1;
                          if (r > i) return -1;
                      }
                      return 0;
                  })(n, i))
                : NaN;
        }
        var T,
            L,
            P,
            w = function(e, t) {
                return E(e, t) < 0;
            },
            R = function(e, t) {
                return 0 !== E(e, t);
            },
            x = !!e.postMessage,
            N = {
                postMessage: function(e, t, n) {
                    var i = 1;
                    t &&
                        (x
                            ? n.postMessage(e, t.replace(/([^:]+:\/\/[^\/]+).*/, '$1'))
                            : t &&
                              (n.location =
                                  t.replace(/#.*$/, '') + '#' + +new Date() + i++ + '&' + e));
                },
                receiveMessage: function(t, n) {
                    var i;
                    try {
                        x &&
                            (t &&
                                (i = function(e) {
                                    if (
                                        ('string' == typeof n && e.origin !== n) ||
                                        ('[object Function]' ===
                                            Object.prototype.toString.call(n) &&
                                            !1 === n(e.origin))
                                    )
                                        return !1;
                                    t(e);
                                }),
                            e.addEventListener
                                ? e[t ? 'addEventListener' : 'removeEventListener']('message', i)
                                : e[t ? 'attachEvent' : 'detachEvent']('onmessage', i));
                    } catch (e) {}
                },
            },
            j = function(e) {
                var t,
                    n,
                    i = '0123456789',
                    r = '',
                    a = '',
                    o = 8,
                    s = 10,
                    c = 10;
                if (1 == e) {
                    for (i += 'ABCDEF', t = 0; 16 > t; t++)
                        (n = Math.floor(Math.random() * o)),
                            (r += i.substring(n, n + 1)),
                            (n = Math.floor(Math.random() * o)),
                            (a += i.substring(n, n + 1)),
                            (o = 16);
                    return r + '-' + a;
                }
                for (t = 0; 19 > t; t++)
                    (n = Math.floor(Math.random() * s)),
                        (r += i.substring(n, n + 1)),
                        0 === t && 9 == n
                            ? (s = 3)
                            : (1 == t || 2 == t) && 10 != s && 2 > n
                            ? (s = 10)
                            : 2 < t && (s = 10),
                        (n = Math.floor(Math.random() * c)),
                        (a += i.substring(n, n + 1)),
                        0 === t && 9 == n
                            ? (c = 3)
                            : (1 == t || 2 == t) && 10 != c && 2 > n
                            ? (c = 10)
                            : 2 < t && (c = 10);
                return r + a;
            },
            F = function(t, n) {
                return {
                    corsMetadata:
                        ((i = 'none'),
                        (r = !0),
                        'undefined' != typeof XMLHttpRequest &&
                            XMLHttpRequest === Object(XMLHttpRequest) &&
                            ('withCredentials' in new XMLHttpRequest()
                                ? (i = 'XMLHttpRequest')
                                : 'undefined' != typeof XDomainRequest &&
                                  XDomainRequest === Object(XDomainRequest) &&
                                  (r = !1),
                            Object.prototype.toString.call(e.HTMLElement).indexOf('Constructor') >
                                0 && (r = !1)),
                        {
                            corsType: i,
                            corsCookiesEnabled: r,
                        }),
                    getCORSInstance: function() {
                        return 'none' === this.corsMetadata.corsType
                            ? null
                            : new e[this.corsMetadata.corsType]();
                    },
                    fireCORS: function(i, r, a) {
                        var o = this;
                        r && (i.loadErrorHandler = r);
                        try {
                            var s = this.getCORSInstance();
                            s.open('get', i.corsUrl + '&ts=' + new Date().getTime(), !0),
                                'XMLHttpRequest' === this.corsMetadata.corsType &&
                                    ((s.withCredentials = !0),
                                    (s.timeout = t.loadTimeout),
                                    s.setRequestHeader(
                                        'Content-Type',
                                        'application/x-www-form-urlencoded'
                                    ),
                                    (s.onreadystatechange = function() {
                                        4 === this.readyState &&
                                            200 === this.status &&
                                            (function(t) {
                                                var n;
                                                try {
                                                    if ((n = JSON.parse(t)) !== Object(n))
                                                        return void o.handleCORSError(
                                                            i,
                                                            null,
                                                            'Response is not JSON'
                                                        );
                                                } catch (e) {
                                                    return void o.handleCORSError(
                                                        i,
                                                        e,
                                                        'Error parsing response as JSON'
                                                    );
                                                }
                                                try {
                                                    for (
                                                        var r = i.callback, a = e, s = 0;
                                                        s < r.length;
                                                        s++
                                                    )
                                                        a = a[r[s]];
                                                    a(n);
                                                } catch (e) {
                                                    o.handleCORSError(
                                                        i,
                                                        e,
                                                        'Error forming callback function'
                                                    );
                                                }
                                            })(this.responseText);
                                    })),
                                (s.onerror = function(e) {
                                    o.handleCORSError(i, e, 'onerror');
                                }),
                                (s.ontimeout = function(e) {
                                    o.handleCORSError(i, e, 'ontimeout');
                                }),
                                s.send(),
                                VISITOR_DEBUG &&
                                    (n.fieldGroupObj[a] = {
                                        requestStart: n.millis(),
                                        url: i.corsUrl,
                                        d_visid_stg_timeout_captured: s.timeout,
                                        d_settimeout_overriden: n.getSetTimeoutOverriden(),
                                        d_visid_cors: 1,
                                    }),
                                t._log.requests.push(i.corsUrl);
                        } catch (e) {
                            this.handleCORSError(i, e, 'try-catch');
                        }
                    },
                    handleCORSError: function(e, n, i) {
                        t.CORSErrors.push({
                            corsData: e,
                            error: n,
                            description: i,
                        }),
                            e.loadErrorHandler &&
                                ('ontimeout' === i
                                    ? e.loadErrorHandler(!0)
                                    : e.loadErrorHandler(!1));
                    },
                };
                var i, r;
            },
            V = {
                POST_MESSAGE_ENABLED: !!e.postMessage,
                DAYS_BETWEEN_SYNC_ID_CALLS: 1,
                MILLIS_PER_DAY: 864e5,
                ADOBE_MC: 'adobe_mc',
                ADOBE_MC_SDID: 'adobe_mc_sdid',
                VALID_VISITOR_ID_REGEX: /^[0-9a-fA-F\-]+$/,
                ADOBE_MC_TTL_IN_MIN: 5,
                VERSION_REGEX: /vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/,
                FIRST_PARTY_SERVER_COOKIE: 's_ecid',
            },
            U = {
                audienceManagerServer: {},
                audienceManagerServerSecure: {},
                cookieDomain: {},
                cookieLifetime: {},
                cookieName: {},
                doesOptInApply: {
                    type: 'boolean',
                },
                disableThirdPartyCalls: {
                    type: 'boolean',
                },
                discardTrackingServerECID: {
                    type: 'boolean',
                },
                idSyncAfterIDCallResult: {},
                idSyncAttachIframeOnWindowLoad: {
                    type: 'boolean',
                },
                idSyncContainerID: {},
                idSyncDisable3rdPartySyncing: {
                    type: 'boolean',
                },
                disableThirdPartyCookies: {
                    type: 'boolean',
                },
                idSyncDisableSyncs: {
                    type: 'boolean',
                },
                disableIdSyncs: {
                    type: 'boolean',
                },
                idSyncIDCallResult: {},
                idSyncSSLUseAkamai: {
                    type: 'boolean',
                },
                isCoopSafe: {
                    type: 'boolean',
                },
                isIabContext: {
                    type: 'boolean',
                },
                isOptInStorageEnabled: {
                    type: 'boolean',
                },
                loadSSL: {
                    type: 'boolean',
                },
                loadTimeout: {},
                marketingCloudServer: {},
                marketingCloudServerSecure: {},
                optInCookieDomain: {},
                optInStorageExpiry: {},
                overwriteCrossDomainMCIDAndAID: {
                    type: 'boolean',
                },
                preOptInApprovals: {},
                previousPermissions: {},
                resetBeforeVersion: {},
                sdidParamExpiry: {},
                serverState: {},
                sessionCookieName: {},
                secureCookie: {
                    type: 'boolean',
                },
                sameSiteCookie: {},
                takeTimeoutMetrics: {},
                trackingServer: {},
                trackingServerSecure: {},
                whitelistIframeDomains: {},
                whitelistParentDomain: {},
            },
            H = {
                getConfigNames: function() {
                    return Object.keys(U);
                },
                getConfigs: function() {
                    return U;
                },
                normalizeConfig: function(e, t) {
                    return U[e] && 'boolean' === U[e].type ? ('function' != typeof t ? t : t()) : t;
                },
            },
            B = function(e) {
                var t = {};
                return (
                    (e.on = function(e, n, i) {
                        if (!n || 'function' != typeof n)
                            throw new Error('[ON] Callback should be a function.');
                        t.hasOwnProperty(e) || (t[e] = []);
                        var r =
                            t[e].push({
                                callback: n,
                                context: i,
                            }) - 1;
                        return function() {
                            t[e].splice(r, 1), t[e].length || delete t[e];
                        };
                    }),
                    (e.off = function(e, n) {
                        t.hasOwnProperty(e) &&
                            (t[e] = t[e].filter(function(e) {
                                if (e.callback !== n) return e;
                            }));
                    }),
                    (e.publish = function(e) {
                        if (t.hasOwnProperty(e)) {
                            var n = [].slice.call(arguments, 1);
                            t[e].slice(0).forEach(function(e) {
                                e.callback.apply(e.context, n);
                            });
                        }
                    }),
                    e.publish
                );
            },
            G = {
                PENDING: 'pending',
                CHANGED: 'changed',
                COMPLETE: 'complete',
            },
            q = {
                AAM: 'aam',
                ADCLOUD: 'adcloud',
                ANALYTICS: 'aa',
                CAMPAIGN: 'campaign',
                ECID: 'ecid',
                LIVEFYRE: 'livefyre',
                TARGET: 'target',
                MEDIA_ANALYTICS: 'mediaaa',
            },
            Y = (d((T = {}), q.AAM, 565), d(T, q.ECID, 565), T),
            W = (d((L = {}), q.AAM, [1, 10]), d(L, q.ECID, [1, 10]), L),
            X = ['videoaa', 'iabConsentHash'],
            K =
                ((P = q),
                Object.keys(P).map(function(e) {
                    return P[e];
                }));
        var J = function() {
                var e = {};
                return (
                    (e.callbacks = Object.create(null)),
                    (e.add = function(t, n) {
                        if (
                            !(function(e) {
                                return 'function' == typeof e || (e instanceof Array && e.length);
                            })(n)
                        )
                            throw new Error(
                                '[callbackRegistryFactory] Make sure callback is a function or an array of functions.'
                            );
                        e.callbacks[t] = e.callbacks[t] || [];
                        var i = e.callbacks[t].push(n) - 1;
                        return function() {
                            e.callbacks[t].splice(i, 1);
                        };
                    }),
                    (e.execute = function(t, n) {
                        if (e.callbacks[t]) {
                            n = (n = void 0 === n ? [] : n) instanceof Array ? n : [n];
                            try {
                                for (; e.callbacks[t].length; ) {
                                    var i = e.callbacks[t].shift();
                                    'function' == typeof i
                                        ? i.apply(null, n)
                                        : i instanceof Array && i[1].apply(i[0], n);
                                }
                                delete e.callbacks[t];
                            } catch (e) {}
                        }
                    }),
                    (e.executeAll = function(t, n) {
                        var i;
                        (n || (t && ((i = t) !== Object(i) || 0 !== Object.keys(i).length))) &&
                            Object.keys(e.callbacks).forEach(function(n) {
                                var i = void 0 !== t[n] ? t[n] : '';
                                e.execute(n, i);
                            }, e);
                    }),
                    (e.hasCallbacks = function() {
                        return Boolean(Object.keys(e.callbacks).length);
                    }),
                    e
                );
            },
            z = function() {},
            Q = function(e, t, n) {
                return n()
                    ? function() {
                          if (
                              (function(e) {
                                  var t = window.console;
                                  return !!t && 'function' == typeof t[e];
                              })(e)
                          ) {
                              for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++)
                                  i[r] = arguments[r];
                              console[e].apply(console, [t].concat(i));
                          }
                      }
                    : z;
            };
        var $ = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
                    t =
                        arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : function() {
                                  return !0;
                              };
                (this.log = Q('log', e, t)),
                    (this.warn = Q('warn', e, t)),
                    (this.error = Q('error', e, t));
            },
            Z = (function() {
                for (var e = [], t = 0; t < 256; t++) {
                    for (var n = t, i = 0; i < 8; i++) n = 1 & n ? 3988292384 ^ (n >>> 1) : n >>> 1;
                    e.push(n);
                }
                return function(t, n) {
                    (t = unescape(encodeURIComponent(t))), n || (n = 0), (n ^= -1);
                    for (var i = 0; i < t.length; i++) {
                        var r = 255 & (n ^ t.charCodeAt(i));
                        n = (n >>> 8) ^ e[r];
                    }
                    return (n ^= -1) >>> 0;
                };
            })(),
            ee = new $('[ADOBE OPT-IN]'),
            te = function(e, t) {
                return l(e) === t;
            },
            ne = function(e, t) {
                return e instanceof Array ? e : te(e, 'string') ? [e] : t || [];
            },
            ie = function(e) {
                var t = Object.keys(e);
                return (
                    !!t.length &&
                    t.every(function(t) {
                        return !0 === e[t];
                    })
                );
            },
            re = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return (
                    !(!e || se(e)) &&
                    ne(e).every(function(e) {
                        return K.indexOf(e) > -1 || (t && X.indexOf(e) > -1);
                    })
                );
            },
            ae = function(e, t) {
                return e.reduce(function(e, n) {
                    return (e[n] = t), e;
                }, {});
            },
            oe = function(e) {
                return JSON.parse(JSON.stringify(e));
            },
            se = function(e) {
                return '[object Array]' === Object.prototype.toString.call(e) && !e.length;
            },
            ce = function(e) {
                if (de(e)) return e;
                try {
                    return JSON.parse(e);
                } catch (e) {
                    return {};
                }
            },
            ue = function(e) {
                return void 0 === e || (de(e) ? re(Object.keys(e), !0) : le(e));
            },
            le = function(e) {
                try {
                    var t = JSON.parse(e);
                    return !!e && te(e, 'string') && re(Object.keys(t), !0);
                } catch (e) {
                    return !1;
                }
            },
            de = function(e) {
                return null !== e && te(e, 'object') && !1 === Array.isArray(e);
            },
            fe = function() {},
            pe = function(e) {
                return te(e, 'function') ? e() : e;
            },
            ge = function(e, t) {
                ue(e) || ee.error(''.concat(t));
            },
            me = function(e) {
                return (function(e) {
                    return Object.keys(e).map(function(t) {
                        return e[t];
                    });
                })(e).filter(function(e, t, n) {
                    return n.indexOf(e) === t;
                });
            };
        var he = function(e) {
            return function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = t.command,
                    i = t.params,
                    r = void 0 === i ? {} : i,
                    a = t.callback,
                    o = void 0 === a ? fe : a;
                if (!n || -1 === n.indexOf('.'))
                    throw new Error('[OptIn.execute] Please provide a valid command.');
                try {
                    var s = n.split('.'),
                        c = e[s[0]],
                        u = s[1];
                    if (!c || 'function' != typeof c[u])
                        throw new Error('Make sure the plugin and API name exist.');
                    var l = Object.assign(r, {
                        callback: o,
                    });
                    c[u].call(c, l);
                } catch (e) {
                    ee.error('[execute] Something went wrong: ' + e.message);
                }
            };
        };

        function _e(e) {
            (this.name = this.constructor.name),
                (this.message = e),
                'function' == typeof Error.captureStackTrace
                    ? Error.captureStackTrace(this, this.constructor)
                    : (this.stack = new Error(e).stack);
        }
        (_e.prototype = Object.create(Error.prototype)), (_e.prototype.constructor = _e);
        var Ce = 'fetchPermissions',
            Se = '[OptIn#registerPlugin] Plugin is invalid.';

        function Ie() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.doesOptInApply,
                n = e.previousPermissions,
                i = e.preOptInApprovals,
                r = e.isOptInStorageEnabled,
                a = e.optInCookieDomain,
                o = e.optInStorageExpiry,
                s = e.isIabContext,
                c = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).cookies,
                u = pe(n);
            ge(u, 'Invalid `previousPermissions`!'), ge(i, 'Invalid `preOptInApprovals`!');
            var l = (function() {
                    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {})
                            .cookieName,
                        t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {})
                            .cookies;
                    if (!e || !t)
                        return {
                            get: fe,
                            set: fe,
                            remove: fe,
                        };
                    var n = {
                        remove: function() {
                            t.remove(e);
                        },
                        get: function() {
                            var n = t.get(e),
                                i = {};
                            try {
                                i = JSON.parse(n);
                            } catch (e) {
                                i = {};
                            }
                            return i;
                        },
                        set: function(i, r) {
                            r = r || {};
                            var a = n.get(),
                                o = Object.assign(a, i);
                            t.set(e, JSON.stringify(o), {
                                domain: r.optInCookieDomain || '',
                                cookieLifetime: r.optInStorageExpiry || 3419e4,
                                expires: !0,
                            });
                        },
                    };
                    return n;
                })(
                    {
                        cookieName: 'adobeujs-optin',
                    },
                    {
                        cookies: c,
                    }
                ),
                d = this,
                f = B(d),
                p = J(),
                g = ce(u),
                m = ce(i),
                h = r ? l.get() : {},
                _ = {},
                C = (function(e, t) {
                    return ue(e) || (t && ue(t)) ? G.COMPLETE : G.PENDING;
                })(g, h),
                S = (function(e, n, i) {
                    var r = ae(K, !t);
                    return t ? Object.assign({}, r, e, n, i) : r;
                })(m, g, h),
                I = oe(S),
                v = function(e) {
                    return (C = e);
                },
                D = function(e) {
                    return (S = e);
                };

            function y(e, t) {
                var n = ne(e);
                return n.length
                    ? n.every(function(e) {
                          return !!t[e];
                      })
                    : ie(t);
            }

            function A() {
                D(I),
                    v(G.COMPLETE),
                    f(d.status, d.permissions),
                    r &&
                        l.set(d.permissions, {
                            optInCookieDomain: a,
                            optInStorageExpiry: o,
                        }),
                    p.execute(Ce);
            }

            function b(e) {
                return function(t, n) {
                    if (!re(t))
                        throw new Error(
                            '[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum.'
                        );
                    return v(G.CHANGED), Object.assign(I, ae(ne(t), e)), n || A(), d;
                };
            }
            (d.deny = b(!1)),
                (d.approve = b(!0)),
                (d.denyAll = d.deny.bind(d, K)),
                (d.approveAll = d.approve.bind(d, K)),
                (d.isApproved = function(e) {
                    return y(e, d.permissions);
                }),
                (d.isPreApproved = function(e) {
                    return y(e, m);
                }),
                (d.fetchPermissions = function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        r = n ? d.on(G.COMPLETE, e) : fe;
                    return (
                        !t || (t && d.isComplete) || !!i
                            ? e(d.permissions)
                            : n ||
                              p.add(Ce, function() {
                                  return e(d.permissions);
                              }),
                        r
                    );
                }),
                (d.complete = function() {
                    d.status === G.CHANGED && A();
                }),
                (d.registerPlugin = function(e) {
                    if (!e || !e.name || 'function' != typeof e.onRegister) throw new Error(Se);
                    _[e.name] || ((_[e.name] = e), e.onRegister.call(e, d));
                }),
                (d.execute = he(_)),
                (d.memoizeContent = function(e) {
                    de(e) &&
                        l.set(e, {
                            optInCookieDomain: a,
                            optInStorageExpiry: o,
                        });
                }),
                (d.getMemoizedContent = function(e) {
                    var t = l.get();
                    if (t) return t[e];
                }),
                Object.defineProperties(d, {
                    permissions: {
                        get: function() {
                            return S;
                        },
                    },
                    status: {
                        get: function() {
                            return C;
                        },
                    },
                    Categories: {
                        get: function() {
                            return q;
                        },
                    },
                    doesOptInApply: {
                        get: function() {
                            return !!t;
                        },
                    },
                    isPending: {
                        get: function() {
                            return d.status === G.PENDING;
                        },
                    },
                    isComplete: {
                        get: function() {
                            return d.status === G.COMPLETE;
                        },
                    },
                    __plugins: {
                        get: function() {
                            return Object.keys(_);
                        },
                    },
                    isIabContext: {
                        get: function() {
                            return s;
                        },
                    },
                });
        }

        function ve(e, t) {
            if (void 0 === t) return e;
            var n = setTimeout(function() {
                (n = null), e.call(e, new _e('The call took longer than you wanted!'));
            }, t);
            return function() {
                n && (clearTimeout(n), e.apply(e, arguments));
            };
        }

        function De(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                i = !0 === e.vendor.consents[t],
                r = n.every(function(t) {
                    return !0 === e.purpose.consents[t];
                });
            return i && r;
        }
        (Ie.Categories = q), (Ie.TimeoutError = _e);
        var ye = Object.freeze({
                OptIn: Ie,
                IabPlugin: function() {
                    var e,
                        t = this;
                    (t.name = 'iabPlugin'), (t.version = '0.0.2');
                    var n = J(),
                        i = {
                            transparencyAndConsentData: null,
                        };
                    (t.fetchConsentData = function(e) {
                        var t = ve(e.callback, e.timeout);
                        r({
                            callback: t,
                        });
                    }),
                        (t.isApproved = function(e) {
                            var t = e.callback,
                                n = e.category,
                                a = e.timeout;
                            if (i.transparencyAndConsentData)
                                return t(null, De(i.transparencyAndConsentData, Y[n], W[n]));
                            var o = ve(function(e, i) {
                                t(e, De(i, Y[n], W[n]));
                            }, a);
                            r({
                                category: n,
                                callback: o,
                            });
                        }),
                        (t.onRegister = function(n) {
                            e = n;
                            var i = Object.keys(Y);
                            t.fetchConsentData({
                                callback: function(e, t) {
                                    !e &&
                                        t &&
                                        (i.forEach(function(e) {
                                            var i = De(t, Y[e], W[e]);
                                            n[i ? 'approve' : 'deny'](e, !0);
                                        }),
                                        n.complete());
                                },
                            });
                        });
                    var r = function(t) {
                            var r = t.callback;
                            if (i.transparencyAndConsentData)
                                return r(null, i.transparencyAndConsentData);
                            n.add('FETCH_CONSENT_DATA', r),
                                a(function(t, r) {
                                    if (r) {
                                        var a = oe(t),
                                            o = e.getMemoizedContent('iabConsentHash'),
                                            s = Z(a.tcString).toString(32);
                                        (a.consentString = t.tcString),
                                            (a.hasConsentChangedSinceLastCmpPull = o !== s),
                                            (function(e) {
                                                var t =
                                                    arguments.length > 1 && void 0 !== arguments[1]
                                                        ? arguments[1]
                                                        : {};
                                                i[e] = t;
                                            })('transparencyAndConsentData', a),
                                            e.memoizeContent({
                                                iabConsentHash: s,
                                            });
                                    }
                                    n.execute('FETCH_CONSENT_DATA', [
                                        null,
                                        i.transparencyAndConsentData,
                                    ]);
                                });
                        },
                        a = function(e) {
                            var t = me(Y),
                                n = (function() {
                                    if (window.__tcfapi) return window.__tcfapi;
                                    var e = window;
                                    if (e !== window.top) {
                                        for (var t; !t; ) {
                                            e = e.parent;
                                            try {
                                                e.frames.__tcfapiLocator && (t = e);
                                            } catch (e) {}
                                            if (e === window.top) break;
                                        }
                                        if (t) {
                                            var n = {};
                                            return (
                                                (window.__tcfapi = function(e, i, r, a) {
                                                    var o = Math.random() + '',
                                                        s = {
                                                            __tcfapiCall: {
                                                                command: e,
                                                                parameter: a,
                                                                version: i,
                                                                callId: o,
                                                            },
                                                        };
                                                    (n[o] = r), t.postMessage(s, '*');
                                                }),
                                                window.addEventListener(
                                                    'message',
                                                    function(e) {
                                                        var t = e.data;
                                                        if ('string' == typeof t)
                                                            try {
                                                                t = JSON.parse(e.data);
                                                            } catch (e) {}
                                                        if (t.__tcfapiReturn) {
                                                            var i = t.__tcfapiReturn;
                                                            'function' == typeof n[i.callId] &&
                                                                (n[i.callId](
                                                                    i.returnValue,
                                                                    i.success
                                                                ),
                                                                delete n[i.callId]);
                                                        }
                                                    },
                                                    !1
                                                ),
                                                window.__tcfapi
                                            );
                                        }
                                        ee.error('__tcfapi not found');
                                    } else ee.error('__tcfapi not found');
                                })();
                            'function' == typeof n && n('getTCData', 2, e, t);
                        };
                },
            }),
            Ae = function(e, t) {
                return (
                    ('SHA-256' !== t && 'SHA256' !== t && 'sha256' !== t && 'sha-256' !== t) ||
                        (e = (function e(t) {
                            function n(e, t) {
                                return (e >>> t) | (e << (32 - t));
                            }
                            for (
                                var i,
                                    r,
                                    a = Math.pow,
                                    o = a(2, 32),
                                    s = '',
                                    c = [],
                                    u = 8 * t.length,
                                    l = (e.h = e.h || []),
                                    d = (e.k = e.k || []),
                                    f = d.length,
                                    p = {},
                                    g = 2;
                                f < 64;
                                g++
                            )
                                if (!p[g]) {
                                    for (i = 0; i < 313; i += g) p[i] = g;
                                    (l[f] = (a(g, 0.5) * o) | 0), (d[f++] = (a(g, 1 / 3) * o) | 0);
                                }
                            for (t += ''; (t.length % 64) - 56; ) t += '\0';
                            for (i = 0; i < t.length; i++) {
                                if ((r = t.charCodeAt(i)) >> 8) return;
                                c[i >> 2] |= r << (((3 - i) % 4) * 8);
                            }
                            for (
                                c[c.length] = (u / o) | 0, c[c.length] = u, r = 0;
                                r < c.length;

                            ) {
                                var m = c.slice(r, (r += 16)),
                                    h = l;
                                for (l = l.slice(0, 8), i = 0; i < 64; i++) {
                                    var _ = m[i - 15],
                                        C = m[i - 2],
                                        S = l[0],
                                        I = l[4],
                                        v =
                                            l[7] +
                                            (n(I, 6) ^ n(I, 11) ^ n(I, 25)) +
                                            ((I & l[5]) ^ (~I & l[6])) +
                                            d[i] +
                                            (m[i] =
                                                i < 16
                                                    ? m[i]
                                                    : (m[i - 16] +
                                                          (n(_, 7) ^ n(_, 18) ^ (_ >>> 3)) +
                                                          m[i - 7] +
                                                          (n(C, 17) ^ n(C, 19) ^ (C >>> 10))) |
                                                      0);
                                    (l = [
                                        (v +
                                            ((n(S, 2) ^ n(S, 13) ^ n(S, 22)) +
                                                ((S & l[1]) ^ (S & l[2]) ^ (l[1] & l[2])))) |
                                            0,
                                    ].concat(l))[4] = (l[4] + v) | 0;
                                }
                                for (i = 0; i < 8; i++) l[i] = (l[i] + h[i]) | 0;
                            }
                            for (i = 0; i < 8; i++)
                                for (r = 3; r + 1; r--) {
                                    var D = (l[i] >> (8 * r)) & 255;
                                    s += (D < 16 ? 0 : '') + D.toString(16);
                                }
                            return s;
                        })(e)),
                    e
                );
            },
            be = function(e) {
                return String(e)
                    .trim()
                    .toLowerCase();
            },
            Oe = ye.OptIn;
        p.defineGlobalNamespace(), (window.adobe.OptInCategories = Oe.Categories);
        var Me = function(n, i, r) {
            if (
                !r ||
                r
                    .split('')
                    .reverse()
                    .join('') !== n
            )
                throw new Error('Please use `Visitor.getInstance` to instantiate Visitor.');
            var a = this,
                o = window.adobe,
                s = '',
                c = 0,
                u = !1,
                d = !1;
            a.version = '5.1.1';
            var f = e,
                g = f.Visitor;
            (g.version = a.version),
                (g.AuthState = t.AUTH_STATE),
                (g.OptOut = t.OPT_OUT),
                f.s_c_in || ((f.s_c_il = []), (f.s_c_in = 0)),
                (a._c = 'Visitor'),
                (a._il = f.s_c_il),
                (a._in = f.s_c_in),
                (a._il[a._in] = a),
                f.s_c_in++,
                (a._instanceType = 'regular'),
                (a._log = {
                    requests: [],
                }),
                (a.marketingCloudOrgID = n),
                (a.cookieName = 'AMCV_' + n),
                (a.sessionCookieName = 'AMCVS_' + n);
            var m = {};
            i &&
                i.secureCookie &&
                i.sameSiteCookie &&
                (m = {
                    sameSite: i.sameSiteCookie,
                    secure: i.secureCookie,
                }),
                (a.cookieDomain = k(null, m)),
                (a.loadSSL = !0),
                (a.loadTimeout = 3e4),
                (a.CORSErrors = []),
                (a.marketingCloudServer = a.audienceManagerServer = 'dpm.demdex.net'),
                (a.sdidParamExpiry = 30);
            var h = null,
                C = 'MC',
                S = 'MCMID',
                I = 'MCIDTS',
                v = 'A',
                D = 'MCAID',
                y = 'AAM',
                O = 'MCAAMB',
                E = 'NONE',
                T = function(e) {
                    return !Object.prototype[e];
                },
                L = F(a, Y);
            (a.FIELDS = t.FIELDS),
                (a.cookieRead = function(e) {
                    return M.get(e);
                }),
                (a.cookieWrite = function(e, n, i) {
                    var r = a.cookieLifetime ? ('' + a.cookieLifetime).toUpperCase() : '',
                        o = {
                            expires: i,
                            domain: a.cookieDomain,
                            cookieLifetime: r,
                        };
                    return (
                        a.configs &&
                            a.configs.secureCookie &&
                            'https:' === location.protocol &&
                            (o.secure = !0),
                        a.configs &&
                            a.configs.sameSiteCookie &&
                            'https:' === location.protocol &&
                            (o.sameSite =
                                t.SAME_SITE_VALUES[a.configs.sameSiteCookie.toUpperCase()] ||
                                'Lax'),
                        M.set(e, '' + n, o)
                    );
                }),
                (a.removeCookie = function(e) {
                    var n = {
                        domain: a.cookieDomain,
                    };
                    return (
                        a.configs &&
                            a.configs.secureCookie &&
                            'https:' === location.protocol &&
                            (n.secure = !0),
                        a.configs &&
                            a.configs.sameSiteCookie &&
                            'https:' === location.protocol &&
                            (n.sameSite =
                                t.SAME_SITE_VALUES[a.configs.sameSiteCookie.toUpperCase()] ||
                                'Lax'),
                        M.remove(e, n)
                    );
                }),
                (a.resetState = function(e) {
                    e ? a._mergeServerState(e) : H();
                }),
                (a._isAllowedDone = !1),
                (a._isAllowedFlag = !1),
                (a.isAllowed = function() {
                    return (
                        a._isAllowedDone ||
                            ((a._isAllowedDone = !0),
                            (a.cookieRead(a.cookieName) || a.cookieWrite(a.cookieName, 'T', 1)) &&
                                (a._isAllowedFlag = !0)),
                        'T' === a.cookieRead(a.cookieName) && a._helpers.removeCookie(a.cookieName),
                        a._isAllowedFlag
                    );
                }),
                (a.setMarketingCloudVisitorID = function(e) {
                    a._setMarketingCloudFields(e);
                }),
                (a._use1stPartyMarketingCloudServer = !1),
                (a.getMarketingCloudVisitorID = function(e, t) {
                    a.marketingCloudServer &&
                        a.marketingCloudServer.indexOf('.demdex.net') < 0 &&
                        (a._use1stPartyMarketingCloudServer = !0);
                    var n = a._getAudienceManagerURLData('_setMarketingCloudFields'),
                        i = n.url;
                    return a._getRemoteField(S, i, e, t, n);
                });

            function P() {
                a._customerIDsHashChanged = !1;
            }
            (a.getVisitorValues = function(e, t) {
                var n = {
                        MCMID: {
                            fn: a.getMarketingCloudVisitorID,
                            args: [!0],
                            context: a,
                        },
                        MCOPTOUT: {
                            fn: a.isOptedOut,
                            args: [void 0, !0],
                            context: a,
                        },
                        MCAID: {
                            fn: a.getAnalyticsVisitorID,
                            args: [!0],
                            context: a,
                        },
                        MCAAMLH: {
                            fn: a.getAudienceManagerLocationHint,
                            args: [!0],
                            context: a,
                        },
                        MCAAMB: {
                            fn: a.getAudienceManagerBlob,
                            args: [!0],
                            context: a,
                        },
                    },
                    i = t && t.length ? p.pluck(n, t) : n;
                t && -1 === t.indexOf('MCAID')
                    ? (function(e, t) {
                          var n = {};
                          a.getMarketingCloudVisitorID(function() {
                              t.forEach(function(e) {
                                  n[e] = a._getField(e, !0);
                              }),
                                  -1 !== t.indexOf('MCOPTOUT')
                                      ? a.isOptedOut(
                                            function(t) {
                                                (n.MCOPTOUT = t), e(n);
                                            },
                                            null,
                                            !0
                                        )
                                      : e(n);
                          }, !0);
                      })(e, t)
                    : b(i, e);
            }),
                (a._currentCustomerIDs = {}),
                (a._customerIDsHashChanged = !1),
                (a._newCustomerIDsHash = ''),
                (a.setCustomerIDs = function(e, t) {
                    if (!a.isOptedOut() && e) {
                        if (!p.isObject(e) || p.isObjectEmpty(e)) return !1;
                        var n, i, r, o;
                        for (n in (a._readVisitor(), e))
                            if (
                                T(n) &&
                                ((a._currentCustomerIDs.dataSources =
                                    a._currentCustomerIDs.dataSources || {}),
                                (t = (i = e[n]).hasOwnProperty('hashType') ? i.hashType : t),
                                i)
                            )
                                if ('object' === l(i)) {
                                    var s = {};
                                    if (i.id) {
                                        if (t) {
                                            if (!(o = Ae(be(i.id), t))) return;
                                            (i.id = o), (s.hashType = t);
                                        }
                                        s.id = i.id;
                                    }
                                    null != i.authState && (s.authState = i.authState),
                                        (a._currentCustomerIDs.dataSources[n] = s);
                                } else if (t) {
                                    if (!(o = Ae(be(i), t))) return;
                                    a._currentCustomerIDs.dataSources[n] = {
                                        id: o,
                                        hashType: t,
                                    };
                                } else
                                    a._currentCustomerIDs.dataSources[n] = {
                                        id: i,
                                    };
                        var c = a.getCustomerIDs(!0),
                            u = a._getField('MCCIDH'),
                            d = '';
                        for (r in (u || (u = 0), c)) {
                            var f = c[r];
                            if (!p.isObjectEmpty(f))
                                for (n in f)
                                    T(n) &&
                                        (d +=
                                            (d ? '|' : '') +
                                            n +
                                            '|' +
                                            ((i = f[n]).id ? i.id : '') +
                                            (i.authState ? i.authState : ''));
                        }
                        (a._newCustomerIDsHash = String(a._hash(d))),
                            a._newCustomerIDsHash !== u &&
                                ((a._customerIDsHashChanged = !0), a._mapCustomerIDs(P));
                    }
                }),
                (a.syncIdentity = function(e, t) {
                    if (!a.isOptedOut() && e) {
                        if (!p.isObject(e) || p.isObjectEmpty(e)) return !1;
                        var n, i, r, o, s;
                        for (n in (a._readVisitor(), e))
                            if (
                                T(n) &&
                                ((a._currentCustomerIDs.nameSpaces =
                                    a._currentCustomerIDs.nameSpaces || {}),
                                (t = (i = e[n]).hasOwnProperty('hashType') ? i.hashType : t),
                                i && 'object' === l(i))
                            ) {
                                var c = {};
                                if (i.id) {
                                    if (t) {
                                        if (!(r = Ae(be(i.id), t))) return;
                                        (i.id = r), (c.hashType = t);
                                    }
                                    c.id = i.id;
                                }
                                null != i.authState && (c.authState = i.authState),
                                    i.dataSource &&
                                        ((a._currentCustomerIDs.dataSources =
                                            a._currentCustomerIDs.dataSources || {}),
                                        (o = i.dataSource),
                                        (a._currentCustomerIDs.dataSources[o] = c)),
                                    (a._currentCustomerIDs.nameSpaces[n] = c);
                            }
                        var u = a.getCustomerIDs(!0),
                            d = a._getField('MCCIDH'),
                            f = '';
                        for (s in (d || (d = '0'), u)) {
                            var g = u[s];
                            if (!p.isObjectEmpty(g))
                                for (n in g)
                                    T(n) &&
                                        (f +=
                                            (f ? '|' : '') +
                                            n +
                                            '|' +
                                            ((i = g[n]).id ? i.id : '') +
                                            (i.authState ? i.authState : ''));
                        }
                        (a._newCustomerIDsHash = String(a._hash(f))),
                            a._newCustomerIDsHash !== d &&
                                ((a._customerIDsHashChanged = !0), a._mapCustomerIDs(P));
                    }
                }),
                (a.getCustomerIDs = function(e) {
                    a._readVisitor();
                    var t,
                        n,
                        i = {
                            dataSources: {},
                            nameSpaces: {},
                        },
                        r = a._currentCustomerIDs.dataSources;
                    for (t in r)
                        T(t) &&
                            (n = r[t]).id &&
                            (i.dataSources[t] || (i.dataSources[t] = {}),
                            (i.dataSources[t].id = n.id),
                            null != n.authState
                                ? (i.dataSources[t].authState = n.authState)
                                : (i.dataSources[t].authState = g.AuthState.UNKNOWN),
                            n.hashType && (i.dataSources[t].hashType = n.hashType));
                    var o = a._currentCustomerIDs.nameSpaces;
                    for (t in o)
                        T(t) &&
                            (n = o[t]).id &&
                            (i.nameSpaces[t] || (i.nameSpaces[t] = {}),
                            (i.nameSpaces[t].id = n.id),
                            null != n.authState
                                ? (i.nameSpaces[t].authState = n.authState)
                                : (i.nameSpaces[t].authState = g.AuthState.UNKNOWN),
                            n.hashType && (i.nameSpaces[t].hashType = n.hashType));
                    return e ? i : i.dataSources;
                }),
                (a.setAnalyticsVisitorID = function(e) {
                    a._setAnalyticsFields(e);
                }),
                (a.getAnalyticsVisitorID = function(e, t, n) {
                    if (!G.isTrackingServerPopulated() && !n) return a._callCallback(e, ['']), '';
                    var i = '';
                    if (
                        (n ||
                            (i = a.getMarketingCloudVisitorID(function(t) {
                                a.getAnalyticsVisitorID(e, !0);
                            })),
                        i || n)
                    ) {
                        var r = n ? a.marketingCloudServer : a.trackingServer,
                            o = '';
                        a.loadSSL &&
                            (n
                                ? a.marketingCloudServerSecure && (r = a.marketingCloudServerSecure)
                                : a.trackingServerSecure && (r = a.trackingServerSecure));
                        var s = {};
                        if (r) {
                            var c = 'http' + (a.loadSSL ? 's' : '') + '://' + r + '/id',
                                u =
                                    'd_visid_ver=' +
                                    a.version +
                                    '&mcorgid=' +
                                    encodeURIComponent(a.marketingCloudOrgID) +
                                    (i ? '&mid=' + encodeURIComponent(i) : '') +
                                    (a.idSyncDisable3rdPartySyncing || a.disableThirdPartyCookies
                                        ? '&d_coppa=true'
                                        : ''),
                                l = [
                                    's_c_il',
                                    a._in,
                                    '_set' + (n ? 'MarketingCloud' : 'Analytics') + 'Fields',
                                ];
                            (o =
                                c +
                                '?' +
                                u +
                                '&callback=s_c_il%5B' +
                                a._in +
                                '%5D._set' +
                                (n ? 'MarketingCloud' : 'Analytics') +
                                'Fields'),
                                (s.corsUrl = c + '?' + u),
                                (s.callback = l);
                        }
                        return (s.url = o), a._getRemoteField(n ? S : D, o, e, t, s);
                    }
                    return '';
                }),
                (a.getAudienceManagerLocationHint = function(e, t) {
                    if (
                        a.getMarketingCloudVisitorID(function(t) {
                            a.getAudienceManagerLocationHint(e, !0);
                        })
                    ) {
                        var n = a._getField(D);
                        if (
                            (!n &&
                                G.isTrackingServerPopulated() &&
                                (n = a.getAnalyticsVisitorID(function(t) {
                                    a.getAudienceManagerLocationHint(e, !0);
                                })),
                            n || !G.isTrackingServerPopulated())
                        ) {
                            var i = a._getAudienceManagerURLData(),
                                r = i.url;
                            return a._getRemoteField('MCAAMLH', r, e, t, i);
                        }
                    }
                    return '';
                }),
                (a.getLocationHint = a.getAudienceManagerLocationHint),
                (a.getAudienceManagerBlob = function(e, t) {
                    if (
                        a.getMarketingCloudVisitorID(function(t) {
                            a.getAudienceManagerBlob(e, !0);
                        })
                    ) {
                        var n = a._getField(D);
                        if (
                            (!n &&
                                G.isTrackingServerPopulated() &&
                                (n = a.getAnalyticsVisitorID(function(t) {
                                    a.getAudienceManagerBlob(e, !0);
                                })),
                            n || !G.isTrackingServerPopulated())
                        ) {
                            var i = a._getAudienceManagerURLData(),
                                r = i.url;
                            return (
                                a._customerIDsHashChanged && a._setFieldExpire(O, -1),
                                a._getRemoteField(O, r, e, t, i)
                            );
                        }
                    }
                    return '';
                }),
                (a._supplementalDataIDCurrent = ''),
                (a._supplementalDataIDCurrentConsumed = {}),
                (a._supplementalDataIDLast = ''),
                (a._supplementalDataIDLastConsumed = {}),
                (a.getSupplementalDataID = function(e, t) {
                    a._supplementalDataIDCurrent ||
                        t ||
                        (a._supplementalDataIDCurrent = a._generateID(1));
                    var n = a._supplementalDataIDCurrent;
                    return (
                        a._supplementalDataIDLast && !a._supplementalDataIDLastConsumed[e]
                            ? ((n = a._supplementalDataIDLast),
                              (a._supplementalDataIDLastConsumed[e] = !0))
                            : n &&
                              (a._supplementalDataIDCurrentConsumed[e] &&
                                  ((a._supplementalDataIDLast = a._supplementalDataIDCurrent),
                                  (a._supplementalDataIDLastConsumed =
                                      a._supplementalDataIDCurrentConsumed),
                                  (a._supplementalDataIDCurrent = n = t ? '' : a._generateID(1)),
                                  (a._supplementalDataIDCurrentConsumed = {})),
                              n && (a._supplementalDataIDCurrentConsumed[e] = !0)),
                        n
                    );
                });
            var x = !1;

            function U(e) {
                var t = e;
                return function(e) {
                    var n = e || f.location.href;
                    try {
                        var i = a._extractParamFromUri(n, t);
                        if (i) return G.parsePipeDelimetedKeyValues(i);
                    } catch (e) {}
                };
            }

            function H(e) {
                (e = e || {}),
                    (a._supplementalDataIDCurrent = e.supplementalDataIDCurrent || ''),
                    (a._supplementalDataIDCurrentConsumed =
                        e.supplementalDataIDCurrentConsumed || {}),
                    (a._supplementalDataIDLast = e.supplementalDataIDLast || ''),
                    (a._supplementalDataIDLastConsumed = e.supplementalDataIDLastConsumed || {});
            }

            function B(e) {
                return (function(e) {
                    return (e = e ? (e += '|') : e), (e += 'TS=' + G.getTimestampInSeconds());
                })(
                    e.reduce(function(e, t) {
                        var n = t[0],
                            i = t[1];
                        return (
                            null != i &&
                                i !== E &&
                                (e = (function(e, t, n) {
                                    return (
                                        (n = n ? (n += '|') : n),
                                        (n += e + '=' + encodeURIComponent(t))
                                    );
                                })(n, i, e)),
                            e
                        );
                    }, '')
                );
            }
            (a._liberatedOptOut = null),
                (a.getOptOut = function(t, n) {
                    var i = a._getAudienceManagerURLData('_setMarketingCloudFields'),
                        r = i.url;
                    if (K()) return a._getRemoteField('MCOPTOUT', r, t, n, i);
                    if ((a._registerCallback('liberatedOptOut', t), null !== a._liberatedOptOut))
                        return (
                            a._callAllCallbacks('liberatedOptOut', [a._liberatedOptOut]),
                            (x = !1),
                            a._liberatedOptOut
                        );
                    if (x) return null;
                    x = !0;
                    var o = 'liberatedGetOptOut';
                    return (
                        (i.corsUrl = i.corsUrl.replace(
                            /\.demdex\.net\/id\?/,
                            '.demdex.net/optOutStatus?'
                        )),
                        (i.callback = [o]),
                        (e[o] = function(e) {
                            if (e === Object(e)) {
                                var t,
                                    n,
                                    i = p.parseOptOut(e, t, E);
                                (t = i.optOut),
                                    (n = 1e3 * i.d_ottl),
                                    (a._liberatedOptOut = t),
                                    setTimeout(function() {
                                        a._liberatedOptOut = null;
                                    }, n);
                            }
                            a._callAllCallbacks('liberatedOptOut', [t]), (x = !1);
                        }),
                        L.fireCORS(i),
                        null
                    );
                }),
                (a.isOptedOut = function(e, t, n) {
                    t || (t = g.OptOut.GLOBAL);
                    var i = a.getOptOut(function(n) {
                        var i = n === g.OptOut.GLOBAL || n.indexOf(t) >= 0;
                        a._callCallback(e, [i]);
                    }, n);
                    return i ? i === g.OptOut.GLOBAL || i.indexOf(t) >= 0 : null;
                }),
                (a._fields = null),
                (a._fieldsExpired = null),
                (a._hash = function(e) {
                    var t,
                        n = 0;
                    if (e)
                        for (t = 0; t < e.length; t++)
                            (n = (n << 5) - n + e.charCodeAt(t)), (n &= n);
                    return n;
                }),
                (a._generateID = j),
                (a._generateLocalMID = function() {
                    var e = a._generateID(0);
                    return (X.isClientSideMarketingCloudVisitorID = !0), e;
                }),
                (a._callbackList = null),
                (a._callCallback = function(e, t) {
                    try {
                        'function' == typeof e ? e.apply(f, t) : e[1].apply(e[0], t);
                    } catch (e) {}
                }),
                (a._registerCallback = function(e, t) {
                    t &&
                        (null == a._callbackList && (a._callbackList = {}),
                        null == a._callbackList[e] && (a._callbackList[e] = []),
                        a._callbackList[e].push(t));
                }),
                (a._callAllCallbacks = function(e, t) {
                    if (null != a._callbackList) {
                        var n = a._callbackList[e];
                        if (n) for (; n.length > 0; ) a._callCallback(n.shift(), t);
                    }
                }),
                (a._addQuerystringParam = function(e, t, n, i) {
                    var r = encodeURIComponent(t) + '=' + encodeURIComponent(n),
                        a = G.parseHash(e),
                        o = G.hashlessUrl(e);
                    if (-1 === o.indexOf('?')) return o + '?' + r + a;
                    var s = o.split('?'),
                        c = s[0] + '?',
                        u = s[1];
                    return c + G.addQueryParamAtLocation(u, r, i) + a;
                }),
                (a._extractParamFromUri = function(e, t) {
                    var n = new RegExp('[\\?&#]' + t + '=([^&#]*)').exec(e);
                    if (n && n.length) return decodeURIComponent(n[1]);
                }),
                (a._parseAdobeMcFromUrl = U(V.ADOBE_MC)),
                (a._parseAdobeMcSdidFromUrl = U(V.ADOBE_MC_SDID)),
                (a._attemptToPopulateSdidFromUrl = function(e) {
                    var t = a._parseAdobeMcSdidFromUrl(e),
                        i = 1e9;
                    t && t.TS && (i = G.getTimestampInSeconds() - t.TS),
                        t &&
                            t.SDID &&
                            t.MCORGID === n &&
                            i < a.sdidParamExpiry &&
                            ((a._supplementalDataIDCurrent = t.SDID),
                            (a._supplementalDataIDCurrentConsumed.SDID_URL_PARAM = !0));
                }),
                (a._attemptToPopulateIdsFromUrl = function() {
                    var e = a._parseAdobeMcFromUrl();
                    if (e && e.TS) {
                        var t = G.getTimestampInSeconds() - e.TS;
                        if (Math.floor(t / 60) > V.ADOBE_MC_TTL_IN_MIN || e.MCORGID !== n) return;
                        !(function(e) {
                            function t(e, t, n) {
                                e &&
                                    e.match(V.VALID_VISITOR_ID_REGEX) &&
                                    (n === S && (d = !0), t(e));
                            }
                            t(e[S], a.setMarketingCloudVisitorID, S),
                                a._setFieldExpire(O, -1),
                                t(e[D], a.setAnalyticsVisitorID);
                        })(e);
                    }
                }),
                (a._mergeServerState = function(e) {
                    var t;
                    if (e)
                        try {
                            if (
                                (e = (function(e) {
                                    return G.isObject(e) ? e : JSON.parse(e);
                                })(e))[a.marketingCloudOrgID]
                            ) {
                                var n = e[a.marketingCloudOrgID];
                                (t = n.customerIDs),
                                    G.isObject(t) && a.setCustomerIDs(t),
                                    H(n.sdid);
                            }
                        } catch (e) {
                            throw new Error('`serverState` has an invalid format.');
                        }
                }),
                (a._timeout = null),
                (a._loadData = function(e, t, n, i) {
                    (t = a._addQuerystringParam(t, 'd_fieldgroup', e, 1)),
                        (i.url = a._addQuerystringParam(i.url, 'd_fieldgroup', e, 1)),
                        (i.corsUrl = a._addQuerystringParam(i.corsUrl, 'd_fieldgroup', e, 1)),
                        (X.fieldGroupObj[e] = !0),
                        i === Object(i) &&
                            i.corsUrl &&
                            'XMLHttpRequest' === L.corsMetadata.corsType &&
                            L.fireCORS(i, n, e);
                }),
                (a._clearTimeout = function(e) {
                    null != a._timeout &&
                        a._timeout[e] &&
                        (clearTimeout(a._timeout[e]), (a._timeout[e] = 0));
                }),
                (a._settingsDigest = 0),
                (a._getSettingsDigest = function() {
                    if (!a._settingsDigest) {
                        var e = a.version;
                        a.audienceManagerServer && (e += '|' + a.audienceManagerServer),
                            a.audienceManagerServerSecure &&
                                (e += '|' + a.audienceManagerServerSecure),
                            (a._settingsDigest = a._hash(e));
                    }
                    return a._settingsDigest;
                }),
                (a._readVisitorDone = !1),
                (a._readVisitor = function() {
                    if (!a._readVisitorDone) {
                        a._readVisitorDone = !0;
                        var e,
                            t,
                            n,
                            i,
                            r,
                            o,
                            s = a._getSettingsDigest(),
                            c = !1,
                            u = a.cookieRead(a.cookieName),
                            l = new Date();
                        if (
                            (u ||
                                d ||
                                a.discardTrackingServerECID ||
                                (u = a.cookieRead(V.FIRST_PARTY_SERVER_COOKIE)),
                            null == a._fields && (a._fields = {}),
                            u && 'T' !== u)
                        )
                            for (
                                (u = u.split('|'))[0].match(/^[\-0-9]+$/) &&
                                    (parseInt(u[0], 10) !== s && (c = !0), u.shift()),
                                    u.length % 2 == 1 && u.pop(),
                                    e = 0;
                                e < u.length;
                                e += 2
                            )
                                (n = (t = u[e].split('-'))[0]),
                                    (i = u[e + 1]),
                                    t.length > 1
                                        ? ((r = parseInt(t[1], 10)), (o = t[1].indexOf('s') > 0))
                                        : ((r = 0), (o = !1)),
                                    c &&
                                        ('MCCIDH' === n && (i = ''),
                                        r > 0 && (r = l.getTime() / 1e3 - 60)),
                                    n &&
                                        i &&
                                        (a._setField(n, i, 1),
                                        r > 0 &&
                                            ((a._fields['expire' + n] = r + (o ? 's' : '')),
                                            (l.getTime() >= 1e3 * r ||
                                                (o && !a.cookieRead(a.sessionCookieName))) &&
                                                (a._fieldsExpired || (a._fieldsExpired = {}),
                                                (a._fieldsExpired[n] = !0))));
                        !a._getField(D) &&
                            G.isTrackingServerPopulated() &&
                            (u = a.cookieRead('s_vi')) &&
                            (u = u.split('|')).length > 1 &&
                            u[0].indexOf('v1') >= 0 &&
                            ((e = (i = u[1]).indexOf('[')) >= 0 && (i = i.substring(0, e)),
                            i && i.match(V.VALID_VISITOR_ID_REGEX) && a._setField(D, i));
                    }
                }),
                (a._appendVersionTo = function(e) {
                    var t = 'vVersion|' + a.version,
                        n = e ? a._getCookieVersion(e) : null;
                    return (
                        n
                            ? R(n, a.version) && (e = e.replace(V.VERSION_REGEX, t))
                            : (e += (e ? '|' : '') + t),
                        e
                    );
                }),
                (a._writeVisitor = function() {
                    var e,
                        t,
                        n = a._getSettingsDigest();
                    for (e in a._fields)
                        T(e) &&
                            a._fields[e] &&
                            'expire' !== e.substring(0, 6) &&
                            ((t = a._fields[e]),
                            (n +=
                                (n ? '|' : '') +
                                e +
                                (a._fields['expire' + e] ? '-' + a._fields['expire' + e] : '') +
                                '|' +
                                t));
                    (n = a._appendVersionTo(n)), a.cookieWrite(a.cookieName, n, 1);
                }),
                (a._getField = function(e, t) {
                    return null == a._fields || (!t && a._fieldsExpired && a._fieldsExpired[e])
                        ? null
                        : a._fields[e];
                }),
                (a._setField = function(e, t, n) {
                    null == a._fields && (a._fields = {}),
                        (a._fields[e] = t),
                        n || a._writeVisitor();
                }),
                (a._getFieldList = function(e, t) {
                    var n = a._getField(e, t);
                    return n ? n.split('*') : null;
                }),
                (a._setFieldList = function(e, t, n) {
                    a._setField(e, t ? t.join('*') : '', n);
                }),
                (a._getFieldMap = function(e, t) {
                    var n = a._getFieldList(e, t);
                    if (n) {
                        var i,
                            r = {};
                        for (i = 0; i < n.length; i += 2) r[n[i]] = n[i + 1];
                        return r;
                    }
                    return null;
                }),
                (a._setFieldMap = function(e, t, n) {
                    var i,
                        r = null;
                    if (t) for (i in ((r = []), t)) T(i) && (r.push(i), r.push(t[i]));
                    a._setFieldList(e, r, n);
                }),
                (a._setFieldExpire = function(e, t, n) {
                    var i = new Date();
                    i.setTime(i.getTime() + 1e3 * t),
                        null == a._fields && (a._fields = {}),
                        (a._fields['expire' + e] = Math.floor(i.getTime() / 1e3) + (n ? 's' : '')),
                        t < 0
                            ? (a._fieldsExpired || (a._fieldsExpired = {}),
                              (a._fieldsExpired[e] = !0))
                            : a._fieldsExpired && (a._fieldsExpired[e] = !1),
                        n &&
                            (a.cookieRead(a.sessionCookieName) ||
                                a.cookieWrite(a.sessionCookieName, '1'));
                }),
                (a._findVisitorID = function(e) {
                    return (
                        e &&
                            ('object' === l(e) &&
                                (e = e.d_mid
                                    ? e.d_mid
                                    : e.visitorID
                                    ? e.visitorID
                                    : e.id
                                    ? e.id
                                    : e.uuid
                                    ? e.uuid
                                    : '' + e),
                            e && 'NOTARGET' === (e = e.toUpperCase()) && (e = E),
                            (e && (e === E || e.match(V.VALID_VISITOR_ID_REGEX))) || (e = '')),
                        e
                    );
                }),
                (a._setFields = function(e, t) {
                    if (
                        (a._clearTimeout(e),
                        null != a._loading && (a._loading[e] = !1),
                        VISITOR_DEBUG &&
                            Y.fieldGroupObj[e] &&
                            ((Y.fieldGroupObj[e].requestEnd = Y.millis()), Y.process(e)),
                        X.fieldGroupObj[e] && X.setState(e, !1),
                        e === C)
                    ) {
                        !0 !== X.isClientSideMarketingCloudVisitorID &&
                            (X.isClientSideMarketingCloudVisitorID = !1);
                        var n = a._getField(S);
                        if (!n || a.overwriteCrossDomainMCIDAndAID) {
                            if (!(n = 'object' === l(t) && t.mid ? t.mid : a._findVisitorID(t))) {
                                if (
                                    a._use1stPartyMarketingCloudServer &&
                                    !a.tried1stPartyMarketingCloudServer
                                )
                                    return (
                                        (a.tried1stPartyMarketingCloudServer = !0),
                                        void a.getAnalyticsVisitorID(null, !1, !0)
                                    );
                                n = a._generateLocalMID();
                            }
                            a._setField(S, n);
                        }
                        (n && n !== E) || (n = ''),
                            'object' === l(t) &&
                                ((t.d_region || t.dcs_region || t.d_blob || t.blob) &&
                                    a._setFields(y, t),
                                a._use1stPartyMarketingCloudServer &&
                                    t.mid &&
                                    a._setFields(v, {
                                        id: t.id,
                                    })),
                            a._callAllCallbacks(S, [n]);
                    }
                    if (e === y && 'object' === l(t)) {
                        var i = 604800;
                        null != t.id_sync_ttl && t.id_sync_ttl && (i = parseInt(t.id_sync_ttl, 10));
                        var r = q.getRegionAndCheckIfChanged(t, i);
                        a._callAllCallbacks('MCAAMLH', [r]);
                        var o = a._getField(O);
                        (t.d_blob || t.blob) &&
                            ((o = t.d_blob) || (o = t.blob),
                            a._setFieldExpire(O, i),
                            a._setField(O, o)),
                            o || (o = ''),
                            a._callAllCallbacks(O, [o]),
                            !t.error_msg &&
                                a._newCustomerIDsHash &&
                                a._setField('MCCIDH', a._newCustomerIDsHash);
                    }
                    if (e === v) {
                        var s = a._getField(D);
                        (s && !a.overwriteCrossDomainMCIDAndAID) ||
                            ((s = a._findVisitorID(t))
                                ? s !== E && a._setFieldExpire(O, -1)
                                : (s = E),
                            a._setField(D, s)),
                            (s && s !== E) || (s = ''),
                            a._callAllCallbacks(D, [s]);
                    }
                    if (a.idSyncDisableSyncs || a.disableIdSyncs) q.idCallNotProcesssed = !0;
                    else {
                        q.idCallNotProcesssed = !1;
                        var c = {};
                        (c.ibs = t.ibs), (c.subdomain = t.subdomain), q.processIDCallData(c);
                    }
                    if (t === Object(t)) {
                        var u, d;
                        K() && a.isAllowed() && (u = a._getField('MCOPTOUT'));
                        var f = p.parseOptOut(t, u, E);
                        (u = f.optOut),
                            (d = f.d_ottl),
                            a._setFieldExpire('MCOPTOUT', d, !0),
                            a._setField('MCOPTOUT', u),
                            a._callAllCallbacks('MCOPTOUT', [u]);
                    }
                }),
                (a._loading = null),
                (a._getRemoteField = function(e, t, n, i, r) {
                    var o,
                        s = '',
                        u = G.isFirstPartyAnalyticsVisitorIDCall(e);
                    if (K() && a.isAllowed()) {
                        a._readVisitor();
                        if (
                            !(
                                !(s = a._getField(
                                    e,
                                    !0 ===
                                        {
                                            MCAAMLH: !0,
                                            MCAAMB: !0,
                                        }[e]
                                )) ||
                                (a._fieldsExpired && a._fieldsExpired[e])
                            ) ||
                            (a.disableThirdPartyCalls && !u)
                        )
                            s ||
                                (e === S
                                    ? (a._registerCallback(e, n),
                                      (s = a._generateLocalMID()),
                                      a.setMarketingCloudVisitorID(s))
                                    : e === D
                                    ? (a._registerCallback(e, n),
                                      (s = ''),
                                      a.setAnalyticsVisitorID(s))
                                    : ((s = ''), (i = !0)));
                        else if (
                            (e === S || 'MCOPTOUT' === e
                                ? (o = C)
                                : 'MCAAMLH' === e || e === O
                                ? (o = y)
                                : e === D && (o = v),
                            o)
                        )
                            return (
                                !t ||
                                    (null != a._loading && a._loading[o]) ||
                                    (null == a._loading && (a._loading = {}),
                                    (a._loading[o] = !0),
                                    o === y && (c = 0),
                                    a._loadData(
                                        o,
                                        t,
                                        function(t) {
                                            if (!a._getField(e)) {
                                                VISITOR_DEBUG &&
                                                    Y.fieldGroupObj[o] &&
                                                    ((Y.fieldGroupObj[o].timeout = Y.millis()),
                                                    (Y.fieldGroupObj[o].isActualTimeout = !!t),
                                                    Y.process(o)),
                                                    t && X.setState(o, !0);
                                                var n = '';
                                                e === S
                                                    ? (n = a._generateLocalMID())
                                                    : o === y &&
                                                      (n = {
                                                          error_msg: 'timeout',
                                                      }),
                                                    a._setFields(o, n);
                                            }
                                        },
                                        r
                                    )),
                                a._registerCallback(e, n),
                                s ||
                                    (t ||
                                        a._setFields(o, {
                                            id: E,
                                        }),
                                    '')
                            );
                    }
                    return (
                        (e !== S && e !== D) || s !== E || ((s = ''), (i = !0)),
                        n && i && a._callCallback(n, [s]),
                        s
                    );
                }),
                (a._setMarketingCloudFields = function(e) {
                    a._readVisitor(), a._setFields(C, e);
                }),
                (a._mapCustomerIDs = function(e) {
                    a.getAudienceManagerBlob(e, !0);
                }),
                (a._setAnalyticsFields = function(e) {
                    a._readVisitor(), a._setFields(v, e);
                }),
                (a._setAudienceManagerFields = function(e) {
                    a._readVisitor(), a._setFields(y, e);
                }),
                (a._getAudienceManagerURLData = function(e) {
                    var t = a.audienceManagerServer,
                        n = '',
                        i = a._getField(S),
                        r = a._getField(O, !0),
                        o = a._getField(D),
                        u = o && o !== E ? '&d_cid_ic=AVID%01' + encodeURIComponent(o) : '';
                    if (
                        (a.loadSSL &&
                            a.audienceManagerServerSecure &&
                            (t = a.audienceManagerServerSecure),
                        t)
                    ) {
                        var l,
                            d,
                            f,
                            g = a.getCustomerIDs(!0);
                        if (g)
                            for (d in g) {
                                var m = g[d];
                                if (!p.isObjectEmpty(m)) {
                                    var _ = 'nameSpaces' === d ? '&d_cid_ns=' : '&d_cid_ic=';
                                    for (l in m)
                                        T(l) &&
                                            ((f = m[l]),
                                            (u +=
                                                _ +
                                                encodeURIComponent(l) +
                                                '%01' +
                                                encodeURIComponent(f.id ? f.id : '') +
                                                (f.authState ? '%01' + f.authState : '')));
                                }
                            }
                        e || (e = '_setAudienceManagerFields');
                        var C = 'http' + (a.loadSSL ? 's' : '') + '://' + t + '/id',
                            I =
                                'd_visid_ver=' +
                                a.version +
                                (s && -1 !== C.indexOf('demdex.net')
                                    ? '&gdpr=1&gdpr_consent=' + s
                                    : '') +
                                (c && -1 !== C.indexOf('demdex.net') ? '&d_cf=' + c : '') +
                                '&d_rtbd=json&d_ver=2' +
                                (!i && a._use1stPartyMarketingCloudServer ? '&d_verify=1' : '') +
                                '&d_orgid=' +
                                encodeURIComponent(a.marketingCloudOrgID) +
                                '&d_nsid=' +
                                (a.idSyncContainerID || 0) +
                                (i ? '&d_mid=' + encodeURIComponent(i) : '') +
                                (a.idSyncDisable3rdPartySyncing || a.disableThirdPartyCookies
                                    ? '&d_coppa=true'
                                    : '') +
                                (!0 === h ? '&d_coop_safe=1' : !1 === h ? '&d_coop_unsafe=1' : '') +
                                (r ? '&d_blob=' + encodeURIComponent(r) : '') +
                                u,
                            v = ['s_c_il', a._in, e];
                        return {
                            url: (n = C + '?' + I + '&d_cb=s_c_il%5B' + a._in + '%5D.' + e),
                            corsUrl: C + '?' + I,
                            callback: v,
                        };
                    }
                    return {
                        url: n,
                    };
                }),
                (a.appendVisitorIDsTo = function(e) {
                    try {
                        var t = [
                            [S, a._getField(S)],
                            [D, a._getField(D)],
                            ['MCORGID', a.marketingCloudOrgID],
                        ];
                        return a._addQuerystringParam(e, V.ADOBE_MC, B(t));
                    } catch (t) {
                        return e;
                    }
                }),
                (a.appendSupplementalDataIDTo = function(e, t) {
                    if (!(t = t || a.getSupplementalDataID(G.generateRandomString(), !0))) return e;
                    try {
                        var n = B([
                            ['SDID', t],
                            ['MCORGID', a.marketingCloudOrgID],
                        ]);
                        return a._addQuerystringParam(e, V.ADOBE_MC_SDID, n);
                    } catch (t) {
                        return e;
                    }
                });
            var G = {
                parseHash: function(e) {
                    var t = e.indexOf('#');
                    return t > 0 ? e.substr(t) : '';
                },
                hashlessUrl: function(e) {
                    var t = e.indexOf('#');
                    return t > 0 ? e.substr(0, t) : e;
                },
                addQueryParamAtLocation: function(e, t, n) {
                    var i = e.split('&');
                    return (n = null != n ? n : i.length), i.splice(n, 0, t), i.join('&');
                },
                isFirstPartyAnalyticsVisitorIDCall: function(e, t, n) {
                    return (
                        e === D &&
                        (t || (t = a.trackingServer),
                        n || (n = a.trackingServerSecure),
                        !('string' != typeof (i = a.loadSSL ? n : t) || !i.length) &&
                            i.indexOf('2o7.net') < 0 &&
                            i.indexOf('omtrdc.net') < 0)
                    );
                    var i;
                },
                isObject: function(e) {
                    return Boolean(e && e === Object(e));
                },
                removeCookie: function(e) {
                    M.remove(e, {
                        domain: a.cookieDomain,
                    });
                },
                isTrackingServerPopulated: function() {
                    return !!a.trackingServer || !!a.trackingServerSecure;
                },
                getTimestampInSeconds: function() {
                    return Math.round(new Date().getTime() / 1e3);
                },
                parsePipeDelimetedKeyValues: function(e) {
                    return e.split('|').reduce(function(e, t) {
                        var n = t.split('=');
                        return (e[n[0]] = decodeURIComponent(n[1])), e;
                    }, {});
                },
                generateRandomString: function(e) {
                    e = e || 5;
                    for (var t = '', n = 'abcdefghijklmnopqrstuvwxyz0123456789'; e--; )
                        t += n[Math.floor(Math.random() * n.length)];
                    return t;
                },
                normalizeBoolean: function(e) {
                    return 'true' === e || ('false' !== e && e);
                },
                parseBoolean: function(e) {
                    return 'true' === e || ('false' !== e && null);
                },
                replaceMethodsWithFunction: function(e, t) {
                    for (var n in e) e.hasOwnProperty(n) && 'function' == typeof e[n] && (e[n] = t);
                    return e;
                },
            };
            a._helpers = G;
            var q = (function(t, n) {
                var i = e.document;
                return {
                    THROTTLE_START: 3e4,
                    MAX_SYNCS_LENGTH: 649,
                    throttleTimerSet: !1,
                    id: null,
                    onPagePixels: [],
                    iframeHost: null,
                    getIframeHost: function(e) {
                        if ('string' == typeof e) {
                            var t = e.split('/');
                            return t[0] + '//' + t[2];
                        }
                    },
                    subdomain: null,
                    url: null,
                    getUrl: function() {
                        var e,
                            n = 'http://fast.',
                            r =
                                '?d_nsid=' +
                                t.idSyncContainerID +
                                '#' +
                                encodeURIComponent(i.location.origin);
                        return (
                            this.subdomain || (this.subdomain = 'nosubdomainreturned'),
                            t.loadSSL && (n = t.idSyncSSLUseAkamai ? 'https://fast.' : 'https://'),
                            (e = n + this.subdomain + '.demdex.net/dest5.html' + r),
                            (this.iframeHost = this.getIframeHost(e)),
                            (this.id =
                                'destination_publishing_iframe_' +
                                this.subdomain +
                                '_' +
                                t.idSyncContainerID),
                            e
                        );
                    },
                    checkDPIframeSrc: function() {
                        var e =
                            '?d_nsid=' +
                            t.idSyncContainerID +
                            '#' +
                            encodeURIComponent(i.location.href);
                        'string' == typeof t.dpIframeSrc &&
                            t.dpIframeSrc.length &&
                            ((this.id =
                                'destination_publishing_iframe_' +
                                (t._subdomain || this.subdomain || new Date().getTime()) +
                                '_' +
                                t.idSyncContainerID),
                            (this.iframeHost = this.getIframeHost(t.dpIframeSrc)),
                            (this.url = t.dpIframeSrc + e));
                    },
                    idCallNotProcesssed: null,
                    doAttachIframe: !1,
                    startedAttachingIframe: !1,
                    iframeHasLoaded: null,
                    iframeIdChanged: null,
                    newIframeCreated: null,
                    originalIframeHasLoadedAlready: null,
                    iframeLoadedCallbacks: [],
                    regionChanged: !1,
                    timesRegionChanged: 0,
                    sendingMessages: !1,
                    messages: [],
                    messagesPosted: [],
                    messagesReceived: [],
                    messageSendingInterval: V.POST_MESSAGE_ENABLED ? null : 100,
                    onPageDestinationsFired: [],
                    jsonForComparison: [],
                    jsonDuplicates: [],
                    jsonWaiting: [],
                    jsonProcessed: [],
                    canSetThirdPartyCookies: !0,
                    receivedThirdPartyCookiesNotification: !1,
                    readyToAttachIframePreliminary: function() {
                        return !(
                            t.idSyncDisableSyncs ||
                            t.disableIdSyncs ||
                            t.idSyncDisable3rdPartySyncing ||
                            t.disableThirdPartyCookies ||
                            t.disableThirdPartyCalls
                        );
                    },
                    readyToAttachIframe: function() {
                        return (
                            this.readyToAttachIframePreliminary() &&
                            (this.doAttachIframe || t._doAttachIframe) &&
                            ((this.subdomain && 'nosubdomainreturned' !== this.subdomain) ||
                                t._subdomain) &&
                            this.url &&
                            !this.startedAttachingIframe
                        );
                    },
                    attachIframe: function() {
                        this.startedAttachingIframe = !0;
                        var e = this,
                            t = i.getElementById(this.id);

                        function n() {
                            ((t = i.createElement('iframe')).sandbox =
                                'allow-scripts allow-same-origin'),
                                (t.title = 'Adobe ID Syncing iFrame'),
                                (t.id = e.id),
                                (t.name = e.id + '_name'),
                                (t.style.cssText = 'display: none; width: 0; height: 0;'),
                                (t.src = e.url),
                                (e.newIframeCreated = !0),
                                r(),
                                i.body.appendChild(t);
                        }

                        function r(n) {
                            t.addEventListener('load', function() {
                                (t.className = 'aamIframeLoaded'),
                                    (e.iframeHasLoaded = !0),
                                    e.fireIframeLoadedCallbacks(n),
                                    e.requestToProcess();
                            });
                        }
                        t
                            ? 'IFRAME' !== t.nodeName
                                ? ((this.id += '_2'), (this.iframeIdChanged = !0), n())
                                : ((this.newIframeCreated = !1),
                                  'aamIframeLoaded' !== t.className
                                      ? ((this.originalIframeHasLoadedAlready = !1),
                                        r(
                                            "The destination publishing iframe already exists from a different library, but hadn't loaded yet."
                                        ))
                                      : ((this.originalIframeHasLoadedAlready = !0),
                                        (this.iframeHasLoaded = !0),
                                        (this.iframe = t),
                                        this.fireIframeLoadedCallbacks(
                                            'The destination publishing iframe already exists from a different library, and had loaded alresady.'
                                        ),
                                        this.requestToProcess()))
                            : n(),
                            (this.iframe = t);
                    },
                    fireIframeLoadedCallbacks: function(e) {
                        this.iframeLoadedCallbacks.forEach(function(t) {
                            'function' == typeof t &&
                                t({
                                    message:
                                        e ||
                                        'The destination publishing iframe was attached and loaded successfully.',
                                });
                        }),
                            (this.iframeLoadedCallbacks = []);
                    },
                    requestToProcess: function(e) {
                        var n,
                            i = this;

                        function r() {
                            i.jsonForComparison.push(e),
                                i.jsonWaiting.push(e),
                                i.processSyncOnPage(e);
                        }
                        if (e === Object(e) && e.ibs)
                            if (
                                ((n = JSON.stringify(e.ibs || [])), this.jsonForComparison.length)
                            ) {
                                var a,
                                    o,
                                    s,
                                    c = !1;
                                for (a = 0, o = this.jsonForComparison.length; a < o; a++)
                                    if (
                                        ((s = this.jsonForComparison[a]),
                                        n === JSON.stringify(s.ibs || []))
                                    ) {
                                        c = !0;
                                        break;
                                    }
                                c ? this.jsonDuplicates.push(e) : r();
                            } else r();
                        if (
                            (this.receivedThirdPartyCookiesNotification ||
                                !V.POST_MESSAGE_ENABLED ||
                                this.iframeHasLoaded) &&
                            this.jsonWaiting.length
                        ) {
                            var u = this.jsonWaiting.shift();
                            this.process(u), this.requestToProcess();
                        }
                        t.idSyncDisableSyncs ||
                            t.disableIdSyncs ||
                            !this.iframeHasLoaded ||
                            !this.messages.length ||
                            this.sendingMessages ||
                            (this.throttleTimerSet ||
                                ((this.throttleTimerSet = !0),
                                setTimeout(function() {
                                    i.messageSendingInterval = V.POST_MESSAGE_ENABLED ? null : 150;
                                }, this.THROTTLE_START)),
                            (this.sendingMessages = !0),
                            this.sendMessages());
                    },
                    getRegionAndCheckIfChanged: function(e, n) {
                        var i = t._getField('MCAAMLH'),
                            r = e.d_region || e.dcs_region;
                        return (
                            i
                                ? r &&
                                  (t._setFieldExpire('MCAAMLH', n),
                                  t._setField('MCAAMLH', r),
                                  parseInt(i, 10) !== r &&
                                      ((this.regionChanged = !0),
                                      this.timesRegionChanged++,
                                      t._setField('MCSYNCSOP', ''),
                                      t._setField('MCSYNCS', ''),
                                      (i = r)))
                                : (i = r) &&
                                  (t._setFieldExpire('MCAAMLH', n), t._setField('MCAAMLH', i)),
                            i || (i = ''),
                            i
                        );
                    },
                    processSyncOnPage: function(e) {
                        var t, n, i, r;
                        if ((t = e.ibs) && t instanceof Array && (n = t.length))
                            for (i = 0; i < n; i++)
                                (r = t[i]).syncOnPage &&
                                    this.checkFirstPartyCookie(r, '', 'syncOnPage');
                    },
                    process: function(e) {
                        var t,
                            n,
                            i,
                            r,
                            a,
                            o = encodeURIComponent,
                            s = !1;
                        if ((t = e.ibs) && t instanceof Array && (n = t.length))
                            for (s = !0, i = 0; i < n; i++)
                                (r = t[i]),
                                    (a = [
                                        o('ibs'),
                                        o(r.id || ''),
                                        o(r.tag || ''),
                                        p.encodeAndBuildRequest(r.url || [], ','),
                                        o(r.ttl || ''),
                                        '',
                                        '',
                                        r.fireURLSync ? 'true' : 'false',
                                    ]),
                                    r.syncOnPage ||
                                        (this.canSetThirdPartyCookies
                                            ? this.addMessage(a.join('|'))
                                            : r.fireURLSync &&
                                              this.checkFirstPartyCookie(r, a.join('|')));
                        s && this.jsonProcessed.push(e);
                    },
                    checkFirstPartyCookie: function(e, n, i) {
                        var r = 'syncOnPage' === i,
                            a = r ? 'MCSYNCSOP' : 'MCSYNCS';
                        t._readVisitor();
                        var o,
                            s,
                            c = t._getField(a),
                            u = !1,
                            l = !1,
                            d = Math.ceil(new Date().getTime() / V.MILLIS_PER_DAY);
                        c
                            ? ((o = c.split('*')),
                              (u = (s = this.pruneSyncData(o, e.id, d)).dataPresent),
                              (l = s.dataValid),
                              (u && l) || this.fireSync(r, e, n, o, a, d))
                            : ((o = []), this.fireSync(r, e, n, o, a, d));
                    },
                    pruneSyncData: function(e, t, n) {
                        var i,
                            r,
                            a,
                            o = !1,
                            s = !1;
                        for (r = 0; r < e.length; r++)
                            (i = e[r]),
                                (a = parseInt(i.split('-')[1], 10)),
                                i.match('^' + t + '-')
                                    ? ((o = !0), n < a ? (s = !0) : (e.splice(r, 1), r--))
                                    : n >= a && (e.splice(r, 1), r--);
                        return {
                            dataPresent: o,
                            dataValid: s,
                        };
                    },
                    manageSyncsSize: function(e) {
                        if (e.join('*').length > this.MAX_SYNCS_LENGTH)
                            for (
                                e.sort(function(e, t) {
                                    return (
                                        parseInt(e.split('-')[1], 10) -
                                        parseInt(t.split('-')[1], 10)
                                    );
                                });
                                e.join('*').length > this.MAX_SYNCS_LENGTH;

                            )
                                e.shift();
                    },
                    fireSync: function(e, n, i, r, a, o) {
                        var s = this;
                        if (e) {
                            if ('img' === n.tag) {
                                var c,
                                    u,
                                    l,
                                    d,
                                    f = n.url,
                                    p = t.loadSSL ? 'https:' : 'http:';
                                for (c = 0, u = f.length; c < u; c++) {
                                    (l = f[c]), (d = /^\/\//.test(l));
                                    var g = new Image();
                                    g.addEventListener(
                                        'load',
                                        (function(e, n, i, r) {
                                            return function() {
                                                (s.onPagePixels[e] = null), t._readVisitor();
                                                var o,
                                                    c,
                                                    u,
                                                    l,
                                                    d = t._getField(a),
                                                    f = [];
                                                if (d)
                                                    for (
                                                        c = 0, u = (o = d.split('*')).length;
                                                        c < u;
                                                        c++
                                                    )
                                                        (l = o[c]).match('^' + n.id + '-') ||
                                                            f.push(l);
                                                s.setSyncTrackingData(f, n, i, r);
                                            };
                                        })(this.onPagePixels.length, n, a, o)
                                    ),
                                        (g.src = (d ? p : '') + l),
                                        this.onPagePixels.push(g);
                                }
                            }
                        } else this.addMessage(i), this.setSyncTrackingData(r, n, a, o);
                    },
                    addMessage: function(e) {
                        var n = encodeURIComponent,
                            i = t._enableErrorReporting
                                ? n('---destpub-debug---')
                                : n('---destpub---');
                        this.messages.push((V.POST_MESSAGE_ENABLED ? '' : i) + e);
                    },
                    setSyncTrackingData: function(e, n, i, r) {
                        e.push(n.id + '-' + (r + Math.ceil(n.ttl / 60 / 24))),
                            this.manageSyncsSize(e),
                            t._setField(i, e.join('*'));
                    },
                    sendMessages: function() {
                        var e,
                            t = this,
                            n = '',
                            i = encodeURIComponent;
                        this.regionChanged &&
                            ((n = i('---destpub-clear-dextp---')), (this.regionChanged = !1)),
                            this.messages.length
                                ? V.POST_MESSAGE_ENABLED
                                    ? ((e =
                                          n +
                                          i('---destpub-combined---') +
                                          this.messages.join('%01')),
                                      this.postMessage(e),
                                      (this.messages = []),
                                      (this.sendingMessages = !1))
                                    : ((e = this.messages.shift()),
                                      this.postMessage(n + e),
                                      setTimeout(function() {
                                          t.sendMessages();
                                      }, this.messageSendingInterval))
                                : (this.sendingMessages = !1);
                    },
                    postMessage: function(e) {
                        N.postMessage(e, this.url, this.iframe.contentWindow),
                            this.messagesPosted.push(e);
                    },
                    receiveMessage: function(e) {
                        var t,
                            n = /^---destpub-to-parent---/;
                        'string' == typeof e &&
                            n.test(e) &&
                            ('canSetThirdPartyCookies' === (t = e.replace(n, '').split('|'))[0] &&
                                ((this.canSetThirdPartyCookies = 'true' === t[1]),
                                (this.receivedThirdPartyCookiesNotification = !0),
                                this.requestToProcess()),
                            this.messagesReceived.push(e));
                    },
                    processIDCallData: function(e) {
                        (null == this.url ||
                            (e.subdomain && 'nosubdomainreturned' === this.subdomain)) &&
                            ('string' == typeof t._subdomain && t._subdomain.length
                                ? (this.subdomain = t._subdomain)
                                : (this.subdomain = e.subdomain || ''),
                            (this.url = this.getUrl())),
                            e.ibs instanceof Array && e.ibs.length && (this.doAttachIframe = !0),
                            this.readyToAttachIframe() &&
                                (t.idSyncAttachIframeOnWindowLoad
                                    ? (n.windowLoaded ||
                                          'complete' === i.readyState ||
                                          'loaded' === i.readyState) &&
                                      this.attachIframe()
                                    : this.attachIframeASAP()),
                            'function' == typeof t.idSyncIDCallResult
                                ? t.idSyncIDCallResult(e)
                                : this.requestToProcess(e),
                            'function' == typeof t.idSyncAfterIDCallResult &&
                                t.idSyncAfterIDCallResult(e);
                    },
                    canMakeSyncIDCall: function(e, n) {
                        return t._forceSyncIDCall || !e || n - e > V.DAYS_BETWEEN_SYNC_ID_CALLS;
                    },
                    attachIframeASAP: function() {
                        var e = this;
                        !(function t() {
                            e.startedAttachingIframe ||
                                (i.body ? e.attachIframe() : setTimeout(t, 30));
                        })();
                    },
                };
            })(a, g);
            if (((a._destinationPublishing = q), (a.timeoutMetricsLog = []), VISITOR_DEBUG)) {
                var Y = {
                    d_timingapi: f.performance && f.performance.timing ? 1 : 0,
                    performanceTiming:
                        f.performance && f.performance.timing ? f.performance.timing : null,
                    windowLoad: null,
                    d_winload: null,
                    fieldGroupObj: {},
                    metricsQueue: [],
                    send: function(e) {
                        if (a.takeTimeoutMetrics && e === Object(e)) {
                            var t,
                                n,
                                i = [],
                                r = encodeURIComponent;
                            for (t in e) e.hasOwnProperty(t) && i.push(r(t) + '=' + r(e[t]));
                            (n =
                                'http' +
                                (a.loadSSL ? 's' : '') +
                                '://dpm.demdex.net/event?d_visid_ver=' +
                                a.version +
                                '&d_visid_stg_timeout=' +
                                a.loadTimeout +
                                '&' +
                                i.join('&') +
                                '&d_orgid=' +
                                r(a.marketingCloudOrgID) +
                                '&d_timingapi=' +
                                this.d_timingapi +
                                '&d_winload=' +
                                this.getWinLoad() +
                                '&d_ld=' +
                                this.millis()),
                                (new Image().src = n),
                                a.timeoutMetricsLog.push(n);
                        }
                    },
                    getWinLoad: function() {
                        return (
                            null == this.d_winload &&
                                (this.performanceTiming
                                    ? (this.d_winload =
                                          this.windowLoad - this.performanceTiming.navigationStart)
                                    : (this.d_winload = this.windowLoad - g.codeLoadEnd)),
                            this.d_winload
                        );
                    },
                    millis: function() {
                        return new Date().getTime();
                    },
                    process: function(e) {
                        var t = this.fieldGroupObj[e],
                            n = {};
                        (n.d_visid_stg_timeout_captured = t.d_visid_stg_timeout_captured),
                            (n.d_visid_cors = t.d_visid_cors),
                            (n.d_fieldgroup = e),
                            (n.d_settimeout_overriden = t.d_settimeout_overriden),
                            t.timeout
                                ? t.isActualTimeout
                                    ? ((n.d_visid_timedout = 1),
                                      (n.d_visid_timeout = t.timeout - t.requestStart),
                                      (n.d_visid_response = -1))
                                    : ((n.d_visid_timedout = 'n/a'),
                                      (n.d_visid_timeout = 'n/a'),
                                      (n.d_visid_response = 'n/a'))
                                : ((n.d_visid_timedout = 0),
                                  (n.d_visid_timeout = -1),
                                  (n.d_visid_response = t.requestEnd - t.requestStart)),
                            (n.d_visid_url = t.url),
                            g.windowLoaded ? this.send(n) : this.metricsQueue.push(n),
                            delete this.fieldGroupObj[e];
                    },
                    releaseMetricsQueue: function() {
                        for (var e = 0, t = this.metricsQueue.length; e < t; e++)
                            this.send(this.metricsQueue[e]);
                    },
                    getSetTimeoutOverriden: function() {
                        return 'function' == typeof setTimeout.toString
                            ? setTimeout.toString().indexOf('[native code]') > -1
                                ? 0
                                : 1
                            : -1;
                    },
                };
                a._timeoutMetrics = Y;
            }
            var W,
                X = {
                    isClientSideMarketingCloudVisitorID: null,
                    MCIDCallTimedOut: null,
                    AnalyticsIDCallTimedOut: null,
                    AAMIDCallTimedOut: null,
                    fieldGroupObj: {},
                    setState: function(e, t) {
                        switch (e) {
                            case C:
                                !1 === t
                                    ? !0 !== this.MCIDCallTimedOut && (this.MCIDCallTimedOut = !1)
                                    : (this.MCIDCallTimedOut = t);
                                break;
                            case v:
                                !1 === t
                                    ? !0 !== this.AnalyticsIDCallTimedOut &&
                                      (this.AnalyticsIDCallTimedOut = !1)
                                    : (this.AnalyticsIDCallTimedOut = t);
                                break;
                            case y:
                                !1 === t
                                    ? !0 !== this.AAMIDCallTimedOut && (this.AAMIDCallTimedOut = !1)
                                    : (this.AAMIDCallTimedOut = t);
                        }
                    },
                };

            function K() {
                return a.configs.doesOptInApply && a.configs.isIabContext
                    ? o.optIn.isApproved(o.optIn.Categories.ECID) && u
                    : o.optIn.isApproved(o.optIn.Categories.ECID);
            }

            function J() {
                [
                    ['getMarketingCloudVisitorID'],
                    ['setCustomerIDs', void 0],
                    ['syncIdentity', void 0],
                    ['getAnalyticsVisitorID'],
                    ['getAudienceManagerLocationHint'],
                    ['getLocationHint'],
                    ['getAudienceManagerBlob'],
                ].forEach(function(e) {
                    var t = e[0],
                        n = 2 === e.length ? e[1] : '',
                        i = a[t];
                    a[t] = function(e) {
                        return K() && a.isAllowed()
                            ? i.apply(a, arguments)
                            : ('function' == typeof e && a._callCallback(e, [n]), n);
                    };
                });
            }

            function z(e, t) {
                if (((u = !0), e)) throw new Error('[IAB plugin] : ' + e);
                var n, i;
                t &&
                    t.gdprApplies &&
                    ((s = t.consentString), (c = t.hasConsentChangedSinceLastCmpPull ? 1 : 0)),
                    (n = a._getAudienceManagerURLData()),
                    (i = n.url),
                    a._loadData(C, i, null, n),
                    Z();
            }

            function Q(e, t) {
                if (((u = !0), e)) throw new Error('[IAB plugin] : ' + e);
                t.gdprApplies &&
                    ((s = t.consentString), (c = t.hasConsentChangedSinceLastCmpPull ? 1 : 0)),
                    a.init(),
                    Z();
            }

            function $() {
                o.optIn.isComplete &&
                    (o.optIn.isApproved(o.optIn.Categories.ECID)
                        ? a.configs.isIabContext
                            ? o.optIn.execute({
                                  command: 'iabPlugin.fetchConsentData',
                                  callback: Q,
                              })
                            : (a.init(), Z())
                        : a.configs.isIabContext
                        ? o.optIn.execute({
                              command: 'iabPlugin.fetchConsentData',
                              callback: z,
                          })
                        : (J(), Z()));
            }

            function Z() {
                o.optIn.off('complete', $);
            }
            (a.isClientSideMarketingCloudVisitorID = function() {
                return X.isClientSideMarketingCloudVisitorID;
            }),
                (a.MCIDCallTimedOut = function() {
                    return X.MCIDCallTimedOut;
                }),
                (a.AnalyticsIDCallTimedOut = function() {
                    return X.AnalyticsIDCallTimedOut;
                }),
                (a.AAMIDCallTimedOut = function() {
                    return X.AAMIDCallTimedOut;
                }),
                (a.idSyncGetOnPageSyncInfo = function() {
                    return a._readVisitor(), a._getField('MCSYNCSOP');
                }),
                (a.idSyncByURL = function(e) {
                    if (!a.isOptedOut()) {
                        var t = (function(e) {
                            var t = e.minutesToLive,
                                n = '';
                            (a.idSyncDisableSyncs || a.disableIdSyncs) &&
                                (n = n || 'Error: id syncs have been disabled');
                            ('string' == typeof e.dpid && e.dpid.length) ||
                                (n = n || 'Error: config.dpid is empty');
                            ('string' == typeof e.url && e.url.length) ||
                                (n = n || 'Error: config.url is empty');
                            void 0 === t
                                ? (t = 20160)
                                : ((t = parseInt(t, 10)),
                                  (isNaN(t) || t <= 0) &&
                                      (n =
                                          n ||
                                          'Error: config.minutesToLive needs to be a positive number'));
                            return {
                                error: n,
                                ttl: t,
                            };
                        })(e || {});
                        if (t.error) return t.error;
                        var n,
                            i,
                            r = e.url,
                            o = encodeURIComponent,
                            s = q;
                        return (
                            (r = r.replace(/^https:/, '').replace(/^http:/, '')),
                            (n = p.encodeAndBuildRequest(['', e.dpid, e.dpuuid || ''], ',')),
                            (i = ['ibs', o(e.dpid), 'img', o(r), t.ttl, '', n]),
                            s.addMessage(i.join('|')),
                            s.requestToProcess(),
                            'Successfully queued'
                        );
                    }
                }),
                (a.idSyncByDataSource = function(e) {
                    if (!a.isOptedOut())
                        return e === Object(e) && 'string' == typeof e.dpuuid && e.dpuuid.length
                            ? ((e.url =
                                  '//dpm.demdex.net/ibs:dpid=' + e.dpid + '&dpuuid=' + e.dpuuid),
                              a.idSyncByURL(e))
                            : 'Error: config or config.dpuuid is empty';
                }),
                (function(e, t) {
                    e.publishDestinations = function(n) {
                        var i = arguments[1],
                            r = arguments[2];
                        try {
                            r = 'function' == typeof r ? r : n.callback;
                        } catch (e) {
                            r = function() {};
                        }
                        var a = t;
                        if (a.readyToAttachIframePreliminary()) {
                            if ('string' == typeof n) {
                                if (!n.length)
                                    return void r({
                                        error: 'subdomain is not a populated string.',
                                    });
                                if (!(i instanceof Array && i.length))
                                    return void r({
                                        error: 'messages is not a populated array.',
                                    });
                                var o = !1;
                                if (
                                    (i.forEach(function(e) {
                                        'string' == typeof e &&
                                            e.length &&
                                            (a.addMessage(e), (o = !0));
                                    }),
                                    !o)
                                )
                                    return void r({
                                        error: 'None of the messages are populated strings.',
                                    });
                            } else {
                                if (!p.isObject(n))
                                    return void r({
                                        error: 'Invalid parameters passed.',
                                    });
                                var s = n;
                                if ('string' != typeof (n = s.subdomain) || !n.length)
                                    return void r({
                                        error: 'config.subdomain is not a populated string.',
                                    });
                                var c = s.urlDestinations;
                                if (!(c instanceof Array && c.length))
                                    return void r({
                                        error: 'config.urlDestinations is not a populated array.',
                                    });
                                var u = [];
                                c.forEach(function(e) {
                                    p.isObject(e) &&
                                        (e.hideReferrer
                                            ? e.message && a.addMessage(e.message)
                                            : u.push(e));
                                }),
                                    (function e() {
                                        u.length &&
                                            setTimeout(function() {
                                                var t = new Image(),
                                                    n = u.shift();
                                                (t.src = n.url),
                                                    a.onPageDestinationsFired.push(n),
                                                    e();
                                            }, 100);
                                    })();
                            }
                            a.iframe
                                ? (r({
                                      message:
                                          'The destination publishing iframe is already attached and loaded.',
                                  }),
                                  a.requestToProcess())
                                : !e.subdomain && e._getField('MCMID')
                                ? ((a.subdomain = n),
                                  (a.doAttachIframe = !0),
                                  (a.url = a.getUrl()),
                                  a.readyToAttachIframe()
                                      ? (a.iframeLoadedCallbacks.push(function(e) {
                                            r({
                                                message:
                                                    'Attempted to attach and load the destination publishing iframe through this API call. Result: ' +
                                                    (e.message || 'no result'),
                                            });
                                        }),
                                        a.attachIframe())
                                      : r({
                                            error:
                                                'Encountered a problem in attempting to attach and load the destination publishing iframe through this API call.',
                                        }))
                                : a.iframeLoadedCallbacks.push(function(e) {
                                      r({
                                          message:
                                              'Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: ' +
                                              (e.message || 'no result'),
                                      });
                                  });
                        } else
                            r({
                                error:
                                    'The destination publishing iframe is disabled in the Visitor library.',
                            });
                    };
                })(a, q),
                (a._getCookieVersion = function(e) {
                    e = e || a.cookieRead(a.cookieName);
                    var t = V.VERSION_REGEX.exec(e);
                    return t && t.length > 1 ? t[1] : null;
                }),
                (a._resetAmcvCookie = function(e) {
                    var t = a._getCookieVersion();
                    (t && !w(t, e)) || G.removeCookie(a.cookieName);
                }),
                (a.setAsCoopSafe = function() {
                    h = !0;
                }),
                (a.setAsCoopUnsafe = function() {
                    h = !1;
                }),
                (function() {
                    if (((a.configs = Object.create(null)), G.isObject(i)))
                        for (var e in i) T(e) && ((a[e] = i[e]), (a.configs[e] = i[e]));
                })(),
                J(),
                (a.init = function() {
                    (!a.configs.doesOptInApply ||
                        (o.optIn.isComplete && K()) ||
                        (o.optIn.fetchPermissions($, !0),
                        o.optIn.isApproved(o.optIn.Categories.ECID))) &&
                        (W ||
                            ((W = !0),
                            (function() {
                                if (G.isObject(i)) {
                                    (a.idSyncContainerID = a.idSyncContainerID || 0),
                                        (h =
                                            'boolean' == typeof a.isCoopSafe
                                                ? a.isCoopSafe
                                                : G.parseBoolean(a.isCoopSafe)),
                                        a.resetBeforeVersion &&
                                            a._resetAmcvCookie(a.resetBeforeVersion),
                                        a._attemptToPopulateIdsFromUrl(),
                                        a._attemptToPopulateSdidFromUrl(),
                                        a._readVisitor();
                                    var e = a._getField(I),
                                        t = Math.ceil(new Date().getTime() / V.MILLIS_PER_DAY);
                                    a.idSyncDisableSyncs ||
                                        a.disableIdSyncs ||
                                        !q.canMakeSyncIDCall(e, t) ||
                                        (a._setFieldExpire(O, -1), a._setField(I, t)),
                                        a.getMarketingCloudVisitorID(),
                                        a.getAudienceManagerLocationHint(),
                                        a.getAudienceManagerBlob(),
                                        a._mergeServerState(a.serverState);
                                } else
                                    a._attemptToPopulateIdsFromUrl(),
                                        a._attemptToPopulateSdidFromUrl();
                            })(),
                            (function() {
                                if (!a.idSyncDisableSyncs && !a.disableIdSyncs) {
                                    q.checkDPIframeSrc();
                                    f.addEventListener('load', function() {
                                        var e;
                                        (g.windowLoaded = !0),
                                            VISITOR_DEBUG &&
                                                ((Y.windowLoad = Y.millis()),
                                                Y.releaseMetricsQueue()),
                                            (e = q).readyToAttachIframe() && e.attachIframe();
                                    });
                                    try {
                                        N.receiveMessage(function(e) {
                                            q.receiveMessage(e.data);
                                        }, q.iframeHost);
                                    } catch (e) {}
                                }
                            })(),
                            a.whitelistIframeDomains &&
                                V.POST_MESSAGE_ENABLED &&
                                ((a.whitelistIframeDomains =
                                    a.whitelistIframeDomains instanceof Array
                                        ? a.whitelistIframeDomains
                                        : [a.whitelistIframeDomains]),
                                a.whitelistIframeDomains.forEach(function(e) {
                                    var t = new _(n, e),
                                        i = A(a, t);
                                    N.receiveMessage(i, e);
                                }))));
                });
        };
        (Me.config = H), (e.Visitor = Me);
        var ke = Me,
            Ee = ye.OptIn,
            Te = ye.IabPlugin;
        return (
            (ke.getInstance = function(t, n) {
                if (!t) throw new Error('Visitor requires Adobe Marketing Cloud Org ID.');
                t.indexOf('@') < 0 && (t += '@AdobeOrg');
                var i = (function() {
                    var n = e.s_c_il;
                    if (n)
                        for (var i = 0; i < n.length; i++) {
                            var r = n[i];
                            if (r && 'Visitor' === r._c && r.marketingCloudOrgID === t) return r;
                        }
                })();
                if (i) return i;
                var r,
                    a =
                        (function(e) {
                            if (p.isObject(e))
                                return Object.keys(e)
                                    .filter(function(t) {
                                        return '' !== e[t] && H.getConfigs()[t];
                                    })
                                    .reduce(function(t, n) {
                                        var i = H.normalizeConfig(n, e[n]),
                                            r = p.normalizeBoolean(i);
                                        return (t[n] = r), t;
                                    }, Object.create(null));
                        })(n) || {};
                (r = a || {}),
                    (e.adobe.optIn =
                        e.adobe.optIn ||
                        (function() {
                            var e = p.pluck(r, [
                                    'doesOptInApply',
                                    'previousPermissions',
                                    'preOptInApprovals',
                                    'isOptInStorageEnabled',
                                    'optInStorageExpiry',
                                    'isIabContext',
                                ]),
                                t = r.optInCookieDomain || r.cookieDomain;
                            (t = (t = t || k()) === window.location.hostname ? '' : t),
                                (e.optInCookieDomain = t);
                            var n = new Ee(e, {
                                cookies: M,
                            });
                            if (e.isIabContext && e.doesOptInApply) {
                                var i = new Te();
                                n.registerPlugin(i);
                            }
                            return n;
                        })());
                var o = t
                        .split('')
                        .reverse()
                        .join(''),
                    s = new ke(t, null, o);
                a.cookieDomain && (s.cookieDomain = a.cookieDomain),
                    a.sameSiteCookie &&
                        a.secureCookie &&
                        (s.configs = {
                            sameSiteCookie: a.sameSiteCookie,
                            secureCookie: a.secureCookie,
                        }),
                    e.s_c_il.splice(--e.s_c_in, 1);
                var c = p.getIeVersion();
                if ('number' == typeof c && c < 10)
                    return s._helpers.replaceMethodsWithFunction(s, function() {});
                var u =
                    (function() {
                        try {
                            return e.self !== e.parent;
                        } catch (e) {
                            return !0;
                        }
                    })() &&
                    !(function(e) {
                        return (
                            e.cookieWrite('TEST_AMCV_COOKIE', 'T', 1),
                            'T' === e.cookieRead('TEST_AMCV_COOKIE') &&
                                (e.removeCookie('TEST_AMCV_COOKIE'), !0)
                        );
                    })(s) &&
                    e.parent
                        ? new S(t, a, s, e.parent)
                        : new ke(t, a, o);
                return (s = null), u.init(), u;
            }),
            (function() {
                function t() {
                    ke.windowLoaded = !0;
                }
                e.addEventListener
                    ? e.addEventListener('load', t)
                    : e.attachEvent && e.attachEvent('onload', t),
                    (ke.codeLoadEnd = new Date().getTime());
            })(),
            ke
        );
    })();

(function() {
    var n = document.getElementsByTagName("head")[0], r = navigator.userAgent.indexOf("MSIE") > 0 ? "img" : "object", s = /^https?:\/\/.*/, j = document.scriptCookie || "scripts", q = document.scriptDebugging || false, d = document.scriptLoader || {
        download: function(b, c) {
            if (q || s.test(b.src)) {
                var a = document.createElement(r);
                a.style.width = a.style.height = "0px";
                a.onload = a.onerror = function() {
                    a.onload = a.onerror = null;
                    c()
                };
                a.src = a.data = b.src;
                document.body.appendChild(a)
            } else {
                var a = new XMLHttpRequest;
                a.onreadystatechange = function() {
                    if (a.readyState == 4) {
                        a.onreadystatechange = null;
                        b.useText = true;
                        b.text = a.responseText;
                        c()
                    }
                };
                a.open("GET", b.src, true);
                a.send()
            }
        },
        canStore: !!window.localStorage,
        load: function(a) { return window.localStorage["script." + a] },
        save: function(b, c, d) {
            window.localStorage["script." + b] = d;
            var a = window.localStorage["script.$"];
            a = a ? JSON.parse(a) : { };
            a[b] = c;
            a = JSON.stringify(a);
            window.localStorage["script.$"] = a;
            document.cookie = j + "=" + encodeURIComponent(a) + "; max-age=15552000; path=/"
        }
    }, c = [], b = [], a = { }, m = false;

    function t(c, b) { b && b.split(",").forEach(function(b) { (!a[b] || !a[b].loaded) && console.error(b + " has not been loaded before " + c) }) }

    function u(a, b, c) {
        a = a.push ? a : [a];
        f(a, b, c)
    }

    function p(a) { c ? c.push(a) : setTimeout(a, 0) }

    function o(a) { b ? b.push(a) : setTimeout(a, 0) }

    function i(b) {
        b.loaded = false;
        a[b.name] = b
    }

    function h(a, b) {
        if (a.downloaded) {
            b && b(a);
            return
        }
        if (a.store && d.canStore) {
            if (a.store == "load") {
                a.useText = true;
                a.text = d.load(a.name)
            } else {
                a.useText = true;
                d.save(a.name, a.store, a.text)
            }
            a.downloaded = true;
            b && b(a);
            return
        }
        if (a.downloading) {
            if (b)
                if (!a.downloadCallbacks) a.downloadCallbacks = [b];
                else a.downloadCallbacks.push(b);
            return
        }
        a.downloading = true;
        var c = function() {
            a.downloaded = true;
            a.downloading = false;
            b && b(a);
            if (a.downloadCallbacks) {
                a.downloadCallbacks.forEach(function(b) { b(a) });
                delete a.downloadCallbacks
            }
        };
        d.download(a, c)
    }

    function v(b, c) {
        if (b.loaded) {
            c(b);
            return
        }
        var a = document.createElement("script");
        a.type = "text/javascript";
        if (b.useText) {
            a.text = b.text;
            setTimeout(function() {
                b.loaded = true;
                c(b)
            }, 0)
        } else {
            a.onload = a.onreadystatechange = function() {
                if (a.readyState && a.readyState != "complete" && a.readyState != "loaded") return;
                a.onload = a.onreadystatechange = null;
                b.loaded = true;
                c(b)
            };
            a.src = b.src
        }
        n.appendChild(a)
    }

    function k(b) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.text = b.text;
        n.appendChild(a)
    }

    function g(a) { a && a.length && a.forEach(function(a) { a() }) }

    function f(b, g, i) {
        if (b.length == 0) {
            g(i);
            return
        }
        var e = 0, d = [];

        function p() {
            e++;
            if (b.length == e) g(i);
            else d.length && l()
        }

        function o(a) {
            d.push(a);
            l()
        }

        function l() {
            var b = d;
            if (b.length) {
                d = [];
                b.forEach(function(b) {
                    var c = true;
                    if (b.requires) c = b.requires.every(function(b) { return a[b].loaded });
                    if (c) v(b, p);
                    else d.push(b)
                })
            }
        }

        var f = { };
        b.forEach(function(a) { f[a] = a });
        var n = 0;
        do {
            var j = a[b[n++]];
            if (j.requires)
                for (var k = j.requires.length - 1; k >= 0; k--) {
                    var c = j.requires[k];
                    if (!f[c] && !a[c].loaded) {
                        b.push(c);
                        f[c] = c
                    }
                }
        } while (n < b.length);
        var m = true;
        b.forEach(function(c) {
            var b = a[c];
            if (b.loaded) e++;
            else {
                h(b, o);
                m = false
            }
        });
        m && g(i)
    }

    function l(c) {
        c.forEach(function(c) {
            var b = a[c];
            if (b.loaded) return;
            h(b)
        });
        var d = b;
        b = null;
        g(d)
    }

    function e() {
        if (m) return;
        m = true;
        var p = c;
        c = null;
        g(p);
        j = document.body.getAttribute("data-scripts-cookie") || "scripts";
        for (var o = [], e = [], d = [], n = document.getElementsByTagName("script"), h = 0, q = n.length; h < q; h++) {
            var b = n[h];
            if (b.type == "text/script") {
                var a = { name: b.getAttribute("data-name"), src: b.getAttribute("data-src"), requires: b.getAttribute("data-requires"), mode: b.getAttribute("data-mode") || "startup", text: b.text, store: b.getAttribute("data-store") };
                if (a.requires) a.requires = a.requires.split(",");
                if (a.name) {
                    i(a);
                    if (a.mode == "startup") o.push(a.name);
                    else a.mode == "deferred" && e.push(a.name)
                } else d.push(a)
            }
        }
        f(o, function() {
            var a = 0;
            d.length && d.forEach(function(b) {
                if (b.requires)
                    f(b.requires, function(b) {
                        k(b);
                        a++;
                        a == d.length && l(e)
                    }, b);
                else {
                    k(b);
                    a++
                }
            });
            a == d.length && l(e)
        })
    }

    if (!window.ss) window.ss = { };
    window.ss.load = e;
    window.ss.loadScripts = u;
    window.ss.checkScripts = t;
    window.ss.registerScript = i;
    window.ss.init = p;
    window.ss.ready = o;
    if (document.addEventListener) document.readyState == "complete" ? e() : document.addEventListener("DOMContentLoaded", e, false);
    else window.attachEvent && window.attachEvent("onload", function() { e() })
})()
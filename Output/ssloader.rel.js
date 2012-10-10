(function() {
    var _head = document.getElementsByTagName('head')[0];

    var _downloaderType = navigator.userAgent.indexOf('MSIE') > 0 ? 'img' : 'object';
    var _xdomainRegex = /^https?:\/\/.*/;

    var _storageCookie = document.scriptCookie || 'scripts';

    var _debuggableScripts = document.scriptDebugging || false;

    var _scriptLoader = document.scriptLoader ||
        {
            download: function(script, callback) {

                if (_debuggableScripts || _xdomainRegex.test(script.src)) {
                    var downloader = document.createElement(_downloaderType);
                    downloader.style.width = downloader.style.height = '0px';
                    downloader.onload = downloader.onerror = function() {
                        downloader.onload = downloader.onerror = null;
                        callback();
                    };
                    downloader.src = downloader.data = script.src;
                    document.body.appendChild(downloader);
                } else {
                    var downloader = new XMLHttpRequest();
                    downloader.onreadystatechange = function() {
                        if (downloader.readyState == 4) {
                            downloader.onreadystatechange = null;

                            script.useText = true;
                            script.text = downloader.responseText;
                            callback();
                        }
                    };
                    downloader.open('GET', script.src, true);
                    downloader.send();
                }
            },

            canStore: !!window.localStorage,

            load: function(name) {
                return window.localStorage['script.' + name];
            },

            save: function(name, version, text) {
                window.localStorage['script.' + name] = text;

                var scriptIndex = window.localStorage['script.$'];

                scriptIndex = scriptIndex ? JSON.parse(scriptIndex) : { };
                scriptIndex[name] = version;

                scriptIndex = JSON.stringify(scriptIndex);
                window.localStorage['script.$'] = scriptIndex;

                document.cookie = _storageCookie + '=' + encodeURIComponent(scriptIndex) +
                    '; max-age=15552000; path=/';
            }
        };

    var _initCallbacks = [];
    var _readyCallbacks = [];
    var _registeredScripts = { };
    var _started = false;

    function checkScripts(name, requiredNames) {
        if (requiredNames) {
            requiredNames.split(',').forEach(function(s) {
                if (!_registeredScripts[s] || !_registeredScripts[s].loaded) {
                    console.error(s + ' has not been loaded before ' + name);
                }
            });
        }
    }

    function loadScripts(scriptNames, callback, context) {
        scriptNames = scriptNames['push'] ? scriptNames : [scriptNames];
        _loadScripts(scriptNames, callback, context);
    }

    function registerInitCallback(callback) {
        _initCallbacks ? _initCallbacks.push(callback) : setTimeout(callback, 0);
    }

    function registerReadyCallback(callback) {
        _readyCallbacks ? _readyCallbacks.push(callback) : setTimeout(callback, 0);
    }

    function registerScript(script) {
        script.loaded = false;
        _registeredScripts[script.name] = script;
    }

    function _downloadScript(script, callback) {
        if (script.downloaded) {
            if (callback) {
                callback(script);
            }
            return;
        }
        if (script.store && _scriptLoader.canStore) {
            if (script.store == 'load') {
                script.useText = true;
                script.text = _scriptLoader.load(script.name);
            } else {

                script.useText = true;
                _scriptLoader.save(script.name, script.store, script.text);
            }

            script.downloaded = true;
            if (callback) {
                callback(script);
            }
            return;
        }
        if (script.downloading) {
            if (callback) {
                if (!script.downloadCallbacks) {
                    script.downloadCallbacks = [callback];
                } else {
                    script.downloadCallbacks.push(callback);
                }
            }
            return;
        }

        script.downloading = true;

        var cb = function() {
            script.downloaded = true;
            script.downloading = false;
            if (callback) {
                callback(script);
            }
            if (script.downloadCallbacks) {
                script.downloadCallbacks.forEach(function(cb) {
                    cb(script);
                });
                delete script.downloadCallbacks;
            }
        };

        _scriptLoader.download(script, cb);
    }

    function _execScript(script, callback) {
        if (script.loaded) {
            callback(script);
            return;
        }

        var s = document.createElement('script');
        s.type = 'text/javascript';
        if (script.useText) {
            s.text = script.text;
            setTimeout(function() {
                script.loaded = true;
                callback(script);
            }, 0);
        } else {
            s.onload = s.onreadystatechange = function() {
                if (s.readyState && s.readyState != 'complete' && s.readyState != 'loaded') {
                    return;
                }
                s.onload = s.onreadystatechange = null;
                script.loaded = true;
                callback(script);
            };
            s.src = script.src;
        }
        _head.appendChild(s);
    }

    function _evalScript(script) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.text = script.text;
        _head.appendChild(s);
    }

    function _invokeCallbacks(callbacks) {
        if (callbacks && callbacks.length) {
            callbacks.forEach(function(callback) {
                callback();
            });
        }
    }

    function _loadScripts(scriptNames, callback, context) {
        if (scriptNames.length == 0) {
            callback(context);
            return;
        }

        var loadCount = 0;
        var downloaded = [];

        function scriptLoaded(script) {
            loadCount++;
            if (scriptNames.length == loadCount) {
                callback(context);
            } else {
                if (downloaded.length) {
                    processDownloaded();
                }
            }
        }

        function scriptDownloaded(script) {
            downloaded.push(script);
            processDownloaded();
        }

        function processDownloaded() {
            var scripts = downloaded;
            if (scripts.length) {
                downloaded = [];
                scripts.forEach(function(script) {
                    var load = true;
                    if (script.requires) {
                        load = script.requires.every(function(dependencyName) {
                            return _registeredScripts[dependencyName].loaded;
                        });
                    }
                    if (load) {
                        _execScript(script, scriptLoaded);
                    } else {
                        downloaded.push(script);
                    }
                });
            }
        }

        var scriptMap = { };
        scriptNames.forEach(function(name) {
            scriptMap[name] = name;
        });

        var i = 0;
        do {
            var script = _registeredScripts[scriptNames[i++]];
            if (script.requires) {
                for (var j = script.requires.length - 1; j >= 0; j--) {
                    var dependencyName = script.requires[j];
                    if (!scriptMap[dependencyName] && !_registeredScripts[dependencyName].loaded) {
                        scriptNames.push(dependencyName);
                        scriptMap[dependencyName] = dependencyName;
                    }
                }
            }
        } while (i < scriptNames.length);

        var done = true;
        scriptNames.forEach(function(name) {
            var script = _registeredScripts[name];
            if (script.loaded) {
                loadCount++;
            } else {
                _downloadScript(script, scriptDownloaded);
                done = false;
            }
        });

        if (done) {
            callback(context);
        }
    }

    function _raiseReady(deferredScripts) {
        deferredScripts.forEach(function(name) {
            var script = _registeredScripts[name];
            if (script.loaded) {
                return;
            }
            _downloadScript(script);
        });

        var readyCallbacks = _readyCallbacks;
        _readyCallbacks = null;
        _invokeCallbacks(readyCallbacks);
    }

    function _startup() {
        if (_started) {
            return;
        }
        _started = true;

        var initCallbacks = _initCallbacks;
        _initCallbacks = null;
        _invokeCallbacks(initCallbacks);

        _storageCookie = document.body.getAttribute('data-scripts-cookie') || 'scripts';

        var startupScripts = [];
        var deferredScripts = [];
        var inlineScripts = [];


        var scriptElements = document.getElementsByTagName('script');
        for (var i = 0, count = scriptElements.length; i < count; i++) {
            var scriptElement = scriptElements[i];
            if (scriptElement.type == 'text/script') {
                var script = {
                    name: scriptElement.getAttribute('data-name'),
                    src: scriptElement.getAttribute('data-src'),
                    requires: scriptElement.getAttribute('data-requires'),
                    mode: scriptElement.getAttribute('data-mode') || 'startup',
                    text: scriptElement.text,
                    store: scriptElement.getAttribute('data-store')
                };
                if (script.requires) {
                    script.requires = script.requires.split(',');
                }

                if (script.name) {
                    registerScript(script);
                    if (script.mode == 'startup') {
                        startupScripts.push(script.name);
                    } else if (script.mode == 'deferred') {
                        deferredScripts.push(script.name);
                    }
                } else {
                    inlineScripts.push(script);
                }
            }
        }

        _loadScripts(startupScripts, function() {
            var inlinesProcessed = 0;
            if (inlineScripts.length) {
                inlineScripts.forEach(function(script) {
                    if (script.requires) {
                        _loadScripts(script.requires, function(s) {
                            _evalScript(s);
                            inlinesProcessed++;

                            if (inlinesProcessed == inlineScripts.length) {
                                _raiseReady(deferredScripts);
                            }
                        }, script);
                    } else {
                        _evalScript(script);
                        inlinesProcessed++;
                    }
                });
            }

            if (inlinesProcessed == inlineScripts.length) {
                _raiseReady(deferredScripts);
            }
        });
    }

    if (!window.ss)
        window.ss = { };

    window.ss.load = _startup;
    window.ss.loadScripts = loadScripts;
    window.ss.checkScripts = checkScripts;
    window.ss.registerScript = registerScript;
    window.ss.init = registerInitCallback;
    window.ss.ready = registerReadyCallback;

    if (document.addEventListener) {
        document.readyState == 'complete' ? _startup() : document.addEventListener('DOMContentLoaded', _startup, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', function() {
            _startup();
        });
    }
})();
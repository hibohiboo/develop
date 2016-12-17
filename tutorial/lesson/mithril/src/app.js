var m = require("mithril");

m.mount(document.querySelector("#root"), {
    view: function() {
        return m("ul", [
            m("li", m('a[href="/a"]', {config: m.route}, "module A")),
            m("li", m('a[href="/b"]', {config: m.route}, "module B")),
            m("li", m('a[href="/c"]', {config: m.route}, "module C"))
        ]);
    }
});

var loaded = {};

var lazyModuleA = {
    view: function (ctrl) {
        if (loaded.module_a) {
            return loaded.module_a;
        } else {
            m.startComputation();
            require(["./module_a.js"], function(module_a) {
                loaded.module_a = module_a;
                m.endComputation();
            });
        }
    }
};

var lazyModuleB = {
    view: function (ctrl) {
        if (loaded.module_b) {
            return loaded.module_b;
        } else {
            m.startComputation();
            require(["./module_b.js"], function(module_b) {
                loaded.module_b = module_b;
                m.endComputation();
            });
        }
    }
};

var lazyModuleC = {
    view: function (ctrl) {
        if (loaded.module_c) {
            return loaded.module_c;
        } else {
            m.startComputation();
            require(["./module_c.js"], function(module_c) {
                loaded.module_c = module_c;
                m.endComputation();
            });
        }
    }
};

// LazyModuleB, LazyModuleCは省略

m.route(document.querySelector("#content"), "/a", {
    "/a": lazyModuleA,
    "/b": lazyModuleB,
    "/c": lazyModuleC,
});
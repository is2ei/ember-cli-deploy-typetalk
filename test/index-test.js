/*
    eslint-disable
    func-names,
    max-statements
*/

var assert = require("chai").assert,
    subject = require("../index");

describe("typetalk plugin", function () {
    var mockUi;

    beforeEach(function () {
        mockUi = {
            messages: [],
            write: function () {
                // Do nothing.
            },
            writeLine: function (message) {
                this.messages.push(message);
            }
        };
    });

    it("should has name", function () {
        assert.equal(subject.name, "ember-cli-deploy-typetalk");
    });

    it("should have hooks", function () {
        var plugin = subject.createDeployPlugin({
            "name": "test-plugin"
        });

        assert.typeOf(plugin.willActivate, "function");
        assert.typeOf(plugin.willBuild, "function");
        assert.typeOf(plugin.willDeploy, "function");
        assert.typeOf(plugin.willUpload, "function");
        assert.typeOf(plugin.didActivate, "function");
        assert.typeOf(plugin.didBuild, "function");
        assert.typeOf(plugin.didDeploy, "function");
        assert.typeOf(plugin.didFail, "function");
        assert.typeOf(plugin.didUpload, "function");
        assert.typeOf(plugin.activate, "function");
        assert.typeOf(plugin.build, "function");
        assert.typeOf(plugin.upload, "function");
    });

    describe("configure hook", function () {
        it("resolves if config is ok", function () {
            var plugin = subject.createDeployPlugin({
                name: "typetalk"
            });

            var context = {
                ui: mockUi,
                config: {
                    typetalk: {   
                    }
                }
            };

            plugin.beforeHook(context);
            plugin.configure(context);
            assert.ok(true);
        });

        it("throws if require config is missing", function () {
            var plugin = subject.createDeployPlugin({
                name: "typetalk"
            });

            var context = {
                ui: mockUi,
                config: {
                    typetalk: {
                    }
                }
            };

            plugin.beforeHook(context);
            plugin.configure(context);
            assert.throws(function () {
                plugin.didDeploy(context);
            });
        });

        it("adds default config to the config object", function () {
            var plugin = subject.createDeployPlugin({
                name: "typetalk"
            });

            var context = {
                ui: mockUi,
                config: {
                    "typetalk": {
                        "token": "qweasdzxc"
                    }
                }
            };

            plugin.beforeHook(context);
            plugin.configure(context);

            assert.isDefined(context.config["typetalk"].willDeploy);
            assert.isDefined(context.config["typetalk"].didDeploy);
            assert.isDefined(context.config["typetalk"].didFail);
        });

        describe("didDeploy hook", function () {
            it("notifies typetalk", function () {
                var plugin = subject.createDeployPlugin({
                    name: "typetalk"
                });

                var context = {
                    
                }
            });
        });
    });
});

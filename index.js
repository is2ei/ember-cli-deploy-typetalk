var TypetalkNotifier = require("./lib/typetalk-notifier");
var DeployPluginBase = require("ember-cli-deploy-plugin");

module.exports = {
    name: "ember-cli-deploy-typetalk",

    createDeployPlugin: function (options) {
        var DeployPlugin = DeployPluginBase.extend({
            name: options.name,

            defaultConfig: {
                enabled: true,

                willDeploy: function (/* context */) {
                    return function (/* typetalk */) {
                        typetalkStartDeployDate: new Date();
                    };
                },

                didDeploy: function (/* context */) {
                    return function (typetalk) {

                    };
                },

                didFail: function (/* context */) {
                    return function (typetalk) {

                    }
                }
            },

            willActivate: function (/* context */) {
                return this._executeTypetalkNotificationHook("willActivate");
            },

            willBuild: function (/* context */) {
                return this._executeTypetalkNotificationHook("willBuild");
            },

            willDeploy: function (/* context */) {
                return this._executeTypetalkNotificationHook("willDeploy");
            },

            willUpload: function (/* context */) {
                return this._executeTypetalkNotificationHook("willUpload");
            },

            didActivate: function (/* context */) {
                return this._executeTypetalkNotificationHook("didActivate");
            },

            didBuild: function (/* context */) {
                return this._executeTypetalkNotificationHook("didBuild");
            },

            didDeploy: function (/* context */) {
                return this._executeTypetalkNotificationHook("didDeploy");
            },

            didFail: function (/* context */) {
                return this._executeTypetalkNotificationHook("didFail");
            },

            didUpload: function (/* context */) {
                return this._executeTypetalkNotificationHook("didUpload");
            },

            activate: function (/* context */) {
                return this._executeTypetalkNotificationHook("activate");
            },

            build: function (/* context */) {
                return this._executeTypetalkNotificationHook("build");
            },

            upload: function (/* context */) {
                return this._executeTypetalkNotificationHook("upload");
            },

            _executeTypetalkNotificationHook: function (hookName) {
                var typetalk = this._initTypetalkNotifier();
                var typetalkHook = this.readConfig(hookName);
                if (typetalkHook) {
                    return typetalkHook.call(this, typetalk);
                }
            },

            _initTypetalkNotifier: function () {
                var token = this.readConfig("token");
                var topicId = this.readConfig("topicID");
                var enabled = !!this.readConfig("enabled");

                if (!token && enabled) {
                    var message = "Ember-CLI-Deploy: `token` is required by ember-cli-deploy-typetalk";
                    throw new Error(message);
                }

                return new TypetalkNotifier({
                    enabled: enabled,
                    token: token,
                    topicId: topicId
                });
            }
        });
        return new DeployPlugin();
    }
}

/*
    eslint-disable
    func-names,
    max-statements
*/

var TypetalkNotifier = require("../lib/typetalk-notifier"),
    expect = require("chai").expect;

describe("TypetalkNotifier", function () {
    var typetalk;

    beforeEach(function () {
        typetalk = new TypetalkNotifier({
            enabled: true
        });
    });

    it("should be initialized", function () {
        expect(typetalk).to.be.ok;
    });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Bem = {

    mSeparator: '--',
    eSeparator: '__',

    m: function m(base, modifier) {
        modifier = modifier.split(' ');
        var finalClass = [];

        modifier.forEach(function (className) {
            finalClass.push(base + '--' + className);
        });

        return finalClass.join(' ');
    },
    e: function e(base, element) {
        return base + this.eSeparator + element;
    }
};

exports.default = Bem;
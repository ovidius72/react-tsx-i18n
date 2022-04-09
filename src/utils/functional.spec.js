"use strict";
exports.__esModule = true;
var functional_1 = require("./functional");
describe('Functional code', function () {
    test('Test Curry', function () {
        var twoArgsFun = function (a, b) { return a + b; };
        var toOneArgs = (0, functional_1.curry)(twoArgsFun, 10);
        var res = toOneArgs(4);
        expect(res).toEqual(14);
    });
    test('Test Pipe', function () {
        var twoArgsFun = function (a, b) { return a + b; };
        var to10 = (0, functional_1.curry)(twoArgsFun, 10);
        var to20 = (0, functional_1.curry)(twoArgsFun, 20);
        var calc = (0, functional_1.pipe)(to10, to20);
        expect(calc(5)).toEqual(35);
    });
    test('Test Compose', function () {
        var twoArgsFun = function (a, b) { return a + b; };
        var to10 = (0, functional_1.curry)(twoArgsFun, 10);
        var to20 = (0, functional_1.curry)(twoArgsFun, 20);
        var to40 = (0, functional_1.curry)(twoArgsFun, 40);
        var to50 = (0, functional_1.curry)(twoArgsFun, 50);
        var calc = (0, functional_1.compose)(to10, to20, to40, to50);
        expect(calc(5)).toEqual(125);
    });
    test('Test Pipe & Compose', function () {
        var mul2 = function (a) { return a * 2; };
        var sub3 = function (a) { return a - 3; };
        var composed = (0, functional_1.compose)(sub3, mul2);
        var piped = (0, functional_1.pipe)(sub3, mul2);
        expect(composed(5)).toEqual(7);
        expect(piped(5)).toEqual(4);
    });
});

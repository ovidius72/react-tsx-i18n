"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.concat = exports.pipe = exports.compose = exports.tail = exports.head = exports.curry = void 0;
//------------------------------------------------------------------//
//                              CURRY                               //
//------------------------------------------------------------------//
var curry = function (fn) {
    var front = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        front[_i - 1] = arguments[_i];
    }
    return function () {
        var tailArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tailArgs[_i] = arguments[_i];
        }
        return fn.apply(void 0, __spreadArray(__spreadArray([], front, false), tailArgs, false));
    };
};
exports.curry = curry;
//------------------------------------------------------------------//
//                               HEAD                               //
//------------------------------------------------------------------//
var head = function (val) {
    return (val || [])[0];
};
exports.head = head;
//------------------------------------------------------------------//
//                               TAIL                               //
//------------------------------------------------------------------//
var tail = function (val) {
    return (val || []).slice(1);
};
exports.tail = tail;
var x = (0, exports.tail)([1, 2, 3, 'string']);
console.log('x', x);
//------------------------------------------------------------------//
//                             COMPOSE                              //
//------------------------------------------------------------------//
var compose = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // The compose return type, aka the composed function signature
    return function (input) { return args.reduceRight(function (val, fn) { return fn(val); }, input); };
};
exports.compose = compose;
//------------------------------------------------------------------//
//                               PIPE                               //
//------------------------------------------------------------------//
var pipe = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // The pipe return type, aka the composed function signature
    return function (input) { return args.reduce(function (val, fn) { return fn(val); }, input); };
};
exports.pipe = pipe;
//------------------------------------------------------------------//
//                              CONCAT                              //
//------------------------------------------------------------------//
var concat = function (arr1, arr2) {
    return __spreadArray(__spreadArray([], arr1, true), arr2, true);
};
exports.concat = concat;
// export const MapFn = <T, V>(
//   ...args: readonly [(_x: any) => V]
// ): ((_x: V) => T) => {
//   return (input: V) => args.map((val, fn) => fn(val), input);
// };
// const res = MapFn(x => x + 1)([1, 2, 3]);
// const res = map(x => x * 2)(1);
// const add2 = (a: number) => a + 2;
// const mul2 = (a: number) => a * 2;
// const twoArgs = (a: number, b: number, c: number) => a + b + c;
// const cOneArgs = curry(twoArgs, 10);
// const cTwoArgs = curry(cOneArgs, 10);
// const allArgs = cTwoArgs(2);
// console.log('allArgs', allArgs);
// const res = pipe(add2, mul2);
// const res2 = compose(add2, mul2);
// console.log(res(2));
// console.log(res2(2));

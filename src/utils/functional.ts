/**
 * Curry
 */
export const curry = <T extends unknown[], U extends unknown[], R>(
  fn: (...args: [...T, ...U]) => R,
  ...front: T
) => {
  return (...tailArgs: U) => fn(...front, ...tailArgs);
};

/**
 * Compose
 */
export const compose = <T, V>(
  ...args: readonly [
    (x: T) => any, // 1. The first function type
    ...any[], // 2. The middle function types
    (x: any) => V, // 3. The last function type
  ]
): ((x: V) => T) => {
  // The compose return type, aka the composed function signature
  return (input: V) => args.reduceRight((val, fn) => fn(val), input);
};

/**
 * Pipe
 */
export const pipe = <T, V>(
  ...args: readonly [
    (x: T) => any, // 1. The first function type
    ...any[], // 2. The middle function types
    (x: any) => V, // 3. The last function type
  ]
): ((x: T) => V) => {
  // The pipe return type, aka the composed function signature
  return (input: T) => args.reduce((val, fn) => fn(val), input);
};

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

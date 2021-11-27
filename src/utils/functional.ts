//------------------------------------------------------------------//
//                              CURRY                               //
//------------------------------------------------------------------//
export const curry = <T extends unknown[], U extends unknown[], R>(
  fn: (..._args: [...T, ...U]) => R,
  ...front: T
) => {
  return (...tailArgs: U) => fn(...front, ...tailArgs);
};

//------------------------------------------------------------------//
//                               HEAD                               //
//------------------------------------------------------------------//
export const head = <T extends readonly unknown[]>(
  val: T,
): T extends readonly [infer U, ...infer _] ? U : T[0] | undefined =>
  (val || [])[0] as any;

//------------------------------------------------------------------//
//                               TAIL                               //
//------------------------------------------------------------------//
export const tail = <T extends readonly unknown[]>(
  val: T,
): T extends readonly [infer _, ...infer U] ? U : T | undefined =>
  (val || []).slice(1) as any;

const x = tail([1, 2, 3, 'string']);
console.log('x', x);

//------------------------------------------------------------------//
//                             COMPOSE                              //
//------------------------------------------------------------------//
export const compose = <T, V>(
  ...args: readonly [
    (_x: T) => any, // 1. The first function type
    ...any[], // 2. The middle function types
    (_x: any) => V, // 3. The last function type
  ]
): ((_x: V) => T) => {
  // The compose return type, aka the composed function signature
  return (input: V) => args.reduceRight((val, fn) => fn(val), input);
};

//------------------------------------------------------------------//
//                               PIPE                               //
//------------------------------------------------------------------//
export const pipe = <T, V>(
  ...args: readonly [
    (_x: T) => any, // 1. The first function type
    ...any[], // 2. The middle function types
    (_x: any) => V, // 3. The last function type
  ]
): ((_x: T) => V) => {
  // The pipe return type, aka the composed function signature
  return (input: T) => args.reduce((val, fn) => fn(val), input);
};

//------------------------------------------------------------------//
//                              CONCAT                              //
//------------------------------------------------------------------//
export const concat = <T, U>(arr1: T[], arr2: U[]): (T | U)[] => {
  return [...arr1, ...arr2];
};

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

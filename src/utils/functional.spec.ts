import { compose, curry, pipe } from './functional';

describe('Functional code', () => {
  test('Test Curry', () => {
    const twoArgsFun = (a: number, b: number) => a + b;
    const toOneArgs = curry(twoArgsFun, 10);
    const res = toOneArgs(4);
    expect(res).toEqual(14);
  });

  test('Test Pipe', () => {
    const twoArgsFun = (a: number, b: number) => a + b;
    const to10 = curry(twoArgsFun, 10);
    const to20 = curry(twoArgsFun, 20);
    const calc = pipe(to10, to20);
    expect(calc(5)).toEqual(35);
  });

  test('Test Compose', () => {
    const twoArgsFun = (a: number, b: number) => a + b;
    const to10 = curry(twoArgsFun, 10);
    const to20 = curry(twoArgsFun, 20);
    const to40 = curry(twoArgsFun, 40);
    const to50 = curry(twoArgsFun, 50);
    const calc = compose(to10, to20, to40, to50);
    expect(calc(5)).toEqual(125);
  });

  test('Test Pipe & Compose', () => {
    const mul2 = (a: number) => a * 2;
    const sub3 = (a: number) => a - 3;
    const composed = compose(sub3, mul2);
    const piped = pipe(sub3, mul2);
    expect(composed(5)).toEqual(7);
    expect(piped(5)).toEqual(4);
  });
});

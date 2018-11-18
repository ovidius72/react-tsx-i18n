import cuid from 'cuid';

export const uuid = () => cuid();

export const objectToArray = async (keyedObject: { [key: string]: any }): Promise<any> => {
  return new Promise(resolve => {
    const keys = Object.keys(keyedObject);
    const res: any[] = keys.map(k => ({ ...keyedObject[k], __key: k }));
    resolve(res);
  });
};

export const capitalize = (str: string, lower: boolean = true) => {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase();
  });
};
export const removeEmptyArrayItem = (arr: any[]) => arr.filter(i => i);

export function debounce<F extends (args?: any) => any | void>(func: F, wait: number): F {
  let timeoutID: number;
  if (!Number.isInteger(wait)) {
    wait = 300;
  }
  // conversion through any necessary as it wont satisfy criteria otherwise
  return <F>(<any>function(this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    const context = this;

    timeoutID = window.setTimeout(() => {
      func.apply(context, args);
    }, wait);
  });
}

export const indexCycler = (len: number, initialValue: number = 0, zeroBase: boolean = false) => {
  let current = initialValue;
  const inc = zeroBase ? 0 : 1;
  const getCurrent = () => (current + inc) % len + inc;
  return {
    getCurrent,
    next: () => (current += 1) !== undefined && getCurrent(),
    previous: () => (current -= 1) !== undefined && getCurrent(),
    setCurrent: (value: number) => (current = value),
  };
};

export const funCycler = (len: number, baseZero = true) => {
  const inc = baseZero ? 0 : 1;
  return {
    decIndex: (index: number) => (index - 1 - inc + len) % len + inc,
    incIndex: (index: number) => (index + 1 - inc) % len + inc,
  };
};

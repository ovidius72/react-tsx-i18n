export const uuid = () => (1000 - 1 + 1) * Math.random();

export const objectToArray = async (keyedObject: {
  [key: string]: any;
}): Promise<any> => {
  return await new Promise(resolve => {
    const keys = Object.keys(keyedObject);
    const res: any[] = keys.map(k => ({ ...keyedObject[k], __key: k }));
    resolve(res);
  });
};

export const capitalize = (str: string, lower = true) => {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase();
  });
};
export const removeEmptyArrayItem = (arr: any[]) => arr.filter(i => i);

export const indexCycler = (
  len: number,
  initialValue = 0,
  zeroBase = false,
) => {
  let current = initialValue;
  const inc = zeroBase ? 0 : 1;
  const getCurrent = () => ((current + inc) % len) + inc;
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
    decIndex: (index: number) => ((index - 1 - inc + len) % len) + inc,
    incIndex: (index: number) => ((index + 1 - inc) % len) + inc,
  };
};

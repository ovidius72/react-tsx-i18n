import React, { ComponentProps, ComponentType } from 'react';

export const partiallyApplyComponent = <
  T extends ComponentType<any>,
  X extends ComponentProps<T>,
>(
  Component: T,
  initialProps: Partial<X>,
) => {
  // eslint-disable-next-line react/display-name
  return <Prop extends Exclude<keyof ComponentProps<T>, keyof X>>(p: Prop) => (
    <Component {...p} {...initialProps} />
  );
};

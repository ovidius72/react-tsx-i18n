import { FC, ReactNode } from 'react';

export type SuspenseTestProps = { children?: ReactNode };

const SuspenseTest: FC<SuspenseTestProps> = ({ children }) => {
  return (
    <div>
      SuspenseTest
      <div>{children}</div>
    </div>
  );
};

export { SuspenseTest };

import { Trans } from '@lingui/macro';
import React, { useState, VFC } from 'react';
import { Link } from 'react-router-dom';

export interface TestComponentProps {}

const TestComponent: VFC<TestComponentProps> = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>
        <Link is="div" to="/">
          Home
        </Link>
      </div>
      <button onClick={() => setCount(c => c + 1)}>
        <Trans>Increment</Trans>
      </button>
      <button onClick={() => setCount(c => c - 1)}>
        <Trans>Decrement</Trans>
      </button>
      <div>Test: {count}</div>
    </div>
  );
};

export default TestComponent;

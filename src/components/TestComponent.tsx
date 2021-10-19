import { Trans } from '@lingui/macro';
import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllPhotosQuery } from 'src/api/photosApi';

export interface TestComponentProps {}

const TestComponent: FC<TestComponentProps> = () => {
  const [count, setCount] = useState(0);
  const fetcher = useGetAllPhotosQuery(10, { pollingInterval: 2000 });
  console.log('fetcher', fetcher);
  return (
    <div>
      <div>
        <Link is="div" to="/">
          Go to Home
        </Link>
      </div>
      <div>is fething: {String(fetcher.isFetching)}</div>
      <div>is loading: {String(fetcher.isLoading)}</div>
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

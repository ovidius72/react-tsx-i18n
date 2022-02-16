// import { Trans } from '@lingui/macro';
// import { FC, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useGetAllPhotosQuery } from 'src/api/photosApi';

import { usePostSlice } from 'features/posts/usePostSlice';
import { useEffect } from 'react';

// export interface TestComponentProps {}

// const TestComponent: FC<TestComponentProps> = () => {
//   const [count, setCount] = useState(0);
//   const fetcher = useGetAllPhotosQuery(10, { pollingInterval: 2000 });
//   return (
//     <div>
//       <div>
//         <Link is="div" to="/">
//           Go to Home
//         </Link>
//       </div>
//       <div>Is fetching data ?: {String(fetcher.isFetching)}</div>
//       <div>Is Loading data ? : {String(fetcher.isLoading)}</div>
//       <button onClick={() => setCount(c => c + 1)}>
//         <Trans>Increment</Trans>
//       </button>
//       <button onClick={() => setCount(c => c - 1)}>
//         <Trans>Decrement</Trans>
//       </button>
//       <div>Test: {count}</div>
//     </div>
//   );
// };

const TestComponent = () => {
  const { loading, data, fetchAll } = usePostSlice();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      {data.map(d => (
        <div key={d.id}>{d.title}</div>
      ))}
    </div>
  );
};
export default TestComponent;

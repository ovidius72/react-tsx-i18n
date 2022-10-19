import { useLazyGetAllPostsQuery } from 'api/postsApi';
import { useEffect } from 'react';

const TestComponent = () => {
  const [fetchPosts, { isSuccess, data = [] }] = useLazyGetAllPostsQuery();
  console.log('*****: isSuccess', isSuccess);
  // const limit = useRef(10);
  // const skip = useRef(0);

  useEffect(() => {
    console.log('in useEffect');
    // fetchAll();
  }, []);

  const handleFetchRequest = () => {
    // const nextLimit = limit.current + 10;
    // const nextSkip = skip.current + 1;
    fetchPosts();
  };

  return (
    <div>
      <div>
        <button onClick={handleFetchRequest}>Load More</button>
      </div>
      <div>
        {data.map(d => (
          <div key={d.id}>{d.title}</div>
        ))}
      </div>
    </div>
  );
};
export default TestComponent;

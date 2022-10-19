import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FetchComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  console.log('*****: data', data);

  useEffect(() => {
    const controller = new AbortController();
    console.log('in UseEffect');
    setLoading(true);
    setError('');
    fetch('https://jsonplaceholder.typicode.com/todos', {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(setData)
      .catch(() => setError('error'))
      .finally(() => setLoading(false));

    return () => {
      console.log('in UseEffect Unmounting');
      // unmounting.
      controller.abort();
    };
  }, []);

  console.log('rendering');
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>Loading: {String(loading)}</div>
      <div>Error: {error}</div>
    </div>
  );
};
export default FetchComponent;

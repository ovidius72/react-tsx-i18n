import { useDispatch, useSelector } from 'react-redux';
import { incrementAction } from 'src/redux/counter/counter.actions';

const CounterPage = () => {
  const count = useSelector((state: any) => state.counter);
  console.log('DEBUGPRINT[1]: CounterPage.tsx:5: count=', count);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(incrementAction());
  };

  return (
    <div>
      <div>Counter: {count}</div>
      <div>
        <button onClick={increment}>Incrementa</button>
      </div>
    </div>
  );
};

export default CounterPage;

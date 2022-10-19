import { FormEvent, useEffect, useMemo, useState } from 'react';

const FormComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [count, setCount] = useState(0);
  // const [emailAndPassword, setEmailAndPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  const IncrementCounter = () => {
    setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    console.log('count', count);
  };

  // useEffect(() => {
  //   setEmailAndPassword(`${email} - ${password}`);
  // }, [email, password]);

  const mailAndPassword = useMemo(() => {
    let n = 0;
    console.log('in While Loop');
    while (n < 100000000) {
      n = n + 1;
    }
    return `${email} - ${password}`;
  }, [email, password]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const person = { name: 'jack', email: 'j@email.com' };
  // const person = 1;

  useEffect(() => {
    console.log('*****: person', person.name);
  }, [person.name]);

  // primitivi
  // - number, string, boolean, null, undefined, bigInt, Symbol
  //
  // objects
  // - functions, array, object, NaN, Date,
  //
  console.log('rendering');
  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Email</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div style={{ margin: '1rem 0' }}>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>Email And Password: {mailAndPassword}</div>
      <div>Count: {count}</div>
      <button onClick={IncrementCounter}>Increment Counter</button>
    </>
  );
};
export default FormComponent;

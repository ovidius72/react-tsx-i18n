import { ChangeEventHandler, useTransition, useState } from 'react';

const elements = Array.from({ length: 10000 }).map(
  (_, idx) => `element_${idx}`,
);

const filterElements = (filterText: string | undefined) => {
  return elements.filter(el => el.includes(filterText || ''));
};

const TransitionComponent = () => {
  const [text, setText] = useState('');
  const [pending, startTransition] = useTransition();
  const elements = filterElements(text);

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;
    startTransition(() => {
      setText(value);
    });
    setText(value);
  };

  return (
    <div>
      <input
        value={text}
        onChange={handleChange}
        placeholder="Start typing..."
      />
      <hgroup>Element List</hgroup>
      {pending && <div>Loaing...</div>}
      <ul>
        {elements.map(el => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
};
export default TransitionComponent;

import type { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

interface TodoInputProps {
  input: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function TodoInput({ input, onChange, onKeyDown, onClick }: TodoInputProps) {
  return (
    <>
      <input value={input} onChange={onChange} onKeyDown={onKeyDown} />
      <button onClick={onClick}>Добавить</button>
    </>
  );
}

export default TodoInput;

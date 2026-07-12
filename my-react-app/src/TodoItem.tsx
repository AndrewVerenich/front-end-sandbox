import type {MouseEventHandler} from 'react';
import {Task} from "./types/task.ts";

interface TodoItemProps {
  task: Task;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function TodoItem({task, onClick}: TodoItemProps) {
  return (
      <li>
        {task.text}
        <button onClick={onClick}>Удалить</button>
      </li>
  );
}

export default TodoItem;

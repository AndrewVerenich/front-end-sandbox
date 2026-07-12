import TodoItem from './TodoItem';
import {Task} from "./types/task.ts";

interface TodoListProps {
  tasks: Task[];
  onDelete: (index: number) => void;
}

function TodoList({ tasks, onDelete }: TodoListProps) {
  if (tasks.length === 0) {
    return <p>Задач пока нет</p>;
  }
  return (
    <ul>
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          onClick={() => onDelete(index)}
        />
      ))}
    </ul>
  );
}

export default TodoList;

import {type ChangeEvent, type KeyboardEvent, useState} from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import {Task} from "./types/task.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTask} from "./api/task.ts";

function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  const addTask = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  function handleAdd() {
    const text = input.trim();
    if (text === '') return;
    addTask.mutate(text, {
      onSuccess: (newTask) => {
        setTasks((prev) => [...prev, newTask]);
        setInput('');
      },
    });
  }

  function handleDelete(index: number) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
      <>
        <TodoInput
            input={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={handleAdd}
        />
        <TodoList tasks={tasks} onDelete={handleDelete}/>
      </>
  );
}

export default TodoApp;

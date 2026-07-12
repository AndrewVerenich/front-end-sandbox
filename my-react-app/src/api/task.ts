import type { Task } from '../types/task';

export async function createTask(text: string): Promise<Task> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: text }),
  });
  const data = await res.json();
  return { id: data.id, text, done: false };
}
import type { User } from '../types/user';

export function slowFilter(users: User[], query: string): User[] {
  console.log('slowFilter вызван');
  const start = performance.now();
  while (performance.now() - start < 100) {
    // имитация тяжёлой работы
  }
  if (!query.trim()) {
    return users;
  }
  return users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );
}

export default slowFilter;

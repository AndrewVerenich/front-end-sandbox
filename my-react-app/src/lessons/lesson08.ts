interface User {
  id: number;
  name: string;
}
function findUser(id: number): User | null {
  if (id === 1) {
    return { id: 1, name: 'Андрей' };
  }
  return null;
}
const user = findUser(1);
const missing = findUser(999);
if (user !== null) {
  console.log(user.name);
}
console.log(missing);
export {};
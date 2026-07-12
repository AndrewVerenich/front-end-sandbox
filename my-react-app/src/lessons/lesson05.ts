interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Андрей",
  email: "a@mail.com",
}

function printUser(user: User) {
  console.log(`${user.id}: ${user.name}`);
}
printUser(user);
export {};
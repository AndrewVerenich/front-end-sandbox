type Role = 'admin' | 'user';

interface Account {
  id: number;
  role: Role;
}

const account: Account = { id: 1, role: 'admin' };
console.log(account);
export {};
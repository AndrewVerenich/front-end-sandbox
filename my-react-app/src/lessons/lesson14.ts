interface User {
  id: number;
  name: string;
}

type UserState = { status: 'loading' } | { status: 'error', message: string } | { status: 'success', data: User[] };

function renderUsers(state: UserState): string {
  switch (state.status) {
    case 'loading':
      return 'Загрузка...';
    case 'error':
      return `Ошибка: ${state.message}`;
    case 'success':
      return state.data.map(u => u.name).join(', ');
  }
}


const loading: UserState = { status: 'loading' };
const success: UserState = {
  status: 'success',
  data: [{ id: 1, name: 'Андрей' }],
};

console.log(renderUsers(loading));
console.log(renderUsers(success));
export {};
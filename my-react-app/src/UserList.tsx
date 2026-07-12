import {Link} from 'react-router-dom';
import {useMemo, useState} from 'react';
import slowFilter from './utils/slowFilter';
import {useQuery} from "@tanstack/react-query";
import {User} from "./types/user.ts";

function UserList() {
  const [search, setSearch] = useState('');

  const {data: users, isLoading, error} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()),
    staleTime: 1000 * 60 * 5,
  });

  const filteredUsers = useMemo(() => {
    if (!users) {
      return [];
    }
    return slowFilter(users, search);
  }, [users, search]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error !== null) {
    return <p>Error {error.message}</p>;
  }

  return (
      <div>
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по имени..."
        />
        <ul>
          {filteredUsers.map((user) => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </li>
          ))}
        </ul>

        {filteredUsers.length === 0 && <p>Никого не найдено</p>}
      </div>
  );
}

export default UserList;

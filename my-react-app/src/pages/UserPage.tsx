import {Link, useParams} from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import {User} from "../types/user.ts";

function UserPage() {
  const {id} = useParams();
  const {data: user, isLoading, error} = useQuery<User>({
    queryKey: ['user', id],
    queryFn: () =>
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => res.json()),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>Пользователь не найден</p>;

  return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <Link to="/users">← Назад к списку</Link>
      </div>
  );
}

export default UserPage;

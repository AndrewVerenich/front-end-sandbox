import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-sky-400">
        Go home
      </Link>
    </div>
  );
}

export default NotFoundPage;

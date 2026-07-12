import TodoApp from './TodoApp';
import UserList from './UserList';
import HomePage from './pages/HomePage';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import UserPage from './pages/UserPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="todos" element={<TodoApp />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

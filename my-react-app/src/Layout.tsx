import { Link, Outlet } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

function Layout() {
  const { theme, toggleTheme } = useTheme();

  const styles = {
    background: theme === 'light' ? '#ffffff' : '#1a1a1a',
    color: theme === 'light' ? '#000000' : '#ffffff',
    minHeight: '100vh',
    padding: '16px',
  };

  return (
    <div style={styles}>
      <nav>
        <Link to="/">Главная</Link>{' | '}
        <Link to="/register">Регистрация</Link>{' | '}
        <Link to="/todos">Задачи</Link>{' | '}
        <Link to="/users">Пользователи</Link>{' | '}
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
        </button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;

import { useState, type FormEvent } from 'react';
import type { RegistrationErrors } from '../types/forms';

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors: RegistrationErrors = {};
    if (!email.includes('@')) {
      newErrors.email = 'Некорректный email';
    }
    if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не короче 6 символов';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('OK:', { email, password });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSuccess(true);
    }
  }

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSuccess(false);
            }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setSuccess(false);
            }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setSuccess(false);
            }}
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
          )}
        </div>
        <div>
          {success && (
            <p style={{ color: 'green' }}>Регистрация успешна!</p>
          )}
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default RegistrationPage;

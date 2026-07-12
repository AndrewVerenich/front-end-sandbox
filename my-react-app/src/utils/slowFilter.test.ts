import { describe, it, expect } from 'vitest';
import { slowFilter } from './slowFilter';
import type { User } from '../types/user';

const users: User[] = [
  { id: 1, name: 'Андрей', email: 'a@test.com' },
  { id: 2, name: 'Мария', email: 'm@test.com' },
];

describe('slowFilter', () => {
  it('возвращает всех при пустом запросе', () => {
    expect(slowFilter(users, '')).toHaveLength(2);
  });

  it('фильтрует по имени', () => {
    expect(slowFilter(users, 'анд')).toHaveLength(1);
    expect(slowFilter(users, 'анд')[0].name).toBe('Андрей');
  });

  it('фильтер по имени 2', () => {
    expect(slowFilter(users, 'Мария')).toHaveLength(1)
  })

  it('фильтер по имени 3', () => {
    expect(slowFilter([], 'Мария')).toHaveLength(0)
  })

  it('возвращает пустой массив, если никого нет', () => {
    expect(slowFilter(users, 'xyz')).toHaveLength(0);
  });
});
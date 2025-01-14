import { atomWithStorage } from 'jotai/utils';

export const usernameAtom = atomWithStorage('username', {
  name: 'John Doe',
  age: 30,
});

import { useAtom } from 'jotai';
import { usernameAtom } from '@/atoms/useUserAtom/atoms';

function useUserAtom() {
  const [useName, setUserName] = useAtom(usernameAtom);

  const updateUserName = () => {
    setUserName({
      ...useName,
      name: 'Kimberly',
    });
  };

  return {
    useName,
    updateUserName,
  };
}

export default useUserAtom;

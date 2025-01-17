import { useAtom } from 'jotai';
import { openAside as openAsideAtom } from './atoms';
import { useCallback } from 'react';

function useLayoutState() {
  const [openAside, setOpenAside] = useAtom(openAsideAtom);

  const toggleAside = useCallback((state: boolean) => {
    setOpenAside(state);
  }, []);

  return {
    openAside,
    toggleAside,
  };
}

export default useLayoutState;

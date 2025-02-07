import { useRouter as useNextRouter } from 'next/navigation';
import { useCallback } from 'react';

function useRouter() {
  const router = useNextRouter();

  const prefetchLink = useCallback((path: string) => {
    router.prefetch(path);
  }, []);

  return {
    prefetchLink,
  };
}

export default useRouter;

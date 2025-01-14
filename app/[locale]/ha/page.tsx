'use client';

import { useEffect, useRef } from 'react';
import useUserAtom from '@/atoms/useUserAtom/useUserAtom';

function Ha() {
  const countRef = useRef(0);
  const { updateUserName, useName } = useUserAtom();

  useEffect(() => {
    countRef.current = countRef.current + 1;
  });
  console.log(countRef.current);
  console.log(useName);

  return (
    <>
      <button onClick={updateUserName}>update username</button>
    </>
  );
}

export default Ha;

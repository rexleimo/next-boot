'use client';

import { useEffect, useRef } from 'react';
import useUserAtom from '@/atoms/useUserAtom/useUserAtom';
import { useSysConfig } from '@/atoms';
import { Link } from '@/i18n/routing';

function Ha() {
  const countRef = useRef(0);
  const { updateUserName, useName } = useUserAtom();
  const sysConfig = useSysConfig();
  console.log(sysConfig);

  useEffect(() => {
    countRef.current = countRef.current + 1;
  });
  console.log(countRef.current);
  console.log(useName);

  return (
    <>
      <button onClick={updateUserName}>update username</button>
      <Link href={'/chat'}>Go to Chat</Link>
    </>
  );
}

export default Ha;

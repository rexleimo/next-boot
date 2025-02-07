'use client';

import { useSysConfig } from '@/atoms';
import { Link } from '@/i18n/routing';

function Ha() {
  const sysConfig = useSysConfig();
  console.log(sysConfig);

  return (
    <>
      <Link href={'/chat'}>Go to Chat</Link>
    </>
  );
}

export default Ha;

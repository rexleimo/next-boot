import { CustomImage } from '@/components/CustomImage';
import { Button } from '@/components/Button';
import { use } from 'react';
import { apiClient, apiReq } from '@/packages';

export default function Home() {
  const response = use(apiClient(apiReq.store.getInventory()));
  console.log(response);

  return (
    <div>
      <CustomImage src={'/2.png'} alt={'2.png'} width={64} height={64} />
      {/*<CustomImage*/}
      {/*  src={*/}
      {/*    '/rexleimo/rex-imgs/refs/heads/wx/2025/01/03/1735918495196-7f7be66a-5ae8-4897-b27b-0e58a4c2a32c.png'*/}
      {/*  }*/}
      {/*  alt={''}*/}
      {/*  remote={'https://raw.githubusercontent.com'}*/}
      {/*  width={64}*/}
      {/*  height={64}*/}
      {/*/>*/}
      <Button />
    </div>
  );
}

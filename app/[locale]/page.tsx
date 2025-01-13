import { CustomImage } from '@/components/CustomImage';
import { use } from 'react';
import { apiClient, apiReq } from '@/packages';

export default function Home() {
  const response = use(apiClient(apiReq.store.getInventory()));
  console.log(response);

  return (
    <div>
      <CustomImage src={'/2.png'} alt={'2.png'} width={64} height={64} />
    </div>
  );
}

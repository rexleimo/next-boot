import { CustomImage } from '@/components/CustomImage';
import { Button } from '@/components/Button';

export default function Home() {

  return (
    <div>
      <CustomImage src={'/2.png'} alt={'2.png'} width={500} height={500} />
      <CustomImage
        src={
          '/rexleimo/rex-imgs/refs/heads/wx/2025/01/03/1735918495196-7f7be66a-5ae8-4897-b27b-0e58a4c2a32c.png'
        }
        alt={''}
        remote={'https://raw.githubusercontent.com'}
        width={500}
        height={500}
      />
      <Button />
    </div>
  );
}

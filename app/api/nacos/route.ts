import { getConfigs } from '@/packages/nacos';

export async function GET() {
  const config = await getConfigs('test', '1111');
  console.log(config)
}

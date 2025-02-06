import { NacosConfigClient } from 'nacos';

const nacosConfigClient = new NacosConfigClient({
  serverAddr: (process.env.NACOS_SERVER as string) || '127.0.0.1:8848',
  namespace: process.env.NACOS_NAMESPACE || 'public',
  username: process.env.NACOS_USERNAME || 'nacos',
  password: process.env.NACOS_PASSWORD || 'nacos',
});

export default nacosConfigClient;

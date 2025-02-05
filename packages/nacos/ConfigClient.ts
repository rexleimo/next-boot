import { NacosConfigClient } from 'nacos';

const nacosConfigClient = new NacosConfigClient({
  serverAddr: process.env.NACOS_SERVER as string,
  namespace: process.env.NACOS_NAMESPACE,
  // tenant: 'public',
  // accessKey: 'accessKey',
  // secretKey: 'secretKey',
  // timeout: 10000,
  // endpoint: 'endpoint',
  // endpointPort: 8080,
  // endpointProtocol: 'https',
  // endpointIAMPort: 8080
});

export default nacosConfigClient;

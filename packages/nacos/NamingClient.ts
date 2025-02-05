import { NacosNamingClient } from 'nacos';

const logger: typeof console = console;

const namingClient = new NacosNamingClient({
  logger: logger,
  serverList: process.env.NACOS_SERVER as string,
  namespace: process.env.NACOS_NAMESPACE,
});

export default namingClient;

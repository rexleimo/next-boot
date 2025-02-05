import namingClient from '@/packages/nacos/NamingClient';

async function getAllInstances(serviceName: string) {
  try {
    const instances = await namingClient.getAllInstances(serviceName);
    // 简单的负载均衡(随机选择一个实例)
    if (instances && instances.length > 0) {
      const randomIndex = Math.floor(Math.random() * instances.length);
      return instances[randomIndex];
    }
    return null;
  } catch (error) {
    console.error('Error fetching instances:', error);
    return null;
  }
}

export default getAllInstances;

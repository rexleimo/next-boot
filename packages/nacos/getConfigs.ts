import configClient from '@/packages/nacos/ConfigClient';

async function getConfigs(dataId: string, group: string) {
  try {
    const content = await configClient.getConfig(dataId, group);
    return JSON.parse(content);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default getConfigs;

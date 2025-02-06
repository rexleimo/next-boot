import configClient from '@/packages/nacos/ConfigClient';

async function getConfigs(dataId: string, group: string) {
  try {
    const content = await configClient.getConfig(dataId, group);
    return JSON.parse(content);
  } catch (error) {
    return Promise.reject(error);
  }
}

function subscribeConfig(
  dataId: string,
  group: string,
  callback: (content: string) => void
) {
  configClient.subscribe(
    {
      dataId: dataId,
      group: group,
    },
    callback
  );
}

function unsubscribeConfig(dataId: string, group: string) {
  configClient.unsubscribe(
    {
      dataId: dataId,
      group: group,
    },
    () => {}
  );
}

export default getConfigs;
export { subscribeConfig, unsubscribeConfig };

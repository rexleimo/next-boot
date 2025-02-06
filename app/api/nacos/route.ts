import { getConfigs, subscribeConfig } from '@/packages/nacos';
import { EventEmitter } from 'events';

// 全局事件分发器，用于分发配置更新消息
const configUpdateEmitter = new EventEmitter();

// 全局订阅 Nacos 配置，只订阅一次
subscribeConfig('TEST', 'DEFAULT_GROUP', content => {
  configUpdateEmitter.emit('configUpdate', content);
});

export async function GET() {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  };

  try {
    let isConnected = true;

    const stream = new ReadableStream({
      async start(controller) {



        // 安全地发送数据的函数
        const safeSend = (data: any) => {

          if (isConnected) {
            try {
              console.log('safeSend', data);
              controller.enqueue(data);
            } catch (error) {
              console.error('发送数据失败:', error);
              cleanup();
            }
          }
        };

        // 添加定期发送心跳保持连接
        const heartbeatInterval = setInterval(() => {
          safeSend(`data: ping\n\n`);
        }, 30000);

        // 当全局配置有更新时，通过 SSE 推送给当前客户端
        const onConfigUpdate = (content: any) => {
          safeSend(`data: ${JSON.stringify(content)}\n\n`);
        };

        // 清理函数
        const cleanup = () => {
          isConnected = false;
          clearInterval(heartbeatInterval);
          configUpdateEmitter.removeListener('configUpdate', onConfigUpdate);
        };

        // 注册全局配置更新事件
        configUpdateEmitter.on('configUpdate', onConfigUpdate);

        // 清除订阅
        return cleanup;
      },
    });

    return new Response(stream, { headers });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

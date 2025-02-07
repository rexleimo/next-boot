import { getConfigs, subscribeConfig } from '@/packages/nacos';
import { EventEmitter } from 'events';

// 全局事件分发器，用于分发配置更新消息
const configUpdateEmitter = new EventEmitter();

// 全局订阅 Nacos 配置，只订阅一次
subscribeConfig('TEST', 'DEFAULT_GROUP', content => {
  configUpdateEmitter.emit('configUpdate', content);
});

export async function GET(request: Request) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  };

  try {
    let isConnected = true;
    const abortController = new AbortController();
    request.signal.addEventListener('abort', () => {
      console.log('Request aborted by client');
      isConnected = false;
      abortController.abort();
    });

    const stream = new ReadableStream({
      async start(controller) {
        // 添加连接状态日志
        console.log('New SSE connection established');

        // 安全地发送数据的函数
        const safeSend = (data: any) => {
          if (!isConnected) {
            console.log('Connection is closed, not sending data');
            return;
          }

          try {
            // 确保数据格式符合 SSE 规范
            const formattedData = `data: ${JSON.stringify(data)}\n\n`;
            console.log('Attempting to send data:', formattedData);
            controller.enqueue(new TextEncoder().encode(formattedData));
          } catch (error: any) {
            console.error('Send data failed:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Connection status:', isConnected);
            cleanup();
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
          console.log(
            'Cleanup triggered. Previous connection status:',
            isConnected
          );
          isConnected = false;
          clearInterval(heartbeatInterval);
          configUpdateEmitter.removeListener('configUpdate', onConfigUpdate);
          try {
            controller.close();
          } catch (error) {
            console.log('Error closing stream:', error);
          }
        };

        // 注册全局配置更新事件
        configUpdateEmitter.on('configUpdate', onConfigUpdate);

        abortController.signal.addEventListener('abort', () => {
          cleanup();
        });

        const sysConfig = await getConfigs('TEST', 'DEFAULT_GROUP');
        safeSend(sysConfig);

        // 清除订阅
        return cleanup;
      },
      cancel() {
        console.log('Stream cancelled by client');
        isConnected = false;
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

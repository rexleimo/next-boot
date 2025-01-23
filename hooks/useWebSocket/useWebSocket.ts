'use client';

import { useEffect, useRef } from 'react';
import { FOLLOWER_CHANNEL, LocalStorage } from '@/hooks';
import { BroadcastChannel } from '@/packages';
import { MASTER_CHANNEL } from '@/hooks';

type Message = string | ArrayBufferLike | Blob | ArrayBufferView;

const WS_PING_TIME = 5 * 1000;

type WebSocketOptions = {
  wss: string;
  scenes: string;
};

function useWebSocket(options: WebSocketOptions) {
  const { wss, scenes } = options;

  const TAB_ID = useRef(Date.now()).current;
  console.log('Client Tab ID:', TAB_ID);
  const wsRef = useRef<WebSocket | null>(null);
  // 心跳计时器Ref
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
  // 心跳超时计时器
  const heartbeatTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // 消息队列Ref
  const messageQueueRef = useRef<Message[]>([]);

  // 主标签页的标识键
  const MASTER_KEY = `WEBSOCKET_CLIENT_${scenes.toUpperCase()}`;
  const masterChannel = new BroadcastChannel(`${screen}_${MASTER_CHANNEL}`);
  const followChannel = new BroadcastChannel(`${screen}_${FOLLOWER_CHANNEL}`);

  // 尝试成为主标签页
  function tryBecomeMaster(attempt = 1) {
    // 先获取当前的主标签页值
    const currentMaster = LocalStorage.getInstance().get(MASTER_KEY);

    if (!currentMaster) {
      LocalStorage.getInstance().set(MASTER_KEY, TAB_ID);

      // 等待一段时间以允许其他标签页更新
      setTimeout(() => {
        const confirmedMaster = LocalStorage.getInstance().get(MASTER_KEY);
        if (confirmedMaster === TAB_ID) {
          startWebSocket();
        } else {
          // 其他标签页成为主标签页，记录日志或执行备用逻辑
          console.log('另一标签页已成为主标签页。');
        }
      }, 100 * attempt); // 延迟根据尝试次数增加
    } else {
      // 可选：实现监听器或重试逻辑
      console.log(`主标签页已存在：${currentMaster}`);
    }
  }

  // 启动 WebSocket 连接
  function startWebSocket() {
    // 创建 WebSocket 实例
    wsRef.current = new WebSocket(wss);

    wsRef.current.onopen = function () {
      console.log('WebSocket 已连接');

      // 清理之前的心跳计时器，避免重复
      if (heartbeatTimerRef.current) {
        clearTimeout(heartbeatTimerRef.current);
      }
      if (heartbeatTimeoutRef.current) {
        clearTimeout(heartbeatTimeoutRef.current);
      }

      sendHeartbeat();
      followChannel.onMessage(event => {
        const data = event.data as Message;
        sendByWsMessage(data);
      });
    };

    wsRef.current.onmessage = function (event) {
      if (event.data === 'pong') {
        clearHeartbeatTimeout();
        heartbeatTimerRef.current = setTimeout(sendHeartbeat, WS_PING_TIME);
        heartbeatTimeoutRef.current = setTimeout(() => {
          console.log('WebSocket 连接已超时');
          wsRef.current?.close();
        }, WS_PING_TIME * 2);
      } else {
        masterChannel.postMessage(event.data);
      }
    };

    wsRef.current.onclose = function () {
      console.log('WebSocket 已关闭');
      // 如果主标签页关闭，尝试重新成为主标签页
      localStorage.removeItem(MASTER_KEY);
      // 清除计时器
      clearWebsocketTimeOut();
      tryBecomeMaster();
    };
  }

  // 清楚操作
  function clearWebsocketTimeOut() {
    clearHeartbeatTimer();
    clearHeartbeatTimeout();
  }

  function clearHeartbeatTimer() {
    if (heartbeatTimerRef.current) {
      clearTimeout(heartbeatTimerRef.current);
    }
  }

  function clearHeartbeatTimeout() {
    if (heartbeatTimeoutRef.current) {
      clearTimeout(heartbeatTimeoutRef.current);
    }
  }

  // 发送心跳
  function sendHeartbeat() {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send('ping');
    }
  }

  useEffect(() => {
    // 监听 storage 事件，检测主标签页的变化
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === MASTER_KEY) {
        if (!event.newValue) {
          tryBecomeMaster();
        }
      }
    };

    // 在页面卸载时，释放主标签页的标识
    const handleBeforeUnload = () => {
      if (LocalStorage.instance.get(MASTER_KEY) === TAB_ID) {
        LocalStorage.instance.remove(MASTER_KEY);
      }
    };

    // 监听 storage 事件，检测主标签页的变化
    window.addEventListener('storage', handleStorageChange);
    // 在页面卸载时，释放主标签页的标识
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      LocalStorage.getInstance().remove(MASTER_KEY);
      clearWebsocketTimeOut();
    };
  }, []);

  // 发送 WebSocket 消息
  function sendByWsMessage(message: Message) {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);

      // 如果messageQueueRef有值，消费取出第一条后继续发送
      while (messageQueueRef.current.length > 0) {
        const message = messageQueueRef.current.shift();
        if (message) {
          wsRef.current.send(message);
        }
      }
    } else {
      messageQueueRef.current.push(message);
    }
  }

  return {
    tryBecomeMaster,
  };
}

export default useWebSocket;

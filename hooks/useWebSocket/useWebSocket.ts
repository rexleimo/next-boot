'use client';

import { useEffect, useRef } from 'react';
import { FOLLOWER_CHANNEL, LocalStorage } from '@/hooks';
import { BroadcastChannel } from '@/packages';
import { MASTER_CHANNEL } from './channel';

type Message = string | ArrayBufferLike | Blob | ArrayBufferView;

const WS_PING_TIME = 5 * 1000;

function useWebSocket() {
  const TAB_ID = useRef(Date.now()).current;
  console.log('TAB_ID', TAB_ID);
  const wsRef = useRef<WebSocket | null>(null);
  // 心跳计时器Ref
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
  // 心跳超时计时器
  const heartbeatTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // 消息队列Ref
  const messageQueueRef = useRef<Message[]>([]);

  // 主标签页的标识键
  const MASTER_KEY = 'websocket_master';
  const broadcastChannel = new BroadcastChannel(MASTER_CHANNEL);
  const followChannel = new BroadcastChannel(FOLLOWER_CHANNEL);

  // 尝试成为主标签页
  function tryBecomeMaster() {
    // 先获取当前的主标签页值
    const currentMaster = LocalStorage.getInstance().get(MASTER_KEY);

    if (!currentMaster) {
      LocalStorage.getInstance().set(MASTER_KEY, TAB_ID);
      // 双重检查,确保真的成为了主标签页
      if (LocalStorage.getInstance().get(MASTER_KEY) === TAB_ID) {
        LocalStorage.getInstance().set(MASTER_KEY, TAB_ID);
        startWebSocket();
      }
    }
  }

  // 启动 WebSocket 连接
  function startWebSocket() {
    // 创建 WebSocket 实例
    wsRef.current = new WebSocket(
      'wss://off-api-7akmnzlfu420.kbtest193usgzmfhqoldhnv3719sjapu48amcpmrehal213.com/ws?token=8c6fa9fd-ea98-4ae5-85b9-32036dedd963'
    );

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
      console.log('收到消息:', event.data);
      broadcastChannel.postMessage(event.data);

      if (event.data === 'pong') {
        if (heartbeatTimeoutRef.current) {
          clearTimeout(heartbeatTimeoutRef.current);
        }
        heartbeatTimerRef.current = setTimeout(sendHeartbeat, WS_PING_TIME);
      }
    };

    wsRef.current.onclose = function () {
      console.log('WebSocket 已关闭');
      // 如果主标签页关闭，尝试重新成为主标签页
      localStorage.removeItem(MASTER_KEY);
      // 清除计时器
      if (heartbeatTimerRef.current) {
        clearTimeout(heartbeatTimerRef.current);
      }
      if (heartbeatTimeoutRef.current) {
        clearTimeout(heartbeatTimeoutRef.current);
      }
      tryBecomeMaster();
    };
  }

  // 发送心跳
  function sendHeartbeat() {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      heartbeatTimeoutRef.current = setTimeout(() => {
        console.log('WebSocket 连接已超时');
        wsRef.current?.close();
      }, WS_PING_TIME * 2);
      wsRef.current.send('ping');
    }
  }

  useEffect(() => {
    // 监听 storage 事件，检测主标签页的变化
    const handleStorageChange = (event: StorageEvent) => {
      console.log(event);
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

    tryBecomeMaster();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      LocalStorage.getInstance().remove(MASTER_KEY);
      clearTimeout(heartbeatTimerRef.current!);
      clearTimeout(heartbeatTimeoutRef.current!);
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

  function sendMessage(data: Message) {
    followChannel.postMessage(data);
  }

  return {
    sendMessage,
  };
}

export default useWebSocket;

'use client';

import { useEffect, useRef } from 'react';
import { LocalStorage } from '@/hooks';
import { BroadcastChannel } from '@/packages';

function useWebSocket() {
  const TAB_ID = useRef(Date.now()).current;

  const wsRef = useRef<WebSocket | null>(null);
  // 主标签页的标识键
  const MASTER_KEY = 'websocket_master';
  const broadcastChannel = new BroadcastChannel('MASTER_MESSAGE');

  // 尝试成为主标签页
  function tryBecomeMaster() {
    // 先获取当前的主标签页值
    const currentMaster = LocalStorage.getInstance().get(MASTER_KEY);

    if (!currentMaster) {
      LocalStorage.getInstance().set(MASTER_KEY, TAB_ID);
      // 双重检查,确保真的成为了主标签页
      if (LocalStorage.getInstance().get(MASTER_KEY) === TAB_ID.toString()) {
        LocalStorage.getInstance().set(MASTER_KEY, TAB_ID);
        startWebSocket();
      }
    }
  }

  // 启动 WebSocket 连接
  function startWebSocket() {
    // 创建 WebSocket 实例
    wsRef.current = new WebSocket('wss://your-websocket-url');

    wsRef.current.onopen = function () {
      console.log('WebSocket 已连接');
    };

    wsRef.current.onmessage = function (event) {
      console.log('收到消息:', event.data);
      broadcastChannel.postMessage(event.data);
    };

    wsRef.current.onclose = function () {
      console.log('WebSocket 已关闭');
      // 如果主标签页关闭，尝试重新成为主标签页
      // localStorage.removeItem(MASTER_KEY);
    };
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
      console.log(LocalStorage.instance.get(MASTER_KEY), TAB_ID);
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
    };
  }, []);
}

export default useWebSocket;

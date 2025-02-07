class EventSourceManager {
  private static instance: EventSourceManager;
  private eventSource: EventSource | null = null;
  private listeners: Set<(data: any) => void> = new Set();
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isConnecting: boolean = false;

  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;

  private constructor() {
    // 添加页面卸载事件监听
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        console.log('Page unloading, cleaning up EventSource');
        this.cleanup();
      });
    }
  }

  static getInstance() {
    if (!EventSourceManager.instance) {
      EventSourceManager.instance = new EventSourceManager();
    }
    return EventSourceManager.instance;
  }

  connect() {
    if (this.eventSource || this.isConnecting) return;

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn('Max reconnection attempts reached');
      return;
    }

    this.isConnecting = true;

    try {
      this.eventSource = new EventSource('/api/nacos');

      this.eventSource.onopen = () => {
        this.isConnecting = false;
        this.reconnectAttempts = 0; // 重置重连次数
      };

      this.eventSource.onmessage = event => {
        if (event.data === 'ping') return;
        const data = JSON.parse(event.data);
        this.listeners.forEach(listener => listener(data));
      };

      this.eventSource.onerror = () => {
        this.cleanup();
        this.reconnectAttempts++;

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectTimer = setTimeout(
            () => {
              this.connect();
            },
            5000 * Math.min(this.reconnectAttempts, 5)
          ); // 递增重连延迟
        }
      };
    } catch (error) {
      this.isConnecting = false;
    }
  }

  subscribe(listener: (data: any) => void) {
    this.listeners.add(listener);
    if (!this.eventSource && !this.isConnecting) {
      this.connect();
    }

    return () => {
      this.listeners.delete(listener);
    };
  }

  private cleanup() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.isConnecting = false;
  }
}

export const eventSourceManager = EventSourceManager.getInstance();

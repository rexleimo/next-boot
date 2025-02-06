class EventSourceManager {
  private static instance: EventSourceManager;
  private eventSource: EventSource | null = null;
  private listeners: Set<(data: any) => void> = new Set();
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isConnecting: boolean = false;

  private constructor() {}

  static getInstance() {
    if (!EventSourceManager.instance) {
      EventSourceManager.instance = new EventSourceManager();
    }
    return EventSourceManager.instance;
  }

  connect() {
    if (this.eventSource || this.isConnecting) return;

    this.isConnecting = true;
    this.eventSource = new EventSource('/api/nacos');

    this.eventSource.onmessage = event => {
      if (event.data === 'ping') return;
      const data = JSON.parse(event.data);
      this.listeners.forEach(listener => listener(data));
    };

    this.eventSource.onerror = () => {
      this.cleanup();
      // 重连逻辑
      this.reconnectTimer = setTimeout(() => {
        this.connect();
      }, 5000);
    };
  }

  subscribe(listener: (data: any) => void) {
    this.listeners.add(listener);
    if (!this.eventSource) {
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

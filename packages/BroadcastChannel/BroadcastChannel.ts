'use client';

class BroadcastChannelCustom {
  private channel: BroadcastChannel;
  private messageHandler: ((event: MessageEvent) => void) | null = null;

  constructor(channelName: string) {
    this.channel = new BroadcastChannel(channelName);
  }

  onMessage = (callback: (event: MessageEvent) => void) => {
    // 创建绑定的事件处理函数
    this.messageHandler = (event: MessageEvent) => {
      callback(event);
    };

    // 添加事件监听
    this.channel.addEventListener('message', this.messageHandler);
  };

  postMessage = (message: any) => {
    this.channel.postMessage(message);
  };

  close = () => {
    // 移除之前保存的事件处理函数
    if (this.messageHandler) {
      this.channel.removeEventListener('message', this.messageHandler);
      this.messageHandler = null;
    }
    this.channel.close();
  };
}

export default BroadcastChannelCustom;

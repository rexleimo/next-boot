'use client';

class BroadcastChannelCustom {
  private channel: BroadcastChannel;

  constructor(channelName: string) {
    this.channel = new BroadcastChannel(channelName);
  }

  onMessage = (callback: (event: MessageEvent) => void) => {
    this.channel.onmessage = callback;
  };

  postMessage = (message: any) => {
    this.channel.postMessage(message);
  };
}

export default BroadcastChannelCustom;

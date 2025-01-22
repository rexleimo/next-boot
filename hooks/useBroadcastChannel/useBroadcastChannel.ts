import { useEffect, useRef } from 'react';
import { BroadcastChannel } from '@/packages';

interface UseBroadcastChannelOptions<T> {
  channelName: string;
  onMessage?: (message: T) => void;
  errorHandler?: (error: Error) => void;
}

function useBroadcastChannel({
  channelName,
  onMessage,
}: UseBroadcastChannelOptions<any>) {
  const broadcastChannel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    broadcastChannel.current = new BroadcastChannel(channelName);

    broadcastChannel.current.onMessage(event => {
      onMessage?.(event.data);
    });

    return () => {
      broadcastChannel.current?.close();
    };
  }, []);

  const sendMessage = (message: any) => {
    broadcastChannel.current?.postMessage(message);
  };

  return {
    sendMessage,
  };
}

export default useBroadcastChannel;

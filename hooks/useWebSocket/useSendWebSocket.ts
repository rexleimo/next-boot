import { FOLLOWER_CHANNEL, MASTER_CHANNEL, useBroadcastChannel } from '@/hooks';

interface SendWebSocketOptions {
  scenes: string;
  onMessage: (event: any) => void;
}

function useSendWebSocket({ scenes, onMessage }: SendWebSocketOptions) {
  const { sendMessage } = useBroadcastChannel({
    channelName: `${scenes}_${FOLLOWER_CHANNEL}`,
  });

  useBroadcastChannel({
    channelName: `${scenes}_${MASTER_CHANNEL}`,
    onMessage,
  });

  return {
    sendMessage,
  };
}

export default useSendWebSocket;

import { FOLLOWER_CHANNEL, MASTER_CHANNEL, useBroadcastChannel } from '@/hooks';
import { useEffect } from 'react';

function useSendWebSocket({ onMessage }: { onMessage: (event: any) => void }) {
  const { sendMessage } = useBroadcastChannel({
    channelName: FOLLOWER_CHANNEL,
  });

  useBroadcastChannel({
    channelName: MASTER_CHANNEL,
    onMessage,
  });

  return {
    sendMessage,
  };
}

export default useSendWebSocket;

import { useEffect, useState } from 'react';
import { BroadcastChannel } from '@/packages';

function useBroadcastChannel(channelName: string) {
  const [message, setMessage] = useState();

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel(channelName);
    broadcastChannel.onMessage(event => {
      setMessage(event.data);
    });
  }, []);

  return {
    message,
  };
}

export default useBroadcastChannel;

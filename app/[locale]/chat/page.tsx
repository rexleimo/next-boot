'use client';

import { useState } from 'react';
import { useSendWebSocket } from '@/hooks';

function Chat() {
  const [message, setMessage] = useState('');
  const { sendMessage } = useSendWebSocket({
    scenes: 'chat',
    onMessage: event => {
      console.log('useSendWebSocket: ', event);
    },
  });

  const onMessage = () => {
    sendMessage(
      JSON.stringify([
        {
          Id: '000000000000000000000000',
          session_id: '',
          chat_id: '-1',
          uuid: '',
          user_id: '7f0670d3-f11c-4eac-b00d-c5f6c822008e-kk',
          message:
            '{"id":"SF00012342","status":1,"create_time":1737442162,"update_time":1737442162,"price":20}',
          message_type: 'order-card',
          created_at: 1737442162108,
          action: 2,
          temp_id: '',
        },
      ])
    );
  };

  return (
    <div>
      <input
        value={message}
        onChange={e => {
          setMessage(e.target.value);
        }}
      />
      <div onClick={() => onMessage()}>发送</div>
    </div>
  );
}

export default Chat;

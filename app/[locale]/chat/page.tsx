'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSendWebSocket, useWebWorker } from '@/hooks';
import { useIDB } from '@/atoms';

function Chat() {
  const [message, setMessage] = useState('');
  const { useUsers } = useIDB();
  const { add } = useUsers();

  const { sendMessage } = useSendWebSocket({
    scenes: 'chat',
    onMessage: event => {
      console.log('useSendWebSocket: ', event);
    },
  });

  const { execute, data, error } = useWebWorker('/workers/a.worker.js');

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
    add({ id: 1, name: 'John', email: 'john@example.com' }).catch(err =>
      console.error(err)
    );
  };

  const handleClick = () => {
    execute({
      type: 'test',
      payload: '你好',
    })
      .then(data => {
        console.log('webWorker postMessage', data);
      })
      .catch(error => {
        console.log('webWorker error', error);
      });
  };

  useEffect(() => {
    console.log('webWorker data', data);
  }, [data]);

  return (
    <div>
      <input
        value={message}
        onChange={e => {
          setMessage(e.target.value);
        }}
      />
      <div onClick={() => onMessage()}>发送</div>
      <div onClick={() => handleClick()}>Test Web WebWorker PostMessage</div>
    </div>
  );
}

export default Chat;

const that = self as SharedWorkerGlobalScope;

const posts: MessagePort[] = [];

const eventSource = new EventSource('/api/nacos');

self.onconnect = (event: MessageEvent) => {
  const port = event.ports[0];
  posts.push(port);
};

eventSource.onmessage = (event: MessageEvent) => {
  if (event.data === 'ping') return;

  const data = JSON.parse(event.data);
  posts.forEach(port => port.postMessage(data));
};


self.onmessage = (event: MessageEvent) => {
  try {
    self.postMessage({
      type: 'new',
      data: 'hello world',
    });
  } catch (error: any) {
    self.postMessage({ type: 'error', error: error.message });
  }
};

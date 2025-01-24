const workerConfig = {
  baseWorker: new Worker(new URL('@/workers/a.worker.ts', import.meta.url)),
};

export default workerConfig;

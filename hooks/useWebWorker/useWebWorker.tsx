import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  TaskQueue,
  WorkerMessage,
  WorkerResponse,
} from '@/hooks/useWebWorker/types';

type WorkerOptions<T, R> = {
  onMessage?: (result: R) => void;
  onError?: (error: Error) => void;
};

function useWebWorker<T = unknown, R = unknown>(
  worker: Worker,
  options?: WorkerOptions<T, R>
) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);
  const workerRef = useRef<Worker | null>(null);
  const taskQueueRef = useRef<TaskQueue[]>([]);

  useEffect(() => {
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const data = event.data;
      const { type, data: responseData, error: responseError } = data;

      if (responseError) {
        setError(new Error(responseError));
        const currentTask = taskQueueRef.current[0];
        if (currentTask) {
          currentTask.reject(responseError);
        }
      } else {
        setData(responseData);
        setError(null);
        const currentTask = taskQueueRef.current[0];
        if (currentTask) {
          currentTask.resolve(responseData);
        }
      }

      setIsLoading(false);
      taskQueueRef.current.shift();
      if (taskQueueRef.current.length > 0) {
        executeNextTask();
      }
    };

    worker.onerror = (error: ErrorEvent) => {
      setError(error.error);
      setIsLoading(false);
      const currentTask = taskQueueRef.current[0];
      if (currentTask) {
        currentTask.reject(error.error);
      }
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  // 终止 Worker
  const terminate = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setIsLoading(false);
  }, []);

  const executeNextTask = useCallback(() => {
    if (!workerRef.current || taskQueueRef.current.length === 0) return;

    const currentTask = taskQueueRef.current[0];
    setIsLoading(true);
    workerRef.current.postMessage(currentTask.message);
  }, []);

  // 发送消息
  const execute = useCallback(
    (message: WorkerMessage) => {
      return new Promise((resolve, reject) => {
        taskQueueRef.current.push({ message, resolve, reject });
        if (taskQueueRef.current.length === 1) {
          executeNextTask();
        }
      });
    },
    [executeNextTask]
  );

  return useMemo(
    () => ({
      terminate,
      execute,
      isLoading,
      error,
      data,
      worker: workerRef.current,
    }),
    [execute, terminate, isLoading, error, data]
  );
}

export default useWebWorker;

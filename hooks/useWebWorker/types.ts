export interface WorkerMessage {
  type: string;
  payload: any;
}

export interface WorkerResponse {
  type: string;
  data: any;
  error?: any;
}

export interface TaskQueue {
  message: WorkerMessage;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

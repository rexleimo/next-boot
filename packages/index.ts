import { ApiClient } from './ApiClient';
import { Api } from '@/apis/Api';
export * from './BroadcastChannel';

const apiClient = ApiClient();
const apiReq = new Api();
export { apiClient, apiReq };



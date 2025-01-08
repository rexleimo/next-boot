import { ApiClient } from './ApiClient';
import { Api } from '@/apis/Api';

const apiClient = ApiClient();
const apiReq = new Api();
export { apiClient, apiReq };

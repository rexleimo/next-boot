import { Api } from '@/apis/Api';

function ApiClient() {
  return new Api({
    headers: {},
  } as any);
}

export default ApiClient;

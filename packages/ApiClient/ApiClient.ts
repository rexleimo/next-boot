import { headers } from 'next/headers';

async function getAuthToken() {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('token');
  } else {
    const headersList = await headers();
    return headersList.get('Authorization');
  }
}

// 创建API包装函数
async function withAPI<T>(promise: Promise<Response>): Promise<T> {
  try {
    // 等待响应
    const response = await promise;

    // 处理HTTP错误
    if (!response.ok) {
    }

    // 解析JSON
    const data = await response.json();

    // 处理业务错误
    if (data.code !== 0) {
    }

    // 返回实际数据
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// 添加认证的包装函数
async function withAuth<T>(promise: Promise<Response>): Promise<T> {
  // 获取token
  const token = await getAuthToken();

  // 添加认证头
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  // 修改请求配置
  const newPromise = promise.then(response => {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers({
        ...Object.fromEntries(response.headers.entries()),
        ...Object.fromEntries(headers.entries()),
      }),
    });
  });

  return withAPI(newPromise);
}

function ApiClient() {
  return (promise: Promise<Response>) => {
    return withAuth(promise);
  };
}

export default ApiClient;

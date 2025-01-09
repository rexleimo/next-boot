前后端 api 管理必须基于 <font style="color:rgb(38, 38, 38);">swagger 进行，客户端会通过 swagger 进行 Ast 生成 Typescript 版本的 Fetch 调用接口。</font>

<font style="color:rgb(38, 38, 38);">通过以下命令进行构建生成api文件，生成Api文件目录为 /root/apis/Api.ts，该文件</font><font style="color:#DF2A3F;">不提交到Git代码仓</font><font style="color:rgb(38, 38, 38);">库。</font>

swagger 生成 对于 ts 代码前需要进行一些配置

```jsx
import { resolve } from 'path';
import { generateApi } from 'swagger-typescript-api';

// 环境变量，你想拉取那里的swagger api文案
const environments = {
  dev: {
    url: 'https://petstore.swagger.io/v2/swagger.json',
    output: './apis',
  },
};

const generateApiForEnv = async (env = 'dev') => {
  // ... code 

  // 不建议修改
};

(async function main() {
  await generateApiForEnv('dev');
})();

```

<font style="color:rgb(38, 38, 38);">构建 api 文件</font>

```bash
yarn api:build
```

## 如何使用
比如我在page的服务器组件中使用，需要使用apiClient AOC 一个 <font style="color:rgb(38, 38, 38);">swagger （apiReq）。</font>

```jsx
import { CustomImage } from '@/components/CustomImage';
import { Button } from '@/components/Button';
import { use } from 'react';
import { apiClient, apiReq } from '@/packages';

export default function Home() {
  const response = use(apiClient(apiReq.store.getInventory()));
  console.log(response);

  return (
    <div>
    </div>
  );
}
```

## 权限Auth认证
如果 api 请求时候需要做一些 统一认证操作，可以修改以下代码 getAuthToken 的代码

```jsx

async function getAuthToken() {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('token');
  } else {
    const headersList = await headers();
    return headersList.get('Authorization');
  }
}

```

##  统一 Response 处理
如果需要进行统一的响应处理，可以修改 withApi方法

```jsx
async function withAPI<T>(promise: Promise<Response>): Promise<T> {
  // 注意返回 Promise<Response>数据类型
}
```












































基于 Jest 的 终端运行代码。更多详情与使用方法请查阅 [https://www.jestjs.cn/](https://www.jestjs.cn/)，这个操作需要可选操作。不想经常重复某些操作的时候，可以写一个脚本来自动化...

## test.ts的创建
如果知识组件的功能测试建议与组件名叫放在一起

```jsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders a button', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

```

## 业务功能聚合
**__test__/page.test.tsx 类似这种文件目录中**

****


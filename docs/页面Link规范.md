在Next.js 如果需要对页面做页面调整，尽可能使用 Link 组件

> 由于存在国际化，这里统一使用 <font style="color:#DF2A3F;">@/i18n/routing </font>进行Link的处理会自动转换到对应的locale前缀
>

```jsx
import Link from '@/i18n/routing'
 
export default function Home() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

如果你需要带有searchParams参数建议使用以下写法

```jsx
import Link from '@/i18n/routing'
 
// Navigate to /[locale]/about?name=test
export default function Home() {
  return (
    <Link
      href={{
        pathname: '/about',
        query: { name: 'test' },
      }}
    >
      About
    </Link>
  )
}
```

如果你不想跳转的时候往 历史记录 中添加一条记录，我们可以使用 replace 属性

```jsx
import Link from '@/i18n/routing'
 
export default function Page() {
  return (
    <Link href="/about" replace>
      About us
    </Link>
  )
}
```


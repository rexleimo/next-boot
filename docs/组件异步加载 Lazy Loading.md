<font style="color:rgb(23, 23, 23);">Next.js 中的延迟加载通过减少呈现路由所需的 JavaScript 数量来帮助提高应用程序的初始加载性能。</font>

<font style="color:rgb(23, 23, 23);">它允许您延迟加载客户端组件和导入的库，并且仅在需要时将它们包含在客户端捆绑包中。例如，您可能希望延迟加载模态框，直到用户单击以打开它。</font>

<font style="color:rgb(23, 23, 23);"></font>

<font style="color:rgb(23, 23, 23);">有两种方法可以在 Next.js 中实现延迟加载：</font>

1. <font style="color:rgb(23, 23, 23);">将 Dynamic Imports 与 </font>`<font style="color:rgb(23, 23, 23);background-color:rgb(247, 247, 247);">next/dynamic</font>`<font style="color:rgb(23, 23, 23);">.</font>
2. <font style="color:rgb(23, 23, 23);">与 Suspense 一起使用</font>`<font style="color:rgb(23, 23, 23);background-color:rgb(247, 247, 247);">React.lazy()</font>`

<font style="color:rgb(23, 23, 23);">默认情况下，服务器组件会自动进行代码拆分，您可以使用流式将 UI 片段从服务器逐步发送到客户端。延迟加载适用于 Client 组件。</font>

<font style="color:rgb(23, 23, 23);">推荐用法：</font>

```jsx
import dynamic from 'next/dynamic'
 
const WithCustomLoading = dynamic(
  () => import('../components/WithCustomLoading'),
  {
    loading: () => <p>Loading...</p>,
  }
)
 
export default function Page() {
  return (
    <div>
      {/* The loading component will be rendered while  <WithCustomLoading/> is loading */}
      <WithCustomLoading />
    </div>
  )
}
```


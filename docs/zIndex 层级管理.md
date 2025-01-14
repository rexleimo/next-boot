+ 基础内容层: 1-10
+ 导航/header层: 11-20  
+ 下拉菜单层: 21-30
+ 弹窗层: 31-40
+ 全局提示/loading层: 41-50

<font style="color:rgb(38, 38, 38);">避免使用过大的z-index值。没必要用999这样的值,容易失控。</font>

<font style="color:rgb(38, 38, 38);">考虑堆叠上下文(stacking context)的影响。z-index不仅受数值影响,还受父元素的堆叠上下文影响。</font>

<font style="color:rgb(38, 38, 38);">模块化管理。每个功能模块在自己的范围内管理z-index,避免全局污染。</font>

<font style="color:rgb(38, 38, 38);"></font>

```jsx
:root {
  /* 基础内容层 1-10 */
  --z-content: 1;
  --z-card: 2;
  
  /* 导航层 11-20 */
  --z-header: 11;
  --z-nav: 12;
  
  /* 浮层 21-30 */
  --z-dropdown: 21;
  --z-tooltip: 22;
  --z-popover: 23;
  
  /* 弹窗层 31-40 */
  --z-modal: 31;
  --z-dialog: 32;
  
  /* 全局层 41-50 */
  --z-notification: 41;
  --z-loading: 42;
}
```

### <font style="color:rgb(38, 38, 38);">使用规范:</font>
+ <font style="color:rgb(38, 38, 38);">统一使用CSS变量,不直接写数值</font>
+ <font style="color:rgb(38, 38, 38);">新增层级需要先在文档中定义</font>
+ <font style="color:rgb(38, 38, 38);">每个组件只在自己对应的层级范围内使用</font>
+ <font style="color:rgb(38, 38, 38);">禁止使用超大数值(如999)</font>
+ <font style="color:rgb(38, 38, 38);">需要注意堆叠上下文的影响</font>

### <font style="color:rgb(38, 38, 38);">文档化要求:</font>
+ <font style="color:rgb(38, 38, 38);">维护z-index使用文档</font>
+ <font style="color:rgb(38, 38, 38);">记录每个层级的使用场景</font>
+ <font style="color:rgb(38, 38, 38);">标注特殊情况和注意事项</font>

### <font style="color:rgb(38, 38, 38);">开发建议:</font>
+ <font style="color:rgb(38, 38, 38);">优先使用相对定位,减少absolute定位</font>
+ <font style="color:rgb(38, 38, 38);">避免多层嵌套造成的z-index混乱</font>
+ <font style="color:rgb(38, 38, 38);">遇到层级问题先检查堆叠上下文</font>
+ <font style="color:rgb(38, 38, 38);">定期review确保规范执行</font>

<font style="color:rgb(38, 38, 38);">这样的管理方式可以让z-index更加可控和易维护,减少样式冲突的问题。</font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>

<font style="color:rgb(38, 38, 38);"></font>


<font style="color:rgb(38, 38, 38);background-color:#FFFFFF;">Tailwind CSS的栅格系统和传统的Bootstrap或者Ant Design有很大的不同。它提供了两种主要的布局方式：Flexbox和CSS Grid。这里主要关注Grid部分。 </font>

```jsx
<!-- 基础3列网格 -->
<div class="grid grid-cols-3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- 响应式网格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 在手机上1列, 平板2列, 桌面3列 -->
</div>
```

<font style="color:rgb(38, 38, 38);">在Tailwind中，要实现这套设备断点系统，应该这样使用：</font>

+ <font style="color:rgb(38, 38, 38);">移动端(Mobile): ≤767px</font>
+ <font style="color:rgb(38, 38, 38);">平板(Tablet): 768px-1023px</font>
+ <font style="color:rgb(38, 38, 38);">桌面(Desktop): 1024px-1439px</font>
+ <font style="color:rgb(38, 38, 38);">大屏(Large): ≥1440px</font>

#### <font style="color:rgb(38, 38, 38);">移动端 (≤767px)</font>
```jsx
/* 直接写基础样式，不需要断点前缀 */
<div class="w-full">
```

#### <font style="color:rgb(38, 38, 38);">平板 (768px-1023px)</font>
```jsx
/* md:开始，lg:改变 */
<div class="w-full md:w-1/2 lg:w-auto">
```

#### <font style="color:rgb(38, 38, 38);">桌面 (1024px-1439px)</font>
```jsx
/* lg:开始，xl:改变 */
<div class="w-full md:w-1/2 lg:w-1/3 xl:w-auto">
```

#### <font style="color:rgb(38, 38, 38);">大屏 (≥1440px)</font>
```jsx
/* xl:开始 */
<div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
```

<font style="color:rgb(38, 38, 38);">实际应用示例：</font>

```jsx
<!-- 响应式卡片布局 -->
<div class="grid
  grid-cols-1          /* 移动端：1列 */
  md:grid-cols-2      /* 平板：2列 */
  lg:grid-cols-3      /* 桌面：3列 */
  xl:grid-cols-4      /* 大屏：4列 */
">
  <div>卡片内容</div>
  <!-- ... -->
</div>

<!-- 响应式宽度控制 -->
<div class="
  w-full              /* 移动端：100%宽度 */
  md:w-[calc(50%-1rem)] /* 平板：约50%宽度 */
  lg:w-[calc(33.333%-1rem)] /* 桌面：约33.333%宽度 */
  xl:w-[calc(25%-1rem)]     /* 大屏：约25%宽度 */
">
```

<font style="color:rgb(38, 38, 38);">注意事项：</font>

1. <font style="color:rgb(38, 38, 38);">移动优先原则</font>
+ <font style="color:rgb(38, 38, 38);">始终从最小屏幕开始写起</font>
+ <font style="color:rgb(38, 38, 38);">默认样式就是移动端样式</font>
+ <font style="color:rgb(38, 38, 38);">随着屏幕变大逐步覆盖样式</font>
2. <font style="color:rgb(38, 38, 38);">断点使用技巧</font>
+ <font style="color:rgb(38, 38, 38);">使用md:控制平板样式</font>
+ <font style="color:rgb(38, 38, 38);">使用lg:控制桌面样式</font>
+ <font style="color:rgb(38, 38, 38);">使用xl:控制大屏样式</font>
3. <font style="color:rgb(38, 38, 38);">范围控制</font>
+ <font style="color:rgb(38, 38, 38);">要实现精确的范围控制，需要配合使用下一个断点</font>
+ <font style="color:rgb(38, 38, 38);">例如平板范围需要同时使用md:和lg:</font>

<font style="color:rgb(38, 38, 38);">  
</font>


---

category: frontend

tag: [HTML,CSS]

order: 1

excerpt: HTML+CSS基础

---
# :frog: HTML+CSS
## HTML
**H**yper **T**ext **M**arkup **L**anguage 超文本标记语言

html通过标签来标记要显示的网页中的各个部分。网页文件本身是一种文本文件，通过在文本文件中天价标记符，可以告诉浏览器如何显示其中的内容(文字如何处理...)

浏览器在读取html文件时，碰到`<h1>这是一段文字</h1>`，会用一级标题的格式(大小，粗体)的方式去显示`这是一段文字`.
### 组成
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```
这是一个html文件最基本的组成.`<!DOCTYPE html>`告诉浏览器这是html5，你需要使用html5规范来读取我
```html
<html lang="en"></html>
```
是文档开始标签，lang属性告诉浏览器是英文文档，`zh-cn`是中文

```html
<head></head>
```
是头标签，里面的内容是头信息
- `<meta>`定义一些元信息，编码，视口之类的
- `<title></title>`标题，显示在浏览器的网址的位置
```html
<body></body>
```
网页的主体部分

### 常见标签及属性
::: info
[学会翻阅文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
:::
## CSS
::: info
[看这里叭](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)
:::
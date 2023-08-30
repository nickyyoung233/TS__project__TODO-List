# TS**project**TODO-List

little demo using ts

## UI 设计图

assets/

## 技术选型

- 语言：TypeScript
- 打包构建工具： [webpack](https://webpack.js.org/guides/getting-started/)
- 服务器启动方式: [webpack-dev-serve](https://github.com/webpack/webpack-dev-server)
- CSS 样式工具: tailwind
<!-- - CSS样式工具: SCSS -->

## How to init

1. npm init --y create packge
2. npm install webpack webpack-cli webpack-dev-server --D
3. set `package.json` main removed & add `"private": true,`
4. create `webpack.config.js` to set `mode===development` configuration
5. add some scripts to `package.json` to run webpack-dev-server / webpack build..

## CSS 样式

❓@font-face 怎么用
❓ 怎么自定义字体

### 图片模糊亮度 采用 filter 属性

### `textarea` 可以禁止 🚫 使用 `resize`，限制尺寸

## 对于设置了初始类型 `HTMLElement` 的抽象类，继承后的元素类型是 `HTMLElement`，实际元素如果是 `HTMLInputElement`，则使用该类型对应的方法会报错，这时候使用泛型继承定义一个新的类型，该类型继承自 `HTMLElement`，并且使用泛型 `T` 限制该类型为 `HTMLInputElement`，这样就可以使用 `HTMLInputElement` 的方法了

```js
abstract class DOMTemplate<T extends HTMLElement>{
    //...
    element: T;
    //
    this.element = importNode.firstElementChild! as T;
}
//xx.js
class Button extends DOMTemplate<HTMLButtonElement>

```

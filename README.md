# @fischi20/chainawait

Chainawait is a plugin that allows you to chain await calls as follows:

```ts
const a = getUser().await.username.toUpperCase()
```

The above code will be transformed into:

```ts
const a = (await getUser()).username.toUpperCase()
```

This plugin will add the `.await` property to the Promise prototype.

### Why would you want to do this?
Comfort, readability, you are used to it from other languages, whatever really, I just like await as a postfix better than as a keyword
leading a thenable.

This plugin technically works with any thenable, you would just need to add the .await property in the type definition of that thenable and make it return the ReturnType of the thenable

```ts
// Normal thenable, any object with a then method can also be awaited
interface Thenable<T> {
  then: (onfulfilled: (value: T) => void) => void
}

// Awaited thenable, any object with a then method and a await property that returns the resolved value
interface AwaitedThenable<T> {
  then: (onfulfilled: (value: T) => void) => void
  await: T // type system only since it would get transformed by the plugin
}
```

### Tested
I tested the plugin with Vite, it should work with esbuild and rollup as well since that's what vite uses under the hood.
For the other bundlers, I didn't test it, but it should work since the plugin is based on unplugin.

## Install

```bash
npm i @fischi20/chainawait
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import chainawait from '@fischi20/chainawait/vite'

export default defineConfig({
  plugins: [
    chainawait(),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import chainawait from '@fischi20/chainawait/rollup'

export default {
  plugins: [
    chainawait(),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('@fischi20/chainawait/webpack')()
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['@fischi20/chainawait/nuxt'],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('@fischi20/chainawait/webpack')(),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import chainawait from '@fischi20/chainawait/esbuild'
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [chainawait()],
})
```

<br></details>

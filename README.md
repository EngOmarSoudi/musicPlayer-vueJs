# musicPlayer-VueJs

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Creating The Project

```sh
npm init vue@latest
no
no
yes *
```

## install extensions

Prettier - Code formatter v9.10.3 And
ESLint v2.2.6

## in side settings.json

"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
}

## Project Setup

```sh
npm install
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## validation

```sh
npm i vee-validate
npm install @vee-validate/rules
```
##firebase
```
npm i firebase@8
```

## create file name include and do the rules than go to auth page and do your compute functions there
every thin is not been played
### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

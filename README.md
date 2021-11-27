# React Starter Kit (WIP)
React + Typescript + Redux Toolkit + Lingui + Styled Components

## NEW SETUP: (WIP)

#### IN PROGRESS:
- funcional patterns 
- suspense, error boundary
- testing components (jest and react testing library)

#### TODO:
- clean up package.json (takes too much time to install)
- recoil
- testing hooks
- custom hooks
- storybook
- generic state types
- styled system components (Create common components). Maybe as a separate package.
- cli (features, components, test runner, ...)
- webvitals
- service worker

#### DONE
- review module aliases
- remove node-sass
- redux toolik createApi and rtkQuery DONE
- husky DONE
- lint staged DONE
- prettier DONE
- lint DONE

---
# deprecated.

### Webpack 4
3 pre-build configuration:
- local development (includes web-dev-server)
- DEV
- PRODUCTION

Many pre-configured loaders and optimizations:
- png, svg, jpg, gif images loaders.
- favicon generators for any kind of devices (android, iPhone, iPad and so on)
- fonts loader
- sass laoder with node-sass
- tree shacking
- code splitting
- css loader and minification
- Web Workers loaders (workerize-loader and worker-loader)
- source maps
- typescript linter
- Html Webpack Plugin
- Code optimization
- injectable environment variables for different environment (local, production and development)
- and more....

### Babel Preset Typescript
Type checking with `tsc` and compilation with babel-preset-typescript

---
### i18n (lingui)
Preconfigured to add multiple languages.

`npm run i18n:add [lang-code]`

`npm run i18n:add it en`

Just use the lingui tags `Trans`, `Plural` .... and the `i18n` to work with translations.

Run `npm run i18n:extract:clean` to generate translations.

Please refer to the lingui website for more detailed info https://lingui.js.org/tutorials/react.html

---
### Styles Components
Uses styled-components with `babel-macro`

---

### Testing
For testing Jest is configure to use typescript.

---

### Scripts
- `npm start` : run the local development server.
- `npm run build-prod`: build for production
- `npm run build-prod`: build for remote dev server
- `npm test` run jest tests
- `npm run test:watch` run jest in watch mode
- `npm run test:watchAll` run jest in watchAll mode
- `npm run i18n:extract:clean` extract translatable string form the code and generate a messages.json file for each enabled languages
- `npm run i18n:compile` compile the messages.json files in javascript code

### How to start
1. `npm install`
2. (optional) add one or more languages:  `npm run i18n:add en es fr it`
3. Start coding

#### Note:
The project is currently under development. It uses react next (currently 16.7.0-alpha.2).

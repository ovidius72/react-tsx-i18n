# React Starter Kit
React + Typescript + MST + i18n + Styled Components

### Webpack 4
3 pre-build configuration:
- local development (includes web-dev-server)
- DEV
- PRODUCTION
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
Type checking with tsc compiling with babel-preset-typescript

### i18n (lingui)
Preconfigured to add multiple languages. Just use the lingui tags `Trans`, `Plural` and the `i18n` props to handle translations.
Run `npm run i18n:extract:clean` to generate translations.

### Styles Components
Uses styled-components with `babel-macro`

### Jest
For testing Jest is configure to use typescript.

## SCRIPTS
`npm start` : run the local development server.
`npm run build-prod`: build for production
`npm run build-prod`: build for remote dev server
`npm test` run jest tests
`npm run test:watch` run jest in watch mode.
`npm run test:watchAll` run jest in watchAll mode.
`npm run i18n:extract:clean` extract translatable string form the code and generate a messages.json file for each enabled languages.
`npm run i18n:compile` compile the messages.json files in javascript code.

## HOW TO START
1. `npm install`
2. (optional) add one or more languages:  `npm run i18n:add en es fr it`
3. Start coding

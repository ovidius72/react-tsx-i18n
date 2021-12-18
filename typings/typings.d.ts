declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';

declare module 'package.json';

declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

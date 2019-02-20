declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

interface Window {
  initialReduxState: any;
}

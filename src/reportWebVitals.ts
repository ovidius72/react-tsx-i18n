import { ReportCallback } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportCallback) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFID(console.log);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getLCP(console.log);
      getTTFB(onPerfEntry);
      getTTFB(console.log);
    });
  }
};

export default reportWebVitals;

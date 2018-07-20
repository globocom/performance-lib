const navigation = {
  redirectCount: 0,
  type: 2,
};

const navigator = {
  appCodeName: 'Mozilla',
  appName: 'Netscape',
  appVersion: '5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
  language: 'pt-BR',
  connection: {
    downlink: 10,
    effectiveType: '4g',
    rtt: 0,
  },
  product: 'Gecko',
  serviceWorker: {
    controller: {
      state: 'activated',
      scriptUrl: 'https://example.org',
    },
  },
};

const timing = {
  connectEnd: 1526059510412,
  connectStart: 1526059510412,
  domComplete: 1526059520618,
  domContentLoadedEventEnd: 1526059512875,
  domContentLoadedEventStart: 1526059512868,
  domInteractive: 1526059512868,
  domLoading: 1526059511868,
  domainLookupEnd: 1526059510412,
  domainLookupStart: 1526059510412,
  fetchStart: 1526059510412,
  loadEventEnd: 1526059520622,
  loadEventStart: 1526059520619,
  navigationStart: 1526059510407,
  redirectEnd: 0,
  redirectStart: 0,
  requestStart: 1526059510487,
  responseEnd: 1526059511860,
  responseStart: 1526059510494,
  secureConnectionStart: 0,
  unloadEventEnd: 0,
  unloadEventStart: 0,
};

const window = {
  performance: {
    getEntriesByType: name => {
      const data = {
        paint: [
          { name: 'first-contentful-paint', startTime: 110 },
          { name: 'first-paint', startTime: 100 },
        ],
      };

      return data[name];
    },
    navigation,
    timing,
  },
};

export { navigator, window };

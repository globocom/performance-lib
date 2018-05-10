const toDate = (timestamp) => {
  if (!timestamp || timestamp <= 0) {
    return 0;
  }

  const date = new Date(timestamp);

  return `${date.toLocaleDateString('pt-BR')} - ${date.toLocaleTimeString('pt-BR')}`;
};

const toTime = (timestamp) => {
  if (timestamp === 0) {
    return timestamp;
  }

  if (timestamp > 1000) {
    return `${(timestamp / 1000).toFixed(2)}s`;
  }

  return `${Math.round(timestamp).toFixed(2)}ms`;
};

export default class PagePerformance {
  constructor() {
    this.connectionInfo = {
      downlink: null,
      effectiveType: null,
      roundtripTime: null,
      type: null,
    };
    this.navigation = window.performance.navigation;
    this.sw = {
      activated: false,
      scriptUrl: null,
    };
    this.timing = window.performance.timing;
  }

  appCacheTime() {
    return this.timing.domainLookupStart - this.timing.fetchStart;
  }

  browserTime() {
    return this.timing.loadEventEnd - this.timing.responseEnd;
  }

  connectionInfo(raw) {
    const connection = navigator.connection ||
      navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      this.connectionInfo.downlink = connection.downlink || 'Desconhecido';
      this.connectionInfo.effectiveType = connection.effectiveType || 'Desconhecido';
      this.connectionInfo.roundtripTime = (raw ? connection.rtt : toTime(connection.rtt)) || 'Desconhecido';
      this.connectionInfo.type = connection.type || 'Desconhecido';
    }

    return this.connectionInfo;
  }

  dnsTime() {
    return this.timing.domainLookupEnd - this.timing.domainLookupStart;
  }

  navigationType() {
    const { type } = this.navigation;
    const types = {
      0: 'Interação do usuário',
      1: 'Recarregamento da página',
      2: 'Movimentação pelo histórico (voltar ou avançar)',
    };

    if (type && Object.prototype.hasOwnProperty.call(types, type)) {
      return types[type];
    }

    return 'Tipo desconhecido';
  }

  networkLatency() {
    return this.timing.responseEnd - this.timing.fetchStart;
  }

  onLoadTime() {
    return this.timing.loadEventEnd - this.timing.loadEventStart;
  }

  paintTime(raw) {
    const times = {};

    window.performance.getEntriesByType('paint').forEach((performanceEntry) => {
      const time = this.timing.navigationStart + performanceEntry.startTime;

      times[performanceEntry.name] = {
        when: raw ? time : toDate(time),
      };
    });

    return times;
  }

  processingTime() {
    return this.timing.loadEventStart - this.timing.domLoading;
  }

  redirectCount() {
    return this.navigation.redirectCount;
  }

  redirectTime() {
    return this.timing.redirectEnd - this.timing.redirectStart;
  }

  requestTime() {
    return this.timing.responseStart - this.timing.requestStart;
  }

  responseTime() {
    return this.timing.responseEnd - this.timing.responseStart;
  }

  serviceWorkerInfo() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      this.sw.activated = navigator.serviceWorker.controller.state === 'activated';
      this.sw.scriptUrl = navigator.serviceWorker.controller.scriptUrl;
    }

    return this.sw;
  }

  tcpTime() {
    return this.timing.connectEnd - this.timing.connectStart;
  }

  totalTime() {
    return this.timing.loadEventEnd - this.timing.navigationStart;
  }

  toJSON() {
    const result = {
      AppCache: {
        start: toDate(this.timing.fetchStart),
        end: toDate(this.timing.domainLookupStart),
        duration: toTime(this.appCacheTime()),
      },
      Browser: {
        start: toDate(this.timing.responseEnd),
        end: toDate(this.timing.loadEventEnd),
        duration: toTime(this.browserTime()),
      },
      Connection: this.connectionInfo(false),
      DNS: {
        start: toDate(this.timing.domainLookupStart),
        end: toDate(this.timing.domainLookupEnd),
        duration: toTime(this.dnsTime()),
      },
      NavigationType: this.navigationType(),
      Navigator: {
        appCodeName: navigator.appCodeName,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        cookieEnabled: navigator.cookieEnabled,
        language: navigator.language,
        platform: navigator.platform,
        product: navigator.product,
        productSub: navigator.productSub,
        userAgent: navigator.userAgent,
        vendor: navigator.vendor,
      },
      OnLoad: {
        start: toDate(this.timing.loadEventStart),
        end: toDate(this.timing.loadEventEnd),
        duration: toTime(this.onLoadTime()),
      },
      Paint: this.paintTime(false),
      Processing: {
        start: toDate(this.timing.domLoading),
        end: toDate(this.timing.loadEventStart),
        duration: toTime(this.processingTime()),
      },
      Redirect: {
        start: toDate(this.timing.redirectStart),
        end: toDate(this.timing.redirectEnd),
        duration: toTime(this.redirectTime()),
        count: this.redirectCount(),
      },
      Request: {
        start: toDate(this.timing.requestStart),
        end: toDate(this.timing.responseStart),
        duration: toTime(this.requestTime()),
      },
      Response: {
        start: toDate(this.timing.responseStart),
        end: toDate(this.timing.responseEnd),
        duration: toTime(this.responseTime()),
      },
      ServiceWorker: this.serviceWorkerInfo(),
      TCP: {
        start: toDate(this.timing.connectStart),
        startSSL: toDate(this.timing.secureConnectionStart),
        end: toDate(this.timing.connectEnd),
        duration: toTime(this.tcpTime()),
      },
      Total: {
        start: toDate(this.timing.navigationStart),
        end: toDate(this.timing.loadEventEnd),
        duration: toTime(this.totalTime()),
        networkLatency: toTime(this.networkLatency()),
      },
    };

    return JSON.parse(result);
  }

  toJSONRaw() {
    const result = {
      AppCache: {
        start: this.timing.fetchStart,
        end: this.timing.domainLookupStart,
        duration: this.appCacheTime(),
      },
      Browser: {
        start: this.timing.responseEnd,
        end: this.timing.loadEventEnd,
        duration: this.browserTime(),
      },
      Connection: this.connectionInfo(true),
      DNS: {
        start: this.timing.domainLookupStart,
        end: this.timing.domainLookupEnd,
        duration: this.dnsTime(),
      },
      NavigationType: this.navigationType(),
      Navigator: {
        appCodeName: navigator.appCodeName,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        cookieEnabled: navigator.cookieEnabled,
        language: navigator.language,
        platform: navigator.platform,
        product: navigator.product,
        productSub: navigator.productSub,
        userAgent: navigator.userAgent,
        vendor: navigator.vendor,
      },
      OnLoad: {
        start: this.timing.loadEventStart,
        end: this.timing.loadEventEnd,
        duration: this.onLoadTime(),
      },
      Paint: this.paintTime(true),
      Processing: {
        start: this.timing.domLoading,
        end: this.timing.loadEventStart,
        duration: this.processingTime(),
      },
      Redirect: {
        start: this.timing.redirectStart,
        end: this.timing.redirectEnd,
        duration: this.redirectTime(),
        count: this.redirectCount(),
      },
      Request: {
        start: this.timing.requestStart,
        end: this.timing.responseStart,
        duration: this.requestTime(),
      },
      Response: {
        start: this.timing.responseStart,
        end: this.timing.responseEnd,
        duration: this.responseTime(),
      },
      ServiceWorker: this.serviceWorkerInfo(),
      TCP: {
        start: this.timing.connectStart,
        startSSL: this.timing.secureConnectionStart,
        end: this.timing.connectEnd,
        duration: this.tcpTime(),
      },
      Total: {
        start: this.timing.navigationStart,
        end: this.timing.loadEventEnd,
        duration: this.totalTime(),
        networkLatency: this.networkLatency(),
      },
    };

    return JSON.parse(result);
  }
}

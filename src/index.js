export default class PagePerformance {
  constructor() {
    this.navigation = window.performance.navigation;
    this.timing = window.performance.timing;
  }

  appCacheTime() {
    return this.timing.domainLookupStart - this.timing.fetchStart;
  }

  browserTime() {
    return this.timing.loadEventEnd - this.timing.responseEnd;
  }

  connectionInfo(raw) {
    let info = {};

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      info["downlink"] = connection.downlink || 'Desconhecido';
      info["effectiveType"] = connection.effectiveType || 'Desconhecido';
      info["RoundtripTime"] = (raw ? connection.rtt : this.toTime(connection.rtt)) || 'Desconhecido';
      info["type"] = connection.type || 'Desconhecido';
    }

    return info;
  }

  dnsTime() {
    return this.timing.domainLookupEnd - this.timing.domainLookupStart;
  }

  navigationType() {
    const type = this.navigation.type;
    const types = {
      0: 'Interação do usuário',
      1: 'Recarregamento da página',
      2: 'Movimentação pelo histórico (voltar ou avançar)'
    };

    if (type && types.hasOwnProperty(type)) {
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
    let times = {};

    window.performance.getEntriesByType('paint').forEach(performanceEntry => {
      const time = this.timing.navigationStart + performanceEntry.startTime;

      times[performanceEntry.name] = {
        "when": raw ? time : this.toDate(time),
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
    let sw = {
      "activated": false,
      "scriptUrl": null
    };

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      sw["activated"] = navigator.serviceWorker.controller.state === 'activated' ? true : false;
      sw["scriptUrl"] = navigator.serviceWorker.controller.scriptUrl;
    }

    return sw;
  }

  tcpTime() {
    return this.timing.connectEnd - this.timing.connectStart;
  }

  toDate(timestamp) {
    if (!timestamp || timestamp <= 0) {
      return 0;
    }

    const date = new Date(timestamp);

    return `${date.toLocaleDateString('pt-BR')} - ${date.toLocaleTimeString('pt-BR')}`;
  }

  toTime(timestamp) {
    if (timestamp === 0) {
      return timestamp;
    }

    if (timestamp > 1000) {
      return `${(timestamp / 1000).toFixed(2)}s`;
    }

    return `${Math.round(timestamp).toFixed(2)}ms`;
  }

  totalTime() {
    return this.timing.loadEventEnd - this.timing.navigationStart;
  }

  toJSON() {
    return {
      "AppCache": {
        "start": this.toDate(this.timing.fetchStart),
        "end": this.toDate(this.timing.domainLookupStart),
        "duration": this.toTime(this.appCacheTime())
      },
      "Browser": {
        "start": this.toDate(this.timing.responseEnd),
        "end": this.toDate(this.timing.loadEventEnd),
        "duration": this.toTime(this.browserTime())
      },
      "Connection": this.connectionInfo(false),
      "DNS": {
        "start": this.toDate(this.timing.domainLookupStart),
        "end": this.toDate(this.timing.domainLookupEnd),
        "duration": this.toTime(this.dnsTime())
      },
      "NavigationType": this.navigationType(),
      "Navigator": {
        "appCodeName": navigator.appCodeName,
        "appName": navigator.appName,
        "appVersion": navigator.appVersion,
        "cookieEnabled": navigator.cookieEnabled,
        "language": navigator.language,
        "platform": navigator.platform,
        "product": navigator.product,
        "productSub": navigator.productSub,
        "userAgent": navigator.userAgent,
        "vendor": navigator.vendor
      },
      "OnLoad": {
        "start": this.toDate(this.timing.loadEventStart),
        "end": this.toDate(this.timing.loadEventEnd),
        "duration": this.toTime(this.onLoadTime())
      },
      "Paint": this.paintTime(false),
      "Processing": {
        "start": this.toDate(this.timing.domLoading),
        "end": this.toDate(this.timing.loadEventStart),
        "duration": this.toTime(this.processingTime())
      },
      "Redirect": {
        "start": this.toDate(this.timing.redirectStart),
        "end": this.toDate(this.timing.redirectEnd),
        "duration": this.toTime(this.redirectTime()),
        "count": this.redirectCount()
      },
      "Request": {
        "start": this.toDate(this.timing.requestStart),
        "end": this.toDate(this.timing.responseStart),
        "duration": this.toTime(this.requestTime())
      },
      "Response": {
        "start": this.toDate(this.timing.responseStart),
        "end": this.toDate(this.timing.responseEnd),
        "duration": this.toTime(this.responseTime())
      },
      "ServiceWorker": this.serviceWorkerInfo(),
      "TCP": {
        "start": this.toDate(this.timing.connectStart),
        "startSSL": this.toDate(this.timing.secureConnectionStart),
        "end": this.toDate(this.timing.connectEnd),
        "duration": this.toTime(this.tcpTime())
      },
      "Total": {
        "start": this.toDate(this.timing.navigationStart),
        "end": this.toDate(this.timing.loadEventEnd),
        "duration": this.toTime(this.totalTime()),
        "networkLatency": this.toTime(this.networkLatency())
      }
    }
  }

  toJSONRaw() {
    return {
      "AppCache": {
        "start": this.timing.fetchStart,
        "end": this.timing.domainLookupStart,
        "duration": this.appCacheTime()
      },
      "Browser": {
        "start": this.timing.responseEnd,
        "end": this.timing.loadEventEnd,
        "duration": this.browserTime()
      },
      "Connection": this.connectionInfo(true),
      "DNS": {
        "start": this.timing.domainLookupStart,
        "end": this.timing.domainLookupEnd,
        "duration": this.dnsTime()
      },
      "NavigationType": this.navigationType(),
      "Navigator": {
        "appCodeName": navigator.appCodeName,
        "appName": navigator.appName,
        "appVersion": navigator.appVersion,
        "cookieEnabled": navigator.cookieEnabled,
        "language": navigator.language,
        "platform": navigator.platform,
        "product": navigator.product,
        "productSub": navigator.productSub,
        "userAgent": navigator.userAgent,
        "vendor": navigator.vendor
      },
      "OnLoad": {
        "start": this.timing.loadEventStart,
        "end": this.timing.loadEventEnd,
        "duration": this.onLoadTime()
      },
      "Paint": this.paintTime(true),
      "Processing": {
        "start": this.timing.domLoading,
        "end": this.timing.loadEventStart,
        "duration": this.processingTime()
      },
      "Redirect": {
        "start": this.timing.redirectStart,
        "end": this.timing.redirectEnd,
        "duration": this.redirectTime(),
        "count": this.redirectCount()
      },
      "Request": {
        "start": this.timing.requestStart,
        "end": this.timing.responseStart,
        "duration": this.requestTime()
      },
      "Response": {
        "start": this.timing.responseStart,
        "end": this.timing.responseEnd,
        "duration": this.responseTime()
      },
      "ServiceWorker": this.serviceWorkerInfo(),
      "TCP": {
        "start": this.timing.connectStart,
        "startSSL": this.timing.secureConnectionStart,
        "end": this.timing.connectEnd,
        "duration": this.tcpTime()
      },
      "Total": {
        "start": this.timing.navigationStart,
        "end": this.timing.loadEventEnd,
        "duration": this.totalTime(),
        "networkLatency": this.networkLatency()
      }
    }
  }
}

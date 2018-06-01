# Performance Lib [![Build Status](https://travis-ci.org/globocom/performance-lib.svg?branch=master)](https://travis-ci.org/globocom/performance-lib)

Esta biblioteca entrega um conjunto de dados de performance da página que foi carregada.

O resultado pode ser visto em JSON, e os dados que representam tempo ou data, podem ser
crus ou tratados.

Com os dados dessa biblioteca em mãos, você pode escolher enviá-los para algum serviço
de análise / coleta, tipo Google Analytics e similares, para que uma pessoa com perfil
de data science faça uma correlação e uma análise detalhada, gerando métricas de performance
da sua página.

Parte dos dados vai seguir o seguinte esquema de dados:
![processing-model](https://www.w3.org/TR/navigation-timing/timing-overview.png)

## Exemplo de Uso

```javascript
import PagePerformance from 'page-performance';

window.addEventListener("load", (event) => {
  setTimeout(() => {
    const perf = new PagePerformance();
    const raw = perf.toJSONRaw();
    const json = perf.toJSON();
  }, 0);
});
```

## Exemplo de Retorno

```json
{
  "AppCache":{
    "start":"2018-5-11 - 14:25:10",
    "end":"2018-5-11 - 14:25:10",
    "duration":0
  },
  "Browser":{
    "start":"2018-5-11 - 14:25:11",
    "end":"2018-5-11 - 14:25:20",
    "duration":"8.76s"
  },
  "Connection":{
    "downlink":10,
    "effectiveType":"4g",
    "roundtripTime":100,
    "type":"Desconhecido"
  },
  "DNS":{
    "start":"2018-5-11 - 14:25:10",
    "end":"2018-5-11 - 14:25:10",
    "duration":0
  },
  "NavigationType":"Movimentação pelo histórico (voltar ou avançar)",
  "Navigator":{
    "appCodeName":"Mozilla",
    "appName":"Netscape",
    "appVersion":"5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36",
    "language":"pt-BR",
    "product":"Gecko"
  },
  "OnLoad":{
    "start":"2018-5-11 - 14:25:20",
    "end":"2018-5-11 - 14:25:20",
    "duration":"3.00ms"
  },
  "Paint":{
    "first-contentful-paint":{
      "when":"2018-5-11 - 14:25:10"
    },
    "first-paint":{
      "when":"2018-5-11 - 14:25:10"
    }
  },
  "Processing":{
    "start":"2018-5-11 - 14:25:11",
    "end":"2018-5-11 - 14:25:20",
    "duration":"8.75s"
  },
  "Redirect":{
    "start":0,
    "end":0,
    "duration":0,
    "count":0
  },
  "Request":{
    "start":"2018-5-11 - 14:25:10",
    "end":"2018-5-11 - 14:25:10",
    "duration":"7.00ms"
  },
  "Response":{
    "start":"2018-5-11 - 14:25:10",
    "end":"2018-5-11 - 14:25:11",
    "duration":"1.37s"
  },
  "ServiceWorker":{
    "activated":true,
    "scriptUrl":"https://example.org"
  },
  "TCP":{
    "start":"2018-5-11 - 14:25:10",
    "startSSL":0,
    "end":"2018-5-11 - 14:25:10",
    "duration":0
  },
  "Total":{
    "start":"2018-5-11 - 14:25:10",
    "end":"2018-5-11 - 14:25:20",
    "duration":"10.21s",
    "networkLatency":"1.45s"
  }
}
```

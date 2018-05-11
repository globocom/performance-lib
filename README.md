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

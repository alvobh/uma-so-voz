Visão Geral
=====================

Bibliotecas utilizadas
--------------------

Para gestão de dependências, estamos utilizando:
*  [bower](http://bower.io/)
*  [npm](https://www.npmjs.org/)

Para arquitetura do app, estamos utilizando:
*  [ionic](http://ionicframework.com/)
*  [requirejs](http://requirejs.org/)
*  [sass](http://sass-lang.com/)

Que, por sua vez, se baseiam em:
*  [angular](https://angularjs.org/)
*  [phonegap](http://phonegap.com/)
*  [cordova](http://cordova.apache.org/)
*  [nodejs](http://nodejs.org/)

Organização do código
---------------------

Hoje, nosso código fica inteiro na pasta www: 

*  assets: css compilado (não edite, veja "styles" mais baixo), imagens, áudios e fontes
*  config: inicializacao de dependências, registro de plugins e extensões, declaração de rotas
*  controllers: controllers angular
*  libs: bibliotecas externas que não podem ser incluidas via bower, bibliotecas promovendo lógica auxiliar
*  services: services angular, responsáveis pela camada de Modelo do padrão MVC
*  styles: declaração de estilos via sass (edições css tem que ser feitas aqui)
*  templates: templates html angular, responsáveis pela camada de Visualização do padrão MVC 
*  vendor: bibliotecas externas, pasta gerida pelo bower - não inclusa no repositório


Quick Start
===========

Para instalar as dependências
---------------------

sudo npm install -g ionic cordova gulp

npm install

gulp install

Para testar no browser
---------------------

gulp watch

ionic serve

Para testar no celular
---------------------

ionic build android

ionic run android

Qualquer dúvida
---------------------

ionic --help

Cordova pluggins
---------------------
cordova plugin add org.apache.cordova.network-information


TO DO
=====================

https://trello.com/b/cYHqh4un/app-oracao


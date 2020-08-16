<div align="center">
<img src=".github/logo.svg" alt="icon" height="100">
</div>

<p>Ecoleta é um aplicativo que lhe ajuda enctronar o pontos de coleta de reciclagem mais próximos. É um projeto aberto desenvolvido durante a segunda edição do Next Level Week pela @Rocketseat</p>

<p align="center">
    <a href="README.md">English README</a>
</p>


<h3>WEB capturas de tela</h3>
<div align="center">
  <img src=".github/Homepage-web.png" alt="logo" height="425">
  <img src=".github/CreatePoint-1-web.PNG" alt="logo" height="425">
  <img src=".github/CreatePoint-2-web.PNG" alt="logo" height="425">
</div>

<h3>MOBILE capturas de tela</h3>
<div align="center">
  <img src=".github/Home-mobile.jpg" alt="logo" height="425">
  <img src=".github/Points-mobile.jpg" alt="logo" height="425">
  <img src=".github/Details-mobile.jpg" alt="logo" height="425">
</div>

## 📜 Sobre
Esse projeto ajuda pessoas encontrarem os lugares que realizam coleta de recicláveis mais próximos. Os pontos de coleta podem ser cadastrados no site adicionando suas informações, como
o contato e a localização. No aplicativo móvel, o usuário pode filtrar os Pontos de coleta no mapa por cidade e os tipos de itens coletados. Este repositório contém o código 
do frontend e da API do backend que serve tanto a aplicação web como a mobile.

## 💻 Tecnlogias
* [NodeJS](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/) 
* [Express](https://expressjs.com/) 
* [Knex.js](http://knexjs.org/)
* [React](https://reactjs.org/)   
* [React Native](https://reactnative.dev/) 
* [Expo](https://expo.io/)     
* [React-Native-Maps](https://github.com/react-native-community/react-native-maps)
* [React-Leaflet](https://react-leaflet.js.org/)
* [API Localidades-IBGE](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1)
 

## 🛠 Iniciando
Primeiramente, clone o repositório com ````git clone https://github.com/Gust4voSales/Ecoleta-NLW-1.git```` 
* #### Iniciando o backend
1. Rode ````npm install```` dentro da pasta server para instalar todas as dependências
2. Então ````npm run knex:migrate```` para rodar as migrations do banco de dados e criar as tabelas
3. Seguido de ````npm run knex:seed```` para realizar o seed do banco com os itens padrão
4. Finalmente ````npm run dev```` para rodar a API
5. Opcionalmente, <br/> <div align="center">[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Ecoleta%20-%20NLW%2301&uri=https%3A%2F%2Fraw.githubusercontent.com%2FGust4voSales%2FEcoleta-NLW-1%2Fmaster%2F.github%2FInsomnia_2020-08-16.json)</div>

* #### Iniciando o projeto web
1. Rode ````yarn```` dentro da pasta web para instalar todas as dependências
2. ````yarn start```` para rodar a aplicação WEB
* #### Iniciando o projeto mobile
1. Rode ````yarn```` dentro da pasta mobile para instalar todas as dependências
2. ````yarn start```` para rodar o app (é necessário o Expo na sua máquina) 
3. Mude o link do campo baseURL no arquivo: src/services/api.ts (Adicione o seu próprio endereço de IP, você pode verificar qual é no console do expo que abre no 
navegador quando inica a aplicação)

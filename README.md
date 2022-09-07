<p align="center"><img src="./docs/icon.svg" width="150"></p>

<p align="center">
    🚧 ... Em Construção ... 🚧
</p>

<p align="center">
    <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/caiogmrocha/study-platform-api" />
    <img alt="GitHub Repository Size" src="https://img.shields.io/github/repo-size/caiogmrocha/study-platform-api" />
    <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/caiogmrocha/study-platform-api" />
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/caiogmrocha/study-platform-api" />
    <img alt="GitHub License" src="https://img.shields.io/github/license/caiogmrocha/study-platform-api">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/caiogmrocha/study-platform-api?style=social">
</p>

# 💡 - Sobre o Projeto

**📖 Study Platform:** o projeto tem como objetivo fornecer dados para aplicações externas acessarem dados relacionados aos estudantes e professores cadastrados na plataforma.

# 🚧 - Arquitetura e Metodologias
O sistema foi desenvolvido atravéz do padrão [REST](https://pt.wikipedia.org/wiki/REST) de APIs com a aplicação dos princípios [SOLID](https://pt.wikipedia.org/wiki/SOLID) e da metodologia de desenvolvimento [TDD](https://pt.wikipedia.org/wiki/Test-driven_development).

A arquitetura da aplicação foi planejada e documentada no arquivo [ARCHITECTURE.md](./ARCHITECTURE.md).

# 🚀 - Setup do Ambiente de Desenvolvimento
Para configurar o ambiente de desenvolvimento você deverá seguir os passos abaixo.

Duplique o arquivo `.env.example`, remova o sufixo `.example` e o preencha com as informações relacionadas a banco de dados e a chave secreta para autenticação do JWT.

```env
# .env

DATABASE_URL="mysql://your_database_username:your_database_password@your_database_host:your_database_port/your_database_name"
JWT_SECRET=s3tarandomstr1ngw1thnumb3rsh3r3
```

Instale as dependências do sistema usando o comando `npm install`.

Após instalar as depêndencias do sistema você poderá executar o comando `npm run dev` e executar a aplicação em ambiente de desenvolvimento.

# 🧪 Setup do Ambiente de Testes

Para configurar o ambiente de testes você deverá seguir os passos abaixo.

Duplique o arquivo `.env.test.example`, remova o sufixo `.example` e o preencha com as informações relacionadas a banco de dados e a chave secreta para autenticação do JWT.

```env
DATABASE_USER=root
DATABASE_PASS=password
DATABASE_HOST=localhost
DATABASE_PORT=3306
```

Para executar os testes unitários você pode usar o comando `npm run test:unit`.

Para executar os testes de integração você pode usar o comando `npm run test:e2e`.

# ⭐ Setup do Ambiente de Produção

em breve...

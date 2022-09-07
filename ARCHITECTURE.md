# Estrutura de Pastas

```
project
├── /src # código da aplicação
│   ├── /core         # recursos fundamentais da aplicação
│   ├── /entities     # entidades da aplicação
│   ├── /modules      # casos de uso da aplicação
│   │   └── /any-module
│   │       ├── /errors
│   │       │   └── any-error.ts             # erros da camada de casos de uso
│   │       ├── /any-use-case.ts             # regra de negócio geral
│   │       ├── /any-use-case.spec.ts        # testes do usecase
│   │       ├── /any-controller.ts           # tratativas das requisições HTTP
│   │       ├── /any-controller.spec.ts      # testes do controller
│   │       └── /any-controller-factory.ts   # factory da instância do controller
│   ├── /repositories                        # regra de negócio do banco de dados
│   │   └── /any
│   │       ├── /i-any-repository.ts         # contrato do repositório
│   │       ├── /in-memory-any-repository.ts # repositório para testes
│   │       └── /any-repository.ts           # repositório real
│   ├── /routes # rotas da aplicação
│   ├── /validation                          # regras de validação de dados
│   │   ├── /errors                          # erros de validação
│   │   │   └── /any-error.ts
│   │   ├── /rules                           # erros de validação
│   │   │   └── /any-validation.ts
│   │   ├── /i-validation.ts                 # contrato do validador
│   │   └── /validation-compositor.ts        # compositor de validações
│   ├── /app.ts          # configurações do server HTTP (ou WS)
│   └── /main.ts         # inicialização da aplicação
├── /.editorconfig       # configurações do Editor Config
├── /.gitignore          # configurações do .gitignore
├── /.eslintrc.json      # configurações do ESLint
├── /jest.e2e-config.ts  # configurações do Jest para testes E2E
├── /jest.config.ts      # configurações do Jest para testes unitários
├── /tsconfig.json       # configurações do TS
├── /package.json        # configurações do NPM
├── /README.md           # guia da aplicação
├── /ARCHITECTURE.md     # arquitetura da aplicação
```

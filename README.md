<div align="center">
  <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS Logo" width="200"/>
  <h1>💰 Planejai - Backend</h1>
  <p><em>Backend da aplicação Planejai, um sistema de planejamento financeiro pessoal desenvolvido com NestJS.</em></p>
  <p>Permite gerenciamento completo de usuários, carteiras, categorias e lançamentos financeiros com segurança e escalabilidade.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT"/>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge" alt="Status"/>
    <img src="https://img.shields.io/badge/License-Privado-red?style=for-the-badge" alt="License"/>
  </p>
</div>

---

## 📋 Sobre o Projeto

Planejai é uma plataforma de planejamento financeiro pessoal que ajuda usuários a gerenciar suas finanças de forma intuitiva e segura. O backend fornece APIs robustas para autenticação, gerenciamento de dados financeiros e integração com serviços externos.

### ✨ Funcionalidades Principais

- 🔐 **Autenticação Segura**: Login/logout com JWT e renovação automática.
- 👤 **Gerenciamento de Usuários**: Cadastro, perfil e recuperação de senha.
- 💳 **Carteiras e Lançamentos**: Controle de receitas/despesas com filtros avançados.
- 📊 **Relatórios**: Saldos mensais e gastos categorizados.
- 📧 **Notificações**: Envio de emails para verificação e alertas.

---

## 🛠️ Tecnologias Utilizadas

<div align="center">

| Categoria          | Tecnologia                                                          | Descrição                             |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------- |
| **Framework**      | [NestJS](https://nestjs.com/)                                       | Framework Node.js escalável e modular |
| **Linguagem**      | [TypeScript](https://www.typescriptlang.org/)                       | Tipagem estática para código robusto  |
| **Banco de Dados** | [PostgreSQL](https://www.postgresql.org/)                           | RDBMS relacional com UUID e enums     |
| **ORM**            | [TypeORM](https://typeorm.io/)                                      | Mapeamento objeto-relacional          |
| **Autenticação**   | JWT + [Passport](https://www.passportjs.org/)                       | Tokens seguros via cookies HTTP-only  |
| **Rate Limiting**  | [@nestjs/throttler](https://docs.nestjs.com/security/rate-limiting) | Controle de taxa de requisições       |
| **Validação**      | [class-validator](https://github.com/typestack/class-validator)     | Validação automática de DTOs          |
| **Hashing**        | [bcrypt](https://www.npmjs.com/package/bcrypt)                      | Criptografia de senhas                |
| **Email**          | [Nodemailer](https://nodemailer.com/)                               | Envio via Gmail SMTP                  |
| **Testes**         | [Jest](https://jestjs.io/)                                          | Framework de testes unitários/e2e     |

</div>

---

## 🏗️ Arquitetura

O projeto adota **Domain-Driven Design (DDD)** e **CQRS** para uma arquitetura limpa e escalável.

### 📁 Estrutura de Diretórios

```
src/
├── 📂 modules/core/
│   ├── 📂 application/          # Camada de Aplicação (CQRS)
│   │   ├── 📂 usecases/         # Casos de Uso (Commands)
│   │   ├── 📂 queries/          # Consultas (Queries)
│   │   └── 📂 dtos/             # Data Transfer Objects
│   ├── 📂 controllers/          # Controladores HTTP
│   ├── 📂 domain/               # Domínio (Entidades, Regras)
│   │   ├── 📂 entities/         # Entidades de Domínio
│   │   ├── 📂 repositories/     # Interfaces de Repositório
│   │   └── 📂 services/         # Serviços de Domínio
│   └── 📂 infrastructure/       # Infraestrutura
│       ├── 📂 mappers/          # Mapeadores (Domain ↔ Infra)
│       ├── 📂 repositories/     # Implementações TypeORM
│       └── 📂 services/         # Serviços Externos (Email, Hash)
├── 📂 shared/
│   ├── 📂 infrastructure/       # Infra Compartilhada
│   │   ├── 📂 auth/             # JWT, Guards
│   │   └── 📂 database/         # Config DB
│   └── 📂 utils/                # Utilitários
├── 📂 migrations/               # Migrações TypeORM
├── 📂 config/                   # Configurações
├── 📂 common/                   # Filtros/Middlewares Globais
└── 📂 test/                     # Testes E2E
```

### 🏛️ Padrões Arquiteturais Implementados

O projeto adota uma combinação de **Clean Architecture**, **Domain-Driven Design (DDD)** e **padrões RESTful** para garantir modularidade, testabilidade e manutenibilidade.

#### 🧹 Clean Architecture

- **Separação de Camadas**:
  - **Entidades (Domain)**: Regras de negócio puras, independentes de frameworks.
  - **Casos de Uso (Application)**: Lógica de aplicação, orquestração de operações.
  - **Adaptadores (Infrastructure)**: Implementações concretas (DB, APIs externas).
  - **Frameworks/Drivers**: Camada externa (NestJS, TypeORM).
- **Princípio da Dependência**: Camadas internas não dependem de externas; inversão via interfaces.
- **Benefícios**: Facilita testes unitários, troca de tecnologias e isolamento de mudanças.

#### 🎯 Domain-Driven Design (DDD)

- **Entidades e Value Objects**: Modelos ricos com comportamento (ex.: `Usuario`, `Lancamento`).
- **Agregados**: Grupos consistentes (ex.: `Carteira` como raiz de agregado com lançamentos).
- **Repositórios**: Abstrações para persistência, implementadas via TypeORM.
- **Serviços de Domínio**: Lógica complexa não pertencente a entidades.
- **Bounded Contexts**: Separação clara entre módulos (auth, core).

#### 🔄 CQRS (Command Query Responsibility Segregation)

- **Commands**: Operações de escrita (ex.: `AdicionarLancamentoUseCase`) – alteram estado.
- **Queries**: Operações de leitura (ex.: `BuscarLancamentosQuery`) – não alteram estado.
- **Separação**: Modelos diferentes para otimização (ex.: queries com joins, commands validados).
- **Benefícios**: Performance em leituras, consistência em escritas, escalabilidade.

#### 🌐 Padrões RESTful

- **Recursos e URIs**: Endpoints representam recursos (ex.: `/usuario`, `/carteira/:id/lancamentos`).
- **Verbos HTTP**:
  - `GET` para leitura.
  - `POST` para criação.
  - `PUT` para atualização completa.
  - `DELETE` para remoção.
- **Códigos de Status**: Padrão HTTP (200 OK, 401 Unauthorized, 429 Too Many Requests).
- **HATEOAS**: Links contextuais em respostas (futuro: incluir `_links`).
- **Versionamento**: Via URL (ex.: `/v1/auth/login` – preparado para evolução).
- **Benefícios**: API previsível, cacheável e escalável.

### 🔄 Fluxo de Dados

```mermaid
graph TD
    A[Cliente] --> B[Controller]
    B --> C[Guards: Auth + Throttle]
    C --> D[DTO Validation]
    D --> E[UseCase/Query]
    E --> F[Domain Entities]
    F --> G[Repository Interface]
    G --> H[TypeORM Repository]
    H --> I[(PostgreSQL)]
    I --> J[Response DTO]
    J --> A
```

### 🏛️ Padrões Arquiteturais

Ver seção [Padrões Arquiteturais Implementados](#-padrões-arquiteturais-implementados) para detalhes técnicos.

- **Clean Architecture**: Separação em camadas independentes.
- **DDD**: Modelagem focada no domínio.
- **RESTful**: API seguindo princípios REST.
- **CQRS**: Separação de leitura/escrita.
- **Dependency Injection**: Via NestJS.
- **SOLID**: Princípios orientados a objetos.

---

## 🚀 Instalação e Configuração

### 📋 Pré-requisitos

- 🟢 Node.js 18+
- 🐘 PostgreSQL 13+
- 📦 npm ou yarn

### ⚙️ Passos de Instalação

1. **Clone o repositório**:

   ```bash
   git clone <repo-url>
   cd planejai/back-end
   ```

2. **Instale dependências**:

   ```bash
   npm install
   ```

3. **Configure variáveis de ambiente**:
   Copie `.env.example` para `.env`:

   ```env
   PORT=3000
   CORS_ORIGIN=http://localhost:5173
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=<chave-secreta-forte>
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=planejai
   DB_USER=postgres
   DB_PASSWORD=<senha-db>
   DATABASE_URL=postgresql://postgres:<senha>@localhost:5432/planejai?schema=public
   GMAIL_USER=<email@gmail.com>
   GMAIL_PASS=<app-password>
   ```

4. **Configure o banco**:

   - Crie o banco PostgreSQL.
   - Execute migrações:
     ```bash
     npm run migration:run
     ```

5. **Execute a aplicação**:

   ```bash
   # Desenvolvimento
   npm run start:dev

   # Produção
   npm run build
   npm run start:prod
   ```

---

## 📖 Uso

### 🌐 Endpoints Principais (API REST)

<div align="center">

| Método   | Endpoint                       | Descrição            | Autenticação |
| -------- | ------------------------------ | -------------------- | ------------ |
| `POST`   | `/auth/login`                  | Login do usuário     | ❌           |
| `POST`   | `/auth/logout`                 | Logout               | ✅           |
| `GET`    | `/auth/validate`               | Validar token        | ✅           |
| `POST`   | `/usuario`                     | Criar usuário        | ❌           |
| `GET`    | `/usuario`                     | Buscar perfil        | ✅           |
| `PUT`    | `/usuario`                     | Atualizar perfil     | ✅           |
| `DELETE` | `/usuario`                     | Deletar conta        | ✅           |
| `GET`    | `/carteira/:id/saldo`          | Saldo mensal         | ✅           |
| `GET`    | `/carteira/:id/lancamentos`    | Listar lançamentos   | ✅           |
| `POST`   | `/carteira/:id/lancamento`     | Adicionar lançamento | ✅           |
| `PUT`    | `/carteira/:id/lancamento/:id` | Atualizar lançamento | ✅           |
| `DELETE` | `/carteira/:id/lancamento/:id` | Deletar lançamento   | ✅           |
| `GET`    | `/categoria`                   | Listar categorias    | ✅           |
| `GET`    | `/categoria/:id`               | Buscar categoria     | ✅           |

</div>

> 💡 Todos os endpoints protegidos requerem cookie `access_token` válido.

### 🧪 Testes

```bash
# Unitários
npm run test

# E2E
npm run test:e2e

# Cobertura
npm run test:cov
```

---

## 🗄️ Banco de Dados

### 📊 Schema Principal

```sql
-- Usuários
usuarios (id UUID, nome VARCHAR, email VARCHAR UNIQUE, senha VARCHAR, telefone VARCHAR, avatar VARCHAR, criado_em TIMESTAMP)

-- Carteiras
carteiras (id UUID, usuario_id UUID FK, criado_em TIMESTAMP)

-- Categorias
categorias (id SERIAL, nome VARCHAR UNIQUE, tipo ENUM('entrada','saida','ambos'))

-- Lançamentos
lancamentos (id SERIAL, carteira_id UUID FK, categoria_id INT FK, titulo VARCHAR, descricao VARCHAR, valor DECIMAL, data DATE, tipo ENUM, criado_em TIMESTAMP)

-- Saldos Mensais
saldos_mensais (id SERIAL, carteira_id UUID FK, mes INT, ano INT, saldo_mes DECIMAL, criado_em TIMESTAMP)
```

### 🔄 Migrações

Gerenciadas por TypeORM.

```bash
# Gerar nova migração
npm run typeorm -- migration:generate src/migrations/NomeMigracao -d src/config/database.config.ts

# Executar migrações
npm run migration:run
```

---

## 🔒 Segurança

- ✅ **Autenticação JWT**: Via cookies HTTP-only com renovação automática.
- ✅ **Rate Limiting**: 3 requisições/min por IP.
- ✅ **Validação**: DTOs sanitizados com class-validator.
- ✅ **HTTPS Recomendado**: Cookies seguros em produção.
- ⚠️ **Credenciais Seguras**: Nunca commite `.env`; use variáveis de ambiente.

---

## 🛠️ Desenvolvimento

### 📜 Scripts Disponíveis

<div align="center">

| Comando                      | Descrição                           |
| ---------------------------- | ----------------------------------- |
| `npm run start:dev`          | Modo desenvolvimento com hot-reload |
| `npm run build`              | Compilação para produção            |
| `npm run start:prod`         | Executar em produção                |
| `npm run test`               | Testes unitários                    |
| `npm run test:e2e`           | Testes E2E                          |
| `npm run lint`               | Verificação de código               |
| `npm run migration:generate` | Gerar migração                      |
| `npm run migration:run`      | Executar migrações                  |

</div>

### 🤝 Contribuição

1. Fork o projeto.
2. Crie uma branch (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

### 📄 Licença

Este projeto é privado. Contate o proprietário para permissões.

---

<div align="center">
  <p>Feito com ❤️ usando NestJS</p>
  <p>
    <a href="#planejai---backend">Voltar ao topo</a>
  </p>
</div>

O projeto segue princípios de **Domain-Driven Design (DDD)** e **CQRS (Command Query Responsibility Segregation)**, organizados em camadas:

### Estrutura de Diretórios

```
src/
├── modules/core/
│   ├── application/          # Camada de Aplicação (CQRS)
│   │   ├── usecases/         # Casos de Uso (Commands)
│   │   ├── queries/          # Consultas (Queries)
│   │   └── dtos/             # Data Transfer Objects
│   ├── controllers/          # Controladores HTTP
│   ├── domain/               # Domínio (Entidades, Regras de Negócio)
│   │   ├── entities/         # Entidades de Domínio
│   │   ├── repositories/     # Interfaces de Repositório
│   │   └── services/         # Serviços de Domínio
│   └── infrastructure/       # Camada de Infraestrutura
│       ├── mappers/          # Mapeadores (Domain ↔ Infra)
│       ├── repositories/     # Implementações de Repositório
│       └── services/         # Serviços Externos (Email, Hash)
├── shared/
│   ├── infrastructure/       # Infraestrutura Compartilhada
│   │   ├── auth/             # Autenticação (JWT, Guards)
│   │   └── database/         # Configuração do DB
│   └── utils/                # Utilitários Compartilhados
├── migrations/               # Migrações TypeORM
├── config/                   # Configurações (DB, etc.)
├── common/                   # Filtros e Middlewares Globais
└── test/                     # Testes E2E
```

### Padrões Arquiteturais

- **DDD**: Separação clara entre domínio (regras de negócio) e infraestrutura (detalhes técnicos).
- **CQRS**: Commands (operações de escrita) separados de Queries (leituras), melhorando performance e escalabilidade.
- **Dependency Injection**: Injeção de dependências via NestJS para desacoplamento.
- **SOLID**: Princípios aplicados em entidades, serviços e controladores.

### Fluxo de Dados

1. **Requisição HTTP** → Controller
2. **Validação** → DTOs com class-validator
3. **Autenticação/Autorização** → Guards (JwtAuthGuard, ThrottlerGuard)
4. **Execução** → UseCase/Query (Application Layer)
5. **Domínio** → Entidades e Regras de Negócio
6. **Infraestrutura** → Repositórios (TypeORM) → Banco de Dados
7. **Resposta** → Mapeamento para DTOs → Cliente

## Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- PostgreSQL 13+
- npm ou yarn

### Passos

1. **Clone o repositório**:

   ```bash
   git clone <repo-url>
   cd planejai/back-end
   ```

2. **Instale dependências**:

   ```bash
   npm install
   ```

3. **Configure variáveis de ambiente**:
   Copie `.env.example` para `.env` e ajuste:

   ```env
   PORT=3000
   CORS_ORIGIN=http://localhost:5173
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=<chave-secreta-forte>
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=planejai
   DB_USER=postgres
   DB_PASSWORD=<senha-db>
   DATABASE_URL=postgresql://postgres:<senha>@localhost:5432/planejai?schema=public
   GMAIL_USER=<email@gmail.com>
   GMAIL_PASS=<app-password>
   ```

4. **Configure o banco**:

   - Crie o banco PostgreSQL.
   - Execute migrações:
     ```bash
     npm run migration:run
     ```

5. **Execute a aplicação**:

   ```bash
   # Desenvolvimento
   npm run start:dev

   # Produção
   npm run build
   npm run start:prod
   ```

## Uso

### Endpoints Principais (API REST)

- **Autenticação**:

  - `POST /auth/login` - Login
  - `POST /auth/logout` - Logout
  - `GET /auth/validate` - Validar token

- **Usuários**:

  - `POST /usuario` - Criar usuário
  - `GET /usuario` - Buscar perfil
  - `PUT /usuario` - Atualizar perfil
  - `DELETE /usuario` - Deletar conta

- **Carteiras**:

  - `GET /carteira/:idCarteira` - Saldo mensal
  - `GET /carteira/:idCarteira/lancamentos` - Listar lançamentos
  - `POST /carteira/:idCarteira/lancamento` - Adicionar lançamento
  - `PUT /carteira/:idCarteira/lancamento/:idLancamento` - Atualizar lançamento
  - `DELETE /carteira/:idCarteira/lancamento/:idLancamento` - Deletar lançamento

- **Categorias**:
  - `GET /categoria` - Listar categorias
  - `GET /categoria/:id` - Buscar categoria por ID

Todos os endpoints (exceto criação de usuário e algumas auth) requerem autenticação JWT via cookie `access_token`.

### Testes

```bash
# Unitários
npm run test

# E2E
npm run test:e2e

# Cobertura
npm run test:cov
```

## Banco de Dados

### Schema Principal

- **usuarios**: ID (UUID), nome, email, senha (hash), telefone, avatar, criado_em
- **carteiras**: ID (UUID), usuario_id (FK), criado_em
- **categorias**: ID (SERIAL), nome, tipo (enum: entrada/saida/ambos)
- **lancamentos**: ID (SERIAL), carteira_id (FK), categoria_id (FK), titulo, descricao, valor, data, tipo (enum), criado_em
- **saldos_mensais**: ID (SERIAL), carteira_id (FK), mes, ano, saldo_mes, criado_em

### Migrações

Gerenciadas por TypeORM. Para criar nova:

```bash
npm run typeorm -- migration:generate src/migrations/NomeMigracao -d src/config/database.config.ts
```

## Segurança

- **Autenticação**: JWT via cookies HTTP-only, renovação automática.
- **Autorização**: Guards protegem rotas, rate limiting (3 req/min).
- **Validação**: DTOs com sanitização.
- **HTTPS**: Recomendado em produção (`secure: true` em cookies).
- **Credenciais**: Nunca commite `.env`; use variáveis seguras.

## Desenvolvimento

### Scripts Disponíveis

- `npm run start:dev` - Modo desenvolvimento com hot-reload.
- `npm run build` - Compilação para produção.
- `npm run lint` - Verificação de código.
- `npm run migration:generate` - Gerar migração.
- `npm run migration:run` - Executar migrações.

### Contribuição

1. Fork o projeto.
2. Crie uma branch para feature/bugfix.
3. Commit com mensagens claras.
4. Push e abra PR.

### Licença

Este projeto é privado. Contate o proprietário para permissões.

---

Para dúvidas, abra uma issue ou contate a equipe.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Willian Rodrigues](https://www.linkedin.com/in/willianrdrigues/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

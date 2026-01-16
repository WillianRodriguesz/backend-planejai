# Planejai - Backend

Backend da aplicação Planejai, um sistema de planejamento financeiro pessoal desenvolvido com NestJS. Permite gerenciamento de usuários, carteiras, categorias e lançamentos financeiros.

## Tecnologias Utilizadas

- **Framework**: [NestJS](https://nestjs.com/) - Framework Node.js para aplicações escaláveis e eficientes.
- **Linguagem**: TypeScript - Tipagem estática para maior robustez.
- **Banco de Dados**: PostgreSQL - RDBMS relacional com suporte a UUID e enums.
- **ORM**: [TypeORM](https://typeorm.io/) - Mapeamento objeto-relacional para interações com DB.
- **Autenticação**: JWT (JSON Web Tokens) via cookies HTTP-only.
- **Rate Limiting**: [@nestjs/throttler](https://docs.nestjs.com/security/rate-limiting) - Controle de taxa de requisições.
- **Validação**: [class-validator](https://github.com/typestack/class-validator) - Validação de DTOs.
- **Hashing**: bcrypt - Criptografia de senhas.
- **Envio de Emails**: Nodemailer com Gmail SMTP.
- **Testes**: Jest - Framework de testes unitários/e2e.
- **Outros**: UUID para IDs únicos, pg para driver PostgreSQL.

## Arquitetura

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

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

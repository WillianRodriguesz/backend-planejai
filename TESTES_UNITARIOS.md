# Testes Unitários - Planejai Back-End

## Visão Geral

Este projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**. Os testes unitários foram implementados para garantir a qualidade e confiabilidade do código nas seguintes camadas:

## Estrutura de Testes

### 📦 Domain Layer (Camada de Domínio)

Testes mais críticos, focados na lógica de negócio pura:

- **Entidades de Domínio**

  - `usuario.spec.ts` - Testa regras de negócio do usuário
  - Validações, criação, atualização, verificação de email

- **Domain Services**

  - `gastos-mensais.service.spec.ts` - Testa cálculos de gastos mensais
  - Agregação por categoria, cálculo de porcentagens, comparação entre meses

- **Value Objects & Utilities**
  - `data.utils.spec.ts` - Testa utilitários de data
  - Conversão de formatos, extração de mês/ano, comparações

### 🔄 Application Layer (Camada de Aplicação)

Testes de casos de uso e queries:

- **Use Cases**

  - `criar-usuario.usecase.spec.ts` - Criação de usuário
  - `login-usuario.usecase.spec.ts` - Autenticação de usuário
  - `verificar-email.usecase.spec.ts` - Verificação de email
  - `adicionar-lancamento.usecase.spec.ts` - Adição de lançamentos financeiros

- **Queries**

  - `buscar-todas-categorias.query.spec.ts` - Busca de categorias

- **Mappers**
  - `usuario.mapper.spec.ts` - Conversão Domain → DTO
  - `categoria.mapper.spec.ts` - Conversão Domain → DTO
  - `lancamento.mapper.spec.ts` - Conversão Domain → DTO
  - `saldo-mensal.mapper.spec.ts` - Conversão Domain → DTO

### 🏗️ Infrastructure Layer (Camada de Infraestrutura)

Testes de componentes de infraestrutura:

- **Guards**

  - `jwt-auth.guard.spec.ts` - Autenticação JWT, renovação de tokens

- **Filters**
  - `domain-exception.filter.spec.ts` - Tratamento de exceções de domínio
  - `repository-exception.filter.spec.ts` - Tratamento de exceções de repositório

## Como Executar os Testes

### Executar todos os testes

```bash
npm test
```

### Executar testes em modo watch (desenvolvimento)

```bash
npm run test:watch
```

### Executar testes com cobertura

```bash
npm run test:cov
```

### Executar testes de um arquivo específico

```bash
npm test -- usuario.spec.ts
```

### Executar testes em modo debug

```bash
npm run test:debug
```

## Cobertura de Testes

Os testes cobrem:

- ✅ Lógica de negócio (Domain Layer)
- ✅ Casos de uso (Application Layer)
- ✅ Mapeamentos entre camadas
- ✅ Validações e regras de negócio
- ✅ Autenticação e autorização
- ✅ Tratamento de exceções
- ✅ Utilitários e helpers

## Convenções de Teste

### Estrutura de um Teste

```typescript
describe('NomeDaClasse', () => {
  let service: NomeDaClasse;
  let dependency: jest.Mocked<DependencyType>;

  beforeEach(() => {
    // Setup de mocks e instâncias
  });

  describe('metodo', () => {
    it('deve fazer algo esperado', () => {
      // Arrange
      // Act
      // Assert
    });

    it('deve lançar erro em caso de falha', () => {
      // Teste de caso de erro
    });
  });
});
```

### Padrões de Nomenclatura

- **describe**: Nome da classe ou módulo
- **describe interno**: Nome do método
- **it**: Descreve o comportamento esperado começando com "deve"

### Mocks

- Use `jest.fn()` para funções mock
- Use `as any` quando necessário para contornar tipos do TypeScript
- Mock apenas dependências externas, não a classe testada

## Princípios Seguidos

1. **Isolamento**: Cada teste é independente
2. **Clareza**: Testes descrevem claramente o comportamento esperado
3. **Cobertura**: Testamos casos de sucesso e falha
4. **Velocidade**: Testes unitários são rápidos (sem banco de dados real)
5. **Manutenibilidade**: Testes fáceis de entender e modificar

## Arquivos Não Testados

Por seguir Clean Architecture, alguns arquivos não precisam de testes unitários:

- **Controllers**: Testados em testes de integração
- **Models TypeORM**: São apenas mapeamento de dados
- **Migrations**: Testadas manualmente
- **Configuration files**: Não contêm lógica

## Próximos Passos

Para expandir a cobertura de testes:

1. Adicionar testes para outros use cases
2. Criar testes de integração (e2e)
3. Adicionar testes de performance
4. Implementar mutation testing

## Recursos

- [Jest Documentation](https://jestjs.io/)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

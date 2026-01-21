import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInitialTerms1736524800004 implements MigrationInterface {
  name = 'InsertInitialTerms1736524800004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserir Termo LGPD
    await queryRunner.query(`
      INSERT INTO "termos" ("tipo", "versao", "titulo", "texto", "ativo", "criado_em") VALUES
      ('lgpd', '1.0', 'Lei Geral de Proteção de Dados (LGPD) - Consentimento para Tratamento de Dados Pessoais', 'Este documento descreve como a Planejai coleta, utiliza, armazena e protege seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Ao aceitar este termo, você consente expressamente com o tratamento dos seus dados pessoais para os fins descritos abaixo.

**1. Definições**
- Dados Pessoais: Informações que identificam ou permitem identificar uma pessoa, como nome, email, telefone, CPF, dados financeiros (ex.: saldos, transações).
- Tratamento: Qualquer operação realizada com dados pessoais, como coleta, armazenamento, uso, compartilhamento ou exclusão.
- Controlador: Planejai, responsável pelo tratamento dos dados.
- Titular: Você, o usuário dos dados.

**2. Finalidades do Tratamento**
Seus dados pessoais serão tratados exclusivamente para:
- Fornecer os serviços da aplicação Planejai (planejamento financeiro, gestão de carteiras e lançamentos).
- Melhorar a experiência do usuário, personalizar conteúdos e prevenir fraudes.
- Cumprir obrigações legais, como relatórios fiscais ou solicitações judiciais.
- Enviar comunicações sobre atualizações, segurança ou marketing (com seu consentimento prévio).

**3. Base Legal**
O tratamento é baseado em:
- Consentimento explícito (este termo).
- Legítimo interesse (ex.: melhoria de serviços).
- Cumprimento de obrigações legais.

**4. Dados Coletados**
- Dados fornecidos por você: Nome, email, telefone, senha (criptografada), dados financeiros inseridos manualmente.
- Dados gerados automaticamente: Logs de uso, endereços IP, cookies (se aplicável).
- Não coletamos dados sensíveis sem consentimento adicional.

**5. Compartilhamento de Dados**
Seus dados não serão vendidos ou compartilhados com terceiros, exceto:
- Com provedores de serviços essenciais (ex.: banco de dados, email), sob contratos de confidencialidade.
- Quando exigido por lei ou ordem judicial.
- Com seu consentimento explícito.

**6. Direitos do Titular (Art. 18 da LGPD)**
Você tem os seguintes direitos:
- Confirmação da existência de tratamento.
- Acesso aos seus dados.
- Correção de dados incompletos, inexatos ou desatualizados.
- Anonimização, bloqueio ou eliminação de dados desnecessários.
- Portabilidade dos dados.
- Revogação do consentimento (o que pode limitar o uso da aplicação).
Para exercer esses direitos, entre em contato via email: privacidade@planejai.com.

**7. Segurança e Retenção**
Utilizamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados, perdas ou alterações. Dados são retidos apenas pelo tempo necessário (ex.: 5 anos após inatividade da conta) e excluídos permanentemente após.

**8. Cookies e Tecnologias Similares**
Podemos usar cookies para melhorar a navegação. Você pode gerenciar preferências no seu navegador.

**9. Transferência Internacional**
Dados podem ser transferidos para servidores fora do Brasil, com garantias de proteção equivalentes.

**10. Alterações a Esta Política**
Podemos atualizar este termo. Notificaremos por email ou na aplicação, e o uso contínuo implica aceitação.

**11. Contato**
Para dúvidas ou solicitações: privacidade@planejai.com ou suporte@planejai.com.

Ao aceitar, você confirma ter lido, compreendido e consentido com estes termos.', true, NOW())
    `);

    // Inserir Termos de Uso
    await queryRunner.query(`
      INSERT INTO "termos" ("tipo", "versao", "titulo", "texto", "ativo", "criado_em") VALUES
      ('termos_uso', '1.0', 'Termos de Uso da Planejai', 'Bem-vindo à Planejai, uma aplicação de planejamento financeiro desenvolvida para ajudar usuários a gerenciar suas finanças pessoais. Estes Termos de Uso regem o acesso e uso da plataforma. Ao utilizar nossos serviços, você concorda com estes termos. Se não concordar, não use a aplicação.

**1. Aceitação dos Termos**
Ao criar uma conta ou acessar a aplicação, você aceita estes termos automaticamente. Reservamo-nos o direito de modificar estes termos a qualquer momento, com notificação prévia.

**2. Descrição dos Serviços**
A Planejai oferece ferramentas para criação de carteiras, registro de lançamentos financeiros, relatórios e planejamento. Serviços são fornecidos "como estão", sem garantias de precisão absoluta.

**3. Obrigações do Usuário**
- Fornecer informações verdadeiras e atualizadas.
- Manter a confidencialidade da conta e senha.
- Não usar a plataforma para atividades ilegais, fraudulentas ou prejudiciais.
- Não compartilhar dados de terceiros sem autorização.

**4. Propriedade Intelectual**
Todo o conteúdo da aplicação (códigos, designs, logos) é propriedade da Planejai. Você não pode copiar, distribuir ou modificar sem permissão.

**5. Limitação de Responsabilidade**
Não nos responsabilizamos por perdas decorrentes do uso da aplicação, como decisões financeiras baseadas em dados inseridos. A aplicação é uma ferramenta auxiliar, não substitui consultoria profissional.

**6. Suspensão e Encerramento**
Podemos suspender ou encerrar sua conta por violação destes termos, sem aviso prévio.

**7. Lei Aplicável**
Estes termos são regidos pela legislação brasileira. Disputas serão resolvidas no foro da comarca de [Sua Cidade/Estado].

**8. Contato**
Para dúvidas: suporte@planejai.com.

Ao aceitar, você confirma a leitura e concordância.', true, NOW())
    `);

    // Inserir Política de Privacidade
    await queryRunner.query(`
      INSERT INTO "termos" ("tipo", "versao", "titulo", "texto", "ativo", "criado_em") VALUES
      ('politica_privacidade', '1.0', 'Política de Privacidade da Planejai', 'Esta Política de Privacidade explica como a Planejai coleta, usa, armazena e protege suas informações pessoais, em conformidade com a LGPD. Última atualização: Janeiro de 2026.

**1. Informações que Coletamos**
- Dados pessoais: Nome, email, telefone, CPF (se fornecido), dados financeiros inseridos (ex.: saldos, transações).
- Dados de uso: Endereços IP, logs de acesso, dispositivos utilizados.
- Cookies: Para melhorar a experiência, rastrear preferências.

**2. Como Usamos Suas Informações**
- Para fornecer e personalizar serviços.
- Para comunicações de segurança, atualizações ou marketing (com consentimento).
- Para cumprir leis ou resolver disputas.

**3. Compartilhamento de Informações**
- Com provedores de hospedagem (ex.: AWS) sob contratos de proteção.
- Apenas quando exigido por lei ou com seu consentimento.

**4. Segurança**
Utilizamos criptografia, firewalls e controles de acesso para proteger dados. No entanto, nenhum sistema é 100% seguro.

**5. Retenção de Dados**
Dados são retidos enquanto sua conta estiver ativa e por até 5 anos após inatividade, conforme LGPD.

**6. Seus Direitos**
Conforme LGPD, você pode solicitar acesso, correção, exclusão ou portabilidade. Entre em contato para exercer direitos.

**7. Alterações**
Podemos atualizar esta política. Notificaremos mudanças significativas.

**8. Contato**
Para questões de privacidade: privacidade@planejai.com.

Ao usar a aplicação, você concorda com esta política.', true, NOW())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover os termos inseridos
    await queryRunner.query(
      `DELETE FROM "termos" WHERE "tipo" IN ('lgpd', 'termos_uso', 'politica_privacidade') AND "versao" = '1.0'`,
    );
  }
}

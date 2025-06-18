-- CreateTable
CREATE TABLE "carteira" (
    "id_carteira" VARCHAR(36) NOT NULL,
    "id_usuario" VARCHAR(36) NOT NULL,
    "saldo" DECIMAL(10,2) DEFAULT 0.00,

    CONSTRAINT "carteira_pkey" PRIMARY KEY ("id_carteira")
);

-- CreateTable
CREATE TABLE "conta_recorrente" (
    "id_conta_recorrente" SERIAL NOT NULL,
    "id_carteira" VARCHAR(36) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "descricao" VARCHAR(255),
    "intervalo_dias" INTEGER NOT NULL,
    "data_inicio" DATE NOT NULL,

    CONSTRAINT "conta_recorrente_pkey" PRIMARY KEY ("id_conta_recorrente")
);

-- CreateTable
CREATE TABLE "transacao" (
    "id_transacao" SERIAL NOT NULL,
    "id_carteira" VARCHAR(36) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "tipo" VARCHAR(10) NOT NULL,
    "descricao" VARCHAR(255),
    "data" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transacao_pkey" PRIMARY KEY ("id_transacao")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE INDEX "idx_transacao_data" ON "transacao"("data");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "fk_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conta_recorrente" ADD CONSTRAINT "fk_carteira_recorrente" FOREIGN KEY ("id_carteira") REFERENCES "carteira"("id_carteira") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transacao" ADD CONSTRAINT "fk_carteira" FOREIGN KEY ("id_carteira") REFERENCES "carteira"("id_carteira") ON DELETE CASCADE ON UPDATE NO ACTION;

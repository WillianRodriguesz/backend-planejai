-- This is an empty migration.
-- Inserindo dados na tabela usuario
INSERT INTO "usuario" (id_usuario, nome, email, senha) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Ana Silva', 'ana.silva@email.com', 'senhaSegura123'),
  ('550e8400-e29b-41d4-a716-446655440002', 'João Oliveira', 'joao.oliveira@email.com', 'senhaForte456'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Maria Santos', 'maria.santos@email.com', 'minhaSenha789');

-- Inserindo dados na tabela Carteira
INSERT INTO "carteira" (id_carteira, id_usuario, saldo) VALUES
  ('a1b2c3d4-e5f6-47h8-i9j0-k1l2m3n4o5p6', '550e8400-e29b-41d4-a716-446655440001', 1500.75),
  ('b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', '550e8400-e29b-41d4-a716-446655440002', 320.50),
  ('c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', '550e8400-e29b-41d4-a716-446655440003', 850.00);

-- Inserindo dados na tabela conta_recorrente
INSERT INTO "conta_recorrente" (id_carteira, valor, descricao, intervalo_dias, data_inicio) VALUES
  ('a1b2c3d4-e5f6-47h8-i9j0-k1l2m3n4o5p6', 200.00, 'Assinatura Netflix', 30, '2025-06-01'),
  ('a1b2c3d4-e5f6-47h8-i9j0-k1l2m3n4o5p6', 50.00, 'Internet Fibra', 30, '2025-06-05'),
  ('b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 150.00, 'Aluguel', 30, '2025-06-10'),
  ('c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 75.00, 'Academia', 30, '2025-06-15');

-- Inserindo dados na tabela transacao
INSERT INTO "transacao" (id_carteira, valor, tipo, descricao, data) VALUES
  ('a1b2c3d4-e5f6-47h8-i9j0-k1l2m3n4o5p6', 1000.00, 'ENTRADA', 'Salário', '2025-06-01 10:00:00'),
  ('a1b2c3d4-e5f6-47h8-i9j0-k1l2m3n4o5p6', -200.00, 'SAIDA', 'Compra Supermercado', '2025-06-02 14:30:00'),
  ('b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 500.00, 'ENTRADA', 'Freelance', '2025-06-03 09:00:00'),
  ('b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', -100.00, 'SAIDA', 'Restaurante', '2025-06-04 19:00:00'),
  ('c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 1000.00, 'ENTRADA', 'Bônus', '2025-06-05 11:00:00'),
  ('c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', -50.00, 'SAIDA', 'Cinema', '2025-06-06 20:00:00');
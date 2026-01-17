import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  Repository,
  DataSource,
  QueryRunner,
  SelectQueryBuilder,
} from 'typeorm';
import { CarteiraRepositoryImpl } from './Carteira.repository';
import { CarteiraModel } from '../models/carteira.model';
import { LancamentoModel } from '../models/lancamento.model';
import { SaldoMensalModel } from '../models/saldo-mensal.model';
import { RepositoryException } from '../exceptions/repository.exception';
import { Carteira } from '../../domain/carteira';
import { Lancamento, TipoTransacao } from '../../domain/lancamento';
import { Categoria } from '../../domain/categoria';
import { SaldoMes } from '../../domain/saldo-mensal';

describe('CarteiraRepositoryImpl - Infrastructure Repository', () => {
  let repository: CarteiraRepositoryImpl;
  let carteiraRepository: jest.Mocked<Repository<CarteiraModel>>;
  let dataSource: jest.Mocked<DataSource>;
  let queryRunner: jest.Mocked<QueryRunner>;

  beforeEach(async () => {
    const mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
      },
    };

    const mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn(),
      }),
    };

    const mockRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarteiraRepositoryImpl,
        {
          provide: getRepositoryToken(CarteiraModel),
          useValue: mockRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    repository = module.get<CarteiraRepositoryImpl>(CarteiraRepositoryImpl);
    carteiraRepository = module.get(getRepositoryToken(CarteiraModel));
    dataSource = module.get(DataSource);
    queryRunner = mockQueryRunner as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buscarPorId', () => {
    it('deve buscar carteira por ID com sucesso', async () => {
      const carteiraModel: Partial<CarteiraModel> = {
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date('2025-01-01'),
        lancamentos: [],
        saldosMensais: [],
      };

      carteiraRepository.findOne.mockResolvedValue(
        carteiraModel as CarteiraModel,
      );

      const resultado = await repository.buscarPorId('carteira-123');

      expect(resultado).toBeInstanceOf(Carteira);
      expect(resultado?.getId()).toBe('carteira-123');
      expect(carteiraRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'carteira-123' },
        relations: ['lancamentos', 'lancamentos.categoria', 'saldosMensais'],
        order: {
          lancamentos: {
            data: 'DESC',
          },
        },
      });
    });

    it('deve retornar null quando carteira não for encontrada', async () => {
      carteiraRepository.findOne.mockResolvedValue(null);

      const resultado = await repository.buscarPorId('carteira-inexistente');

      expect(resultado).toBeNull();
      expect(carteiraRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'carteira-inexistente' },
        relations: ['lancamentos', 'lancamentos.categoria', 'saldosMensais'],
        order: {
          lancamentos: {
            data: 'DESC',
          },
        },
      });
    });

    it('deve buscar carteira com lançamentos e saldos mensais', async () => {
      const carteiraModel: Partial<CarteiraModel> = {
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date('2025-01-01'),
        lancamentos: [
          {
            id: 'lanc-1',
            carteiraId: 'carteira-123',
            categoriaId: 1,
            categoria: { id: 1, nome: 'Alimentação' } as any,
            titulo: 'Almoço',
            valor: 50,
            data: new Date('2025-01-15'),
            tipo: 'saida',
          } as any,
        ],
        saldosMensais: [
          {
            id: 'saldo-1',
            carteiraId: 'carteira-123',
            mes: 1,
            ano: 2025,
            saldoMes: 1000,
          } as any,
        ],
      };

      carteiraRepository.findOne.mockResolvedValue(
        carteiraModel as CarteiraModel,
      );

      const resultado = await repository.buscarPorId('carteira-123');

      expect(resultado).not.toBeNull();
      expect(resultado?.getLancamentos()).toHaveLength(1);
      expect(resultado?.getSaldosMensais()).toHaveLength(1);
    });

    it('deve lançar RepositoryException em caso de erro', async () => {
      const erro = new Error('Database error');
      carteiraRepository.findOne.mockRejectedValue(erro);

      await expect(repository.buscarPorId('carteira-123')).rejects.toThrow(
        RepositoryException,
      );
      await expect(repository.buscarPorId('carteira-123')).rejects.toThrow(
        'Erro interno ao buscar carteira',
      );
    });
  });

  describe('salvar', () => {
    it('deve salvar nova carteira com sucesso', async () => {
      const carteira = Carteira.criar({
        usuarioId: 'usuario-123',
      });

      await repository.salvar(carteira);

      expect(queryRunner.connect).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.save).toHaveBeenCalledWith(
        CarteiraModel,
        expect.objectContaining({
          usuarioId: 'usuario-123',
        }),
      );
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });

    it('deve salvar carteira com lançamentos', async () => {
      const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date('2025-01-01'),
        lancamentos: [],
        saldosMensais: [],
      });

      carteira.adicionarLancamento({
        titulo: 'Almoço',
        valor: 50,
        data: new Date('2025-01-15'),
        tipoTransacao: 'saida',
        categoria,
      });

      await repository.salvar(carteira);

      expect(queryRunner.manager.save).toHaveBeenCalledWith(
        LancamentoModel,
        expect.arrayContaining([
          expect.objectContaining({
            titulo: 'Almoço',
            valor: 50,
          }),
        ]),
      );
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
    });

    it('deve deletar lançamentos removidos', async () => {
      const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });

      const lancamento = Lancamento.carregar({
        id: 'lanc-1',
        titulo: 'Almoço',
        descricao: 'Almoço no restaurante',
        valor: 50,
        data: new Date('2025-01-15'),
        tipoTransacao: 'saida',
        categoria,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date('2025-01-01'),
        lancamentos: [lancamento],
        saldosMensais: [],
      });

      carteira.excluirLancamento('lanc-1');

      await repository.salvar(carteira);

      expect(queryRunner.manager.delete).toHaveBeenCalledWith(LancamentoModel, [
        'lanc-1',
      ]);
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
    });

    it('deve salvar saldos mensais novos', async () => {
      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date('2025-01-01'),
        lancamentos: [],
        saldosMensais: [],
      });

      const saldo = SaldoMes.criar({
        mes: 1,
        ano: 2025,
        saldoMes: 1000,
      });

      carteira['saldosMensais'] = [saldo];

      await repository.salvar(carteira);

      expect(queryRunner.manager.save).toHaveBeenCalledWith(
        SaldoMensalModel,
        expect.arrayContaining([
          expect.objectContaining({
            mes: 1,
            ano: 2025,
            saldoMes: 1000,
          }),
        ]),
      );
    });

    it('deve fazer rollback em caso de erro', async () => {
      const erro = new Error('Database error');
      (queryRunner.manager.save as jest.Mock).mockRejectedValue(erro);

      const carteira = Carteira.criar({
        usuarioId: 'usuario-123',
      });

      await expect(repository.salvar(carteira)).rejects.toThrow(
        RepositoryException,
      );

      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });

    it('deve liberar queryRunner mesmo com erro', async () => {
      const erro = new Error('Database error');
      (queryRunner.manager.save as jest.Mock).mockRejectedValue(erro);

      const carteira = Carteira.criar({
        usuarioId: 'usuario-123',
      });

      try {
        await repository.salvar(carteira);
      } catch (error) {
        // Espera-se que lance erro
      }

      expect(queryRunner.release).toHaveBeenCalled();
    });
  });

  describe('buscarPorUsuarioId', () => {
    it('deve buscar carteira por usuário ID com sucesso', async () => {
      const carteiraModel: Partial<CarteiraModel> = {
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date('2025-01-01'),
        lancamentos: [],
        saldosMensais: [],
      };

      carteiraRepository.findOne.mockResolvedValue(
        carteiraModel as CarteiraModel,
      );

      const resultado = await repository.buscarPorUsuarioId('usuario-123');

      expect(resultado).toBeInstanceOf(Carteira);
      expect(resultado?.getId()).toBe('carteira-123');
      expect(carteiraRepository.findOne).toHaveBeenCalledWith({
        where: { usuarioId: 'usuario-123' },
        relations: ['lancamentos', 'lancamentos.categoria', 'saldosMensais'],
        order: {
          lancamentos: {
            data: 'DESC',
          },
        },
      });
    });

    it('deve retornar null quando carteira não for encontrada', async () => {
      carteiraRepository.findOne.mockResolvedValue(null);

      const resultado = await repository.buscarPorUsuarioId(
        'usuario-inexistente',
      );

      expect(resultado).toBeNull();
    });

    it('deve lançar RepositoryException em caso de erro', async () => {
      const erro = new Error('Database error');
      carteiraRepository.findOne.mockRejectedValue(erro);

      await expect(
        repository.buscarPorUsuarioId('usuario-123'),
      ).rejects.toThrow(RepositoryException);
      await expect(
        repository.buscarPorUsuarioId('usuario-123'),
      ).rejects.toThrow('Erro interno ao buscar carteira por usuário');
    });
  });

  describe('buscarLancamentosFiltrados', () => {
    let mockQueryBuilder: any;

    beforeEach(() => {
      mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      (dataSource.getRepository as jest.Mock).mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
      });
    });

    it('deve buscar lançamentos apenas com carteiraId', async () => {
      await repository.buscarLancamentosFiltrados({
        carteiraId: 'carteira-123',
      });

      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'lancamento.carteiraId = :carteiraId',
        { carteiraId: 'carteira-123' },
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'lancamento.data',
        'DESC',
      );
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });

    it('deve filtrar por data inicial', async () => {
      const dataInicial = new Date('2025-01-01');

      await repository.buscarLancamentosFiltrados({
        carteiraId: 'carteira-123',
        dataInicial,
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'lancamento.data >= :dataInicial',
        { dataInicial },
      );
    });

    it('deve filtrar por data final', async () => {
      const dataFinal = new Date('2025-01-31');

      await repository.buscarLancamentosFiltrados({
        carteiraId: 'carteira-123',
        dataFinal,
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'lancamento.data <= :dataFinal',
        { dataFinal },
      );
    });

    it('deve filtrar por categoria', async () => {
      await repository.buscarLancamentosFiltrados({
        carteiraId: 'carteira-123',
        idCategoria: 1,
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'lancamento.categoriaId = :idCategoria',
        { idCategoria: 1 },
      );
    });

    it('deve filtrar por título (case insensitive)', async () => {
      await repository.buscarLancamentosFiltrados({
        carteiraId: 'carteira-123',
        titulo: 'Almoço',
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'LOWER(lancamento.titulo) LIKE LOWER(:titulo)',
        { titulo: '%Almoço%' },
      );
    });

    it('deve filtrar por tipo de transação', async () => {
      await repository.buscarLancamentosFiltrados({
        carteiraId: 'carteira-123',
        tipoTransacao: 'saida',
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'lancamento.tipo = :tipoTransacao',
        { tipoTransacao: 'saida' },
      );
    });

    it('deve aplicar múltiplos filtros simultaneamente', async () => {
      const dataInicial = new Date('2025-01-01');
      const dataFinal = new Date('2025-01-31');

      await repository.buscarLancamentosFiltrados({
        carteiraId: 'carteira-123',
        dataInicial,
        dataFinal,
        idCategoria: 1,
        titulo: 'Almoço',
        tipoTransacao: 'saida',
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledTimes(5);
    });

    it('deve retornar lançamentos mapeados para domain', async () => {
      const lancamentoModel = {
        id: 'lanc-1',
        carteiraId: 'carteira-123',
        categoriaId: 1,
        categoria: { id: 1, nome: 'Alimentação' },
        titulo: 'Almoço',
        descricao: 'Almoço no restaurante',
        valor: 50,
        data: new Date('2025-01-15'),
        tipo: 'saida',
      };

      mockQueryBuilder.getMany.mockResolvedValue([lancamentoModel]);

      const resultado = await repository.buscarLancamentosFiltrados({
        carteiraId: 'carteira-123',
      });

      expect(resultado).toHaveLength(1);
      expect(resultado[0]).toBeInstanceOf(Lancamento);
    });

    it('deve lançar RepositoryException em caso de erro', async () => {
      const erro = new Error('Database error');
      mockQueryBuilder.getMany.mockRejectedValue(erro);

      await expect(
        repository.buscarLancamentosFiltrados({
          carteiraId: 'carteira-123',
        }),
      ).rejects.toThrow(RepositoryException);
      await expect(
        repository.buscarLancamentosFiltrados({
          carteiraId: 'carteira-123',
        }),
      ).rejects.toThrow('Erro interno ao buscar lançamentos filtrados');
    });
  });
});

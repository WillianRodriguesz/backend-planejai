import { DateUtils } from './data.utils';

describe('DateUtils - Domain Utility', () => {
  describe('extrairMesAno', () => {
    it('deve extrair mês e ano de um objeto Date', () => {
      const data = new Date(2023, 0, 15); // Janeiro de 2023

      const resultado = DateUtils.extrairMesAno(data);

      expect(resultado.mes).toBe(1);
      expect(resultado.ano).toBe(2023);
    });

    it('deve extrair mês e ano de uma string ISO', () => {
      const data = '2023-06-20T10:30:00';

      const resultado = DateUtils.extrairMesAno(data);

      expect(resultado.mes).toBe(6);
      expect(resultado.ano).toBe(2023);
    });

    it('deve extrair mês e ano de uma string de data simples', () => {
      const data = '2023-12-31';

      const resultado = DateUtils.extrairMesAno(data);

      expect(resultado.mes).toBe(12);
      expect(resultado.ano).toBe(2023);
    });

    it('deve funcionar com dezembro (mês 12)', () => {
      const data = new Date(2023, 11, 25); // Dezembro de 2023

      const resultado = DateUtils.extrairMesAno(data);

      expect(resultado.mes).toBe(12);
      expect(resultado.ano).toBe(2023);
    });

    it('deve funcionar com janeiro (mês 1)', () => {
      const data = new Date(2024, 0, 1); // Janeiro de 2024

      const resultado = DateUtils.extrairMesAno(data);

      expect(resultado.mes).toBe(1);
      expect(resultado.ano).toBe(2024);
    });
  });

  describe('converterParaDate', () => {
    it('deve retornar Date se input já for Date', () => {
      const data = new Date(2023, 5, 15);

      const resultado = DateUtils.converterParaDate(data);

      expect(resultado).toBe(data);
      expect(resultado).toBeInstanceOf(Date);
    });

    it('deve converter string para Date', () => {
      const data = '2023-06-15';

      const resultado = DateUtils.converterParaDate(data);

      expect(resultado).toBeInstanceOf(Date);
      expect(resultado.getFullYear()).toBe(2023);
      expect(resultado.getMonth()).toBe(5); // Junho é mês 5 (zero-based)
      expect(resultado.getDate()).toBe(15);
    });

    it('deve converter string ISO completa para Date', () => {
      const data = '2023-03-20T14:30:00';

      const resultado = DateUtils.converterParaDate(data);

      expect(resultado).toBeInstanceOf(Date);
      expect(resultado.getFullYear()).toBe(2023);
      expect(resultado.getMonth()).toBe(2); // Março é mês 2
      expect(resultado.getDate()).toBe(20);
    });

    it('deve lidar com último dia do mês', () => {
      const data = '2023-12-31';

      const resultado = DateUtils.converterParaDate(data);

      expect(resultado.getFullYear()).toBe(2023);
      expect(resultado.getMonth()).toBe(11);
      expect(resultado.getDate()).toBe(31);
    });
  });

  describe('isMesmaData', () => {
    it('deve retornar true para datas no mesmo mês e ano', () => {
      const data1 = new Date(2023, 5, 10);
      const data2 = new Date(2023, 5, 20);

      const resultado = DateUtils.isMesmaData(data1, data2);

      expect(resultado).toBe(true);
    });

    it('deve retornar false para datas em meses diferentes', () => {
      const data1 = new Date(2023, 5, 10);
      const data2 = new Date(2023, 6, 10);

      const resultado = DateUtils.isMesmaData(data1, data2);

      expect(resultado).toBe(false);
    });

    it('deve retornar false para datas em anos diferentes', () => {
      const data1 = new Date(2023, 5, 10);
      const data2 = new Date(2024, 5, 10);

      const resultado = DateUtils.isMesmaData(data1, data2);

      expect(resultado).toBe(false);
    });

    it('deve retornar true para primeiro e último dia do mesmo mês', () => {
      const data1 = new Date(2023, 5, 1);
      const data2 = new Date(2023, 5, 30);

      const resultado = DateUtils.isMesmaData(data1, data2);

      expect(resultado).toBe(true);
    });

    it('deve retornar false para último dia do mês e primeiro dia do próximo', () => {
      const data1 = new Date(2023, 5, 30); // 30 de junho
      const data2 = new Date(2023, 6, 1); // 1 de julho

      const resultado = DateUtils.isMesmaData(data1, data2);

      expect(resultado).toBe(false);
    });
  });
});

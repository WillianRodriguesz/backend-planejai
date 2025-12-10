export class DateUtils {
  private static readonly MES_OFFSET = 1;

  public static extrairMesAno(data: Date | string): {
    mes: number;
    ano: number;
  } {
    let dataObj: Date;

    if (typeof data === 'string') {
      // Criar data no timezone local para evitar problemas de UTC
      const [ano, mes, dia] = data.split('T')[0].split('-').map(Number);
      dataObj = new Date(ano, mes - 1, dia);
    } else {
      dataObj = data;
    }

    const mes = dataObj.getMonth() + DateUtils.MES_OFFSET;
    const ano = dataObj.getFullYear();
    return { mes, ano };
  }

  public static converterParaDate(data: string | Date): Date {
    if (data instanceof Date) {
      return data;
    }

    // Parse da string no formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss
    const [ano, mes, dia] = data.split('T')[0].split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  public static isMesmaData(data1: Date, data2: Date): boolean {
    const { mes: mes1, ano: ano1 } = DateUtils.extrairMesAno(data1);
    const { mes: mes2, ano: ano2 } = DateUtils.extrairMesAno(data2);
    return mes1 === mes2 && ano1 === ano2;
  }
}

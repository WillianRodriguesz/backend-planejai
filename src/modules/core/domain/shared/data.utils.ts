export class DateUtils {
  private static readonly MES_OFFSET = 1;

  public static extrairMesAno(data: Date): { mes: number; ano: number } {
    const mes = data.getMonth() + DateUtils.MES_OFFSET;
    const ano = data.getFullYear();
    return { mes, ano };
  }

  public static isMesmaData(data1: Date, data2: Date): boolean {
    const { mes: mes1, ano: ano1 } = DateUtils.extrairMesAno(data1);
    const { mes: mes2, ano: ano2 } = DateUtils.extrairMesAno(data2);
    return mes1 === mes2 && ano1 === ano2;
  }
}
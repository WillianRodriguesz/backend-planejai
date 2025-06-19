import { Decimal } from "generated/prisma/runtime/library";

 interface CarteiraModelProps {
  id: string;
  id_usuario: string;
  saldo: string | number | Decimal;
}


export class CarteiraModel implements CarteiraModelProps {
  id: string;
  id_usuario: string;
  saldo: string | number | Decimal;

  criar(props: CarteiraModelProps): CarteiraModel {
    Object.assign(this, props);
    return this;
  }
}

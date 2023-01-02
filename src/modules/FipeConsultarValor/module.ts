import { FipeConsultarValorController } from './FipeConsultarValorController';
import { FipeConsultarValorService } from "./FipeConsultarValorService";

const service = new FipeConsultarValorService()
const controller = new FipeConsultarValorController(service)

export { controller as FipeConsultarValor };


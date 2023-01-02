import { Router } from "express";
import { FipeConsultarValor } from "./modules/FipeConsultarValor/module";
import { bind } from "./utils/bind";

const route = Router();

route.get("/consultar-valor", bind(FipeConsultarValor))
export { route };


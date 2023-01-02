import dayjs from 'dayjs';
import FormData from "form-data";
import { fix } from '../utils';
import { ApiRequestInput, RequestDto } from "./fipe.interface";


export class Fipe {
  static endpoint = "https://veiculos.fipe.org.br/api/veiculos//ConsultarValorComTodosParametros";
  private static defaultCodigoTabelaReferencia = {
    date: new Date("2023-01-01"),
    value: 293
  }
  private static mapaDeTipoVeiculo = {
    caminhao: {
      codigoTipoVeiculo: "3",
      codigoTipoCombustivel: ["3"]
    },
    carro: {
      codigoTipoVeiculo: "1",
      codigoTipoCombustivel: ["1", "3"]
    },
  }

  private static getCodigoDeReferencia(props: RequestDto) {
    const requestedDate = new Date(`${props.ano}-${fix(props.mes)}-01`)
    const differenceBetweenDefaultDate = dayjs(Fipe.defaultCodigoTabelaReferencia.date).diff(requestedDate, "M")
    const codigoTabelaReferencia = Fipe.defaultCodigoTabelaReferencia.value - differenceBetweenDefaultDate;
    return codigoTabelaReferencia
  }

  private static parseFormData(request: ApiRequestInput) {
    const {
      codigoTabelaReferencia,
      modeloCodigoExterno,
      anoModelo,
      codigoTipoVeiculo,
      tipoConsulta,
      combustivel
    } = request

    const formData = new FormData();
    formData.append("codigoTabelaReferencia", codigoTabelaReferencia);
    formData.append("modeloCodigoExterno", modeloCodigoExterno);
    formData.append("tipoConsulta", tipoConsulta);
    formData.append("anoModelo", anoModelo);
    formData.append("codigoTipoCombustivel", combustivel)
    formData.append("codigoTipoVeiculo", codigoTipoVeiculo)
    return formData
  }
  static encode(request: RequestDto) {
    const formDatas: FormData[] = []

    const codigoTabelaReferencia = String(Fipe.getCodigoDeReferencia(request))

    const codigoTipoCombustivelList = request.tipoVeiculo === "caminhao"
      ? Fipe.mapaDeTipoVeiculo.caminhao.codigoTipoCombustivel
      : Fipe.mapaDeTipoVeiculo.carro.codigoTipoCombustivel;

    const codigoTipoVeiculo = request.tipoVeiculo === "caminhao"
      ? Fipe.mapaDeTipoVeiculo.caminhao.codigoTipoVeiculo
      : Fipe.mapaDeTipoVeiculo.carro.codigoTipoVeiculo

    const modeloCodigoExterno = request.fipe
    const tipoConsulta = 'codigo'
    const anoModelo = request.ano

    if (request.tipoVeiculo === "carro") {
      for (const combustivel of Fipe.mapaDeTipoVeiculo.carro.codigoTipoCombustivel) {
        const formData = Fipe.parseFormData({
          codigoTabelaReferencia,
          modeloCodigoExterno,
          tipoConsulta,
          anoModelo,
          combustivel,
          codigoTipoVeiculo
        })
        formDatas.push(formData)
      }
    }
    else {
      const combustivel = codigoTipoCombustivelList[0];
      const formData = Fipe.parseFormData({
        codigoTabelaReferencia,
        modeloCodigoExterno,
        tipoConsulta,
        anoModelo,
        combustivel,
        codigoTipoVeiculo
      })
      formDatas.push(formData)
    }
    return formDatas
  }
}

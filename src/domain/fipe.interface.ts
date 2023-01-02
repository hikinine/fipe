export interface ConsultarValorComTodosParametrosProps {
  codigoTabelaReferencia: string
  codigoTipoVeiculo: string
  codigoTipoCombustivel: string
  tipoVeiculo: string
  modeloCodigoExterno: string
  tipoConsulta: string
  anoModelo: string
}
export type RequestDto = {
  fipe: string
  ano: string
  mes: string
  anoModelo: string
  tipoVeiculo: "caminhao" | "carro"
}
export type ApiRequestInput = {
  combustivel: string 
  codigoTabelaReferencia: string 
  modeloCodigoExterno: string 
  tipoConsulta: string 
  anoModelo: string 
  codigoTipoVeiculo: string 
}
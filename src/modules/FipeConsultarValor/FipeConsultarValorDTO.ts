import { IsString, validateSync } from "class-validator"

export class FipeConsultarValorDTO {
  @IsString()
  ano: string
  @IsString()
  mes: string
  @IsString()
  anoModelo: string 
  @IsString()
  fipe: string 
  @IsString()
  tipoVeiculo: "carro" | "caminhao"

  constructor(props: unknown) {
    Object.assign(this, props)
    const error = validateSync(this, {
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true
    })

    if (error.length) {
      throw  {
        message: "Falha na validação dos campos " + error?.map(field => field?.property)?.join(", "),
        error
      } 
    }
    
  }
}
import { Request, Response } from "express";
import { FipeConsultarValorDTO } from './FipeConsultarValorDTO';
import { FipeConsultarValorService } from "./FipeConsultarValorService";

export class FipeConsultarValorController {
  constructor(private service: FipeConsultarValorService) { }
  async handle(request: Request, response: Response) {
    try {
      const query = request.query
      const dto = new FipeConsultarValorDTO(query);
      const serviceResponse = await this.service.execute(dto)
      return response.status(200).json(serviceResponse)
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        message: error?.message ,
        error
      })
    }
  }
}
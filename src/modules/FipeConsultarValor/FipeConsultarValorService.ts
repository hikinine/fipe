import axios from 'axios';
import { Fipe } from '../../domain/fipe';
import { FipeConsultarValorDTO } from './FipeConsultarValorDTO';
export class FipeConsultarValorService {
  async execute(request: FipeConsultarValorDTO) {
    const formDatas = Fipe.encode(request)

    for (const form of formDatas) {
      const { data } = await axios.post(
        Fipe.endpoint,
        form,
        { headers: form.getHeaders() }
      )
      if (data?.erro === "nadaencontrado") continue;
      return data;
    }
    throw new Error("Não encontrei nenhuma informação com esses parametros")
  }
}
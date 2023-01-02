import { Request, Response } from "express"

export type Controller = {
  handle: (request: Request, response: Response) => Promise<any>
}
export function bind(controller: Controller) {
  return controller.handle.bind(controller)
}
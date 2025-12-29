import { Request, Response } from 'express';

import { RequestModel } from '../models/request.model';

import { TicketService } from '../services/ticket.service';

export class TicketController {
  constructor(private service: TicketService) { }

  create = (req: Request, res: Response) => {
    const { titulo, descricao, prioridade } = req.body;
    const ticket = this.service.create(titulo, descricao, prioridade);
    res.status(201).json(ticket);
  };

  list = (req: RequestModel, res: Response) => {
    const { status } = req.query;
    const tickets = this.service.list(status);
    res.json(tickets);
  };

  updateStatus = (req: Request, res: Response) => {
    const ticket = this.service.updateStatus(req.params.id, req.body.status);
    res.json(ticket);
  };

  delete = (req: Request, res: Response) => {
    this.service.delete(req.params.id);
    res.status(204).send();
  };
}

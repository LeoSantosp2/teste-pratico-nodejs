import { v4 as uuid } from 'uuid';

import { Ticket, TicketStatus, TicketPrioridade } from '../models/ticket.model';

import { TicketRepository } from '../repositories/ticket.repository';

import { HttpError } from '../utils/httpError';

export class TicketService {
  constructor(private repo: TicketRepository) { }

  create(
    titulo: string,
    descricao: string,
    prioridade: TicketPrioridade,
  ): Ticket {
    const now = new Date().toISOString();

    const ticket: Ticket = {
      id: uuid(),
      titulo,
      descricao,
      prioridade,
      status: 'ABERTO',
      criadoEm: now,
      atualizadoEm: now,
    };

    this.repo.save(ticket);
    return ticket;
  }

  list(status?: TicketStatus): Ticket[] {
    let tickets = this.repo.findAll();

    if (status) {
      tickets = tickets.filter((t) => t.status === status);
    }

    return tickets.sort(
      (a, b) => new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime(),
    );
  }

  updateStatus(id: string, newStatus: TicketStatus): Ticket {
    const ticket = this.repo.findById(id);

    if (!ticket) throw new HttpError(404, 'Ticket não encontrado');

    if (ticket.status === 'FECHADO') {
      throw new HttpError(400, 'Ticket já está fechado');
    }

    const fluxo: Record<TicketStatus, TicketStatus> = {
      ABERTO: 'EM_ANALISE',
      EM_ANALISE: 'FECHADO',
      FECHADO: 'FECHADO',
    };

    if (fluxo[ticket.status] !== newStatus) {
      throw new HttpError(400, 'Transição de status inválida');
    }

    ticket.status = newStatus;
    ticket.atualizadoEm = new Date().toISOString();
    this.repo.save(ticket);

    return ticket;
  }

  delete(id: string): void {
    const ticket = this.repo.findById(id);
    if (!ticket) throw new HttpError(404, 'Ticket não encontrado');
    this.repo.delete(id);
  }
}

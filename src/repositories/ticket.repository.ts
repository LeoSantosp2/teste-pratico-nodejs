import { Ticket } from '../models/ticket.model';

export class TicketRepository {
  private tickets = new Map<string, Ticket>();

  save(ticket: Ticket): void {
    this.tickets.set(ticket.id, ticket);
  }

  findAll(): Ticket[] {
    return Array.from(this.tickets.values());
  }

  findById(id: string): Ticket | undefined {
    return this.tickets.get(id);
  }

  delete(id: string): void {
    this.tickets.delete(id);
  }
}

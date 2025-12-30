import { TicketService } from '../../services/ticket.service';
import { TicketRepository } from '../../repositories/ticket.repository';
import { HttpError } from '../../utils/httpError';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(() => {
    service = new TicketService(new TicketRepository());
  });

  it('should create a ticket with status ABERTO', () => {
    const ticket = service.create('Teste', 'Descricao', 'ALTA');

    expect(ticket.status).toBe('ABERTO');
    expect(ticket.id).toBeDefined();
  });

  it('should list tickets ordered by data', () => {
    service.create('A', 'Desc A', 'BAIXA');
    service.create('B', 'Desc B', 'ALTA');

    const tickets = service.list();
    expect(tickets.length).toBe(2);
  });

  it('should filter tickets by status', () => {
    service.create('Teste', 'Descrição', 'ALTA');
    const ticket = service.create('Teste 2', 'Descrição 2', 'ALTA');

    service.updateStatus(ticket.id, 'EM_ANALISE');

    const tickets = service.list('EM_ANALISE');

    expect(tickets.length).toBe(1);
  });

  it('should update correctly status', () => {
    const ticket = service.create('Teste', 'Desc', 'MEDIA');

    const emAnalise = service.updateStatus(ticket.id, 'EM_ANALISE');
    expect(emAnalise.status).toBe('EM_ANALISE');

    const fechado = service.updateStatus(ticket.id, 'FECHADO');
    expect(fechado.status).toBe('FECHADO');
  });

  it('should not allow skip status', () => {
    const ticket = service.create('Teste', 'Desc', 'MEDIA');

    expect(() => service.updateStatus(ticket.id, 'FECHADO')).toThrow(HttpError);
  });

  it('should not find any ticket', () => {
    expect(() => service.updateStatus('', 'EM_ANALISE')).toThrow(HttpError);
  });

  it('should not update closed ticket', () => {
    const ticket = service.create('Teste', 'Desc', 'MEDIA');
    service.updateStatus(ticket.id, 'EM_ANALISE');
    service.updateStatus(ticket.id, 'FECHADO');

    expect(() => service.updateStatus(ticket.id, 'EM_ANALISE')).toThrow(
      HttpError,
    );
  });

  it('should delete a ticket', () => {
    const ticket = service.create('Teste', 'Desc', 'MEDIA');
    service.delete(ticket.id);

    expect(() => service.delete(ticket.id)).toThrow(HttpError);
  });
});

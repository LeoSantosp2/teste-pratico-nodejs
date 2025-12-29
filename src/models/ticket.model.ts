export type TicketStatus = 'ABERTO' | 'EM_ANALISE' | 'FECHADO';
export type TicketPrioridade = 'BAIXA' | 'MEDIA' | 'ALTA';

export interface Ticket {
  id: string;
  titulo: string;
  descricao: string;
  status: TicketStatus;
  prioridade: TicketPrioridade;
  criadoEm: string;
  atualizadoEm: string;
}

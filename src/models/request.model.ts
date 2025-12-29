import { Request } from 'express';

import { TicketStatus } from './ticket.model';

export interface RequestModel extends Request {
  query: {
    status: TicketStatus;
  };
}

import { Router } from 'express';
import { TicketRepository } from '../repositories/ticket.repository';
import { TicketService } from '../services/ticket.service';
import { TicketController } from '../controllers/ticket.controller';

const router = Router();

const repo = new TicketRepository();
const service = new TicketService(repo);
const controller = new TicketController(service);

router.post('/', controller.create);
router.get('/', controller.list);
router.put('/:id/status', controller.updateStatus);
router.delete('/:id', controller.delete);

export default router;

import request from 'supertest';
import express from 'express';
import ticketRoutes from '../../routes/ticket.routes';
import { errorMiddleware } from '../../middlewares/error.middleware';

const app = express();
app.use(express.json());
app.use('/tickets', ticketRoutes);
app.use(errorMiddleware);

describe('TicketController', () => {
  it('POST /tickets - create ticket', async () => {
    const res = await request(app).post('/tickets').send({
      titulo: 'Teste',
      descricao: 'Descricao',
      prioridade: 'ALTA',
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('GET /tickets - list tickets', async () => {
    const res = await request(app).get('/tickets');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PATCH /tickets/:id/status - update status', async () => {
    const create = await request(app).post('/tickets').send({
      titulo: 'Teste',
      descricao: 'Desc',
      prioridade: 'MEDIA',
    });

    const res = await request(app)
      .put(`/tickets/${create.body.id}/status`)
      .send({ status: 'EM_ANALISE' });

    expect(res.body.status).toBe('EM_ANALISE');
  });

  it('DELETE /tickets/:id - remove ticket', async () => {
    const create = await request(app).post('/tickets').send({
      titulo: 'Teste',
      descricao: 'Desc',
      prioridade: 'MEDIA',
    });

    const res = await request(app).delete(`/tickets/${create.body.id}`);

    expect(res.status).toBe(204);
  });
});

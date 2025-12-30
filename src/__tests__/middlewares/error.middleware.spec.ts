import { errorMiddleware } from '../../middlewares/error.middleware';
import { HttpError } from '../../utils/httpError';

describe('ErrorMiddleware', () => {
  it('should return customize error', () => {
    const err = new HttpError(400, 'Erro de teste');
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    errorMiddleware(err, {} as any, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro de teste' });
  });

  it('should return error 500 to unknow error', () => {
    const err = new Error('Erro inesperado');
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    errorMiddleware(err, {} as any, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

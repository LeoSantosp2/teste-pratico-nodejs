import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/httpError';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  console.error('Erro inesperado:', err);

  res.status(500).json({
    error: 'Erro interno do servidor',
  });
}

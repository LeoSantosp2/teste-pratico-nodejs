export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // Garante stack trace correto
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

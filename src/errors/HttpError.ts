export class HttpError extends Error {
  public status: number;
  public details?: any;

  constructor(status: number, message: string = `HTTP Error! Status: ${status}`, details?: any) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
    // Setting the prototype explicitly to ensure `instanceof` works correctly
    Object.setPrototypeOf(this, HttpError.prototype);
  }
};
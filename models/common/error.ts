export class ErrorHandler {
  error: number;
  description: string;
  constructor(status: number, message: string) {
    this.error = status;
    this.description = message;
  }
}

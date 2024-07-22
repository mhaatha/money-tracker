export class ResponseError extends Error {
  constructor(
    public status: number,
    public message: string,
    public error: { [key: string]: string }
  ) {
    super(message);
    this.status = status;
  }
}

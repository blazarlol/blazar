export class CustomError extends Error {
  constructor(
    public message: string,
    public status = 500
  ) {
    super(message);
  }
}

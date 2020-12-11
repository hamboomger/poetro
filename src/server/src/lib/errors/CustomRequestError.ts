class CustomRequestError extends Error {
  name: string;

  errorCode: number;

  errors?: string[];

  constructor(message: string, name: string, errorCode: number, errors?: string[]) {
    super(message);
    this.name = name;
    this.errorCode = errorCode;
    this.errors = errors;
  }

  isServerError(): boolean {
    return this.errorCode >= 500;
  }
}

export default CustomRequestError;

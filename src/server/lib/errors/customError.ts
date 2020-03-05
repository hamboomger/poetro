class CustomError extends Error {
  name: string;

  errorCode: number;

  errors?: string[];

  constructor(message: string, name: string, errorCode: number, errors?: string[]) {
    super(message);
    this.name = name;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}

export default CustomError;

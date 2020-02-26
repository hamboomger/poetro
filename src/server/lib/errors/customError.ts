class CustomError extends Error {
  name: string;

  errorCode: number;

  constructor(message: string, name: string, errorCode: number) {
    super(message);
    this.name = name;
    this.errorCode = errorCode;
  }
}

export function isCustomError(error: Error): error is CustomError {
  return (error as CustomError).errorCode !== undefined;
}

export default CustomError;

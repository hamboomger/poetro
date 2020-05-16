import { CustomValidator, Meta } from 'express-validator';

function containsOnlyStrings(array: any[]): boolean {
  return array.find((element) => typeof element !== 'string') === undefined;
}

const isStringArray: CustomValidator = (value: any, { path } : Meta) => {
  if (!Array.isArray(value) || !containsOnlyStrings(value)) {
    throw new Error(`${path} field should be an array of strings`);
  }
};

export default isStringArray;

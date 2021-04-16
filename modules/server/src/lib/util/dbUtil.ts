import _ from 'lodash';
import { Document } from 'mongoose';

export interface WithId {
  id: string
}

export function toPojo<T extends WithId>(mongooseDoc: Document): T {
  const fields = _.omit(mongooseDoc.toObject(), '_id');
  return {
    id: mongooseDoc.id,
    ...fields,
  } as T;
}

export async function toPojoPromise<T extends WithId>(mongooseDocPromise: Promise<Document>): Promise<T> {
  const mongooseDoc = await mongooseDocPromise;
  return toPojo<T>(mongooseDoc);
}

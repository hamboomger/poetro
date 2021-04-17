import { Document } from 'mongoose';
import _ from 'lodash';

export interface WithId {
  id: string
}

function documentToPojo<T extends WithId>(mongooseDoc: Document): T {
  const fields = _.omit(mongooseDoc.toObject({ virtuals: true }), ['_id']);
  return {
    ...fields,
  } as T;
}

function documentsToPojos<T extends WithId>(docs: Document[]): T[] {
  return docs.map((doc) => documentToPojo(doc));
}

function leanedToPojo<T extends WithId>(leanedDoc: any): T {
  const fields = _.omit(leanedDoc, ['_id']);
  return {
    id: leanedDoc._id as string,
    ...fields,
  } as T;
}

function leanedToPojos<T extends WithId>(docs: any[]): T[] {
  return docs.map((doc) => leanedToPojo(doc));
}

export const mDoc = {
  toPojo: documentToPojo,
  toPojos: documentsToPojos,
};

export const mLeaned = {
  toPojos: leanedToPojos,
};

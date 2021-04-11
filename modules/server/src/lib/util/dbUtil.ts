import _ from 'lodash';
import { Document } from 'mongoose';

export interface WithId {
  id: string
}

function toPojo<T extends WithId>(mongooseDoc: Document): T {
  const fields = _.omit(mongooseDoc.toObject(), '_id');
  return {
    id: mongooseDoc.id,
    ...fields,
  } as T;
}

export default {
  toPojo,
};

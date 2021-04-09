import fs from 'fs';
import appRoot from 'app-root-path';
import path from 'path';
import { Types } from 'mongoose';
import { IUserDocument } from '../models/user';
import Poem, { IPoem, IPoemNoRefs } from '../models/poem';

async function initializeNewUserData(user: IUserDocument) {
  const initialPoemsFilePath = path.resolve(appRoot.path, 'initial-data', 'poems.json');
  const initialPoems = JSON.parse(fs.readFileSync(initialPoemsFilePath, 'utf-8'));

  const userPoems: IPoem[] = initialPoems.map((poem: IPoemNoRefs) => {
    const {
      author, text, name, targetTimeSec, tags,
    } = poem;
    return {
      user: Types.ObjectId(user._id), author, text, name, targetTimeSec, tags,
    };
  });

  // @ts-ignore
  // TODO check whether @types/mongoose still have the same issue with collection property
  await Poem.collection.insertMany(userPoems);
}

export default initializeNewUserData;

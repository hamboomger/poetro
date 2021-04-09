import { Types } from 'mongoose';
import Poem, { IPoem, IPoemDocument } from '../../src/models/poem';
import { IUserDocument } from '../../src/models/user';

async function createAndSaveMockPoem(
  user: IUserDocument,
  variation: number = 1,
  tags: string[] = [],
): Promise<IPoemDocument> {
  const author = `author${variation}`;
  const name = `name${variation}`;
  const text = `text${variation}`;
  const poem: IPoem = {
    user: Types.ObjectId(user._id), author, name, text, targetTimeSec: 100, tags,
  };
  return new Poem(poem).save();
}

export default createAndSaveMockPoem;

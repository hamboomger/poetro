import Poem, { IPoem, IPoemDocument } from '../../src/server/model/poem';
import { IUserDocument } from '../../src/server/model/user';

async function createAndSaveMockPoem(
  user: IUserDocument,
  variation: number = 1,
  tags: string[] = [],
): Promise<IPoemDocument> {
  const author = `author${variation}`;
  const name = `name${variation}`;
  const text = `text${variation}`;
  const poem: IPoem = {
    user: user._id, author, name, text, targetTimeSec: 100, tags,
  };
  return new Poem(poem).save();
}

export default createAndSaveMockPoem;

import { Service } from 'typedi';
import Poem, { IPoem, IPoemDocument } from '../model/poem';
import { TagsService } from './TagsService';

@Service()
export class PoemsService {
  constructor(private tagsService: TagsService) {}

  async getPoemById(poemId: string, userId: string): Promise<IPoemDocument | null> {
    return Poem.findOne({ user: userId, _id: poemId });
  }

  async removeTagFromAllPoems(tagName: string) {
    await Poem.updateMany({ tags: { $in: [tagName] } }, { $pullAll: { tags: [tagName] } });
  }

  async createNewPoem(poem: IPoem, userId: string): Promise<IPoemDocument> {
    await this.tagsService.addAnyNewTagByName(poem.tags, userId);
    return new Poem(poem).save();
  }
}

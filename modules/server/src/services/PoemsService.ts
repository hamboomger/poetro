import { Service } from 'typedi';
import Poem, { IPoem, IPoemDocument } from '../model/poem';
import { TagsService } from './TagsService';

@Service()
export class PoemsService {
  constructor(private tagsService: TagsService) {}

  async removeTagFromAllPoems(tagName: string) {
    await Poem.updateMany({ tags: { $in: [tagName] } }, { $pullAll: { tags: [tagName] } });
  }

  async createNewPoem(poem: IPoem, userId: string): Promise<IPoemDocument> {
    await this.tagsService.addAnyNewTagByName(poem.tags, userId);
    return new Poem(poem).save();
  }
}

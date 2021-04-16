import { Service } from 'typedi';
import { CreateTag, Tag, TagModel } from '../../models/tag';
import { toPojo } from '../../lib/util/dbUtil';

@Service()
export class TagsRepository {
  async findByUserId(uid: string): Promise<TagModel[]> {
    return Tag.find({ userId: { $eq: uid } });
  }

  async findByNames(uid: string, tagsNames: string[]): Promise<TagModel[]> {
    return Tag.find({ name: { $in: tagsNames } });
  }

  async createTag(tag: CreateTag): Promise<TagModel> {
    const createdTag = await new Tag(tag).save();
    return toPojo<TagModel>(createdTag);
  }

  async createTags(tags: CreateTag[]): Promise<TagModel[]> {
    return Tag.insertMany(tags);
  }
}

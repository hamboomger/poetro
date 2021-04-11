import { Service } from 'typedi';
import { CreateTag, Tag, TagModel } from '../../models/tag';
import dbUtil from '../../lib/util/dbUtil';

@Service()
export class TagsRepository {
  async findByUserId(uid: string): Promise<TagModel[]> {
    return Tag.find({ userId: { $eq: uid } });
  }

  async createTag(tag: CreateTag): Promise<TagModel> {
    const createdTag = await new Tag(tag).save();
    return dbUtil.toPojo<TagModel>(createdTag);
  }
}

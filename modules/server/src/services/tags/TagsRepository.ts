import { Service } from 'typedi';
import {
  CreateTag, Tag, TagModel, UpdateTag,
} from '../../models/tag';
import { mDoc, mLeaned } from '../../lib/util/mongo';

@Service()
export class TagsRepository {
  async findByUserId(uid: string): Promise<TagModel[]> {
    const tags = await Tag.find({ userId: { $eq: uid } }).lean();
    return mLeaned.toPojos<TagModel>(tags);
  }

  async findByNames(uid: string, tagsNames: string[]): Promise<TagModel[]> {
    const tags = await Tag.find({ name: { $in: tagsNames } }).lean();
    return mLeaned.toPojos<TagModel>(tags);
  }

  async createTag(tag: CreateTag): Promise<TagModel> {
    const createdTag = await new Tag(tag).save();
    return mDoc.toPojo<TagModel>(createdTag);
  }

  async createTags(tags: CreateTag[]): Promise<TagModel[]> {
    const createdTags = await Tag.insertMany(tags);
    return mDoc.toPojos<TagModel>(createdTags);
  }

  async updateTag(uid: string, tagId: string, tag: UpdateTag): Promise<TagModel | null> {
    const result = await Tag.findOneAndUpdate({
      _id: tagId,
      userId: uid,
    }, {
      $set: {
        color: tag.color,
        name: tag.name,
      },
    }, {
      omitUndefined: true,
      new: true,
    });

    return result ? mDoc.toPojo<TagModel>(result) : null;
  }
}

import _ from 'lodash';
import { Service } from 'typedi';
import { Types } from 'mongoose';
import { ITag, Tag } from '../model/tag';

@Service()
export class TagsService {
  async addAnyNewTagByName(tagsNames: string[], userId: string) {
    const existingTags = await Tag.find({ name: { $in: tagsNames } });
    const existingTagsNames = existingTags.map((t) => t.name);
    const newTagsNames = _.difference(tagsNames, existingTagsNames);
    if (!_.isEmpty(newTagsNames)) {
      const newTags: ITag[] = newTagsNames.map((tagName) => ({
        user: Types.ObjectId(userId),
        name: tagName,
      }));
      await Tag.insertMany(newTags);
    }
  }
}

import _ from 'lodash';
import { Service } from 'typedi';
import { TagModel, Tag } from '../models/tag';
import { TagsRepository } from './tags/TagsRepository';

@Service()
export class TagsService {
  private tagsRepo: TagsRepository;

  constructor(tagsRepo: TagsRepository) {
    this.tagsRepo = tagsRepo;
  }

  async getAll(uid: string): Promise<TagModel[]> {
    return this.tagsRepo.findByUserId(uid);
  }

  async addAnyNewTagByName(tagsNames: string[], userId: string) {
    const existingTags = await Tag.find({ name: { $in: tagsNames } });
    const existingTagsNames = existingTags.map((t) => t.name);
    const newTagsNames = _.difference(tagsNames, existingTagsNames);
    if (!_.isEmpty(newTagsNames)) {
      const newTags: TagModel[] = newTagsNames.map((tagName) => ({
        userId,
        name: tagName,
      }));
      await Tag.insertMany(newTags);
    }
  }
}

import _ from 'lodash';
import { Service } from 'typedi';
import { Optional } from 'utility-types';
import { TagModel, CreateTag, UpdateTag } from '../models/tag';
import { TagsRepository } from './tags/TagsRepository';
import config from '../config/config';

@Service()
export class TagsService {
  private tagsRepo: TagsRepository;

  constructor(tagsRepo: TagsRepository) {
    this.tagsRepo = tagsRepo;
  }

  private async createTagsByNames(uid: string, tagsNames: string[]) {
    const newTags: CreateTag[] = tagsNames.map((tagName) => ({
      color: config.tags.defaultColor(),
      userId: uid,
      name: tagName,
    }));
    await this.tagsRepo.createTags(newTags);
  }

  async getAll(uid: string): Promise<TagModel[]> {
    return this.tagsRepo.findByUserId(uid);
  }

  async createTag(tag: CreateTag): Promise<TagModel> {
    return this.tagsRepo.createTag(tag);
  }

  async createTags(tags: CreateTag[]): Promise<TagModel[]> {
    return this.tagsRepo.createTags(tags);
  }

  async updateTag(uid: string, tagId: string, tag: UpdateTag): Promise<TagModel | null> {
    return this.tagsRepo.updateTag(uid, tagId, tag);
  }

  async addAnyNewTagByName(userId: string, tagsNames: string[]) {
    const existingTags = await this.tagsRepo.findByNames(userId, tagsNames);
    const existingTagsNames = existingTags.map((t) => t.name);
    const newTagsNames = _.difference(tagsNames, existingTagsNames);

    if (!_.isEmpty(newTagsNames)) {
      await this.createTagsByNames(userId, newTagsNames);
    }
  }
}

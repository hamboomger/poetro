import { Service } from 'typedi';
import { TagModel, Tag } from '../../models/tag';

@Service()
export class TagsRepository {
  async findByUserId(uid: string): Promise<TagModel[]> {
    return Tag.find({ userId: { $eq: uid } });
  }
}

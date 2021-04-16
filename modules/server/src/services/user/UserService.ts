import { Service } from 'typedi';
import path from 'path';
import appRoot from 'app-root-path';
import fs from 'fs';
import { Types } from 'mongoose';
import { CreateUser, UserModel } from '../../models/user';
import { UserRepository } from './UserRepository';
import Poem, { IPoem, IPoemNoRefs } from '../../models/poem';
import { CreateTag } from '../../models/tag';
import { TagsService } from '../TagsService';

@Service()
export class UserService {
  private userRepo: UserRepository;

  private tagsService: TagsService;

  constructor(userRepo: UserRepository, tagsService: TagsService) {
    this.userRepo = userRepo;
    this.tagsService = tagsService;
  }

  private async addDefaultTags(user: UserModel) {
    const defaultTagsPath = path.resolve(appRoot.path, 'initial-data', 'tags.json');
    const defaultTagsRaw = JSON.parse(fs.readFileSync(defaultTagsPath, 'utf-8')) as any[];

    const defaultTags: CreateTag[] = defaultTagsRaw.map(
      (tagRaw) => ({
        userId: user.id,
        name: tagRaw.name,
        color: tagRaw.color,
      }),
    );
    await this.tagsService.createTags(defaultTags);
  }

  private async addDefaultPoems(user: UserModel) {
    const initialPoemsFilePath = path.resolve(appRoot.path, 'initial-data', 'poems.json');
    const initialPoems = JSON.parse(fs.readFileSync(initialPoemsFilePath, 'utf-8'));

    const userPoems: IPoem[] = initialPoems.map((poem: IPoemNoRefs) => {
      const {
        author, text, name, targetTimeSec, tags,
      } = poem;
      return {
        user: Types.ObjectId(user.id), author, text, name, targetTimeSec, tags,
      };
    });

    // @ts-ignore
    await Poem.collection.insertMany(userPoems);
  }

  async getUserById(uid: string): Promise<UserModel | null> {
    return this.userRepo.findById(uid);
  }

  async getUserByGoogleId(googleId: string): Promise<UserModel | null> {
    return this.userRepo.findByGoogleId(googleId);
  }

  async createUser(user: CreateUser): Promise<UserModel> {
    const createdUser = await this.userRepo.createUser(user);
    await this.addDefaultTags(createdUser);
    await this.addDefaultPoems(createdUser);
    return createdUser;
  }
}

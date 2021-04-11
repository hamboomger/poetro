import { Service } from 'typedi';
import path from 'path';
import appRoot from 'app-root-path';
import fs from 'fs';
import { Types } from 'mongoose';
import { CreateUser, UserModel } from '../../models/user';
import { UserRepository } from './UserRepository';
import Poem, { IPoem, IPoemNoRefs } from '../../models/poem';

@Service()
export class UserService {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
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
    await this.addDefaultPoems(createdUser);
    return createdUser;
  }
}

import { Service } from 'typedi';
import { UserModel } from '../../models/user';
import { UserRepository } from './UserRepository';

@Service()
export class UserService {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async getUserById(uid: string): Promise<UserModel | null> {
    return this.userRepo.findById(uid);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User ){}

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
      }
    
      async createUser(data: Partial<User>): Promise<User> {
        return this.userModel.create(data);
      }
    
      async resetProblems(): Promise<number> {
        const [_, updated] = await this.userModel.update(
          { hasProblems: false },
          {
            where: { hasProblems: true },
            returning: true,
          },
        );
        return updated.length;
      }
    }
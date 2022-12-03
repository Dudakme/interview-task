import UserRepo from "../repository/user.repository";
import LikabilityRepo from "../repository/likability.repository";
import { InputUser } from "../models";

export class userServiceModule {
    constructor(private userRepo: UserRepo, private likeRepo: LikabilityRepo) {}

    public findUser(id: string) {
        const result = this.userRepo.getUserbyId(id);
        return result
    }

    public async getBadges(id: string) {
        return await this.userRepo.getUserBadges(id)
    }

    public async getUserLikability(id: string) {
        
    }

    public async createUser(options: InputUser) {
        const result = await this.userRepo.createUser(options)
        return result
    }
    
}

export default (users: UserRepo, likabilities: LikabilityRepo) => {
    return new userServiceModule(users, likabilities)
  }
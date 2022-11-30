import UserRepo from "../repository/user.repository";
import LikabilityRepo from "../repository/likability.repository";

export default class userService {
    constructor(private userRepo: UserRepo, private likeRepo: LikabilityRepo) {}

    public async findUser(id: string) {
        return await this.userRepo.getUserbyId(id);
    }

    public async getBadges(id: string) {
        return await this.userRepo.getUserBadges(id)
    }

    public async getUserLikability(id: string) {
        
    }

    
}
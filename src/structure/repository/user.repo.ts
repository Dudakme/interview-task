import { User } from '../entity'

class UserRepo {
    public async getLikability(id: string) {
        return await User.findOne({id: id})
    }
}
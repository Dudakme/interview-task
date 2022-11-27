import { UserModel } from '../entities'


export default class UserRepo {
    constructor(private Model: typeof UserModel) {}

    // 임시적으로 any 사용. 테스트 용, 의존성 주입을 위하여 따로 인수 제작
    public async getUserbyId(id: string): Promise<any> {
        return await this.Model.findOne({ id: id });

    }

    // 임시적으로 any 사용. 테스트 용
    public async updateDateVerifiedbyId(id: string, verifiedAt: Date): Promise<any> {
        return await this.Model.findOneAndUpdate({ id: id }, { verifiedAt: Date })
    }
 }


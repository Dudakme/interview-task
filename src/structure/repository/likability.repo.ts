import { UserModel } from "../entities"

export default class LikabilityRepo {
    constructor(private Model: typeof UserModel) {}

    // 임시적으로 any 사용. 테스트 용
    public async getLikabilitybyId(id: string): Promise<any> {
        return await this.Model.findOne({ id: id});

    }

    // 임시적으로 any 사용. 테스트 용
    public async updateLikabilitybyId(id: string, likability: number): Promise<any> {
        return await this.Model.findOneAndUpdate({ id: id }, { likability: likability })
    }
 }


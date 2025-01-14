import { UserModel } from "../entities"

export default class LikabilityRepo {
    constructor(private Model: typeof UserModel) {}

    // 임시적으로 any 사용. 테스트 용 또 고쳐야함
    public async getLikabilitybyId(id: string): Promise<any> {
        const result = await this.Model.findOne({ id: id });
        if (!result) return 0

        return result.likability;
    }

    // 임시적으로 any 사용. 테스트 용
    public async updateLikabilitybyId(id: string, likability: number): Promise<any> {
        const result = await this.Model.findOneAndUpdate({ id: id }, { likability: likability })
        return result
    }
 }


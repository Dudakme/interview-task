import { BadgeModel, UserModel } from '../entities'
import { IUser } from '../models';


export default class UserRepo {
    constructor(private user: typeof UserModel, private badges: typeof BadgeModel) {}

    // 임시적으로 any 사용. 테스트 용, 의존성 주입을 위하여 따로 인수 제작
    public async getUserbyId(id: string): Promise<any> {
        return await this.user.findOne({ id: id });
    }

    public async getUserBadges(id: string) {
        await this.user.find({ id: id }, (doc: any) => {
            console.log(doc)
        });

    }

    // 임시적으로 any 사용. 테스트 용
    public async updateDateVerifiedbyId(id: string, verifiedAt: Date): Promise<any> {
        return await this.user.findOneAndUpdate({ id: id }, { verifiedAt: verifiedAt })
    }

    public async createUser(options: IUser) {
        const res = new this.user(options);

        res.save((err) => {
            if (err) return err;

            const badge = new this.badges({
                badgeId: "0",
                owner: res.id
            })

            badge.save();
        });

        return
    }
 }

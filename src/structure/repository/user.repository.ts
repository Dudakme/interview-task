import { BadgeModel, UserModel } from "../entities"
import { IBadge, InputUser } from "../models"

export default class UserRepo {
  constructor(
    private user: typeof UserModel,
    private badges: typeof BadgeModel
  ) {}

  // 임시적으로 any 사용. 테스트 용, 의존성 주입을 위하여 따로 인수 제작
  public async getUserbyId(id: string): Promise<any> {
    return await this.user.findOne({ id: id })
  }

  public async getUserBadges(id: string): Promise<IBadge[]> {
    const badges: IBadge[] = await this.badges.find({ id: id })

    return badges
  }

  public async createBadge(options: IBadge): Promise<boolean> {
    const badge = new this.badges(options)

      badge.save((err) => {
        if (err) return false
      })
      return true
  }

  // 임시적으로 any 사용. 테스트 용
  public async updateDateVerifiedbyId(
    id: string,
    verifiedAt: Date
  ): Promise<any> {
    return await this.user.findOneAndUpdate(
      { id: id },
      { verifiedAt: verifiedAt }
    )
  }

  public async createUser(options: InputUser) {
    const res = new this.user(options)

    res.save((err) => {
      if (err) return err

      const badge = new this.badges({
        badgeId: "0",
        owner: res.id,
      })

      badge.save((err) => {
        if (err) return err
      })
    })

    return
  }
}

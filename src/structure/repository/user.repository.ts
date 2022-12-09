import { BadgeModel, UserModel } from "../entities"
import { IBadge, InputUser, IUser } from "../models"

export default class UserRepo {
  constructor(
    private user: typeof UserModel,
    private badges: typeof BadgeModel
  ) {}

  // 임시적으로 any 사용. 테스트 용, 의존성 주입을 위하여 따로 인수 제작
  public async getUserbyId(id: string): Promise<IUser | null> {
    return await this.user.findOne({ id: id })
  }

  public async getUserBadges(id: string): Promise<IBadge[]> {
    const badges: IBadge[] = await this.badges.find({ owner: id })

    return badges
  }

  public async createBadge(options: IBadge): Promise<boolean> {
    const badge = new this.badges(options)
    badge.save()

    const user = await this.user.findOne({ id: options.owner })

    if (!user) return false;

    await this.user.updateOne({ id: options.owner }, { badges: [...user.badges, { owner: options.owner, badgeId: options.badgeId}] })

    return true
  }

  public async getRankers(): Promise<InputUser[]> {
    const collection = await this.user.find()

    return collection.sort((a, b) => {
      return a.badges.length - b.badges.length
    })

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

    res.save(async (err) => {
      if (err) return err

      await this.createBadge({
        badgeId: 0,
        owner: res.id,
      })

      await this.createBadge({
        badgeId: 1,
        owner: res.id,
      })
    })

    return
  }
}

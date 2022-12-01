import mongoose, { Model, Schema } from "mongoose"
import { IUser, IBadge } from "../models"

// 배지도 엔티티로

interface IUserMethod {
  getLikeLevel(): number
}

const badgeSchema = new Schema<IBadge>({
  badgeId: Number,
  owner: {
    type: String,
    ref: "User",
  },
})

const userSchema: Schema = new Schema<IUser>(
  {
    id: String,
    username: String,
    likability: {
      default: 0,
      type: Number,
    },
    battery: {
      default: 100,
      type: Number,
      max: 100,
      min: 0,
    },
    badges: [
      {
        badgeId: Number,
        owner: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    verifiedAt: Date,
  },
  {
    methods: {
      // 수정해여함
      getLikeLevel(id: string) {
        return new Promise(async (resolve, reject) => {
          const found = await this.findOne({ id: id })

          if (found?.likability == undefined) return reject("error") 

          let level = 0
          for (let reach = 30, i = 1; reach + 2; i++) {

            if (found.likability - reach > 0) {
              level = i
            } else break
          }
          resolve(level)
        })
      },
    },
  }
)

type IUserModel = Model<IUser, {}, IUserMethod>
export const UserModel = mongoose.model<IUser, IUserModel, IUserMethod>("User", userSchema)
export const BadgeModel = mongoose.model("Badges", badgeSchema)
import mongoose, { model, Schema } from "mongoose"

export interface User {
  id: string
  username: string
  likability: number // 기본값은 0
  battery: number // 기본값은 100
  badges: mongoose.Types.ObjectId[] | Badge[]
  verifiedAt: Date
}

export interface Badge {
  badgeId: number // 배지의 종류
  owner: mongoose.Types.ObjectId | User
}


const userSchema: Schema = new Schema<User>(
  {
    id: String,
    username: String,
    likability: Number,
    battery: Number,
    badges: [
      {
        badgeId: Number,
        owner: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    verifiedAt: Date
  },
  {
    statics: {
      getLikeLevel(id: string) {
        return new Promise((resolve, reject) => {
          if (this == undefined) return
          this?.find({ id: id }, (err, res) => {
            if (err) {
              return reject(err)
            }
            resolve(res)
          })
        })
      },
    },
  }
)

export const User = mongoose.model('User', userSchema);
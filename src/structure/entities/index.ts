import mongoose, { model, Schema } from "mongoose"
import { IUser, IBadge } from "../models"

const userSchema: Schema = new Schema<IUser>(
  {
    id: String,
    username: String,
    likability: {
      default: 0,
      type: Number
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
    statics: {
      getLikeLevel(id: string) {
        return new Promise((resolve, reject) => {
          this.find({ id: id }, (err, res) => {
            if (err) {
              return reject(err);
            }
            let level = 0
            for (let reach = 30, i = 1; reach + 2; i++) {
              if (res - reach > 0) {
                level = i
              } else break;
            }
            resolve(level)
          })
        })
      },
    },
  }
)

export const UserModel = mongoose.model("User", userSchema);

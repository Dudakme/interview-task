import mongoose, { Model, Schema } from "mongoose"
import { InputUser, IBadge } from "../models"

type BadgeModel = Model<IBadge, {}, {}>

const badgeSchema = new Schema<IBadge, BadgeModel>({
  badgeId: Number,
  owner: {
    type: String,
    ref: "User",
  },
})

interface IUserMethods {
  getLikeLevel(): number
}

type UserModel = Model<InputUser, {}, IUserMethods>;

const userSchema = new Schema<InputUser, UserModel, IUserMethods>(
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
        owner: String
      },
    ],
    verifiedAt: Date,
  }
)

userSchema.method("getLikeLevel", function getLikeLevel(): number {

  if (!this) return 0;

  const { likability } = this
  if (likability > 60) {
    return 2
  } else if (likability > 100) {
    return 3
  } else if (likability > 300) {
    return 4
  } else if ( likability > 800) {
    return 5
  } 
  
  return 1
})


export const UserModel = mongoose.model<InputUser, UserModel>("User", userSchema)
export const BadgeModel = mongoose.model("Badges", badgeSchema)

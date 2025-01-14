import mongoose, { Document } from "mongoose"

export interface IReaction {
  reply: string
  message: string
  likability: number
}

export interface InputUser {
  id: string
  username: string
  likability: number // 기본값은 0
  battery: number // 기본값은 100
  badges: mongoose.Types.ObjectId[] | IBadge[]
  verifiedAt: Date
}

export interface IUser {
  id: string
  username: string
  likability: number // 기본값은 0
  battery: number // 기본값은 100
  badges: mongoose.Types.ObjectId[] | IBadge[]
  verifiedAt: Date
  getLikeLevel(): number
}

export interface IBadge {
  badgeId: number // 배지의 종류
  owner: string | IUser
}

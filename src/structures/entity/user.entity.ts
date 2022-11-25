import mongoose from 'mongoose'

export interface IUser {
    id: string
    username: string
    likability: number  // 기본값은 0
    battery: number  // 기본값은 100
    badges: mongoose.Types.ObjectId[] | IBadge[]
    verifiedAt?: Date
    getLikeLevel(): number  // 호감도를 토대로 호감 레벨을 구하는 메서드
  }
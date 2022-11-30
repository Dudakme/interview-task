import { IReaction } from "../models"
import ReactionRepo from "../repository/reaction.repository"

interface IOptions {
  username?: string
  userMention?: string
  userId?: string
  userTag?: string
}

export default class ReactionService {
  constructor(public ReactionRepo: ReactionRepo) {}

  public async getReaction(message: string, options: IOptions): Promise<IReaction> {
    const e = await this.ReactionRepo.findResponseByMessage(message)

    if (!e) return { likability: 0, reply: "삐리릭?", message: message}
    let response = JSON.stringify(e)

    if (e.reply) {
      Object.entries(options).forEach(([key, value]) => {
        response = response.replaceAll(`{${key}}`, value)
      })
    }

    return JSON.parse(response)
  }
}

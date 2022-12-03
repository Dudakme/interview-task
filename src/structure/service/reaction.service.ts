import { IReaction } from "../models"

import ReactionRepo from "../repository/reaction.repository"
import LikabilityRepo from "../repository/likability.repository"


interface IOptions {
  username: string
  userId: string
  userMention?: string
  userTag?: string
}

const errorMessage = (message: string): IReaction => ({
  likability: 0,
  reply: "삐리릭?",
  message: message,
})

class ReactionServiceModule {
  constructor(public reactions: ReactionRepo, public likabilities: LikabilityRepo) {}

  public async getReaction(
    message: string,
    options: IOptions
  ): Promise<IReaction> {
    const e = await this.reactions.findResponseByMessage(message)

    if (!e) return errorMessage(message)

    let response = JSON.stringify(e)

    Object.entries(options).forEach(([key, value]) => {
      response = response.replaceAll(`{${key}}`, value)
    })

    const result = JSON.parse(response)
    const pastLikability = await this.likabilities.getLikabilitybyId(options.userId)

    this.likabilities.updateLikabilitybyId(options.userId, pastLikability + result.likability)

    return result
  }
}

export default (reactions: ReactionRepo, likabilities: LikabilityRepo) => {
  return new ReactionServiceModule(reactions, likabilities)
}
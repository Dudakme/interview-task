import ReactionRepo from "../repository/reaction.repository"

interface IOptions {
  username?: string
  userMention?: string
  userId?: string
  userTag?: string
}

export default class ReactionService {
  constructor(public ReactionRepo: ReactionRepo) {}

  public async getReaction(message: string, options: IOptions) {
    const e = await this.ReactionRepo.findResponseByMessage(message)
    let response = JSON.stringify(e)

    Object.entries(options).forEach(([key, value]) => {
      response = response.replaceAll(`{${key}}`, value)
    })

    return JSON.parse(response)
  }
}

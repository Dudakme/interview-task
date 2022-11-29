import ReactionRepo from "../repository/reaction.repo"

/*
{happy\}{cry\}{angry\}{think\}{surprised\}
{userMention\}{userId\}{userTag\}
{userLike\}{userLikeLv\}{userBattery\}
{username\} {channelId\} {guildId\}
{year\}{month\}{date\}{day\}
{hours\}{minutes\}{seconds\}{milliseconds\}

크시에서 쓰는 패턴

*/

interface options {
  username?: string
  userMention?: string
  userId?: string
  userTag?: string
}

export default class ReactionService {
  constructor(public ReactionRepo: ReactionRepo) {}

  public async getReaction(message: string, options: options) {
    const e = await this.ReactionRepo.findResponseByMessage(message)
    let response = JSON.stringify(e)

    Object.entries(options).forEach(([key, value]) => {
      response = response.replaceAll(`{${key}}`, value)
    })

    return JSON.parse(response)
  }
}

import {
  Extension,
  command,
} from "@pikokr/command.ts"
import { Message } from "discord.js"

import { ReactionRepository, LikabilityRepository } from ".."
import ReactionService from "../structure/service/reaction.service"

class ChatReactionExtension extends Extension {

  public reactions = ReactionService(ReactionRepository, LikabilityRepository)

  @command({
    name: "크시야",
  })
  async reactionHandler(msg: Message) {
    if (msg.author.bot) return

    const context = msg.content.substring(4)

    const reaction = await this.reactions.getReaction(
      context.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
      {
        userId: msg.author.id,
        username: msg.author.username,
      }
      
    )

    await msg.reply(`${reaction.reply} (:heart: ${reaction.likability})`)
  }
}

export const setup = async () => {
  return new ChatReactionExtension()
}

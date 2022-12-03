import {
  applicationCommand,
  Extension,
  listener,
  command,
  option,
} from "@pikokr/command.ts"
import {
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Message,
  ApplicationCommandOptionType,
} from "discord.js"

import userService from "../structure/service/user.service"
import { UserRepository, LikabilityRepository } from ".."
import { likabilityEmbed } from "../structure/Embed"
import { IUser, IBadge } from "../structure/models"

class PingPongExtension extends Extension {
  public users = userService(UserRepository, LikabilityRepository)

  @applicationCommand({
    name: "배지",
    type: ApplicationCommandType.ChatInput,
    description: "크시와 얼마나 친한지 확인할 수 있어요!",
  })
  async badge(i: ChatInputCommandInteraction) {


    const badgeData: IBadge[] = await this.users.getBadges(i.user.id)
    await i.reply(badgeData.toString())
  }
}

export const setup = async () => {
  return new PingPongExtension()
}

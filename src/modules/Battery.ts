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
import { IUser } from "../structure/models"

import { batteryEmbed } from "../structure/replyTools"

class PingPongExtension extends Extension {
  public users = userService(UserRepository, LikabilityRepository)

  @applicationCommand({
    name: "배터리",
    type: ApplicationCommandType.ChatInput,
    description: "크시를 활용하기 위한 배터리가 얼마나 있는질 알 수 있어요!",
  })
  async battery(i: ChatInputCommandInteraction) {

    const userData = await this.users.findUser(i.user.id)
    if (!userData) {
        await this.users.createUser({
            id: i.user.id,
            username: i.user.username,
            badges: [],
            verifiedAt: new Date(),
            likability: 0,
            battery: 100,
          })

          return await i.reply('새로 가입 되었어요!')
    }
    this.logger.info(`배터리 커멘드가 이용되었습니다. 사용자: ${i.user.id}'`)
    await i.reply({ embeds: [batteryEmbed(i.user, userData.battery)]})
  }
}

export const setup = async () => {
  return new PingPongExtension()
}

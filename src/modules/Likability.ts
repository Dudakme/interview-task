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
    User,
  } from "discord.js"
  
  import userService from "../structure/service/user.service"
  import { UserRepository, LikabilityRepository } from ".."
  import { likabilityEmbed } from "../structure/replyTools"
  import { IUser } from "../structure/models"
  
  class PingPongExtension extends Extension {
    public users = userService(UserRepository, LikabilityRepository)
  
    @applicationCommand({
      name: "호감도",
      type: ApplicationCommandType.ChatInput,
      description: "크시와 얼마나 친한지 확인할 수 있어요!",
    })
    async likability(i: ChatInputCommandInteraction, @option({
      name: "user",
      type: ApplicationCommandOptionType.User,
      description: "호감도를 확인 할 수 있어요!",
    }) userOptional: string) {

      const userTargetId = userOptional ? userOptional : i.user.id;
      const userData = await this.users.findUser(userTargetId)
      const userObject = this.client.users.cache.find(user => user.id === userTargetId) 

      if (!userData) return i.reply('갸우뚱')

      await i.reply({ embeds: [likabilityEmbed(userObject ? userObject.username : '갸우뚱', userData.likability, userData.getLikeLevel())]})
    }
  }
  
  export const setup = async () => {
    return new PingPongExtension()
  }
  
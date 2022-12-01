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
  import { likabilityEmbed } from "../structure/Embed"
  import { UserModel } from "../structure/entities"
  
  class PingPongExtension extends Extension {
    public users = userService(UserRepository, LikabilityRepository)
  
    @applicationCommand({
      name: "likability",
      type: ApplicationCommandType.ChatInput,
      description: "크시와 얼마나 친한지 확인할 수 있어요!",
    })
    async battery(i: ChatInputCommandInteraction) {
  
      const userData: IUser = await this.users.findUser(i.user.id)
      await i.reply({ embeds: [likabilityEmbed(i.user, userData.likability, )]})
    }
  }
  
  export const setup = async () => {
    return new PingPongExtension()
  }
  
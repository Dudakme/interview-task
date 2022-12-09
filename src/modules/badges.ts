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
  Events,
  Interaction,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ApplicationCommandOptionType,
  APISelectMenuOption
} from "discord.js"

import userService from "../structure/service/user.service"
import { UserRepository, LikabilityRepository } from ".."
import { badgeEmbed, BadgeOptionalEmbed, BadgeRow, likabilityEmbed } from "../structure/replyTools"
import { IUser, IBadge } from "../structure/models"

class PingPongExtension extends Extension {
  public users = userService(UserRepository, LikabilityRepository)

  @applicationCommand({
    name: "배지",
    type: ApplicationCommandType.ChatInput,
    description: "크시와 얼마나 친한지 확인할 수 있어요!", 
  })
  async badge(i: ChatInputCommandInteraction, @option({
    name: "user",
    type: ApplicationCommandOptionType.User,
    description: "호감도를 확인 할 수 있어요!",
  }) userOptionalId: string) {

    if (!userOptionalId) {
      userOptionalId = i.user.id
    }
    const badgeData: IBadge[] = await this.users.getBadges(userOptionalId)

  

    await i.reply({
      content: `<@${i.user.id}>`,
      embeds: [badgeEmbed()],
      components: [BadgeRow(badgeData)],
    })
  }

  @applicationCommand({
    name: "배지랭킹",
    type: ApplicationCommandType.ChatInput,
    description: "크시와 얼마나 친한지 확인할 수 있어요!", 
  })
  async badgeRanking(i: ChatInputCommandInteraction) {
    await i.reply({
      content: '아주 평범한 크시의 배지 랭킹이에요!', components: [new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
          new StringSelectMenuBuilder()
            .setPlaceholder("가장 많은 크시 배지를 발견한 사람들")
            .setCustomId('badgeRanking')
            .addOptions((await UserRepository.getRankers()).map<APISelectMenuOption>((v, i) => {
              return {
                label: v.username,
                description: `${i + 1}등입니다!`,
                value: `${i}placement`
              }
            }))
        )
      ]
    })
  }


  @listener({
    event: Events.InteractionCreate,
  })
  async badgeInteraction(i: Interaction) {
    if (!i.isStringSelectMenu()) return

    await i.deferUpdate()
    await i.editReply({ embeds: [BadgeOptionalEmbed(i.values[0])] })
  }
}

export const setup = async () => {
  return new PingPongExtension()
}

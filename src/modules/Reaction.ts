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
  ApplicationCommandOptionType,
} from "discord.js"
import { Message } from "discord.js"

import ReactionRepo from "../structure/repository/reaction.repository"
import ReactionService from "../structure/service/reaction.service"

import { IReaction } from "../structure/models"

/*
아니 왜 맵을 안 써?
미래에 반응을 데이터베이스 몽고디비에서 관리 할시, 데이터는 배열로 주어진다. 
현재 맵으로 한다면, 미래 데이터베이스 적용 속도에 차질이 있을수 있다!

!author 와 같은 패턴은 replace 를 이용해서 바꾸자!
*/
let responses: IReaction[] = [
  {
    message: "안녕",
    reply: "안녕하세요!",
    likability: 1,
  },
  {
    message: "안녕",
    reply: "안녕하세요 {username}님!",
    likability: 1,
  },
  {
    message: "좋아해",
    reply: "저도 {username}님이 좋아요!",
    likability: 3,
  },
  {
    message: "저리가",
    reply: "...그런 말 하시면 슬퍼요...",
    likability: -2,
  },
]

const Reactions = new ReactionService(new ReactionRepo(responses))

class ReactionExtension extends Extension {
  @command({
    name: "크시야",
  })
  async reactionHandler(msg: Message) {
    if(msg.author.bot) return

    this.logger.info("worked")
    const args = msg.content.trim().split(/\s+/)

    const response = await Reactions.getReaction(args[1], { userId: msg.author.id, username: msg.author.username})

    if (!response.reply) {
      msg.reply('ㅇㅅㅇ?')
    }

    msg.reply(response.reply)
  }

  @applicationCommand({
    name: "크시야",
    type: ApplicationCommandType.ChatInput,
    description: "test",
  })
  async commandHandler(
    i: ChatInputCommandInteraction,
    @option({
      name: "name",
      description: "e",
      type: ApplicationCommandOptionType.String,
    })
    text: string
  ) {
    this.logger.info(text)
    const response = await Reactions.getReaction(text, { userId: i.user.id, username: i.user.username})
    i.reply(response.reply)
  }

  //command 가 안됨 임시 방편

  @listener({ event: "messageCreate" })
  async xsiChat(msg: Message) {

    if (!msg.content.startsWith('크시야')) return;

    const args = msg.content.trim().split(/\s+/)

    const response = await Reactions.getReaction(args[1], { userId: msg.author.id, username: msg.author.username})

    if (!response.reply) {
      msg.reply('ㅇㅅㅇ?')
    }

    msg.reply(response.reply)

    
  }
}

export const setup = async () => {
  return new ReactionExtension()
}

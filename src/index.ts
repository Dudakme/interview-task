import UserService from "./structure/service/user.service"
import ReactionService from "./structure/service/reaction.service"
import DatabaseService from "./structure/service/database.service"
import { BadgeModel, UserModel } from "./structure/entities"

import ReactionRepo from "./structure/repository/reaction.repository"
import { IReaction } from "./structure/models"

import { configService } from "./config"
import UserRepo from "./structure/repository/user.repository"

import { Client } from "discord.js"
import { CustomizedCommandClient } from "./structure/Client"
import LikabilityRepo from "./structure/repository/likability.repository"

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

export const UserRepository = new UserRepo(UserModel, BadgeModel)
export const ReactionRepository = new ReactionRepo(responses)
export const LikabilityRepository = new LikabilityRepo(UserModel)


export const Database = DatabaseService(configService)

const client = new Client({
  intents: ["Guilds", "DirectMessages", "GuildMessages", "MessageContent"],
})


const cts = new CustomizedCommandClient(client)

const start = async () => {
  await cts.setup()
  await client.login(configService().token)
  await cts.getApplicationCommandsExtension()!.sync()

  await Database.init(cts.ctsLogger)
}

start().then()

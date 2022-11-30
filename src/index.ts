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



// 어디서 클래스를 인스턴스(서비스, 리포) 하는게 맞는 방법일까? 찾아 볼 필요가 있다.
const Users = new UserRepo(UserModel, BadgeModel)
const DB = new DatabaseService(configService)

const client = new Client({
  intents: ["Guilds", "DirectMessages", "GuildMessages", "MessageContent"],
})


const cts = new CustomizedCommandClient(client)

const start = async () => {
  await cts.setup()
  await client.login(configService().token)
  await cts.getApplicationCommandsExtension()!.sync()

  await DB.connect(cts.ctsLogger)
  await Users.createUser({
    id: "12345",
    username: "test",
    badges: [],
    verifiedAt: new Date(),
    likability: 0,
    battery: 0,
  })
}

start().then()

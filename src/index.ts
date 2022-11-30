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
    reply: "저도 저도 {username}님이 좋아요!",
    likability: 3,
  },
  {
    message: "저리가",
    reply: "...그런 말 하시면 슬퍼요...",
    likability: -2,
  },
]

// 어디서 클래스를 인스턴스(서비스, 리포) 하는게 맞는 방법일까? 찾아 볼 필요가 있다.
const Reactions = new ReactionService(new ReactionRepo(responses))
const Users = new UserRepo(UserModel, BadgeModel)
const DB = new DatabaseService(configService)

const client = new Client({
  intents: ["Guilds", "DirectMessages"],
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

import {
  EmbedBuilder,
  User,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from "discord.js"
import { IBadge } from "./models"

export const batteryEmbed = (user: User, battery: number) => {
  return new EmbedBuilder({
    color: 0xba9fcf,
    author: {
      name: `  ${user.username} 님의 남은 배터리: 🔋 ${battery}%`,
      icon_url: user.displayAvatarURL(),
    },
    footer: {
      text: "📌 크시 배터리는 5분에 1%씩 자동으로 충전됩니다.",
    },
  })
}

export const badgeEmbed = (condition?: string, color?: number) => {
  return new EmbedBuilder({
    color: 0x3498da,
    title: "크시 배지",
    description:
      "도전과제를 클리어해서 모든 배지를 모아보세요! \n \n 🔗 [크시 배지 가이드](https://cafe.naver.com/teamcrescendocafe/book5114759/2331)",
  })
}

const messages: string[] = [
  "음.. 잘 모르겠네요! (머쓱)",
  "그 분이요? 크시가 잘 아는 분이에요!",
  "저랑 친구인 분이에요!",
  "저랑 친한 친구입니다!",
  "제가 너무 좋아하는 분이세요! (헿)",
]

const ranks: string[] = ["잘 모르는 분", "지인", "친구", "친한 친구", "찐친"]
export const likabilityEmbed = (
  user: string,
  likability: number,
  likabilityLevel: number
) =>
  new EmbedBuilder({
    color: 0xba9fcf,
    title: `크시야, ${user}님은 어떤 분이야?`,
    fields: [
      {
        name: "💬 크시의 한마디",
        value: messages[likabilityLevel - 1],
      },
      {
        name: `:trophy: ${likabilityLevel}, ${ranks[likabilityLevel - 1]}`,
        value: `호감도: \` 💕 ${likability} \``,
      },
    ],
    thumbnail: {
      url: "https://images-ext-2.discordapp.net/external/l6uWOt8eGidXqwOtHecva2h64pzY3WKMJakdpdZCkRA/https/cdn.discordapp.com/avatars/419476138331602946/7d8b0f58a4218492825f39166e8b7e4d.webp",
    },
    timestamp: new Date().toISOString(),
  })

type badge = {
  title: string
  description: string
}

const badgeMap = new Map<string, badge>([
  ["0", { title: "가입 성공!", description: "크시를 가입했어요!" }],
  ["1", { title: "옹애옹애?", description: "와 대단하다!" }],
])

export const BadgeRow = (data: IBadge[]) => {
  const row = new StringSelectMenuBuilder()
    .setCustomId("XsiBadge")
    .setPlaceholder("크시 배지")
  data.forEach((value) => {
    const result = badgeMap.get(value.badgeId.toString())

    result &&
      row.addOptions({
        label: result.title,
        description: result.description,
        value: value.badgeId.toString(),
      })
  })

  const result = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    row
  )

  return result
}

export const BadgeOptionalEmbed = (id: string) => {
  const data = badgeMap.get(id)

  if (!data) return new EmbedBuilder({
    title: "에러",
    description: "문제가 생겼어요!" 
  })

  return new EmbedBuilder({
    title: data.title,
    description: data.description
  })
}
  
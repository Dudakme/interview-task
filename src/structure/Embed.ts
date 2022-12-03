import { EmbedBuilder, User } from "discord.js"

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

const messages: string[] = [
  "음.. 잘 모르겠네요! (머쓱)",
  "그 분이요? 크시가 잘 아는 분이에요!",
  "저랑 친구인 분이에요!",
  "저랑 친한 친구입니다!",
  "제가 너무 좋아하는 분이세요! (헿)",
]

const ranks: string[] = ["잘 모르는 분", "지인", "친구", "친한 친구", "찐친"]
export const likabilityEmbed = (
  user: User,
  likability: number,
  likabilityLevel: number
) =>
  new EmbedBuilder({
    color: 0xba9fcf,
    title: `크시야, ${user.username}님은 어떤 분이야?`,
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

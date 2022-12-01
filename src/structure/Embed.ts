import { EmbedBuilder, User } from "discord.js"

export const batteryEmbed = (user: User, battery: number) => {
    return new EmbedBuilder({
        color: 0xBA9FCF,
        author: {
            name: `  ${user.username} 님의 남은 배터리: 🔋 ${battery}%`,
            icon_url: user.displayAvatarURL()
        },
        footer: {
            text: '📌 크시 배터리는 5분에 1%씩 자동으로 충전됩니다.'
        },
    })
}

export const likabilityEmbed = (user: User, likability: number, likabilityLevel?: number) => (
    new EmbedBuilder({
        color: 0xBA9FCF,
        title: `크시야, ${user.username}님은 어떤 분이야?`,
        fields: [
            {
                name: '💬 크시의 한마디',
                value: '음 잘 모르겠네요! (머쓱)',
            },
            {
                name: `레벨 ${likabilityLevel}`,
                value: `호감도: \` 💕 ${likability} \``,
            },
        ],
        thumbnail: {
            url: "https://images-ext-2.discordapp.net/external/l6uWOt8eGidXqwOtHecva2h64pzY3WKMJakdpdZCkRA/https/cdn.discordapp.com/avatars/419476138331602946/7d8b0f58a4218492825f39166e8b7e4d.webp"
        },
        timestamp: new Date().toISOString()
    })
)
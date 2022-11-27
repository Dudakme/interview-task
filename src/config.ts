interface BotConfig {
  token: string
  guilds: string[]
}

interface DBConfig {
    url: string
}

export const botConfig: BotConfig = require("../botConfig.json")
export const dbConfig: DBConfig = require("../dbConfig.json")
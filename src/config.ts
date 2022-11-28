interface Config {
  token: string,
  guilds: string[],
  db_URL: string
}

const config: Config = require("../config.json")

export const configService = (): { token: string, guilds: string[], db_URL: string} => {
  return {
    token: config.token,
    guilds: config.guilds,
    db_URL: config.db_URL
  }
} 
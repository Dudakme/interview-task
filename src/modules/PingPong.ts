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
  Message,
  ApplicationCommandOptionType,
} from "discord.js"

class PingPongExtension extends Extension {
  @listener({ event: "ready" })
  async ready() {
    this.logger.info(`Logged in as ${this.client.user!.tag}`)
    await this.commandClient.fetchOwners()
  }

  @applicationCommand({
    name: "ping",
    type: ApplicationCommandType.ChatInput,
    description: "현재 크시의 상태를 알수 있어요!",
  })
  async ping(i: ChatInputCommandInteraction) {
    await i.reply(`:ping_pong: 퐁이에요! (핑 ${i.client.ws.ping}ms)`)
  }


}

export const setup = async () => {
  return new PingPongExtension()
}

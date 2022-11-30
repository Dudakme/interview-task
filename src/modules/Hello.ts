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

class HelloExtension extends Extension {
  @listener({ event: "ready" })
  async ready() {
    this.logger.info(`Logged in as ${this.client.user!.tag}`)
    await this.commandClient.fetchOwners()
  }

  @applicationCommand({
    name: "ping",
    type: ApplicationCommandType.ChatInput,
    description: "wow this is ping",
  })
  async ping(i: ChatInputCommandInteraction) {
    await i.reply(`current ping: ${i.client.ws.ping}ms`)
  }

  @command({
    name: "ping",
  })
  async reactionHandler(msg: Message) {
    this.logger.info("작동함")
    await msg.reply("작동하는건가?")
  }


}

export const setup = async () => {
  return new HelloExtension()
}

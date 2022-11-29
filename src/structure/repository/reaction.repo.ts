import { IReaction } from "../models"

// map 사용 고려 했으나 미래에 DB 사용을 대비해 배열로 유지
export default class ReactionRepo {
  constructor(private responses: IReaction[]) {}

  public async findResponseByMessage(message: string): Promise<IReaction | undefined> {
    const res = this.responses.filter((e) => e.message === message)
    return res[Math.floor(Math.random()*res.length)]
  }

  public async deleteResponseByReaction(value: IReaction): Promise<IReaction[] | undefined> {
    this.responses = this.responses.filter((e) => e !== value)
    return this.responses
  }

  private async updateResponse(at: IReaction, to: IReaction) {
    /* TO DO 임시적으론 무필요 */
  }

  private async createResponse(input: IReaction) {
    /* TO DO 임시적으론 무필요 */
  }
}

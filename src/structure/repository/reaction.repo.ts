import { Reaction } from '../models'

export default class ReactionRepo {
    constructor(private responses: Reaction[]) { }

    public async findResponse(message: string): Promise<Reaction | undefined> {
        return this.responses.find(e => e.message === message)
    }

    public async deleteResponse(value: Reaction): Promise<Reaction[] | undefined> {
        this.responses = this.responses.filter(e => e == value)
        return this.responses
    }

    private async updateResponse(at: Reaction, to: Reaction) {
        /* TO DO 임시적으론 무필요 */
    }

    private async createResponse(input: Reaction) {
        /* TO DO 임시적으론 무필요 */
    }

}
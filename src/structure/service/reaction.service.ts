import ReactionRepo from '../repository/reaction.repo';


export default class ReactionService {
    constructor(public ReactionRepo: ReactionRepo) {}

    public async getReaction(message: string) {
        return await this.ReactionRepo.findResponse(message)
    }
}

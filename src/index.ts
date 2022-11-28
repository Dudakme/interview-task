import ReactionService from "./structure/service/reaction.service"
import ReactionRepo from "./structure/repository/reaction.repo"
import { IReaction } from "./structure/models"

let responses: IReaction[] = [
    {
        message: '안녕',
        reply: '안녕하세요!',
        likability: 1
    },
    {
        message: '안녕',
        reply: '안녕하세요 !author님!',
        likability: 1
    },
    {
        message: '좋아해',
        reply: '저도 저도 !author님이 좋아요!',
        likability: 3
    },
    {
        message: '저리가',
        reply: '...그런 말 하시면 슬퍼요...',
        likability: -2
    }
]

const test = new ReactionService(new ReactionRepo(responses))

const thise = async () => {
    console.log(await test.getReaction('안녕'))
}

thise()

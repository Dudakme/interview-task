interface response {
    reply: string,
    message: string,
    likability: number
}

let responses: response[] = [
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


class ReactionRepo {
     
    private async findResponse(message: string): Promise<response | undefined> {
        // db 일 경우 대비해 await 작성
        return responses.find(e => e.message === message)
    }

    private async deleteResponse(value: response): Promise<response[] | undefined> {
        responses = responses.filter(e => e == value)
        return responses
    }

    private async updateResponse(message: string) {

    }

    private async createResponse(input: response) {

    }

}
import mongoose from "mongoose"
import { configService } from "../../config"
import { Logger } from 'tslog';

export default class DatabaseService {
    constructor(private config: typeof configService) {}

    public async connect(logger: Logger) {
        mongoose.connect(this.config().db_URL).then(() => {
            logger.info('MongoDB connected')
        }).catch((error => {
            logger.error(error)
        }))
    }
}



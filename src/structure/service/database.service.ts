import mongoose from "mongoose"
import { configService } from "../../config"
import { Logger } from 'tslog';

class DatabaseServiceModule {
    constructor(private config: typeof configService) {}

    public async init(logger: Logger) {
        mongoose.connect(this.config().db_URL).then(() => {
            logger.info('MongoDB connected')
        }).catch((error => {
            logger.error(error)
        }))
    }
}


export default (config: typeof configService) => {
    return new DatabaseServiceModule(config)
  }
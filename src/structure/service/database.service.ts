import mongoose from "mongoose"
import { configService } from "../../config"

export default class DatabaseService {
    constructor(private config: typeof configService) {}

    public async connect() {
        mongoose.connect(this.config().db_URL)
    }
}


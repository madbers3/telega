import * as mongoose from 'mongoose';
import secrets from "../config/secrets";

export default mongoose.connect(secrets.utils.mongo.connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


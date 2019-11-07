import * as passwordHash from 'password-hash';
import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    chatId: number;
    createHash(password: string): string;
    verifyPassword(password: string, hash: string): boolean;
}

export const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    email: {type: String, required: true, index: true},
    hash: {type: String, required: true},
    chatId: {type: Number, required: true, index: true}
});

UserSchema.methods.createHash = function (password: string) {
    return  passwordHash.generate(password);
};

UserSchema.methods.verifyPassword = function(password: string, hash: string): boolean {
    console.log(password, hash);
    return passwordHash.verify(password, hash);
};

export default mongoose.model<IUser>('User', UserSchema);

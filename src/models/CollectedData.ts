import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';  // Assuming you have a User model as defined previously

export interface ICollectedData extends Document {
    amount: number;
    date: Date;
    customerName: IUser['_id'];
    salesman: IUser['_id']; // Reference to the salesman who entered the data
}

const collectDataSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    customerName: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User (salesman)
    salesman: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User (salesman)
});

const CollectedData = mongoose.model<ICollectedData>('CollectedData', collectDataSchema);

export default CollectedData;

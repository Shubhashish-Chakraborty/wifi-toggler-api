import mongoose, { Schema, Document } from 'mongoose';

export interface WifiDocument extends Document {
    isOn: boolean;
}

const WifiSchema = new Schema<WifiDocument>({
    isOn: { type: Boolean, required: true }
});

export const WifiModel = mongoose.model<WifiDocument>('wifi', WifiSchema);

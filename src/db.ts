import mongoose from 'mongoose';

const WifiSchema = new mongoose.Schema({
    isOn: { type: Boolean, required: true},
});

export const WifiModel = mongoose.model('wifi', WifiSchema);
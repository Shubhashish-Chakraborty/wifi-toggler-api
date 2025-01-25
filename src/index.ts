import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import { PORT, MONGO_URL } from './config';
import { WifiModel } from './db';

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(`
        
        <h2>
            Wifi-Toggler API is UP!!!
        </h2>
        
        <a href="https://github.com/Shubhashish-Chakraborty/wifi-toggler" target="_blank">Frontend-Github</a> <br>
        <a href="https://github.com/Shubhashish-Chakraborty/wifi-toggler-api" target="_blank">Backend-Github</a> <br>
    
        <a href="https://shubhhere.vercel.app">Go to the Website!</a>
        
    `)
})

const initializeDatabase = async () => {
    const existingWifi = await WifiModel.findOne();
    if (!existingWifi) {
        await WifiModel.create({ isOn: false });
        console.log("Default entry created in the database.");
    } else {
        console.log("Database already initialized.");
    }
};

initializeDatabase();


app.post("/on", async (req, res) => {
    try {
        const updatedWifi = await WifiModel.findOneAndUpdate({}, { isOn: true }, { new: true });
        res.status(200).json({ message: "WiFi turned ON", isOn: updatedWifi?.isOn });
    } catch (error: any) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
});

// Route to turn WiFi OFF
app.post("/off", async (req, res) => {
    try {
        const updatedWifi = await WifiModel.findOneAndUpdate({}, { isOn: false }, { new: true });
        res.status(200).json({ message: "WiFi turned OFF", isOn: updatedWifi?.isOn });
    } catch (error: any) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
});


async function main() {
    mongoose.connect(MONGO_URL, {
    }).then(() => {
        console.log('Connection Successfully Established to the Database!!');
        app.listen(PORT, () => {
            console.log(`Backend Hosted on: http://localhost:${PORT}`)
        });
    }).catch((err) => {
        console.error(err);
    });

}
main();
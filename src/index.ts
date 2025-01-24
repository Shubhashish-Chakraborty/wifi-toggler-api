import express from 'express';
import cors from "cors";
import { PORT, MONGO_URL } from './config';

const app = express();
app.use(express.json());
app.use(cors());

app.get("/" , (req , res) => {
    res.send("Wifi-Toggler API is UP!!!")
})

app.listen(PORT);
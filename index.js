import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/auth.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(bodyParser.json({'limit':'40mb', 'extended':true}));
app.use(bodyParser.urlencoded({'limit':'40mb', 'extended':true}));
app.use(cors());

app.use('/', router)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Connected to DB \nServer running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))
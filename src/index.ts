import express from "express";
import http from 'http';
import router from "./routes";
import { initWebSocket } from './websocket';

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

app.use(express.json());
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

initWebSocket(server);
const express = require('express');
const next = require('next');
const webpush = require('web-push');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const http = require('http');

app.prepare().then(() => {
    const server = express();
    const httpServer = http.createServer(server);

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const vapidKeys = {
        publicKey: "YOUR_PUBLIC_KEY",
        privateKey: "YOUR_PRIVATE_KEY",
    };

    webpush.setVapidDetails(
        "mailto:test@gmail.com",
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

    let subscriptions = [];

    server.use(express.json());

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
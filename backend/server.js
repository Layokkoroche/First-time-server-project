const express = require("express")
const rateLimit = require("express-rate-limit")
const fs = require('fs');

const app = express()

const limiter = rateLimit({
    windowMs: 600, // За какое время
    max: 10, // ограничение запросов с одного IP
})

app.use(limiter) 

app.use(express.text({ limit: '1kb' })) // принимает текст с ограничением по весу
app.use(express.static("../frontend")) // заглядывает в папку с сайтом

app.post('/api/send', (req, res) => {
    const text = req.body // содержимое сообщения
    const ip = req.ip // IP отправителя

    // записывает в файлик
    fs.appendFile('messages.txt', `${ip}: ${text}\n`, (err) => {
        res.end()
    });
});

app.get('/api/messages', (req, res) => {
    const key = req.query.key

    if (key !== "9bB4a5O63") {
        return res.status(403).send("Forbidden")
    }

    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error");
        res.send(data);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT)
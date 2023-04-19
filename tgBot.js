const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot('5997079179:AAGGzi65hhsZv6LRhJ_q3Yk5OKZXSOuOcNw', {
    polling: true
});
bot.onText(/привет/, async (msg) => {
    console.log(msg)
})
module.exports.sendMessage = async function(message) {
    await bot.sendMessage(-1001795301692,message);
}
module.exports.sendDocument = async function(link) {
    await bot.sendDocument(-1001795301692, link)
}
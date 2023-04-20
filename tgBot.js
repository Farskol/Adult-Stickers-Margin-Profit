const TelegramBot = require("node-telegram-bot-api");
const ind = require("./index");

const bot = new TelegramBot('5997079179:AAGGzi65hhsZv6LRhJ_q3Yk5OKZXSOuOcNw', {
    polling: true
});
// bot.onText(/start/, async (msg) => {
//     console.log(msg)
//     let today = new Date();
//     let day = String(today.getDate()).padStart(2,'0') - 1;
//     let month = String(today.getMonth()+1).padStart(2,'0');
//     let year = today.getFullYear();
//     today = day + '.' + month + '.' + year;
//     ind.getInfo(today);
// })
module.exports.sendMessage = async function(message) {
    //await bot.sendMessage(-1001795301692,message);
    await bot.sendMessage(5752647120,message);
}
module.exports.sendDocument = async function(link) {
    //await bot.sendDocument(-1001795301692, link)
    await bot.sendDocument(5752647120, link)
}
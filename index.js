const { Client, Collection } = require("discord.js");
//const { config } = require("dotenv");
const cron = require('cron')

const client = new Client();

const prefix = "_" //コマンドの最初の文字

config({
    path: __dirname + "/.env"
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
});

const schedule = new cron.CronJob('* */10 * * * *', () => {
    let guild = client.guilds.cache.get("694141924562567219")
    let muteMember = guild.members.cache.filter(member => member.voice.mute)
    let channel = guild.channels.cache.get("726395067039744020")
    let msg = muteMember.map(member => member.displayName)

    channel.send("ミュートのメンバー")
    channel.send(msg.join(", "))
});

client.on("ready", () => {
    console.log(`botが起動しました`)
    schedule.start()
});

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));


    if (!command) return;

    if (command.enabled) {
        command.run(client, message, args);
        console.log(message.author.username + "が" + command.name + "を使用しました");
    }
});

client.login();
module.exports = {
    name: "commandName",
    aliases: ["cmdName","cmdN"],
    enabled: true,
    description: "コマンドの説明",
    run: (client, message, args) => {
        message.channel.send("ExampleCommand")
    }
}

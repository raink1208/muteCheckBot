module.exports = {
    name: "ping",
    enabled: true,
    description: "pingを返します",
    run: (client, message, args) => {
        message.channel.send(client.ws.ping + "ms")
    }
}
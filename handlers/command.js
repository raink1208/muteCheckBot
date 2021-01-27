const { readdirSync } = require("fs")

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let p = require(`../commands/${dir}/${file}`);
            if (p.name) {
                client.commands.set(p.name, p);
                console.log("command: " + p.name + "を読み込みました");
            } else {
                console.log("file: "+ file + ".jsを読み込めませんでした");
                continue;
            }
            if (p.aliases && Array.isArray(p.aliases)) p.aliases.forEach(alias => client.aliases.set(alias, p.name))
        }
    });
};
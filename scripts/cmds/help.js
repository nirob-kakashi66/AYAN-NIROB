fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 𝗛𝗨𝗦𝗦𝗔𝗜𝗡 𝗕𝗢𝗧 ]"; 

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "xos Eren",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "╭───────❁";

      msg += `\n│𝗛𝗨𝗦𝗦𝗔𝗜𝗡 𝗕𝗢𝗧 𝗛𝗘𝗟𝗣 𝗟𝗜𝗦𝗧\n╰────────────❁`; 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────✰『  ${category.toUpperCase()}  』`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 2).map((item) => `⭔${item}`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────✰`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n\n╭─────✰[𝗘𝗡𝗝𝗢𝗬]\n│>𝗧𝗢𝗧𝗔𝗟 𝗖𝗠𝗗𝗦: [${totalCommands}].\n│\n\n╰────────────✰`;
      msg += ``;
      msg += `\n╭─────✰\n│ 𝗛𝗨𝗦𝗦𝗔𝗜𝗡 𝗕𝗢𝗧\n╰────────────✰`; 

const helpListImages = [ "https://i.imgur.com/a3JShJK.jpeg" ];


      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage)
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `
 ╔═════════════════════╗
║ 🔹 COMMAND: 🔶 ${configCommand.name}
╠═══════════════════════╣
║ 📌 Description: ${longDescription}
║ 🆔 Aliases: ${configCommand.aliases}
║ 📎 Version:  ${configCommand.version || "1.0"}
║ 👤 Role: ${roleText}
║ ⏳ Cooldown: ${configCommand.countDown}
║ 👨‍💻 Author:  ${author}
║ 📖 Usage: ${usage}
╚═══════════════════════╝`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}

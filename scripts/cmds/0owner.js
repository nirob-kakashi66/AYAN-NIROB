const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: '𝗛𝗨𝗦𝗦𝗔𝗜𝗡 ',
      gender: 'MaL(মাল)',
      age: '16+',
      height: 'Not Found',
      choise: 'Pizza 🙂🫶🏻',
      youtube : ' এইসব আমার ধারা সম্বব না🙂 '
    };

    const bold = 'https://i.imgur.com/f1f3RCU.mp4'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = ` 
╭[ Itachi  ]• 𝗛𝗨𝗦𝗦𝗔𝗜𝗡  ]  ─⦿
╭────────────◊
├‣ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 
├‣ 𝐍𝐚𝐦𝐞: ${ownerInfo.name}
├‣ 𝐆𝐞𝐧𝐝𝐞𝐫:  ${ownerInfo.gender}
├‣ 𝐀𝐠𝐞 .${ownerInfo.age}
├‣ 𝐘𝐨𝐮𝐭𝐮𝐛𝐞 : ${ownerInfo.youtube}
├‣ 𝐂𝐡𝐨𝐢𝐬𝐞:  ${ownerInfo.choise}   
├‣ 𝐇𝐞𝐢𝐠𝐡𝐭 : ${ownerInfo.height}
╰────────────◊ 
`;

    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};

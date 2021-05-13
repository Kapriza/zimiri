const DisTube = require('distube')

const prefix = "<"

// Create a new DisTube
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });

client.login("ODM2NDM0NTg4ODM4Mzk1OTc0.YId8ag.KwcH2EeOWXnbYT3ypnQukflQ83w");


const activities_list = [ 
    "Playing", 
    "Your Favorite Music",
    ]; // creates an arraylist containing phrases you want your bot to switch through.
  
  client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
  });
  const embed = new Discord.MessageEmbed()
  .setTitle("Musicc Bot")
  .setAuthor("Musicc bot","https://cdn.discordapp.com/attachments/832453689741541377/836437743022112829/0a3152c71e0adf48c7dd20eefc1c0d11.png")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("This bot is Music Bot V2, it will play songs with a simple command.")
  .setFooter("https://cdn.discordapp.com/attachments/832453689741541377/836437743022112829/0a3152c71e0adf48c7dd20eefc1c0d11.png")
  .setImage("https://cdn.discordapp.com/attachments/832453689741541377/836437743022112829/0a3152c71e0adf48c7dd20eefc1c0d11.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/832453689741541377/836437743022112829/0a3152c71e0adf48c7dd20eefc1c0d11.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.com/api/oauth2/authorize?client_id=836434588838395974&permissions=8&scope=bot")
  .addFields({ name: "This bot will pay a song in any Voice Chat ``<play [song]``",
      value: " make sure to play the **BEST MUSIC** "})
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addFields({ name: "Inline Field", value: "make sure to invite the bot ```<invite```", inline: true })
  /*
   * Blank field, useful to create some space.
   */
  .addFields({ name: '\u200b', value: '\u200b' })
  .addFields({ name: "Inline Field 3", value: "musicc bot ", inline: true});
  
  
  
  client.on('message', message => {
    if (message.content === '<help') {
      // send back "Pong." to the channel the message was sent in
      message.channel.send(message.channel.send(embed));
    }
  
  });
  client.on('message', message => {
	if (message.content === '<invite') {
		message.channel.send('https://dsc.gg/musicc-bot');
	}
});
client.login(process.env.token);

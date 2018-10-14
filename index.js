const Discord = require("discord.js");
var crypto = require("crypto");
var schedule = require('node-schedule');
const client = new Discord.Client();
var prefix = ".";
var started = false;
client.on("ready", () => {
  console.log(`InfTools has started!`);
  client.user.setActivity('InfTools', { type: 'PLAYING' });
});
function exit() {
    setTimeout(function() {
        process.exit(1);
    }, 4000);
}
client.on("message", message => {
	if (message.author.id != client.user.id) return;
	if (message.content==`${prefix}start`) {
		message.delete(0);
		if(started != true) {
			started = true;
			console.log('Started!');
			message.channel.send({embed: {
				"title": ".start",
				"color": 8513310,
				"footer": {
				"text": "MEE6TOOLS был запущен!"
				},
				  "author": {
				  "name": message.author.username,
				  "icon_url": message.author.avatarURL
				}
			}
			}).then(sentMessage => {
					sentMessage.delete(5000);
				});
			var timer = schedule.scheduleJob('*/1 * * * *', function(){
				var rand = crypto.randomBytes(20).toString('hex');
				message.channel.send(rand).then(sentMessage => {
					sentMessage.delete(0);
				});
			});
		}else{
			message.channel.send({embed: {
				"title": ".start",
				"color": 16722249,
				"footer": {
				"text": "MEE6TOOLS уже запущен!"
				},
				  "author": {
				  "name": message.author.username,
				  "icon_url": message.author.avatarURL
				}
				}
			}).then(sentMessage => {
					sentMessage.delete(5000);
				});
		}
	}
	if (message.content==`${prefix}stop`) {
		message.delete(0);
		message.channel.send({embed: {
				"title": ".stop",
				"color": 8513310,
				"footer": {
				"text": "Выход из программы успешен!"
				},
				  "author": {
				  "name": message.author.username,
				  "icon_url": message.author.avatarURL
				}
				}
			}).then(sentMessage => {
					sentMessage.delete(5000);
				});
		exit();
	}
	if (message.content==`${prefix}author`) {
		message.delete(0);
		message.channel.send({embed: {
				"title": "Автор",
				"color": 11116789,
				"footer": {
				"text": "Создано InfiniteC0re | v1.1"
				},
				  "author": {
				  "name": message.author.username,
				  "icon_url": message.author.avatarURL
				}
				}
			});
	}
	if (message.content.startsWith(`${prefix}embed`)) {
		message.delete(0);
		const args = message.content.slice('.').trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		var content = args.slice(0).join(" ");
		if(content != "") {
			message.channel.send({embed: {
					"title": "",
					"color": 2528972,
					"footer": {
					"text": content
					},
					  "author": {
					  "name": message.author.username,
					  "icon_url": message.author.avatarURL
					}
					}
				});
		}else{
			message.channel.send({embed: {
				"title": ".embed",
				"color": 16722249,
				"footer": {
				"text": "Сообщение не может быть пустым!"
				},
				  "author": {
				  "name": message.author.username,
				  "icon_url": message.author.avatarURL
				}
				}
			}).then(sentMessage => {
					sentMessage.delete(5000);
				});
		}
	}
});
client.login(process.env.TOKEN);

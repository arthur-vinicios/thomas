const moment = require('moment-timezone')
const {
default:
makeWASocket,
DisconnectReason,
useSingleFileAuthState,
makeInMemoryStore,
MessageType, 
MessageOptions, 
Mimetype,
downloadMediaMessage
} = require("@adiwajshing/baileys")
const fs = require("fs")
const P = require("pino")
const { exec } = require('child_process')
const { color } = require("./lib/color")
const { perfil } = require('./Menu/perfil')
const { menuadmin } = require('./Menu/menuadmin')
const { perfilmenu } = require('./Menu/perfilmenu')
const { regras_add } = require('./Menu/regras_add')
const { levelcom } = require('./Menu/levelcom')
const { menujogos } = require('./Menu/menujogos')
const { regras_bonde } = require('./Menu/regras_bonde')
const { gpof } = require('./Menu/gpof')
const { negara } = require('./Menu/kodenegara')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close, version } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { help } = require('./Menu/help')
try{

global.store = makeInMemoryStore({ })
store.readFromFile("./.dados.json")
setInterval(() => {
store.writeToFile("./.dados.json") }, 10_000) } catch(e){
if (String(e).includes(".json") ){
nome = `${String(e).split("'")[1].split("/")[3]}`
if( String(e).includes("ENOENT:")){console.log(`Erro: #X002\n\no json ${nome}\n não foi encontrado\n`)}else{
console.log(`error detectado ${nome}`)
console.log("Erro #X000")}
}} try{
global.youprofile = JSON.parse(fs.readFileSync("./database/json/YouProfile.json"))
global.prefix = youprofile.Prefix
global.userban = JSON.parse(fs.readFileSync('./database/json/userban.json'))
global.welkom = JSON.parse(fs.readFileSync('./database/json/welkom.json'))
global.nsfw = JSON.parse(fs.readFileSync('./database/json/nsfw.json'))
global.samih = JSON.parse(fs.readFileSync('./database/json/simi.json'))
global._leveling = JSON.parse(fs.readFileSync('./database/json/leveling.json'))
global.bdn = JSON.parse(fs.readFileSync('./database/json/bdn.json'))
global.daftor = JSON.parse(fs.readFileSync('./database/json/daftar.json'))
global.usnio = JSON.parse(fs.readFileSync('./database/json/usnio.json'))
global.at = JSON.parse(fs.readFileSync('./database/json/at.json'))
global.users = JSON.parse(fs.readFileSync('./database/json/users.json'))
global.user = JSON.parse(fs.readFileSync('./database/json/user.json'))
global._level = JSON.parse(fs.readFileSync('./database/json/level.json'))
global.x = JSON.parse(fs.readFileSync('./database/json/x9.json'))
global.contac = JSON.parse(fs.readFileSync('./database/json/contac.json'))
global.u = JSON.parse(fs.readFileSync('./database/json/u.json'))
}catch (e){
if (String(e).includes(".json") || String(e).includes("ENOENT:")){
nome = `${String(e).split("'")[1].split("/")[3]}`
console.log(`error detectado ${nome} #x002`)
if (nome === 'YouProfile.json' ){
exec(`cd database/json/ ; echo {'"Botname"':'"Albion"','"Prefix"':'"!"','"AlbionID"':'"0000AAAA"','"Owner"':'"5516999469735@s.whatsapp.net"','"face"':'"ok"','"insta"':'"lsksks"'}>>${nome}`)
process.exit(0)
} else{
exec(`cd database/json/ ; echo []>>${nome}`)
process.exit(0)
}

}else {
console.log(e)
process.exit(0)
}}

const getLevelingXp = (userId) => { //prgar a quantidade de xp do usuario
            let position = false
            Object.keys(_level).forEach((i) => {
if (_level[i].jid === userId) {
    position = i
}
            })
            if (position !== false) {
return _level[position].xp
            }
        }

        const getLevelingLevel = (userId) => { // pegar o level do usuario
            let position = false
            Object.keys(_level).forEach((i) => {
if (_level[i].jid === userId) {
    position = i
}
            })
            if (position !== false) {
return _level[position].level
            }
        }

        const getLevelingId = (userId) => { //pegar o nyumero do usuario
            let position = false
            Object.keys(_level).forEach((i) => {
if (_level[i].jid === userId) {
    position = i
}
            })
            if (position !== false) {
return _level[position].jid
            }
        }

        const addLevelingXp = (userId, amount) => { //adciona xp
            let position = false
            Object.keys(_level).forEach((i) => {
if (_level[i].jid === userId) {
    position = i
}
            })
            if (position !== false) {
_level[position].xp += amount
fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
            }
        }
 const removexp = (userId, amount) => { //remove xp
            let position = false
            Object.keys(_level).forEach((i) => {
if (_level[i].jid === userId) {
    position = i
}
            })
            if (position !== false) {
_level[position].xp -= amount
fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
            }
        }
        const addLevelingLevel = (userId, amount) => { // adciona lvel
            let position = false
            Object.keys(_level).forEach((i) => {
if (_level[i].jid === userId) {
    position = i
}
            })
            if (position !== false) {
_level[position].level += amount
fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (userId) => { //faz cadastro
let ups = {jid: userId, xp: 0, level: 1}
_level.push(ups)
fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))    
}
async function Albion () {
console.log(banner.string)
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Albion Desenvolvedor\n' // full name
            + 'ORG:Albion Desenvolvedor;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=5516999469735 +55 9 9946-9735\n' // WhatsApp ID + phone number
            + 'END:VCARD'
const { state, saveState } = await useSingleFileAuthState("./.Albion_Desenvolvedor")
const conn = makeWASocket({
logger: P({ level: "silent" }),
printQRInTerminal: true,
auth: state
})

conn.ev.on ("creds.update", saveState)


conn.ev.on("connection.update", (update) => {

const { connection, lastDisconnect } = update
if(connection === "close") {
const shouldReconnect = (lastDisconnect.error).output.statusCode !== DisconnectReason.loggedOut
console.log("Conexão fechada devido a", lastDisconnect.error, "Tentando reconectar...", shouldReconnect)
if (lastDisconnect.error.output.payload.error == "Unauthorized"){
  exec(`rm -rf .dados.json `)
  exec(`rm -rf .Albion_Desenvolvedor `)
  console.log("ptoblema corrigido")
  process.exit(0)
  }
if(shouldReconnect) {
Albion()
}

} else if(connection === "open") {
console.log("\n\nConexão aberta\n\n")
}

})
try {
conn.ev.on("messages.upsert",  async m =>{
global.apoia1 = 'https://albion-desenvolvedor.herokuapp.com'
global.blocked = await conn.fetchBlocklist().then( json =>{
return json}).catch(json =>{console.log(json)})
global.namebot = youprofile.Botname
const mek = m.messages[0]
const from = mek.key.remoteJid
console.log([0])
if (contac.includes(from)){
if(mek.message.conversation){
console.log("ok e menssagem")
console.log(mek.message.contactsArrayMessage)
//var nome_do_contac = mek.message.contactMessage.displayName
} else if (mek.message.contactsArrayMessage.contacts){
ugabuga = mek.message.contactsArrayMessage.contacts

Object.keys(ugabuga).forEach((i) => {

var var1459 = JSON.parse(JSON.stringify(ugabuga[i].vcard.split("=")[1]))
var var8145 = var1459.split(":")[0]
console.log(var8145)
if(!u.includes(var8145) && var8145.length > 10){
test = `*OIE TUDO BEM? ESPERO QUE SIM! QUER GANHAR SEGUIDORES 🚨 ?*

*🔥 SEGUIDORES ?* 🔥
*🔥 CURTIDAS ? 🔥*
*🔥 COMENTARIOS ? 🔥*
*🔥 E AMIZADES ? 🔥*

*SE QUISER  E SO FALAR SIM ?QUE EU TE COLOCO NO GRUPO*

*OU ENTRAR NO NOSSO GRUPO ESTA ABAIXO*

*GRUPO ⬇️*

*https://chat.whatsapp.com/IHEyBFbPxgsIjqpjcxdf1P*`
conn.sendMessage(var8145+"@s.whatsapp.net",{ text: String(test)}, {quoted:mek})
u.push(var8145)
fs.writeFileSync('./database/json/u.json', JSON.stringify(u))}
//var nome_do_contac = mek.message.contactMessage.displayName
//if(!u.includes(var8145)){}
})   

var8145 = 5454
if(!u.includes(var8145) && var8145.length > 10){
test = `*OIE TUDO BEM? ESPERO QUE SIM! QUER GANHAR SEGUIDORES 🚨 ?*

*🔥 SEGUIDORES ?* 🔥
*🔥 CURTIDAS ? 🔥*
*🔥 COMENTARIOS ? 🔥*
*🔥 E AMIZADES ? 🔥*

*SE QUISER  E SO FALAR SIM ?QUE EU TE COLOCO NO GRUPO*

*OU ENTRAR NO NOSSO GRUPO ESTA ABAIXO*

*GRUPO ⬇️*

*https://chat.whatsapp.com/IHEyBFbPxgsIjqpjcxdf1P*`
conn.sendMessage(var8145+"@s.whatsapp.net",{ text: String(test)}, {quoted:mek})
u.push(var8145)
fs.writeFileSync('./database/json/u.json', JSON.stringify(u))}

} else if (mek.message.contactMessage){
var var1459 = JSON.parse(JSON.stringify(mek.message.contactMessage.vcard.split("=")[1]))
var var8145 = var1459.split(":")[0]
console.log(var8145)
var nome_do_contac = mek.message.contactMessage.displayName
if(!u.includes(var8145)){
test = `*OIE TUDO BEM? ESPERO QUE SIM! QUER GANHAR SEGUIDORES 🚨 ?*

*🔥 SEGUIDORES ?* 🔥
*🔥 CURTIDAS ? 🔥*
*🔥 COMENTARIOS ? 🔥*
*🔥 E AMIZADES ? 🔥*

*SE QUISER  E SO FALAR SIM ?QUE EU TE COLOCO NO GRUPO*

*OU ENTRAR NO NOSSO GRUPO ESTA ABAIXO*

*GRUPO ⬇️*

*https://chat.whatsapp.com/IHEyBFbPxgsIjqpjcxdf1P*`
conn.sendMessage(var1459+"@s.whatsapp.net",{ text: String(test)}, {quoted:mek})

u.push(var1459)
fs.writeFileSync('./database/json/u.json', JSON.stringify(u))}

}
else{console.log("ok")}}
const reply = (teks) => {
conn.sendMessage(from,{ text: String(teks)}, {quoted:mek})}

const isGroup = mek.key.remoteJid.endsWith("@g.us")
const isWelkom = isGroup ? welkom.includes(from) : false
const x9 = isGroup ? x.includes(from) : false
if(m.type === 'append' ) {
const base = await JSON.parse(JSON.stringify(m.messages[0]))


t = base.messageStubType
qf = base.key.participant

if (x9){		
if (t === 'GROUP_PARTICIPANT_PROMOTE'){ 
reply("Menbro Promovido.")
}
else if (t === 'GROUP_PARTICIPANT_DEMOTE'){ 
reply("menbro rebaixado")
}
else if (t === 'GROUP_PARTICIPANT_REMOVE'){
reply("menbro banido")
}
else if (t === 'GROUP_PARTICIPANT_ADD'){
reply("Bem vindo")
}
else if (t === 'GROUP_PARTICIPANT_LEAVE'){
reply("Ele saiu")
}
}if(isWelkom){
if (t === 'GROUP_PARTICIPANT_REMOVE'){
reply("menbro banido")

 
}
else if (t === 'GROUP_PARTICIPANT_ADD'){
reply("Bem vindo")

}
else if (t === 'GROUP_PARTICIPANT_LEAVE'){
reply("Ele saiu")

}
}}


const time = moment.tz('Etc/GMT+3').format('DD/MM HH:mm:ss')
const content = JSON.stringify(mek.message)
const date = time.split(" ")[0]
await conn.sendReadReceipt(mek.key.remoteJid, mek.key.participant, [mek.key.id])
if (!mek.key.participant) mek.key.participant = mek.key.remoteJid
mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "")
if (!mek.message) return

const type = Object.keys(mek.message).find((key) => !['senderKeyDistributionMessage', 'messageContextInfo'].includes(key))
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close, version } = require('./lib/functions')

const body = (type === 'conversation' &&
mek.message.conversation.startsWith(prefix)) ?
mek.message.conversation: (type == 'imageMessage') &&
mek.message[type].caption.startsWith(prefix) ?
mek.message[type].caption: (type == 'videoMessage') &&
mek.message[type].caption.startsWith(prefix) ?
mek.message[type].caption: (type == 'extendedTextMessage') &&
mek.message[type].text.startsWith(prefix) ?
mek.message[type].text: (type == 'listResponseMessage') &&
mek.message[type].singleSelectReply.selectedRowId ?
mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == 'templateButtonReplyMessage') ?
mek.message.templateButtonReplyMessage.selectedId: (type === 'messageContextInfo') ?
mek.message[type].singleSelectReply.selectedRowId: (type == 'conn.sendMessageButtonMessage') &&
mek.message[type].selectedButtonId ?
mek.message[type].selectedButtonId: (type == 'stickerMessage') && ((mek.message[type].fileSha256.toString('base64')) !== null && (mek.message[type].fileSha256.toString('base64')) !== undefined) ? (mek.message[type].fileSha256.toString('base64')): ""
const botNumber = conn
const sender = isGroup ? mek.key.participant : mek.key.remoteJid
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ""
const groupName = isGroup ? groupMetadata.subject : ""
const ownerNumber = youprofile.Owner// replace this with your number
const nomorOwner = [ownerNumber]
const isOwner = ownerNumber.includes(sender)
//const totalchat = await Albion.chats.all()
//const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || isOwner || false
//const isWelkom = isGroup ? welkom.includes(from) : false
//const isNsfw = isGroup ? nsfw.includes(from) : false
//const isSimi = isGroup ? samih.includes(from) : false
 

at = 0
setTimeout(() => {
  console.log();
}, 5000)
var n = new Date();
atual_dia = String(n).split(' ')[2]
atual_hora = String(n).split(' ')[4].split(':')[0]
atual_minuto  = String(n).split(' ')[4].split(':')[1]
atual_segundo = String(n).split(' ')[4].split(':')[2]
data = time.split('/')[0] 
hora = time.split(':')[0].split(' ')[1]
minuto = time.split(':')[1]
segundos= time.split(':')[2]


const isUser = user.includes(sender)
const isLevelingOn = isGroup ? _leveling.includes(from) : true
const NomerOwner = youprofile.Owner
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = body.startsWith(prefix)
const pushname = mek.pushName ? mek.pushName : ""
const args = body.trim().split(/ +/).slice(1)
 const oros = body.slice(0).split('@').shift()

 
const sendMess = (hehe, teks) => {
conn.sendMessage(hehe, { text: String(teks)})
			}
			
			const sendcontact = (hehe) =>{ conn.sendMessage(
    from,
    { 
        contacts: { 
            displayName: 'Albion desenvolvedor', 
            contacts: [{ vcard }] 
        }
    }
)}
const men = (id, text,kj) => {
    conn.sendMessage(id, { text: text , mentions: kj},  {quoted:mek})
  }    
		
if(atual_dia === data){ 
if (atual_minuto === minuto){ 
if ( atual_hora === hora  ){

colors = ['red','white','black','blue','yellow','green']

// organizar os dados dos usuarios
if (userban.includes(sender)){
 console.log(userban)
 if (oros.includes(prefix)){
 
 return reply("Usuario bloqueado (A)")
}
 }
 
 if (daftor.includes(from)) {if (oros.includes(`rgt 0`)){
 if (!isGroup) return reply("triste")
 if (!isGroupAdmins) return reply("Sem Autorização")
 
		daftor.splice(from, 1)
		fs.writeFileSync('./database/json/daftar.json', JSON.stringify(daftor))
		reply('❬ SUCESSO ❭')}
 else{
 console.log("\n============================================================")
 console.log(`\n\n[❗]  Grupo ${groupName} está usando RGT \n\n`)
 console.log(`Grupo: ${groupName}\nUltima mensagem: ${oros}`)
 console.log(`\n\n[❗]  Grupo ${groupName} está usando RGT \n\n`) 
 console.log("============================================================\n")
 return 
 
 
}
 }
 
duf = 'n'
let position = false
Object.keys(users).forEach((i) => {
if (users[i].numero === sender.split('@')[0]) {
    position = i
} 
if (position !== false) {
 duf = 'sim'
 if (users[position].contype === "0" ){
nameuser = users[position].name
idadeuser = users[position].idade
usernum = users[position].numero
usertime = users[position].time1
userdate = date
userdesc = users[position].desc
usertype = users[position].contype
usergroup= users[position].Nome_do_grupo
id_base = users[position].id
levelcomm = users[position].levelcom

     }
  else if (users[position].contype === "1"){
  //È
  }
  else if (users[position].contype === "2") {
  //È
  } 
}

else{

           nameuser = "Desconhecido"
   
            
            }

        
})   



// fim
if (isGroup && isLevelingOn && isUser) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
          
            try {
if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
const amountXp = 500
const requiredXp = 5000 * (Math.pow(2, currentLevel))
               
const getLevel = getLevelingLevel(sender)
global.getLevel
addLevelingXp(sender, amountXp)

if (requiredXp <= getLevelingXp(sender)) {
    addLevelingLevel(sender, 1)
    await reply(`*「 LEVEL UP 」*\n\n➸ *Nome*: ${nameuser}\n➸ *XP*: ${getLevelingXp(sender)}\n➸ *Level*: ${getLevel} -> ${getLevelingLevel(sender)}\n\nParabéns!! 🎉🎉`)
}
            } catch (err) {
console.error(err)
            }
        } 
mess = {
wait: '⌛ carregando... se eu não enviar tente novamente em 10s⌛',
success: '✔️ Successor ✔️',
           levelon: '❬ ✔ ❭ *habilitar Level*',
leveloff: ' ❬ X ❭  *desabilitar Level*',
levelnoton: '❬ X ❭ *level não ativo*',
levelnol: '*Pqp ksks level* 0 ',
error: {
stick: '[❗] Falha, ocorreu um erro ao converter a imagem em um adesivo ❌',
Iv: '❌ Link inválido ❌',
NotXp: `❌ Voçê não possui xp sufciente para isso! ❌`,
},
only: {
group: '[❗] Este comando só pode ser usado em grupos! ❌',
groupn: '[❗] Este comando só pode ser usado no pv! ❌',
ownerG: '[❗] Voçê não tem acesso a esse comando  ❌',
ownerB: '[❗] Acesso negado ❌',
admin: '[❗] Este comando só pode ser usado por administradores de grupo! ❌',
Badmin: '[❗] Este comando só pode ser usado quando o bot se torna administrador! ❌',
daftarB:`── 「REGISTRE-SE」 ──\n\nVOCÊ NÃO ESTÁ EM NOSSO BANCO DE DADOS DIGITE\n\n ${prefix}daftar Nome|Idade\n\n Segue o exemplo ${prefix}daftar ${namebot}|${time.split("/")[0]} `,
}
}
			
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
console.log(`\n\n`) }}}
			
		
 const templateButtons = [
    {index: 1, urlButton: {displayText: 'Acesse nosso grupo oficial!', url: 'https://chat.whatsapp.com/Ee1CGZJJmyl466XLt3tFTb'}},
    {index: 2, callButton: {displayText: 'Call me!', phoneNumber: '+55 (16) 996368121'}},
    {index: 3, quickReplyButton: {displayText: 'Menu Jogos!', id: `${prefix}menujogos`}},
]

const templateMessage = {
    text: help(prefix, sender,getLevelingLevel(sender),namebot, user, apoia1, blocked, date, time,nameuser,NomerOwner,youprofile.AlbionID,youprofile.face,youprofile.insta ),
    footer: 'Hello World',
    templateButtons: templateButtons
}
global.isMedia = (type === 'imageMessage' || type === 'videoMessage')
			global.isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			global.isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			global.isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')


switch (command) {
case "sendcontc":
if (args.length < 1 || args.length > 25) return reply("Digite 1 pra ativar e 0 pra desativar")
if (!isUser) return reply("Não conheço você, idiota.")
if (!isGroupAdmins) return reply("Menbro Sem autorização.")
if (Number(args[0]) === 1) {
if (contac.includes(from)) return reply('já estava bloqueado')
contac.push(from)
fs.writeFileSync('./database/json/contac.json', JSON.stringify(contac))
reply('❬ SUCESSO ❭')
break
} else if (Number(args[0]) === 0) {
if (!contac.includes(from)) return reply('continua ativo')
contac.splice(from, 1)
fs.writeFileSync('./database/json/contac.json', JSON.stringify(contac))
reply('❬ SUCESSO ❭ ')}
break	

default:
await conn.presenceSubscribe(from) 
if (isCmd && body != undefined) {
	console.log(body)
	reply(`Olá ${nameuser} o comando *${command}* não é reconhecido.`)
} else {
	console.log(color('[WARN]','red'), 'Comando Não Registrado', color(sender.split('@')[0]))
	
	console.log(`\n\n`)
}
}
	


///fggfgfg


})

}catch (e){console.log(String(e))}
}
Albion().catch(e => {
console.log(`${e}`)
})

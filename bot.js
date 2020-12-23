const SteamUser = require('steam-user')
const SteamTotp = require('steam-totp')
const config = require('./config.json')
const client = new SteamUser()
const logOnOptions = {
    accountName: config.nome,
    password: config.senha,
    twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
}

client.logOn(logOnOptions)
client.on('loggedOn', () => {
    console.log('Conectado com sucesso.')
    client.setPersona(SteamUser.EPersonaState.Away)
    client.gamesPlayed("Contra Ataque: Global Ofensivo",730);
})

client.on("friendMessage", function(steamID, message) {
    if (message == "ola") {
        client.chatMessage(steamID, "Olá viadao, quer oq??")
    }
})
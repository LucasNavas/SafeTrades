const SteamUser = require('steam-user')
const SteamTotp = require('steam-totp')
const SteamCommunity = require('steamcommunity')
const TradeOfferManager = require('steam-tradeoffer-manager')
const config = require('./config.json')

const client = new SteamUser()
const community = new SteamCommunity()
const manager = new TradeOfferManager({
    steam: client,
    community: community,
    language: 'br'
})

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

client.on('WebSession', (sessionid, cookies) =>{
    manager.setCookies(cookies)
    community.setCookies(cookies)
    community.startConfirmationChecker(10000, config.identifiySecret)
    
})
function acceptOffer(offer){
    offer.accept((err) => {
        if (err) console.log("Não foi possível aceitar a troca.")
    })
}
function declineOffer(offer){
    offer.decline((err) => {
        if (err) console.log("Não foi possível recusar a troca.")
    })
}

client.setOption("promptSteamGuardCode", false)
manager.on('newOffer',(offer) => {
    if(offer.partner.getSteamID64() === config.ownerID) {
        acceptOffer(offer)
    } else {
        declineOffer(offer)
    }
})
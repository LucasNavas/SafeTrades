const SteamUser = require('steam-user');
const config = require('./config.json');
const client = new SteamUser();
const logOnOptions = {
    accountName: config.nome,
    password: config.senha
};

client.logOn(logOnOptions);
client.on('loggedOn', () => {
    console.log('Conectado com sucesso.')
    client.setPersona(SteamUser.EPersonaState.Away);
    client.gamesPlayed('bolsonaro safada', 440);
});
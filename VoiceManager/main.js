let events = require('events');
let eventEmitter = new events.EventEmitter();
let Connexion = require('./Connexion');
updateTime = 500

function updateEvent(){ // On enregistre l'evenement d'update
    setTimeout(() => {
        eventEmitter.emit('update'); // On appelle l'evenement
        updateEvent();
    }, updateTime); // On update tout les updateTime
}

function test(){
    players = [
        "Rogers Ariste",
        "Antonio Pazinni",
        "Priappel Lemoche",
        "Jeanne Onyme",
        "Riz Olaiz"
    ]

    for(let i = 0; i < 20 ; i ++){
        let ps = []
        for(let pl of players){
            if(Math.floor(Math.random()*2)) ps.push(pl)
        }
        
        let c = new Connexion(ps)
        console.log(c);
    }
}
test();

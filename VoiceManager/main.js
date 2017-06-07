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
function Distance(vec1, vec2){
    return Math.sqrt(Math.pow((vec1.x - vec2.x),2) + Math.pow((vec1.y - vec2.y),2) + Math.pow((vec1.z - vec2.z),2));
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
    let c2 = Connexion.join(players[4], 4);
    Connexion.join(players[4], 4);
    Connexion.join(players[1], 4);
    console.log(c2);
}
test();

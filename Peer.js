let BrowserManager = require("BrowserManager.js").BrowserManager; // On recupere le manager de browser
let vocalBrowser = BrowserManager.openPage(100,"vocalManager","https://vocal.lambda-company.fr", "MANAGER"); // On ouvre la page de vocal
class Peer { // Un peer est une connexion avec un seul client distant.
    constructor(clientId, initiator, offer = null){
        this.id = clientId;
        this.isInitial = isInital
        this.startPeer();
        Peer.peers.push(this);
    }
    get distance(){ // Permet d'avoir la distance entre les deux clients;
        return Math.sqrt(position.x * position.x + position.y * position.y + position.z * position.z)
    }
    get position(){ // La position relative du client distant
        return {
            x: this.client.position.x - local.position.x,
            y: this.client.position.y - local.position.y,
            z: this.client.position.z - local.position.z
        }
    }
    get local(){ // Le client local
        return mp.players.local;
    }
    get client(){ // Le client distant
        for(let client of mp.players){
            if(client.id === id){
                return client;
            }
        }
    }
    startPeer(){
        vocalBrowser.execute("startPeer(" + this.initiator + "," + this.id + ")")
    }
    sendSignal(){
        let func = () => {
            let id = indexDictionnary[{0}];
            let message = netMessages[id];
            mp.trigger('sendSignal', {0}, message);
        }
    }
    
}
Peer.peers = [] // La liste des peers existant
function updatePeerList(){
    for(let client of mp.players){
        let exist = false;
        for(let peer of Peer.peers){
            if(peer.id === client.id) {
                exist = true;
                break;
            }
        }
        if(!exist){
            new Peer(client.id, true); // On créé un nouveau peer
        }
    }
}

exports.Peer = Peer;
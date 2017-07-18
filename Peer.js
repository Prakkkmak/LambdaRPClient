let BrowserManager = require("BrowserManager.js").BrowserManager; // On recupere le manager de browser

let vocalBrowser = BrowserManager.openPage(100,"vocalManager","https://vocal.lambda-company.fr", "MANAGER"); // On ouvre la page de vocal

class Peer { // Un peer est une connexion avec un seul client distant.

    constructor(clientId, initiator){
        this.id = clientId;
        this.isInitial = initiator;
        this.startPeer();
        mp.events.callRemote("console", mp.players.local.id + " s'est connecté à " + this.id);
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
        vocalBrowser.execute("startPeer(" + this.isInitial + "," + this.id +");");
        if(this.isInital){
             mp.events.callRemote("sendStartPeer", mp.players.local.id, this.id);
             this.sendOffer();
        }
    }
    sendOffer(){
        let fun = () => {
            let offer = getMessage('#0');
            mp.trigger('sendOffer', '#1', offer);
        }
        fun = fun + "";
        fun = fun.replace("'#0'", this.id);
        fun = fun.replace("'#1'", this.id);
        vocalBrowser.execute(fun);
    }
    receiveOffer(offer){
        vocalBrowser.execute("sendSignal(" + this.id + "," + offer + ");");
        this.sendAnswer();
    }
    sendAnswer(){
        let fun = () => {
            let answer = getMessage('#0');
            mp.trigger('sendAnswer', '#1', answer);
        }
        fun = fun + "";
        fun = fun.replace("'#0'", this.id);
        fun = fun.replace("'#1'", this.id);
        vocalBrowser.execute(fun);
    }
    receiveAnswer(answer){
        vocalBrowser.execute("sendSignal(" + this.id + "," + answer + ");");
    }
    static getPeer(id){
        for(let peer of Peer.peers){
            if(peer.id === id) return peer;
        }
        return null;
    }
}

Peer.peers = [] // La liste des peers existant

function updatePeerList(){
    for(let client of mp.players.toArray()){
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
function update(){
    mp.events.callRemote("console", ".");
     setTimeout(() => {
        update();
    }, 5000)
}

update();


exports.Peer = Peer;
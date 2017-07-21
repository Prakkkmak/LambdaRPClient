let BrowserManager = require("BrowserManager.js").BrowserManager; // On recupere le manager de browser

let vocalBrowser = BrowserManager.openPage(100,"vocalManager","https://lambdarp.fr/vocal2/index.html", "MANAGER"); // On ouvre la page de vocal

let log = (text) => {
    vocalBrowser.execute("mp.trigger('console', '[WEBRTC - DEBUG]" + text + "'");
}

class Peer { // Un peer est une connexion avec un seul client distant.

    constructor(clientId, initiator){
        this.id = clientId;
        this.isInitial = initiator;
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
        mp.console("Démarage du peer avec " + this.id + " initiator : " + this.isInitial);
        let cb = "let msg = getMessage("+this.id+"); mp.trigger('sendOffer',"+this.id+", JSON.stringify(msg))"
        //vocalBrowser.execute("startPeer(" + this.isInitial + "," + this.id +", () => {mp.trigger('sendOffer',"+this.id+",getMessage("+this.id+"))});");
        vocalBrowser.execute("startPeer(" + this.isInitial + "," + this.id +", () => { "+ cb +" });");
        if(this.isInitial){
            mp.console("C'est un initiator, lancement d'un peer à " + this.id);
            mp.events.callRemote("sendStartPeer", this.id);
            //this.sendOffer();
        }
    }
    receiveOffer(offer){
        // A CONTINUER ICI
        let cb = "let msg = getMessage("+this.id+"); mp.trigger('sendOffer',"+this.id+", JSON.stringify(msg))"
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

Peer.updatePeerList = () => {
    mp.console("Update de peers");
    for(let client of mp.players.toArray()){
        //if(client !== mp.players.local){
            let exist = false;
            for(let peer of Peer.peers){
                if(peer.id === client.id) {
                    exist =  new Peer(client.id, true); // On créé un nouveau peer
                    break;
                }
            }
            if(!exist){
                new Peer(client.id, true); // On créé un nouveau peer
            }
        //}
    }
}

exports.Peer = Peer;
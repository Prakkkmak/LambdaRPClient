let BrowserManager = require("BrowserManager.js").BrowserManager; // On recupere le manager de browser

let vocalBrowser = BrowserManager.openPage(100,"vocalManager","https://lambdarp.fr/vocal2/index.html", "MANAGER"); // On ouvre la page de vocal
vocalBrowser.execute("window.location.reload(true);")

const STREAM_DISTANCE = 100;
let local = mp.players.local;
let log = (text) => {
    vocalBrowser.execute("mp.trigger('console', '[WEBRTC - DEBUG]" + text + "'");
}

class Peer { // Un peer est une connexion avec un seul client distant.
    constructor(clientId, initiator){
        this.id = clientId;
        this.isInitial = initiator;
        this.proximity = true;
        this.startPeer();
        Peer.peers.push(this);
    }
    get distance(){ // Permet d'avoir la distance entre les deux clients;
        let position = this.position;
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
    get client() {
        return mp.players.at(this.id);
    }
    get distance(){
        let vec1 = this.local.position;
        let vec2 = this.client.position;
        return Math.sqrt(Math.pow((vec1.x - vec2.x),2) + Math.pow((vec1.y - vec2.y),2) + Math.pow((vec1.z - vec2.z),2));
    }
    startPeer(){
        mp.console("Démarage du peer avec " + this.id + " initiator : " + this.isInitial);
        mp.console(local.id + " " + this.id)
        let cb = "let msg = getMessage("+this.id+"); mp.trigger('sendOffer',"+this.id+", JSON.stringify(msg))"
        if(this.isInitial){
            vocalBrowser.execute("startPeer(" + this.isInitial + "," + this.id +", () => { "+ cb +" });");
            mp.console("C'est un initiator, lancement d'un peer à " + this.id);
            mp.events.callRemote("sendStartPeer", this.id);
        
        }
        else{
             vocalBrowser.execute("startPeer(" + this.isInitial + "," + this.id + ")");
        }
    }
    receiveOffer(offer){
        mp.console("Réponse envoyée")
        let cb = "let msg = getMessage("+this.id+");console('TA MERE LA PUTE' + msg); mp.trigger('sendAnswer',"+this.id+", JSON.stringify(msg))"
        vocalBrowser.execute("sendSignal(" + this.id + ","+offer+",false, () => { "+ cb +" });")
    }
    receiveAnswer(answer){
        mp.console("Réponse reçue")
        let cb = "mp.trigger('vocalEstablished',"+this.id+")"
        vocalBrowser.execute("sendSignal(" + this.id + "," + answer + ",true, () => { "+ cb +" });");
    }
    vocalEstablished(){
        this.vocalLaunched = true
        mp.console("[CONNEXION ESTABLICHED] " + local.id + " est en connexion avec " + this.id)
        if(this.proximity) {
            vocalBrowser.execute("instantiatePanner(" + (STREAM_DISTANCE / 1.5) + "," + this.id + ");");
        }
    }
   
    destroy(){

        vocalBrowser.execute("destroy(" + this.id + ")");
        Peer.peers.splice(Peer.peers.indexOf(this),1);
        mp.events.callRemote("deletePeer", this.id);
        mp.console("[CONNEXION DESTROYED] " + local.id + " n'est plus en connexion avec " + this.id)
        
    }
    updatePosition(){
        let relativePosition = {
            x: this.client.position.x - this.local.position.x,
            y: this.client.position.y - this.local.position.y,
            z: this.client.position.z - this.local.position.z
        }
        
        vocalBrowser.execute("setSourcePosition(" + this.id + "," + relativePosition + ");");
    }
    update(){
        if(this.vocalLaunched){
            if(this.proximity){
                this.updatePosition();
                if(this.distance > STREAM_DISTANCE){
                    this.destroy();
                }
            }
        }
        
    }
    static getPeer(id){
        for(let peer of Peer.peers){
            if(peer.id === id) return peer;
        }
        return null;
    }
}
let distance = (vec1, vec2) => {
    return Math.sqrt(Math.pow((vec1.x - vec2.x),2) + Math.pow((vec1.y - vec2.y),2) + Math.pow((vec1.z - vec2.z),2));
}
Peer.peers = [] // La liste des peers existant
Peer.updatePeerList = () => {
    for(let peer of Peer.peers){
        peer.update();
    }
    for(let client of mp.players.toArray()){
        if(client !== local){
            if(distance(client.position, local.position) < STREAM_DISTANCE){
                let exist = false;
                for(let peer of Peer.peers){
                    if(peer.id === client.id) {
                        //mp.console(local.id + " est déjà en connexion avec " + client.id);
                        exist = true;
                    }
                }
                if(!exist){ // Si le peer n'existe pas déjà
                    //mp.console(local.id + " n'est pas en connexion avec " + client.id);
                    mp.events.callRemote("askForPeer", client.id);
                }
            }
        }
    }
}

exports.Peer = Peer;
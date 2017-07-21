const Peer = require("Peer").Peer;
mp.events.add({
    "sendOffer": (clientId, offer) => {
        mp.console("Envoi de l'offre "  + offer + " à " + clientId);
        mp.events.callRemote("sendOffer",clientId, offer);
    },
    "receiveOffer": (senderClientId, offer) => {
        mp.console("offrer : " + offer)
        let peer = Peer.getPeer(senderClientId);
        peer.receiveOffer(offer);
    },
    "sendAnswer": (clientId, answer) => {
        mp.events.callRemote("sendAnswer",mp.players.local.id ,clientId, answer);
    },
    "receiveAnswer": (senderClientId, answer) => {
        let peer = Peer.getPeer(senderClientId);
        peer.receiveAnswer(answer);
    },
    "getMessage": (message) => {
        
    },
    "createPeer": (clientId, initiator) => {
        if(!Peer.getPeer(clientId)){
            let peer = new Peer(clientId, initiator);
            mp.console("Une peer a été créé " + clientId);
        }
        else{
            mp.console("Un peer existe déjà");
        }
    },
    "updatePeers": () => {
        Peer.updatePeerList();
    }
});
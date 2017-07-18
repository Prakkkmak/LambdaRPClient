const Peer = require("Peer").Peer;
mp.events.add({
    "sendOffer": (clientId, offer) => {
        mp.events.callRemote("sendOffer",mp.players.local.id ,clientId, offer);
    },
    "receiveOffer": (senderClientId, offer) => {
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
            mp.callRemote("console", "Une peer a été créé " + clientId);
        }
        else{
            mp.callRemote("console", "Un peer existe déjà");
        }
    }
});
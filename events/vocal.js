const Peer = require("Peer").Peer;
mp.events.add({
    "sendOffer": (clientId, offer) => {
         mp.console('Une offre a été envoyée ' + clientId);
        mp.events.callRemote("sendOffer",clientId, offer);
    },
    "receiveOffer": (senderClientId, offer) => {
        mp.console('Une offre a été reçue de ' + senderClientId);
        let peer = Peer.getPeer(senderClientId);
        peer.receiveOffer(offer);
    },
    "sendAnswer": (clientId, answer) => {
        mp.console("Envoi de la réponse à " + clientId);
        mp.events.callRemote("sendAnswer" ,clientId, answer);
    },
    "receiveAnswer": (senderClientId, answer) => {
        mp.console("Answer recu une réponse de " + senderClientId);
        let peer = Peer.getPeer(senderClientId);
        peer.receiveAnswer(answer);
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
    "vocalEstablished": (clientId, initiator = true) => {
        if(initiator) mp.events.callRemote('vocalEstablished', clientId);
        mp.console("DEBUG CLIENT ID : " + clientId);
        let peer = Peer.getPeer(clientId);
        peer.vocalEstablished();
    },
    "updatePeers": () => {
        Peer.updatePeerList();
    },
});
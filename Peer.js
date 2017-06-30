class Peer {
    constructor(client, initiator){
        this.client = client;
        this.intiator = initiator;
    }
    
    static findClient(id){
        for(let client of mp.players){
            if(client.id === id || client.name === id + "") return client;
        }
    }
}
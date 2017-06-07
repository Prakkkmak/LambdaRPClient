mp.events.add({
    "playerJoin": (client) => { 
        client.name = client.id + ""; 
    }
});
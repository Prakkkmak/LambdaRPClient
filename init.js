mp.nametags.enabled = false;
mp.nametags.set({hbar:{border:[0.0, 0.0], size:[0.0, 0.0]}});
mp.players.forEach((client) => {
    client.name = client.id + ""; 
})
let cam2;
function toRadians (angle) {
  return angle * (Math.PI / 180);
}
mp.events.add({
    "restoreCamera": () => {
        mp.game.graphics.notify("Votre camera est redevenue à la normale");
        cam2.destroy();
		cam2 = undefined;
		mp.game.cam.renderScriptCams(false, false, 3000, true, false);
    },
    "loginCamera": () => {
        mp.game.graphics.startScreenEffect('SwitchHUDIn', 0xFF, true);
        //mp.game.cam.destroyAllCams(false);

        cam2 = mp.cameras.new('default', new mp.Vector3(0, 0, 1000), new mp.Vector3(-10.0, -10.0, 90.0), 90.0);
        cam2.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 3000, true, false);
    },
    "endLoginCamera": () => {
        mp.game.graphics.notify("Vous vous êtes ~g~correctement ~w~connecté!");
        cam2.destroy();
		cam2 = undefined;
		mp.game.cam.renderScriptCams(false, false, 3000, true, false);
		mp.game.graphics.stopScreenEffect('SwitchHUDIn');
    },
    "skinCamera": () => {
        camPos = mp.players.local.position;
        mp.game.graphics.notify("" + mp.players.local.getHeading());
        camPos.x -= (Math.cos(toRadians(mp.players.local.getHeading() + 270)))
        camPos.y -= (Math.sin(toRadians(mp.players.local.getHeading() + 270)))
        //camPos.y += 0.5;
        camPos.z += 0.6;
        cam2 = mp.cameras.new('default', camPos, new mp.Vector3(0, 0, mp.players.local.getHeading() + 180),60);
        cam2.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 3000, true, false);
    },
    "clothCamera": () => {
        camPos = mp.players.local.position;
        camPos.x -= (Math.cos(toRadians(mp.players.local.getHeading() + 270)) * 3)
        camPos.y -= (Math.sin(toRadians(mp.players.local.getHeading() + 270)) * 3)
        camPos.z += 0.6;
        cam2 = mp.cameras.new('default', camPos, new mp.Vector3(0, 0,  mp.players.local.getHeading() + 180),60);
        cam2.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 3000, true, false);
    },

})
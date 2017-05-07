/**
 * Cette page reçoit les evenements reçus du serveur.
 */

mp.events.add({
    "bug": () => {
        mp.browsers.new("package://cef/bug_report/index.html");
        mp.gui.execute("mp.invoke('focus', true)"); // Affichage de la souris - BUG besion de alt tab pour la voir
    }
})
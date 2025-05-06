import ApplicationManager from './ApplicationManager.js'; // die applicationManager file wird importiert
class ApplicationLoader {
    /*
    eine funktion die der applicationloader ausführt.
    sie nimmt den string (applicationName)
    */
    loadApplication(applicationName) {
        const appManager = new ApplicationManager(applicationName); // const deklariert eine variable bedeutet sie ist gebunden
        appManager.start();
    }
}
// neue instanz des applicationloader
const loader = new ApplicationLoader();
// rufe die loadApplication-Methode auf, um die Anwendung zu starten
loader.loadApplication('TEST loadApplication TEST');
//# sourceMappingURL=ApplicationLoader.js.map
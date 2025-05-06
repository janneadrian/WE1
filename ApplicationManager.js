export default class ApplicationManager {
    appName; // Deklariert eine öffentliche Eigenschaft 'appName' vom Typ String.
    loginForm; // Deklariert eine öffentliche Eigenschaft 'loginForm' vom Typ HTMLFormElement.
    signupForm;
    linkToSignup;
    linkToLogin;
    startPage;
    logoutLink;
    registeredUsers = new Map();
    impressumContainer;
    // Konstruktor der Klasse ApplicationManager, nimmt einen String 'name' als Argument entgegen und initialisiert die Anwendung.
    constructor(name) {
        this.appName = name;
        this.loginForm = document.getElementById('FormLogin');
        this.signupForm = document.getElementById('FormSignup');
        this.linkToSignup = document.getElementById('LinkShowSignupDialog');
        this.linkToLogin = document.getElementById('LinkShowLoginDialog');
        this.startPage = document.getElementById('StartPage');
        this.logoutLink = document.getElementById('LinkLogout');
        this.impressumContainer = document.getElementById('ImpressumContainer');
        this.registeredUsers.set('admin', '123');
        console.log('Initialer Benutzer "admin" wurde angelegt.'); // Gibt eine Meldung in der Konsole aus, dass der initiale Benutzer angelegt wurde.
        console.log('Aktuelle registrierte Benutzer:', this.registeredUsers);
        // Überprüft, ob die benötigten DOM-Elemente gefunden wurden und gibt gegebenenfalls Fehlermeldungen oder Warnungen in der Konsole aus.
        if (!this.loginForm)
            console.error('ERROR: Login-Formular nicht gefunden.');
        if (!this.signupForm)
            console.error('ERROR: Registrierungs-Formular nicht gefunden.');
        if (!this.linkToSignup)
            console.error('ERROR: Link zu Signup nicht gefunden.');
        if (!this.linkToLogin)
            console.error('ERROR: Link zu Login nicht gefunden.');
        if (!this.startPage)
            console.error('ERROR: Startseiten-Element nicht gefunden.');
        if (!this.logoutLink)
            console.warn('WARNUNG: Logout-Link nicht gefunden.');
        if (!this.impressumContainer)
            console.error('ERROR: Impressum-Container nicht gefunden.');
        // Fügt Event-Listener zu den Links und Formularen hinzu, um Benutzerinteraktionen zu verarbeiten.
        if (this.linkToSignup) {
            this.linkToSignup.addEventListener('click', (event) => {
                event.preventDefault(); // Verhindert das Standardverhalten des Links.
                this.switchToSignup(); // Ruft die Methode auf, um zum Registrierungsformular zu wechseln.
            });
        }
        if (this.linkToLogin) {
            this.linkToLogin.addEventListener('click', (event) => {
                event.preventDefault(); // Verhindert das Standardverhalten des Links.
                this.switchToLogin(); // Ruft die Methode auf, um zum Login-Formular zu wechseln.
            });
        }
        const linkImpressum = document.getElementById('LinkImpressum');
        if (linkImpressum) {
            linkImpressum.addEventListener('click', (event) => {
                event.preventDefault();
                this.showImpressum(); // Ruft eine neue Methode zum Anzeigen des Impressums auf.
            });
        }
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen).
                this.handleLogin(); // Ruft die Methode zur Verarbeitung des Login-Vorgangs auf.
            });
        }
        if (this.signupForm) {
            this.signupForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen).
                this.handleSignup(); // Ruft die Methode zur Verarbeitung des Registrierungsvorgangs auf.
            });
        }
        if (this.logoutLink) {
            this.logoutLink.addEventListener('click', (event) => {
                event.preventDefault(); // Verhindert das Standardverhalten des Links.
                this.handleLogout(); // Ruft die Methode zur Verarbeitung des Logout-Vorgangs auf.
            });
        }
    }
    showToast(message, type) {
        const toastContainer = document.getElementById("toast-container");
        if (!toastContainer)
            return;
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.padding = '15px 20px';
        toast.style.margin = '10px';
        toast.style.borderRadius = '5px';
        toast.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        toast.style.opacity = '0'; // Anfangs unsichtbar
        toast.style.transition = 'opacity 0.3s ease-in-out'; // Sanfter Übergang
        let backgroundColor = '';
        let textColor = '#333'; // Standard-Textfarbe
        switch (type) {
            case "success":
                backgroundColor = '#e6ffe6'; // Hellgrün
                textColor = '#1a731a'; // Dunkleres Grün
                break;
            case "error":
                backgroundColor = '#ffe6e6'; // Hellrot
                textColor = '#cc0000'; // Dunkleres Rot
                break;
            case "warning":
                backgroundColor = '#fff2e6'; // Hellorange
                textColor = '#b35900'; // Dunkleres Orange
                break;
            default:
                backgroundColor = '#f0f0f0'; // Helles Grau
        }
        toast.style.backgroundColor = backgroundColor;
        toast.style.color = textColor;
        const closeButton = document.createElement("button");
        closeButton.textContent = "×"; // Moderneres Schließen-Symbol
        closeButton.style.marginLeft = '15px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.border = 'none';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '1em';
        closeButton.style.color = textColor;
        closeButton.style.fontWeight = 'bold';
        closeButton.addEventListener("click", () => {
            toast.style.opacity = '0'; // Ausblenden
            setTimeout(() => toast.remove(), 300); // Entfernen nach dem Ausblenden
        });
        toast.appendChild(closeButton);
        toastContainer.appendChild(toast);
        // Anzeigen des Toasts mit einer leichten Verzögerung, um den Übergang zu ermöglichen
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 50);
        setTimeout(() => {
            toast.style.opacity = '0'; // Ausblenden
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
    // Startet die Anwendung, gibt eine Startmeldung in der Konsole aus und wechselt zur Login-Ansicht.
    start() {
        console.log(`Anwendung "${this.appName}" gestartet.`);
        this.switchToLogin();
        if (this.startPage) {
            this.startPage.style.display = 'none';
        }
    }
    // Zeigt das Registrierungsformular an und blendet das Login-Formular aus.
    switchToSignup() {
        if (this.loginForm)
            this.loginForm.style.display = 'none';
        if (this.signupForm)
            this.signupForm.style.display = 'block';
    }
    // Zeigt das Login-Formular an und blendet das Registrierungsformular aus.
    switchToLogin() {
        if (this.loginForm)
            this.loginForm.style.display = 'block';
        if (this.signupForm)
            this.signupForm.style.display = 'none';
    }
    // Verarbeitet den Login-Vorgang, überprüft die Anmeldedaten und aktualisiert die Benutzeroberfläche entsprechend.
    handleLogin() {
        console.log('handleLogin() wurde aufgerufen!');
        const loginUsernameInput = document.getElementById('FormLoginUsername');
        const loginPasswordInput = document.getElementById('FormLoginPassword');
        const userManagementMenuItem = document.getElementById('UserManagementMenuItem');
        const logoutButton = document.getElementById('LinkLogout');
        if (loginUsernameInput && loginPasswordInput) {
            const username = loginUsernameInput.value.trim();
            const password = loginPasswordInput.value;
            // Überprüft, ob Benutzername und Passwort eingegeben wurden.
            if (!username || !password) {
                console.error('Bitte geben Sie Benutzername und Passwort ein.');
                this.showToast('Bitte geben Sie Benutzername und Passwort ein.', 'warning'); // Toast bei fehlender Eingabe
                return;
            }
            // Überprüft, ob der Benutzer in der Liste der registrierten Benutzer vorhanden ist und das Passwort übereinstimmt.
            if (this.registeredUsers.has(username) && this.registeredUsers.get(username) === password) {
                console.log(`Login erfolgreich für Benutzer "${username}".`);
                this.showToast(`Login erfolgreich für Benutzer "${username}".`, 'success'); // Toast bei erfolgreichem Login
                // Zeigt die Startseite, die Benutzerverwaltung und den Logout-Button an und blendet die Login- und Registrierungsformulare aus.
                if (this.startPage)
                    this.startPage.style.display = 'block';
                if (userManagementMenuItem)
                    userManagementMenuItem.style.display = 'block';
                if (logoutButton)
                    logoutButton.style.display = 'block';
                if (this.loginForm)
                    this.loginForm.style.display = 'none';
                if (this.signupForm)
                    this.signupForm.style.display = 'none';
                if (this.impressumContainer)
                    this.impressumContainer.style.display = 'none'; // Ausblenden des Impressum-Containers
            }
            else {
                console.error('Login fehlgeschlagen. Überprüfen Sie Benutzername und Passwort.');
                this.showToast('Login fehlgeschlagen. Überprüfen Sie Benutzername und Passwort.', 'error'); // Toast bei falscher Eingabe
            }
        }
        else {
            console.error('Fehler: Benutzername- oder Passwortfeld im Login-Formular nicht gefunden.');
            this.showToast('Ein interner Fehler ist aufgetreten.', 'error'); // Toast bei internem Fehler
        }
    }
    // Verarbeitet den Registrierungsvorgang, überprüft die Eingaben und fügt einen neuen Benutzer hinzu.
    handleSignup() {
        console.log('handleSignup() wurde aufgerufen!');
        const signupUsernameInput = document.getElementById('FormSignupUsername');
        const signupPasswordInput = document.getElementById('FormSignupPassword');
        if (signupUsernameInput && signupPasswordInput) {
            const username = signupUsernameInput.value.trim();
            const password = signupPasswordInput.value;
            // Überprüft, ob Benutzername und Passwort eingegeben wurden.
            if (!username || !password) {
                console.error('Bitte geben Sie einen Benutzernamen und ein Passwort ein.');
                return;
            }
            // Überprüft, ob der Benutzername bereits existiert.
            if (this.registeredUsers.has(username)) {
                console.error(`Benutzername "${username}" ist bereits vergeben.`);
                return;
            }
            // Fügt den neuen Benutzer zu den registrierten Benutzern hinzu.
            this.registeredUsers.set(username, password);
            console.log(`Benutzer "${username}" wurde registriert.`);
            console.log('Aktuelle registrierte Benutzer:', this.registeredUsers);
            this.switchToLogin(); // Wechselt nach der Registrierung zur Login-Ansicht.
            // Leert die Eingabefelder des Registrierungsformulars.
            signupUsernameInput.value = '';
            signupPasswordInput.value = '';
        }
        else {
            console.error('Fehler: Benutzername- oder Passwortfeld im Signup-Formular nicht gefunden.');
        }
    }
    // Verarbeitet den Logout-Vorgang, blendet relevante UI-Elemente aus und wechselt zur Login-Ansicht.
    handleLogout() {
        console.log('Logout wurde geklickt.');
        const userManagementMenuItem = document.getElementById('UserManagementMenuItem');
        const loginUsernameInput = document.getElementById('FormLoginUsername');
        const loginPasswordInput = document.getElementById('FormLoginPassword');
        // Blendet die Startseite und den Impressum-Container aus.
        if (this.startPage)
            this.startPage.style.display = 'none';
        if (userManagementMenuItem)
            userManagementMenuItem.style.display = 'none';
        if (this.impressumContainer)
            this.impressumContainer.style.display = 'none';
        // Löscht die Werte der Eingabefelder im Login-Formular
        if (loginUsernameInput) {
            loginUsernameInput.value = '';
        }
        if (loginPasswordInput) {
            loginPasswordInput.value = '';
        }
        this.switchToLogin(); // Wechselt zur Login-Ansicht.
    }
    // Zeigt den Impressum-Container an und blendet die Startseite aus.
    showImpressum() {
        if (this.startPage && this.impressumContainer) {
            this.startPage.style.display = 'none';
            this.impressumContainer.style.display = 'block';
        }
        else {
            console.error('ERROR: Startseiten- oder Impressum-Container nicht gefunden.');
            this.showToast('Ein Fehler beim Anzeigen des Impressums ist aufgetreten.', 'error');
        }
    }
}
//# sourceMappingURL=ApplicationManager.js.map
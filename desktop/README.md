# Loops – Desktop- und Steam-Build (Prototyp)

Dieser Ordner verpackt das unveränderte Browser-Spiel (`../index.html`) mit **Electron 41** als Desktop-App für Windows, macOS, Linux und das Steam Deck. Die Steam-Anbindung (Erfolge, Overlay) läuft über **steamworks.js** und ist optional: Ohne Steam oder ohne das Modul läuft dieselbe App einfach ohne Steam-Funktionen.

## Starten und bauen

```bash
cd desktop
npm install            # Electron, electron-builder, steamworks.js
npm start              # Fenster-Modus
npm run start:deck     # verhält sich wie auf dem Steam Deck (Vollbild)
npm run dist:linux     # dist/linux-unpacked + tar.gz (auch fürs Steam Deck)
npm run dist:win       # dist/win-unpacked + zip
npm run dist:mac       # nur auf einem Mac
```

`npm start` und `npm run dist:*` führen vorher `sync.js` aus. Es kopiert `../index.html` nach `app/index.html` und ersetzt den Google-Fonts-Link durch die mitgelieferten Schriften (`app/fonts`, SIL Open Font License). Die Desktop-App braucht dadurch kein Internet.

## Testversion für Tester (Linux / Steam Deck)

Fertige Builds liegen unter *Releases* im GitHub-Repo. `Loops.sh` startet die App mit `--no-sandbox` (auf SteamOS fehlt die root-eigene Sandbox-Hilfsdatei) und `--tester`: Damit zeigt die Hilfe unten die Testdaten (Tode, Neustarts, Zeit pro Kammer), ohne Kammern freizuschalten. Anleitung für Tester: `LIESMICH.txt` im Paket.

## Was die Desktop-App anders macht

| | |
|---|---|
| Fenster | 1280×800, Größe und Vollbild werden gemerkt, kein Menü |
| Vollbild | F11 oder Alt+Enter, im Pause-Menü „Vollbild an/aus“ |
| Steam Deck | startet automatisch im Vollbild (Umgebungsvariable `SteamDeck=1` von Steam) |
| Layout | die Kammer füllt immer das Fenster, ohne Kopfzeile |
| Pause | Esc oder Start, mit zusätzlich „Spiel beenden“ |
| Links | öffnen im System-Browser, die App selbst navigiert nie weg |
| Speicherstände | wie im Browser (localStorage), liegen im App-Datenordner |

Das Spiel erkennt die Desktop-App an `window.loopsPlatform` (aus `preload.js`). Im Browser gibt es das nicht, dort ändert sich nichts.

## Steam-Erfolge

Das Spiel meldet diese IDs. Sie müssen im Steamworks-Partnerbereich unter *Stats & Achievements* genau so angelegt werden:

| API-Name | Name (DE / EN) | Beschreibung (DE / EN) | Auslöser |
|---|---|---|---|
| `FIRST_PORTAL` | Zwei Löcher / Two Holes | Ihr erstes Portal. Die Wand wird sich erholen. / Your first portal. The wall will recover. | erstes Portal |
| `CHAMBER_01` | Erster Schritt / First Step | Kammer 1 bestanden. Wir sind beeindruckt. Vorläufig. / Chamber 1 passed. We are impressed. Provisionally. | Kammer 1 |
| `ACT_1` | Grundausbildung / Basic Training | Akt 1 abgeschlossen. / Act 1 complete. | Kammer 16 |
| `ACT_2` | Doppelschicht / Double Shift | Akt 2 abgeschlossen: Sie haben sich selbst kennengelernt. / Act 2 complete: you have met yourself. | Kammer 32 |
| `ACT_3` | Greifbar / Within Reach | Akt 3 abgeschlossen. / Act 3 complete. | Kammer 48 |
| `ACT_4` | Unter Beobachtung / Under Observation | Akt 4 abgeschlossen. Die Turrets lassen grüßen. / Act 4 complete. The turrets send their regards. | Kammer 67 |
| `ACT_5` | Notbeleuchtung / Emergency Lighting | Akt 5 abgeschlossen. / Act 5 complete. | Kammer 83 |
| `FINISH` | Willkommen zuhause / Welcome Home | Alle Kammern bestanden. Bitte warten Sie hier. / All chambers passed. Please wait here. | Kammer 100 |
| `IRONMAN` | Eiserne Nerven / Nerves of Steel | Ironman-Lauf ohne übersprungene Kammer. / Ironman run without a skipped chamber. | Ironman 100/100 |
| `STUBBORN` | Lernresistent / Slow Learner | 100 Mal gestorben. Wir zählen mit. / Died 100 times. We are counting. | 100 Tode |

Neue Erfolge: im Spiel `achieve('ID')` aufrufen und die ID hier und bei Steam eintragen.

## Steam einrichten (Checkliste)

1. **App-ID:** In `steam_appid.txt` steht `480`, das ist Valves Test-App „Spacewar“. Damit lässt sich die Steam-Verbindung lokal testen, solange der Steam-Client läuft. Unsere eigenen Erfolge gibt es dort aber nicht. Nach der Anmeldung bei Steamworks (Steam Direct, 100 $ pro App) die echte App-ID eintragen. Für den Release-Build ist die Datei nicht nötig, Steam übergibt die ID selbst.
2. **Depots:** ein Depot für Windows (`dist/win-unpacked`) und eins für Linux (`dist/linux-unpacked`), optional macOS.
3. **Startoptionen:** Windows `Loops.exe`, Linux `loops`. Das Steam Deck nutzt den nativen Linux-Build.
4. **Steam Cloud (Auto-Cloud):** Den Ordner `Local Storage/leveldb` im App-Datenordner synchronisieren:
   - Windows: `%APPDATA%/Loops/Local Storage/leveldb`
   - Linux / Steam Deck: `~/.config/Loops/Local Storage/leveldb`
   - macOS: `~/Library/Application Support/Loops/Local Storage/leveldb`
5. **Steam Deck:**
   - Controller-Unterstützung „vollständig“ angeben, alle Menüs gehen mit dem Controller.
   - Standard-Layout „Gamepad“.
   - Die App startet im Vollbild mit 1280×800.
6. **Inhaltsangaben:** Im Fragebogen zu KI-generierten Inhalten angeben, dass Code, Grafik, Sound und Texte mit KI erstellt wurden.
7. **Hinweise zu Drittlizenzen:** Chakra Petch und IBM Plex Mono (SIL OFL, Lizenztexte liegen in `app/fonts`), Electron (MIT), steamworks.js (MIT).

## Bekannte Grenzen des Prototyps

- Hier gebaut und getestet wurde nur ein Linux-x64-Build unter einer virtuellen Anzeige, ohne Steam-Client. Getestet wurden Fenster, Vollbild, Layout, Pause-Menü, „Spiel beenden“ und die Brücke für Erfolge.
- Eine echte Steam-Verbindung, Overlay und Cloud lassen sich nur auf einem Rechner mit Steam-Client prüfen.
- Ein App-Icon fehlt noch (`build/icon.png`, 512×512).
- macOS-Builds müssen für den Vertrieb signiert und notarisiert werden. Dafür braucht es einen Apple-Developer-Account.

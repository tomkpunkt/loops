# Loops auf itch.io veröffentlichen

## Upload in 5 Minuten

1. Auf itch.io einloggen → **Dashboard → Create new project**.
2. **Title:** `Loops` · **Project URL:** z. B. `tomkpunkt.itch.io/loops`
3. **Short description / tagline:** siehe unten.
4. **Classification:** Games · **Kind of project:** **HTML**
5. **Release status:** Released (oder „In development“, solange noch Kammern dazukommen)
6. **Pricing:** „No payment“ oder **„Donate“** (empfohlen: Pay what you want, Minimum 0 €, vorgeschlagen 3 €)
7. **Uploads:** `loops-itch.zip` hochladen und den Haken **„This file will be played in the browser“** setzen.
8. **Embed options:**
   - **Viewport dimensions:** 720 × 860 px
   - ☑ **Mobile friendly**, Orientation: **Portrait**
   - ☑ **Fullscreen button**
   - ☐ Automatically start on page load (aus lassen; das Spiel braucht ohnehin einen Tipp für den Ton)
   - ☐ Enable scrollbars (aus)
9. **Cover image:** `cover_630x500@2x.png` (wird auf 630 × 500 angezeigt)
10. **Screenshots:** die fünf `shot_*.png`
11. **Genre:** Puzzle · **Tags:** siehe unten · **AI generation disclosure:** Ja, mit KI erstellt (Code, Grafik, Sound, Texte).
12. **Language:** English, German · **Inputs:** Keyboard, Mouse, Touchscreen, Gamepad
13. **Visibility:** erst **Draft** speichern, Vorschau im Browser und am Handy prüfen, dann **Public**.

## Tagline

- DE: Die Anlage erwartet Sie bereits. Die Anlage schläft nie.
- EN: The facility has been expecting you. The facility never sleeps.

## Beschreibung (EN, für die Seite)

**Loops** is a 2D portal puzzle game about momentum, time and an overly attentive test facility.

Place two portals and walk through them seamlessly. You are half here, half there. What falls in fast comes out fast. Fling cubes across acid, bend lasers and light bridges, and loop your way through test chambers that ask more of you than they let on.

And then the rules change.

- **Seamless portals** with preserved momentum
- **Echo**: record yourself and let your past self help you
- **Gravity gun**: grab, carry and throw cubes, and more
- Lasers, light bridges, grilles, acid, switches and doors on two channels
- A sarcastic Test Control with a procedural mumble voice
- Industrial pixel look drawn entirely in code, with particles and light
- English and German, keyboard, mouse, touch and gamepad
- Progress is saved in your browser

Made by a human in collaboration with an AI.

## Beschreibung (DE)

**Loops** ist ein 2D-Portal-Puzzlespiel über Schwung, Zeit und eine etwas zu aufmerksame Testanlage.

Setz zwei Portale und lauf nahtlos hindurch. Du bist halb hier und halb dort, und was schnell hineinfällt, kommt schnell wieder heraus. Schleudere Würfel über Säure, lenke Laser und Lichtbrücken um und finde den Weg durch Testkammern, die mehr verlangen, als sie zugeben.

Und dann ändern sich die Regeln.

- **Nahtlose Portale**, Schwung bleibt erhalten
- **Echo**: nimm dich selbst auf und lass dein früheres Ich helfen
- **Gravitationskanone**: Würfel greifen, tragen und werfen, und mehr
- Laser, Lichtbrücken, Gitter, Säure, Schalter und Türen auf zwei Kanälen
- Eine sarkastische Testleitung mit prozeduraler Mumble-Stimme
- Industrieller Pixel-Look, komplett im Code gezeichnet, mit Partikeln und Licht
- Deutsch und Englisch, Tastatur, Maus, Touch und Gamepad
- Der Fortschritt wird im Browser gespeichert

## Tags (max. 10)

`puzzle` `portals` `physics` `2d` `pixel-art` `time-manipulation` `singleplayer` `short` `mobile` `browser`

## Steuerung (für die Seite)

| | Tastatur & Maus | Touch | Gamepad |
|---|---|---|---|
| Laufen / Move | A / D | linker Stick | linker Stick |
| Springen / Jump | W / Leertaste | „Sprung“ | A / LB |
| Portale / Portals | Links- / Rechtsklick | Portal-Tasten + rechter Stick | LT · RT |
| Neustart / Restart | R | ↻ | Start |
| Hinweis / Hint | H | ? | – |

## Hinweise

- Das Spiel ist eine einzige HTML-Datei ohne Server. Speicherstand und Sprache liegen im Browser (localStorage); im itch.io-Player funktioniert das.
- Schriften kommen von Google Fonts; ohne Internet greift eine Ersatzschrift.
- Bei jeder neuen Version: neues `loops-itch.zip` hochladen und das alte löschen (oder mit **butler** automatisch pushen).

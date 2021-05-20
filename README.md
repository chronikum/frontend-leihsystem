# ZfM-Frontend
*Ausleihsystem der pädagogischen Hochschule Schwäbisch Gmünd*

Ausleihen und Managen von Geräteinventaren einfach und komfortabel.
Benutzergruppenverwaltung, Reservierungsanfragen und Inventarmanagement mit Gerätemodellen für dynamische Umgebungen.
ZfM Ausleihsystem.

> Dieses System befindet sich in der frühen Beta und es kann zu Fehlern kommen, mal mehr und mal weniger schwerwiegend.
> Sollten Sie ein Problem haben, erstellen Sie gerne ein GitHub-Issue oder direkt eine Pull-Request mit einem Lösungsvorschlag.
> Geplant ist aktuell auch ein großes Refactoring von allem Code.

## Installation

Das ZfM-Ausleihsystem benötigt das *leihsystem-backend*.

Hier finden Sie eine Anleitung, wie Sie beide Systeme aufsetzen.


## Requirements
- MongoDB (running)  
- npm  
- Empfohlen: pm2 (installierbar über `npm i pm2  -g`)  

0. Klonen Sie beide Systeme auf Ihren Server
## Frontend
1. Gehen Sie in das Frontend-Verzeichnis.
2. ``npm i`` zum installieren der npm-Pakete
3. Konfigurieren Sie das Frontend-System mit der environment.prod.ts-Datei
4. Mit ``npm run-script prod`` bauen Sie das Angular-Projekt. Passen Sie Bau-Parameter an.
5. Kopieren Sie die Inhalte des /dist Ordner an den entsprechenden Webroot.
## Backend
1. Gehen Sie in das Backend-Verzeichnis
2. ``npm i`` zum installieren der npm-Pakete
3. Konfigurieren Sie das Backend mithilfe der .env-Datei (Sie müssen Sie erstellen)  
   Konfigurierbar sind aktuell:  
   ``DATABASE_PATH`` (Beispiel: mongodb://localhost:27017/datenbank)  
   ``HOST`` (Beispiel: https://zfmausleihsystem.de)  
   ``HOST_API`` (Beispiel: https://zfmausleihsystem.de/api) (WICHTIG: Kein trailing Slash)  
   Werden diese Werte nicht ausgefüllt, fällt das System auf Development-Werte zurück.
   Sie können Mailserver und LDAP später direkt über die Weboberfläche konfigurieren.
4. Stellen Sie sicher dass die benötigten Werte ausgefüllt sind
5. Sie können das Backend nun starten. Ich empfehle hierfür einen Prozess-Manager, da sonst nach Beendigung der Terminal Session
   das Backend offline wäre. Sie können dafür auch ein Starter-Skript schreiben.
   Starten Sie das Backend mit `npm run-script prod`


## Installation auf dem WebUI


> Troubleshooting-Hinweis: Ein falsch konfigurierter nginx oder apache2 Server kann dazu führen, dass Routen nicht korrekt aufgerufen werden können.
> Beispiele für eine korrekte nginx Konfiguration finden sie in dem Ordner /nginx

1. Öffnen Sie nun die Website, welche Sie bei ``HOST`` angegeben haben.
2. Erstellen Sie einen Admin-User. Er wird den Nutzernamen "Administrator" haben.
3. Danach können Sie sich einloggen
4. Viel Spaß und Erfolg mit dem ZfM-Ausleihsystem der Pädagogischen Hochschule Schwäbisch Gmünd.

## Lizenzinformationen

Dieses Projekt ist unter der GNU GENERAL PUBLIC LICENSE V3.0 lizenziert.
Es wurde von Jonathan Fritz (Zentrum für Medienbildung (Leitung: Professor. Dr. Thomas Irion), Pädagogische Hochschule Schwäbisch Gmünd) entwickelt.
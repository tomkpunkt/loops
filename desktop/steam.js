// Optional Steam bridge. Without Steam (or without the steamworks.js module) every call is a quiet no-op,
// so the same build runs on itch.io, from a folder, or under Steam.
const fs = require('fs');
const path = require('path');

let client = null, steamworks = null;
const done = new Set();

function appId() {
  // steam_appid.txt is only for development; a build launched by Steam gets its id from the client
  for (const p of [path.join(process.cwd(), 'steam_appid.txt'), path.join(path.dirname(process.execPath), 'steam_appid.txt'), path.join(__dirname, 'steam_appid.txt')]) {
    try { const n = parseInt(fs.readFileSync(p, 'utf8'), 10); if (n > 0) return n; } catch (e) {}
  }
  return undefined;
}

function init() {
  if (process.argv.includes('--no-steam')) return;
  try { steamworks = require('steamworks.js'); } catch (e) { console.log('[steam] steamworks.js not installed, running without Steam'); return; }
  try { client = steamworks.init(appId()); console.log('[steam] connected as', client.localplayer.getName()); }
  catch (e) { client = null; console.log('[steam] Steam not running, running without Steam'); }
}
function enableOverlay() { try { if (client && steamworks.electronEnableSteamOverlay) steamworks.electronEnableSteamOverlay(); } catch (e) {} }
function available() { return !!client; }
function achieve(id) {
  if (done.has(id)) return; done.add(id);
  console.log('[steam] achievement', id);
  if (!client) return;
  try { if (!client.achievement.isActivated(id)) client.achievement.activate(id); } catch (e) { console.log('[steam] achievement failed', id, e.message); }
}
module.exports = { init, enableOverlay, available, achieve };

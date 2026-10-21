// Copies the browser game (../index.html) into app/ and swaps the Google Fonts link for the bundled fonts,
// so the desktop build works fully offline. Run automatically by npm start / npm run dist:*.
const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'index.html');
const dst = path.join(__dirname, 'app', 'index.html');
let html = fs.readFileSync(src, 'utf8');
const fonts = `<style>
@font-face{font-family:'Chakra Petch';font-weight:500;src:url(fonts/ChakraPetch-Medium.ttf)}
@font-face{font-family:'Chakra Petch';font-weight:700;src:url(fonts/ChakraPetch-Bold.ttf)}
@font-face{font-family:'IBM Plex Mono';font-weight:400;src:url(fonts/IBMPlexMono-Regular.ttf)}
@font-face{font-family:'IBM Plex Mono';font-weight:500;src:url(fonts/IBMPlexMono-Medium.ttf)}
</style>`;
html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/, '')
           .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, fonts);
if (html.includes('fonts.googleapis.com')) throw new Error('Google Fonts link not replaced');
fs.mkdirSync(path.dirname(dst), { recursive: true });
fs.writeFileSync(dst, html);
console.log('synced', path.relative(__dirname, src), '->', path.relative(__dirname, dst), (html.length / 1024).toFixed(0) + ' KB');

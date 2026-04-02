// pdf-gen.js — Chrome CDP PDF generator for figma-design-review skill
//
// Usage: node pdf-gen.js <chrome-path> <html-path> <pdf-path>
//
// Prints the HTML report to PDF via Chrome's DevTools Protocol so page numbers
// are rendered on every page.
// Requires Node.js 22+ for the built-in WebSocket global.

import { spawn } from 'child_process';
import http from 'http';
import net from 'net';
import fs from 'fs';
import path from 'path';

const [, , CHROME, HTML, PDF] = process.argv;

if (!CHROME || !HTML || !PDF) {
  process.stderr.write('Usage: node pdf-gen.js <chrome-path> <html-path> <pdf-path>\n');
  process.exit(1);
}

// --- Review title for footer -----------------------------------------------

const htmlContent = fs.readFileSync(HTML, 'utf8');
const subjectMatch = htmlContent.match(/<div class="subject">([^<]+)<\/div>/);
const reviewTitle = subjectMatch ? subjectMatch[1] : 'Spirit Design System';
// Extract tool name from <title> (the segment after the last em dash).
// <title> is the single source of truth so pdf-gen.js stays in sync automatically.
const toolMatch = htmlContent.match(/<title>[^<]*\u2014\s*([^\u2014<]+)\s*<\/title>/);
const toolName = toolMatch ? toolMatch[1].trim() : 'Spirit AI Design Review';

// --- Footer template -------------------------------------------------------
// Chrome CDP renders <span class="pageNumber"> and <span class="totalPages">
// inside the footerTemplate HTML. Inline styles only — no external CSS.

// Chrome CDP scales footer template content to ~75% when rendering into the
// physical margin area. A template height of 56px renders as ~42px on the page.
//
// Chrome populates .pageNumber/.totalPages spans before executing scripts in
// the template, so a script can read the page number and hide the footer on
// page 1 (the landscape cover), where the margin is 0 but CDP still renders
// the template on top of the content.
const footerTemplate = `
  <div id="ft" style="width:100%;padding:0 62px;box-sizing:border-box;display:flex;
              justify-content:space-between;align-items:center;
              font-size:12px;font-family:system-ui,sans-serif;color:#555;height:56px;">
    <span>${toolName}: ${reviewTitle}</span>
    <span><span class="pageNumber"></span>&#8202;/&#8202;<span class="totalPages"></span></span>
  </div>`;

// --- Helpers ---------------------------------------------------------------

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// --- Local HTTP server for the HTML directory ------------------------------
// Chrome CDP blocks file:// navigation; serving over localhost sidesteps it.

function startServer(htmlPath) {
  const dir = path.dirname(path.resolve(htmlPath));
  const file = path.basename(htmlPath);

  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const filePath = path.join(dir, decodeURIComponent(req.url.split('?')[0]));
      fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end(); return; }
        const ext = path.extname(filePath).toLowerCase();
        const mime = { '.html': 'text/html', '.png': 'image/png', '.svg': 'image/svg+xml' }[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
      });
    });

    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, url: `http://127.0.0.1:${port}/${file}` });
    });
    server.on('error', reject);
  });
}

// --- Helpers ---------------------------------------------------------------

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

function httpGet(url, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      reject(new Error(`HTTP GET timed out: ${url}`));
    });
  });
}

// --- Chrome CDP ------------------------------------------------------------

async function run() {
  const CDP_PORT = await getFreePort();
  const userDataDir = `/tmp/chrome-pdf-${Date.now()}`;

  const { server, url: pageUrl } = await startServer(HTML);

  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      `--remote-debugging-port=${CDP_PORT}`,
      '--remote-debugging-address=127.0.0.1',
      `--user-data-dir=${userDataDir}`,
      '--no-sandbox',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-dev-shm-usage',
    ],
    { stdio: 'ignore' },
  );

  try {
    // Wait for Chrome to start and retry /json until it responds
    let jsonData;
    for (let attempt = 0; attempt < 10; attempt++) {
      await wait(600);
      try {
        jsonData = await httpGet(`http://127.0.0.1:${CDP_PORT}/json`);
        break;
      } catch {
        // not ready yet — retry
      }
    }
    if (!jsonData) throw new Error('Chrome CDP did not become ready');

    // Find the main page tab (type:"page"), not extension background pages
    const tabs = JSON.parse(jsonData);
    const tab = tabs.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
    if (!tab) throw new Error('No debuggable page tab found');
    const wsUrl = tab.webSocketDebuggerUrl;

    // Connect via WebSocket (Node.js 22+ built-in)
    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve);
      ws.addEventListener('error', (e) =>
        reject(new Error(e.message || e.type || 'WebSocket connection failed')),
      );
    });

    let msgId = 0;
    const pending = new Map();

    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id !== undefined && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    });

    const cdp = (method, params = {}) =>
      new Promise((resolve) => {
        const id = ++msgId;
        pending.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });

    // Navigate to the locally served HTML and wait for full render
    await cdp('Page.enable');
    await cdp('Page.navigate', { url: pageUrl });
    await wait(3000); // allow images to decode

    // Print to PDF
    // preferCSSPageSize: true lets CSS @page rules control paper size and margins,
    // which is required for the named cover-page to use A4 landscape while inner
    // pages remain A4 portrait. Margins are set in CSS @page (margin-bottom: 0.65in
    // on every page reserves the physical space for the footer template below).
    const result = await cdp('Page.printToPDF', {
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate,
    });

    if (result.error) throw new Error(`CDP error: ${result.error.message}`);
    if (!result.result?.data) throw new Error('Page.printToPDF returned no data');

    fs.writeFileSync(PDF, Buffer.from(result.result.data, 'base64'));
    ws.close();
    process.stdout.write(`PDF saved: ${PDF}\n`);
  } finally {
    chrome.kill();
    server.close();
  }
}

run().catch((err) => {
  process.stderr.write(`pdf-gen.js failed: ${err.message}\n`);
  process.exit(1);
});

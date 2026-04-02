// save-screenshots.js — Save Figma screenshots via the Figma MCP server.
//
// Usage: node save-screenshots.js NODE_ID_1:PATH_1 [NODE_ID_2:PATH_2 ...]
//
// Each argument is a colon-separated pair of Figma node ID and output file path.
// Node IDs contain colons (e.g. "2802:66561"), so the script splits on the LAST
// colon to separate the node ID from the file path.

import http from 'http';
import fs from 'fs';

const BASE_URL = 'http://localhost:3845/mcp';

function post(sessionId, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'Content-Length': Buffer.byteLength(data),
    };
    if (sessionId) headers['mcp-session-id'] = sessionId;

    const req = http.request(BASE_URL, { method: 'POST', headers }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ headers: res.headers, body: Buffer.concat(chunks).toString() }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Request timed out')); });
    req.write(data);
    req.end();
  });
}

function parseSSE(raw) {
  for (const line of raw.split('\n')) {
    if (line.startsWith('data:')) return JSON.parse(line.slice(5));
  }
  return null;
}

async function initSession() {
  const { headers } = await post(null, {
    jsonrpc: '2.0', id: 0, method: 'initialize',
    params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'x', version: '1' } },
  });
  return headers['mcp-session-id'];
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    process.stderr.write(`Usage: node save-screenshots.js NODE_ID:PATH [NODE_ID:PATH ...]\n`);
    process.exit(1);
  }

  const findings = args.map((arg, i) => {
    const last = arg.lastIndexOf(':');
    if (last === -1) {
      process.stderr.write(`Error: argument '${arg}' must be NODE_ID:PATH\n`);
      process.exit(1);
    }
    return { id: i + 1, nodeId: arg.slice(0, last), path: arg.slice(last + 1) };
  });

  const session = await initSession();

  for (const { id, nodeId, path } of findings) {
    const { body } = await post(session, {
      jsonrpc: '2.0', id, method: 'tools/call',
      params: { name: 'get_screenshot', arguments: { nodeId } },
    });
    const msg = parseSSE(body);
    for (const item of msg?.result?.content ?? []) {
      if (item.type === 'image') {
        const buf = Buffer.from(item.data, 'base64');
        fs.writeFileSync(path, buf);
        // PNG dimensions: IHDR chunk starts at byte 8; width at 16, height at 20 (big-endian uint32).
        const w = buf.readUInt32BE(16);
        const h = buf.readUInt32BE(20);
        process.stdout.write(`Saved ${path} (${w}x${h})\n`);
      }
    }
  }
}

main().catch((err) => {
  process.stderr.write(`save-screenshots.js failed: ${err.message}\n`);
  process.exit(1);
});

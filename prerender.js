import fs from 'fs';
import path from 'path';
import server from './dist/server/server.js';

async function main() {
  const req = new Request("http://localhost/");
  const res = await server.fetch(req, {}, {});
  const html = await res.text();
  
  const outputDir = path.resolve('dist/client');
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  fs.writeFileSync(path.join(outputDir, '404.html'), html);
  fs.writeFileSync(path.join(outputDir, 'CNAME'), "ranierdalton.is-a.dev\n");
  console.log("Prerendered index.html, 404.html and CNAME successfully!");
}

main().catch(console.error);

import fs from 'fs';
import path from 'path';
import server from './dist/server/server.js';

async function main() {
  const req = new Request("http://localhost/");
  const res = await server.fetch(req, {}, {});
  let html = await res.text();
  
  // Replace absolute /assets/ and /favicon.ico with relative ./assets/ and ./favicon.ico
  html = html.replace(/(href|src)="\/assets\//g, '$1="./assets/');
  html = html.replace(/(href|src)="\/favicon\.ico"/g, '$1="./favicon.ico"');
  
  const outputDir = path.resolve('dist/client');
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  fs.writeFileSync(path.join(outputDir, '404.html'), html);
  // fs.writeFileSync(path.join(outputDir, 'CNAME'), "ranierdalton.is-a.dev\n");
  console.log("Prerendered index.html and 404.html with relative paths successfully!");
}

main().catch(console.error);

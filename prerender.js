import fs from 'fs';
import path from 'path';
import server from './dist/server/server.js';

async function main() {
  const req = new Request("http://localhost/");
  const res = await server.fetch(req, {}, {});
  let html = await res.text();
  
  // Replace absolute /assets/, /./assets/, and relative assets with normalized ./assets/
  html = html.replace(/(href|src)="(?:\/|\/\.\/)?assets\//g, '$1="./assets/');
  html = html.replace(/(href|src)="\/favicon\.ico"/g, '$1="./favicon.ico"');
  
  const outputDir = path.resolve('dist/client');
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  fs.writeFileSync(path.join(outputDir, '404.html'), html);
  
  // Process CSS files to fix absolute font URLs
  const assetsDir = path.join(outputDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    for (const file of files) {
      if (file.endsWith('.css')) {
        const filePath = path.join(assetsDir, file);
        let css = fs.readFileSync(filePath, 'utf8');
        css = css.replace(/url\((['"]?)\/assets\//g, 'url($1./');
        fs.writeFileSync(filePath, css, 'utf8');
        console.log(`Updated paths in CSS: ${file}`);
      }
    }
  }
  
  // fs.writeFileSync(path.join(outputDir, 'CNAME'), "ranierdalton.is-a.dev\n");
  console.log("Prerendered index.html and 404.html with relative paths successfully!");
}

main().catch(console.error);

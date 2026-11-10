const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const port = Number(process.env.PORT || 3000);
const tipos = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.txt': 'text/plain' };
const servidor = http.createServer((req, res) => {
    let arquivo;
    try { arquivo = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400); return res.end('Endereço inválido.'); }
    if (arquivo === '/') arquivo = '/index.html';
    const destino = path.resolve(__dirname, '.' + arquivo);
    if (!destino.startsWith(__dirname + path.sep) || arquivo.split('/').some(parte => parte.startsWith('.')) || !/^\/(index\.html|(?:css|js|vendor)\/[^\\]+)$/.test(arquivo)) {
        res.writeHead(404); return res.end('Arquivo não encontrado.');
    }
    fs.readFile(destino, (erro, dados) => {
        if (erro) { res.writeHead(404); return res.end('Arquivo não encontrado.'); }
        res.writeHead(200, { 'Content-Type': (tipos[path.extname(destino)] || 'application/octet-stream') + '; charset=utf-8' });
        res.end(dados);
    });
});
servidor.on('error', erro => { console.error('Não foi possível iniciar o servidor:', erro.message); process.exit(1); });
servidor.listen(port, '0.0.0.0', () => console.log('Abra http://localhost:' + port));

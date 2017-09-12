import express from 'express';
import path from 'path';
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

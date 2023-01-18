import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 3000;

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = path.join(__dirname, '../client/public');
app.use('/', express.static(client));


app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});

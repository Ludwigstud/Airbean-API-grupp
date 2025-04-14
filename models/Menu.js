import Datastore from 'nedb';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const menuDB = new Datastore({
  filename: path.join(__dirname, '../db/menu.db'),
  autoload: true,
});

export default menuDB
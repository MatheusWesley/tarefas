import { sql } from './db.js';

sql`
CREATE TABLE tarefas (
  id          TEXT PRIMARY KEY,
  title       TEXT,
  description TEXT,
  priority    TEXT,
  status      TEXT
)
`.then(() => {
  console.log('Tabela criada.')
});
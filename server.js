import fastify from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DatabasePostgres();


server.post('/tarefas', async (req, res) => {
  const {
    title,
    description,
    priority,
    status
  } = req.body;

  await database.newTask({
    title,
    description,
    priority,
    status
  });

  return res.status(201).send();
});

server.get('/tarefas', async (req) => {
  const search = req.query.search;
  const tarefas = await database.listTasks(search);
  return tarefas;
});

server.put('/tarefas/:id', async (req, res) => {
  const taskId = req.params.id;
  const {
    title,
    description,
    priority,
    status
  } = req.body;
  await database.updateTask(taskId, {
    title,
    description,
    priority,
    status
  });

  return res.status(204).send();
});

server.delete('/tarefas/:id', async (req, res) =>{
  const taskId = req.params.id;
  await database.deleteTask(taskId);
  return res.status(204).send();
});




// DEFININDO A PORTA
server.listen({
  port: 3000
})
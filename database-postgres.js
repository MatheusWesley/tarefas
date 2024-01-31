import { randomUUID } from "node:crypto"
import { sql } from "./db.js"


export class DatabasePostgres {
  async listTasks(search){
    let tarefas;
    if (search) {
      tarefas = await sql`select * from tarefas where title ilike ${'%' + search + '%'};`
    } else {
      tarefas = await sql`select * from tarefas;`
    }
    return tarefas;
  }
  async newTask(tarefa){
    const taskId = randomUUID();
    const {title, description, priority, status} = tarefa;
    await sql`INSERT INTO tarefas (id, title, description, priority, status) 
                     VALUES (${taskId}, ${title}, ${description}, ${priority}, ${status})`.execute()
  }
  async updateTask(id, tarefa){
    const {title, description, priority, status} = tarefa;
    await sql`UPDATE tarefas set title = ${title}, description = ${description}, priority = ${priority}, status = ${status}
                                                                                    where id = ${id}`
  }
  async deleteTask(id){
    await sql`DELETE FROM tarefas where id = ${id}`
  }
}
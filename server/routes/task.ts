import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

type Task = {
  id: number;
  titulo: string;
  feito: boolean;
};

const dbPath = path.join(__dirname, '../tasks.json');
const data = fs.readFileSync(dbPath, 'utf-8');
const tasks : Task[] = JSON.parse(data);

router.get('/tasks', (req, res) => {
  res.json(tasks);
});

router.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  res.json(task);
});

router.post('/tasks/:id/done', (req, res) => {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  tasks[taskIndex].feito = true;
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
  res.json({ message: 'Tarefa marcada como feita', tasks });
})

router.post('/tasks/:id/undo', (req, res) => {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  tasks[taskIndex].feito = false;
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
  res.json({ message: 'Tarefa desfeita', tasks });
})


router.post('/tasks/create', (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }

  const newTask: Task = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    titulo,
    feito: false
  };

  tasks.push(newTask);
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
  res.status(201).json("Nova tarefa criada com sucesso id da task: " + newTask.id);
});

router.delete('/tasks/:id/delete', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  } 
  tasks.splice(taskIndex, 1);
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
  res.json({ message: 'Tarefa deletada com sucesso', tasks });
});

export default router;

import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(cors())

app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany()

  res.send(todos)
});

app.get('/todos/:id', async (req, res) => {
  const user = await prisma.todo.findUnique({
    where: {
      id: req.params.id
    }
  })

  res.send(user)
});

app.post('/todos', async (req, res) => {
  const user = await prisma.todo.create({
    data: {
      title: req.body.title,
      completed: req.body.completed
    }
  })

  res.send(user)
});

app.put('/todos/:id', async (req, res) => {
  const user = await prisma.todo.update({
    where: {
      id: req.params.id
    },
    data: {
      title: req.body.title,
      completed: req.body.completed
    }
  })

  res.send(user)
});

app.delete('/todos/:id', async (req, res) => {
  await prisma.todo.delete({
    where: {
      id: req.params.id
    }
  })

  res.send()
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
})
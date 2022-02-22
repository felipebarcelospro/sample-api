import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const prisma = new PrismaClient()

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()

  res.send(users)
});

app.get('/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id
    }
  })

  res.send(user)
});

app.post('/users', async (req, res) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email
    }
  })

  res.send(user)
});

app.put('/users/:id', async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.name,
      email: req.body.email
    }
  })

  res.send(user)
});

app.delete('/users/:id', async (req, res) => {
  await prisma.user.delete({
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
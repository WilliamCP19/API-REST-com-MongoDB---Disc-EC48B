const express = require('express');
const mongoose = require('mongoose');
const Tarefa = require('./models/tarefa.js');

const app = express();

app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/gerenciar_tarefas');

// Rota para criar uma nova tarefa
app.post('/tarefa', async (req, res) => {
  try {
    const tarefa = new Tarefa({
      name: req.body.name,
      description: req.body.description
    });
    await tarefa.save();
    res.status(201).send(tarefa);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rota para listar todas as tarefas
app.get('/tarefas', async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.status(200).send(tarefas);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para excluir uma tarefa
app.delete('/tarefa/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
    if (!tarefa) {
      return res.status(404).send({ error: 'Esta tarefa não existe :(' });
    }
    res.status(200).send({ message: 'Tarefa deletada com sucesso :)' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na portaclear ${PORT}`);
});

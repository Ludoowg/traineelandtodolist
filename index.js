const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const path = require('path');
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

// Servir les fichiers statiques de React depuis le dossier build 
app.use(express.static(path.join(__dirname, 'dist')));

// Route catch-all qui renvoie index.html pour toutes les routes qui ne sont pas API 



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => console.log("MongoDB connected")) 
  .catch(err => console.log(err));

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    console.log(id);
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    console.log(id);
    TodoModel.findByIdAndDelete({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
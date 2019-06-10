'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importa el esquema de una nota
const Note = require('./Note');

//conecta el servidor a la base de datos
mongoose.connect(
    // cadena de conexión
    'mongodb://localhost:27017/Notas',
    {useNewUrlParser: true, useCreateIndex: true,}
);

// Imprime un error en caso de que ocurra cuando se esté conectando a la base de datos
mongoose.connection.on('error', console.error.bind(console, 'error de conexión:'));

// convierte el cuerpo de las peticiones http en objetos JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilita los orígenes cruzados
app.use(cors());

// Cuando se hace una petición GET a este endpoint retorna todas las notas
app.get('/api/note/list', (req, res) => {
    // Busca todas las notas en a base de datos y las organiza en forma descendente
    Note.find({}).sort({updatedAt: 'descending'}).exec((err, notes) => {
        // En caso de que ocurra un error envía un BADREQUEST
        if (err) return res.status(404).send({message: 'Error al obtener notas!'});
        // De lo contrario envía las notas que encuentra
        return res.send({notes});
    });
});

//  Cuando se hace una petición POST crea una nueva nota
app.post('/api/note/create', (req, res) => {
    // Define una nueva nota sacado el body de la petición
    const note = new Note({body: req.body.body, title: req.body.title});
    note.save((err, resp) => {
        if (err) return res.status(404).send({message: err.message});
        return res.send(resp);
    });
});

/* Cuando se hace una petición PUT a este endpoint
actualiza la nota que coincida con ese id*/
app.put('/api/note/update/:id', (req, res) => {
    // Sobreescribir la nota existente para que se genere el evento de actualización
    let options = {new: true};

    Note.findByIdAndUpdate(req.params.id, req.body.data, options, (err, note) => {
        // En caso de que ocurra un error envía la causa del error
        if (err) return res.status(404).send({message: err.message});
        // De lo contrario envía la nota actualizada
        return res.send({message: 'Nota actualizada!', note});
    });
});

/* Cuando se hace una petición DELETE a este endpoint
elimina la nota que coincida con ese id*/
app.delete('/api/note/delete/:id', (req, res) => {
    // Busca la nota y la elimina
    Note.findByIdAndRemove(req.params.id, (err) => {
        // En caso de que ocurra un error envía la causa del error
        if (err) return res.status(404).send({message: err.message});
        // De lo contrario confirma que la nota ha sido eliminada
        return res.send({message: 'Nota eliminada!'});
    });
});

// Puerto en por el cual estará escuchando el servidor
const PORT = 5000;
// Le dice al servidor que empiece a escuchar por el puerto especificado
app.listen(PORT);

console.log(`Api escuchando en el puerto ${PORT}`);

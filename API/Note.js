// Importación de Mongoose
const mongoose = require('mongoose');

// Importación que permite crear un nuevo esquma
const Schema = mongoose.Schema;

// Se define el esquema
const NotaSchema = Schema(
   {
       // nombre del atributo, tipo y restricciones
       title: {type: String, required: true},
       body: {type: String, required: true},
   },
   // Crea de fecha atributo cuando es creado y actualizado
   { timestamps: true }
);

/* Le dice a mongoose que reconosca ese esquema como 'Nota' para que sea reconocido
por los demás esquemas de la base de datos*/
const Note = mongoose.model("Note", NotaSchema);

// Exporta el modelo para que pueda ser importado por otros archivos
module.exports = Note;

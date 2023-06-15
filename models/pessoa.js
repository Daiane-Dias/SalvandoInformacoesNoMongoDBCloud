const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
 const PessoaSchema = new Schema({
 nome: {
    type: String,
    required: true
 },
 email: {
    type: String,
    required: true
 },
 username: {
    type: String,
    required:false
 },
 senha: {
   type: String,
   required: true
},
comentario: {
type: String,
required:false
},
 date: {
    type: Date,
    default: Date.now(),
    required:false
 },
 

 }); 
module.exports = Pessoa = mongoose.model("pessoa", PessoaSchema);
 const express = require('express');
 const router = express.Router();
 //Tratando autenticação
const Pessoa = require("../models/pessoa");//importando coleção
const bcrypt = require('bcrypt');

const path = require("path");
router.use('/login',express.static(__dirname + '/public/login'));

router.post('/login', async (req,res) => {// signup
//console.log("Entrou");
console.log(req.body.nome);
console.log(req.body.email);
console.log(req.body.senha);
console.log(req.body.username);
console.log(req.body.comentario);
await Pessoa.findOne({email: req.body.email})
.then(doc_pessoa => {
        if(doc_pessoa){
            //ja existe um documento com aquele email
            return res.status(400).json({emailerror:"Email já registrado no sistema"});
        }else{
            //inserir a informação no banco de dados mongodb colud
         const novo_registro_pessoa = Pessoa({
             nome: req.body.nome,
             email: req.body.email,
             username: req.body.username,
             senha: req.body.senha,
             comentario: req.body.comentario
         });
      //Encriptando os dados
      bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(novo_registro_pessoa.senha,salt,function(err,hash){
            
            if(err) throw err;
            novo_registro_pessoa.senha = hash;
            
            // salva bd
                novo_registro_pessoa
                .save()
                .then(p => res.json(p))
                .catch(err => console.log("Erro aqui",err));
    });
         });
        
        }
    })
.catch(err => console.log(err));

});
  //router.get("/", (res,req) => req.json({status:"Conexão bem sucedida"}));

  module.exports = router;
const express = require('express');
const app = express();

//Banco de Dados
const mongoose = require('mongoose');
const db_access = require('./setup/bd').mongoURL;

mongoose.
connect(db_access,{useNewUrlParser:true})//, userUnifiedTopology:true
.then(() => console.log("Conexão ao MongoDb bem sucedida!"))
.catch(err => console.log(err));

//Login
const bodyparse = require('body-parser');
app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());

const path = require("path");
app.use('/login',express.static(__dirname + '/public/login'));
const auth = require("./routes/auth");
//app.use("/auth",auth);
app.use(auth);


// app.post('/login',(req, res)=>{
  
//     res.status(200).send("Dados enviados com sucesso!");
//     res.status(500).send("Dados não foram enviados!");

//     res.redirect('/')
    
//     });


    app.get("/", (res,req) => req.json({status:"Seja-Bem-Vindo"}));
    app.get("*", (res,req) => req.json({status:"Acesso não permitido"}));
const port = 3000;
app.listen(port,() =>console.log(`Executando na porta ${port}`));
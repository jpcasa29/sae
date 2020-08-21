const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, {encoding: 'utf-8'}));

let pass = "123456";
let passHash = bcrypt.hashSync(pass, 10);

for(let i=0;i<usuarios.length;i++){
    usuarios[i].password = passHash;

}

let usuariosJSON = JSON.stringify(usuarios);
fs.writeFileSync(usuariosFilePath, usuariosJSON)
console.log(usuariosJSON)
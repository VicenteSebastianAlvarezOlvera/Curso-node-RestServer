const { response, request } = require('express');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const path = require('path');

const usuariosGet = async(req = request, res = response) => {
    //muestra todos los usuarios en grupos de 5 en 5
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
}
const usuariosPost = async(req, res = response) => { //crea usuarios

    const { nombre, correo, password, rol } = req.body; //requerimientos
    const usuario = new Usuario({ nombre, correo, password, rol }); //los guarda en una variable

    const salt = bcryptjs.genSaltSync(); //encripta la contraseña
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save(); //guarda la información en la base de datos

    const direc = path.join(__dirname, '../uploads/', nombre); // dirección de la carpeta
    if (!fs.existsSync(direc)) { //si existe
        fs.mkdirSync(direc); // crea la carpeta del usuario
    }
    const direcExp = path.join(__dirname, '../uploads/expedientes/', nombre); // dirección del expediente
    if (!fs.existsSync(direcExp)) { //si existe
        fs.mkdirSync(direcExp); // crea la carpeta del usuario
    }
    res.json({
        usuario
    });
}
const usuariosDelete = async(req, res = response) => { //elimila usuarios, pidiendo el id del 
    //usuario a eliminar y el jwt de un administrador para proceder
    const { id } = req.params; //solicita id
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }); //actializa el estado a falso, "eliminandola"
    res.json(usuario);
}
const usuariosPut = async(req, res = response) => {
    //actualiza datos de usuarios
    const { id } = req.params;
    const { _id, password, google, correpo, ...resto } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut,

}
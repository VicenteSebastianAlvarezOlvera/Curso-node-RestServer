const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
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
    //const usuariosPatch =
const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    /*const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        return res.status(400).json({
            msg: 'Correo ya en uso'
        });
    }*/

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
        //msg: 'post API - controlador',
        usuario
    });
}
const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    //const usuarioaAutenticado = req.usuario;
    res.json(usuario);
}
const usuariosPut = async(req, res = response) => {
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
        //usuariosPatch,
        usuariosPost,
        usuariosDelete,
        usuariosPut,

    }
    //$2a$10$BH8d5A2XIYzt.lIpyo4afO7RpRP5lnOqUZBGVlaQ68sJRSY0oiKbe
    //$2a$10$lhS1ZOsyp6bY/9leU1fOWuxm/WjfjhiALf6H.A6plwFQqhXdlpmAS
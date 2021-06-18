const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");

const login = async(req, res = response) => {
    const { correo, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }
        const contraValida = bcryptjs.compareSync(password, usuario.password);
        if (!contraValida) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    login
}
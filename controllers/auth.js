const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const { Googleverify } = require("../helpers/google-verify");

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
const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = await Googleverify(id_token);
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true

            };
            usuario = new Usuario(data);
            await usuario.save();
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'hable con el admin'
            });
        }
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es valido'
        })
    }

    /*res.json({
        msg: 'google sign in clear',
        id_token
    });
    const googleUser = await Googleverify(id_token);

    try {
        res.json({
            msg: 'google sign in clear',
            id_token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es valido'
        })
    }*/

}
module.exports = {
    login,
    googleSignIn
}
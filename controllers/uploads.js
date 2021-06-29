const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const fs = require("fs");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models');
const path = require('path');

const cargarArchivos = async(req, res = response) => {

    //console.log( req.files );

    try {
        //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre
        });
    } catch (msg) {
        res.status(400).json({
            msg: 'error'
        });
    }
}
const actualizarImagen = async(req, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status.json({ msg: 'No existe un usuario con ese id' });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status.json({ msg: 'No existe un producto con ese id' });
            }
            break;
        default:
            return res.status(500).json({ msg: 'No validé esto' });
    }

    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }



    const nombre = await subirArchivo(req.files, ['jpg', 'jpeg', 'png'], coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(modelo);
}
const actualizarImagenCloudinary = async(req, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status.json({ msg: 'No existe un usuario con ese id' });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status.json({ msg: 'No existe un producto con ese id' });
            }
            break;
        default:
            return res.status(500).json({ msg: 'No validé esto' });
    }

    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();


    res.json(modelo);
    //const nombre = await subirArchivo(req.files, ['jpg', 'jpeg', 'png'], coleccion);
    //modelo.img = nombre;
    //await modelo.save();
    //res.json(resp);
}
const mostrarImagen = async(req, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;
    const pathImagent = path.join(__dirname, '../assets', 'no-image.jpg');

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status.json({ msg: 'No existe un usuario con ese id' });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status.json({ msg: 'No existe un producto con ese id' });
            }
            break;
        default:
            return res.status(500).json({ msg: 'No validé esto' });
    }

    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }
    return res.sendFile(pathImagent);
}
module.exports = {
    cargarArchivos,
    actualizarImagenCloudinary,
    mostrarImagen
}
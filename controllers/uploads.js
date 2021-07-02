const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
//const fs = require("fs");
const fs = require("fs").promises;
const { subirArchivo } = require("../helpers");
//const { Usuario, Producto } = require('../models');
const { Usuario } = require('../models');

const path = require('path');

const cargarArchivos = async(req, res = response) => { //subir archivos
    const { id } = req.params;
    destino = await Usuario.findById(id);
    console.log(destino.nombre);
    try {
        //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, destino.nombre);
        res.json({
            nombre
        });
    } catch (msg) {
        res.status(400).json({
            msg: 'no se puede subir, error de funcion cargar archivos en controllers/uploads'
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
    const { id } = req.params;
    let modelo;
    modelo = await Usuario.findById(id);
    //console.log(modelo);
    if (!modelo) {
        return res.status(400).json({ msg: 'No existe un usuario con ese id' });
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
const listarDocs = async(req, res = response) => {
        const { id } = req.params;
        let modelo;
        modelo = await Usuario.findById(id);
        console.log(modelo.nombre);
        const nameTemp = modelo.nombre;
        const direc = path.join(__dirname, '../uploads/', nameTemp);
        console.log(direc);
        const items = await fs.readdir(direc);
        res.json({
            items
        });
    }
    //const mostrarImagen = async(req, res = response) => {
    //    const { id } = req.params;
    //   let modelo;
    //   const pathImagent = path.join(__dirname, '../assets', 'no-image.jpg');
    //
    //    modelo = await Usuario.findById(id);
    //    if (!modelo) {
    //        return res.status.json({ msg: 'No existe un usuario con ese id' });
    //    }
    //    console.log(modelo.img);
    //    if (modelo.img) {
    //        const pathImagen = modelo.img;
    //        if (fs.existsSync(pathImagen)) {
    //            return res.sendFile(pathImagen)
    //        }
    //    }
    //
    //   return res.sendFile(pathImagent);
    //}

module.exports = {
    cargarArchivos,
    actualizarImagenCloudinary,
    listarDocs
}
const { response } = require('express');

const { Categoria } = require('../models');
const { findById } = require('../models/categoria');
const usuario = require('../models/usuario');

const crearCategoria = async(req, res = response) => {
        const nombre = req.body.nombre.toUpperCase();
        const categoriaDB = await Categoria.findOne({ nombre });
        if (categoriaDB) {
            return res.status(400).json({
                msg: 'Ya existe categoria'
            });
        }
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = new Categoria(data);
        await categoria.save();
        res.status(201).json(categoria);
    }
    //obtener categorias .paginado.total.populate
const CategoriasGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)

        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    //const editor = findById({})
    //let creador = await Categoria.findOne().populate('usuario._id');
    res.json({
        total,
        categorias,

    });
}

//Obtener categoria .populate
const CategoriaGet = async(req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');
    //const usuarioaAutenticado = req.usuario;
    res.json(categoria);
}

//actualizar categoria
const editCategoria = async(req, res = response) => {
    const { id } = req.params;
    const nombreNuevo = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombreNuevo });
    if (categoriaDB) {
        return res.status(400).json({
            msg: 'Ya existe categoria'
        });
    }
    const data = {
        nombreNuevo,
        usuario: req.usuario._id
    }

    const categoria = await Categoria.findByIdAndUpdate(id, { nombre: nombreNuevo });
    await categoria.save();
    res.status(201).json(categoria);
}

//borrar categoria set to false
const categoriaDelete = async(req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    //const usuarioaAutenticado = req.usuario;
    res.json(categoria);
}

module.exports = {
    crearCategoria,
    CategoriaGet,
    CategoriasGet,
    categoriaDelete,
    editCategoria
}
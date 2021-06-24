const { response } = require('express');

const { Producto } = require('../models');
const categoria = require('../models/categoria');
const { findById } = require('../models/producto');
const usuario = require('../models/usuario');

const crearProducto = async(req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);

}

//obtener productos .paginado.total.populate
const ProductosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)

        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    //const editor = findById({})
    //let creador = await producto.findOne().populate('usuario._id');
    res.json({
        total,
        productos,

    });
}

//Obtener producto .populate
const ProductoGet = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    //const usuarioaAutenticado = req.usuario;
    res.json(producto);
}

//actualizar producto
const editProducto = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);

}

//borrar producto set to false
const ProductoDelete = async(req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false });
    //const usuarioaAutenticado = req.usuario;
    res.json(producto);
}

module.exports = {
    crearProducto,
    ProductoGet,
    ProductosGet,
    ProductoDelete,
    editProducto
}
//const categoria = require('../models/categoria');
//const producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => { //se asegura de que el rol exista en otra tabla de la base de datos
    //si es así, confirma y asigna el rol a dicha cuenta
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`)
    }
}
const esCorreoValido = async(correo = '') => {
    //se asegura de que el correo sea valido
    //si es así, confirma y asigna el rol a dicha cuenta
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`Correo ya registrado`)
    };
}
const esIdValido = async(id) => { //se asegura de que el id exista en la base de datos de los usuarios
        const existeId = await Usuario.findById(id);
        if (!existeId) {
            throw new Error(`El id ${id} no existe`)
        };
    }
    //const esIddValido = async(id) => {
    //    const existeId = await categoria.findById(id);
    //    if (!existeId) {
    //        throw new Error(`El id ${id} no existe`)
    //    };
    //}
    //const esIdddValido = async(id) => {
    //    const existeId = await producto.findById(id);
    //    if (!existeId) {
    //        throw new Error(`El id ${id} no existe`)
    //    };
    //}
    //const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    //    const incluida = colecciones.includes(coleccion);
    //    if (!incluida) {
    //        throw new Error(`La coleccion no es permitida`);
    //    }
    //    return true;
    //}
module.exports = {
    esRolValido,
    esCorreoValido,
    esIdValido,
    //esIddValido,
    //esIdddValido,
    //coleccionesPermitidas
}
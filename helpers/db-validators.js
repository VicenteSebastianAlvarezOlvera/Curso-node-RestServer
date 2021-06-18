const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`)
    }
}
const esCorreoValido = async(correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`Correo ya registrado`)
    };
}
const esIdValido = async(id) => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El id ${id} no existe`)
    };
}
module.exports = {
    esRolValido,
    esCorreoValido,
    esIdValido
}
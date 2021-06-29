const validarJWT = require('../middlewares/validar-jtw');
const validarCampos = require('../middlewares/validar-campos');
const tieneRol = require('../middlewares/validar-roles');
const validarArchivoSubir = require('./validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRol,
    ...validarArchivoSubir
}
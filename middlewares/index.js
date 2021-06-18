const validarJWT = require('../middlewares/validar-jtw');
const validarCampos = require('../middlewares/validar-campos');
const tieneRol = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRol
}
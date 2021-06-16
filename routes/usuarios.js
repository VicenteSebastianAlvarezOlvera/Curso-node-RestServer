const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, esCorreoValido, esIdValido } = require('../helpers/db-validators');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut, } = require('../controllers/usuarios');

const router = Router();
router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(esIdValido),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de tener minimo 6 caracteres').isLength({ min: 6 }),
    check('correo').custom(esCorreoValido),
    //check('correo', 'El correo noe svalido').isEmail(),
    //check('rol', 'No es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(esIdValido),
    validarCampos
], usuariosDelete);

module.exports = router;
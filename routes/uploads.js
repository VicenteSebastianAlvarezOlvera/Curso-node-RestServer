const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagenCloudinary, listarDocs, } = require('../controllers/uploads');
const { esIdValido } = require('../helpers');
const { validarArchivoSubir, validarCampos, validarJWT, soyAdmin } = require('../middlewares');


const router = Router();
router.post('/:id', [
    validarJWT,
    soyAdmin,
    check('id').custom(esIdValido),
    validarCampos,
    validarArchivoSubir
], cargarArchivos);

router.put('/:id', [ //ACTUALIZAR IMAGEN DE PERFIL CON ID DE USUARIO
    validarArchivoSubir,
    check('id', 'Debe ser de mongo').isMongoId(),
    validarCampos
], actualizarImagenCloudinary)
router.get('/:id', [
    check('id').custom(esIdValido)
], listarDocs)



module.exports = router;
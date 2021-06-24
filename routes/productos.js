const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, ProductosGet, ProductoDelete, ProductoGet, editProducto } = require('../controllers/productos');
const { esIdddValido } = require('../helpers/db-validators');

const { validarJWT, validarCampos } = require('../middlewares/index');
const router = Router();
//para los que necesitan id, agregar middleware personalizado

//obtener categorias-- falta populate
router.get('/', ProductosGet); // 
// Obtener una Producto por id - publico-- falta populate
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(esIdddValido),
], ProductoGet);
// Crear Producto - privado - cualquier persona con un token válido -- done
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ], crearProducto

);
// Actualizar - privado - cualquiera con token válido -- done
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(esIdddValido),
], editProducto);
// Borrar una Producto - Admin -- done
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(esIdddValido),

], ProductoDelete);
module.exports = router;
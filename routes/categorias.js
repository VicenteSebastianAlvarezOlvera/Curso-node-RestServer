const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, CategoriasGet, categoriaDelete, CategoriaGet, editCategoria } = require('../controllers/categorias');
const { esIddValido } = require('../helpers/db-validators');

const { validarJWT, validarCampos } = require('../middlewares/index');
const router = Router();
//para los que necesitan id, agregar middleware personalizado

//obtener categorias-- falta populate
router.get('/', CategoriasGet); // 
// Obtener una categoria por id - publico-- falta populate
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(esIddValido),
], CategoriaGet);
// Crear categoria - privado - cualquier persona con un token válido -- done
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ], crearCategoria

);
// Actualizar - privado - cualquiera con token válido -- done
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(esIddValido),
], editCategoria);
// Borrar una categoria - Admin -- done
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(esIddValido),

], categoriaDelete);
module.exports = router;
const {Router, response} = require('express');
const router= Router();
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut,}=require('../controllers/usuarios');
router.get('/',  usuariosGet);
router.put('/:id',  usuariosPut);
router.post('/',  usuariosPost);
router.delete('/', usuariosDelete );

module.exports = router;
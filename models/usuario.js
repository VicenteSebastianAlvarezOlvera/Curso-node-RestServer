const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Usted tiene nombre, pongalo']
    },
    correo: {
        type: String,
        required: [true, 'Usted tiene correo, pongalo'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Ingrese una contraseña']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'LECTOR', 'OTRO']
    },
    estado: {
        type: Boolean,
        default: true
    }
});
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}
module.exports = model('Usuario', UsuarioSchema);
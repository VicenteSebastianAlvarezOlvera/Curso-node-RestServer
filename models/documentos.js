const { Schema, model } = require('mongoose');
const DocumentoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El archivo no puede no tener nombre']
    },
    ubicacion: {
        type: String,
        required: [true, 'Debe de estar en algun lado unu'],
        unique: true
    },

});
DocumentoSchema.methods.toJSON = function() {
    const { _id, ...documento } = this.toObject();
    documento.uid = _id;
    return documento;
}
module.exports = model('Documento', DocumentoSchema);
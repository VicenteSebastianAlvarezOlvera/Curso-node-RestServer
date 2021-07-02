const path = require('path');


const subirArchivo = async(files, carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;

        const nombreTemp = archivo.name;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    });
}
module.exports = {
    subirArchivo
}
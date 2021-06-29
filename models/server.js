const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { dbConnection } = require('../DB/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            uploads: '/api/uploads'
        }

        this.connectDB();
        this.middlewares();
        this.routes();

    }
    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        //cors
        this.app.use(cors());
        //lectura y parseo
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));

    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Sevidor corriendo en el puerto ', this.port);
        });
    }
}
module.exports = Server;